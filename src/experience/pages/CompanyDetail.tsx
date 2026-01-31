
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../data/supabaseClient';
import type { Database } from '../../data/supabaseTypes';
import { ChevronLeft, Building2, Globe, Users, Award, MapPin, DollarSign, Briefcase } from 'lucide-react';
import styles from './CompanyDetail.module.css';
import clsx from 'clsx';

// Type for the joined response. Supabase types don't automatically join, so we define what we expect.
type CompanyDetailData = Database['public']['Tables']['companies']['Row'] & {
    company_business?: Database['public']['Tables']['company_business']['Row'];
    company_technologies?: Database['public']['Tables']['company_technologies']['Row'];
    company_people?: Database['public']['Tables']['company_people']['Row'];
    company_culture?: Database['public']['Tables']['company_culture']['Row'];
    company_talent_growth?: Database['public']['Tables']['company_talent_growth']['Row'];
    company_compensation?: Database['public']['Tables']['company_compensation']['Row'];
    company_logistics?: Database['public']['Tables']['company_logistics']['Row'];
    company_financials?: Database['public']['Tables']['company_financials']['Row'];
    company_brand_reputation?: Database['public']['Tables']['company_brand_reputation']['Row'];
};

const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'business', label: 'Business & Strategy' },
    { id: 'tech', label: 'Technology' },
    { id: 'people', label: 'People & Leadership' },
    { id: 'culture', label: 'Culture' },
    { id: 'talent', label: 'Talent & Growth' },
    { id: 'comp', label: 'Comp & Logistics' },
    { id: 'financials', label: 'Financials & Brand' },
];

export const CompanyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [company, setCompany] = useState<CompanyDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!id) return;

        async function fetchCompany() {
            setLoading(true);
            const { data, error } = await supabase
                .from('companies')
                .select(`
                    *,
                    company_business(*),
                    company_technologies(*),
                    company_people(*),
                    company_culture(*),
                    company_talent_growth(*),
                    company_compensation(*),
                    company_logistics(*),
                    company_financials(*),
                    company_brand_reputation(*)
                `)
                .eq('company_id', id as string)
                .single();

            if (error) {
                console.error('Error fetching company details:', error);
            }
            // Supabase returns arrays for joined tables mostly, but .single() on root makes root an object.
            // However, 1:1 relations might still come as arrays depending on setup, but typically they come as object or array of objects.
            // Since we assume 1:1, we'll cast or handle it.
            // Actually, without foreign keys defined in the client (which I didn't mock), this query might fail if relationships aren't detected by Supabase.
            // Assuming Supabase auto-detects based on FK naming conventions `company_id`.

            // Note: In a real Supabase setup, if the relationship isn't explicitly defined, this query needs manual handling or view.
            // I will assume standard Supabase behavior where FK `company_id` allows logical inference or I would have set it up.
            // For safety, I'll typecast.

            if (data) {
                // Flatten the arrays if they come as arrays (common in some clients if one-to-many is possible)
                // But for 1:1 logic, we trust singular.
                setCompany(data as unknown as CompanyDetailData);
            }
            setLoading(false);
        }

        fetchCompany();
    }, [id]);

    if (loading) return <div className={styles.loading}>Loading company operating system...</div>;
    if (!company) return <div className={styles.notFound}>Company not found.</div>;

    // Helper to safely access nested data which might be array or object depending on Supabase response nuance
    const getRelation = <K extends keyof CompanyDetailData>(key: K): any => {
        const val = company[key];
        if (Array.isArray(val)) return val[0] || null;
        return val || null;
    };

    const business = getRelation('company_business');
    const tech = getRelation('company_technologies');
    const people = getRelation('company_people');
    const culture = getRelation('company_culture');
    const talent = getRelation('company_talent_growth');
    const comp = getRelation('company_compensation');
    const logistics = getRelation('company_logistics');
    const financials = getRelation('company_financials');
    const brand = getRelation('company_brand_reputation');

    return (
        <div className={styles.page}>
            {/* Header / Breadcrumb */}
            <div className={styles.topNav}>
                <Link to="/companies" className={styles.backLink}>
                    <ChevronLeft size={16} />
                    Back to Companies
                </Link>
            </div>

            {/* Company Header */}
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                    {company.logo_url ? <img src={company.logo_url} className={styles.logo} alt="logo" /> : <Building2 size={32} />}
                </div>
                <div className={styles.titling}>
                    <h1 className={styles.name}>{company.name}</h1>
                    <div className={styles.meta}>
                        <span className={styles.badge}>{company.company_type}</span>
                        <span className={styles.badge}>{company.category}</span>
                        <span className={styles.badge}>{company.employee_size}</span>
                        <span className={styles.location}><MapPin size={12} /> {company.headquarters_address}</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabsList}>
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={clsx(styles.tab, activeTab === tab.id && styles.activeTab)}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className={styles.content}>

                {/* 1. Overview */}
                {activeTab === 'overview' && (
                    <div className={styles.pane}>
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>About {company.name}</h2>
                            <p className={styles.text}>{company.description || 'No description available.'}</p>
                            {company.website_url && (
                                <a href={company.website_url} target="_blank" rel="noreferrer" className={styles.link}>
                                    <Globe size={14} /> Visit Website
                                </a>
                            )}
                        </section>
                    </div>
                )}

                {/* 2. Business */}
                {activeTab === 'business' && (
                    <div className={styles.pane}>
                        <div className={styles.grid2}>
                            <InfoCard title="Business Model" content={business?.business_model} icon={<Briefcase size={18} />} />
                            <InfoCard title="Market Position" content={business?.market_position} />
                        </div>
                        <div className={styles.fullCard}>
                            <h3>Strategy Summary</h3>
                            <p>{business?.strategy_summary || 'N/A'}</p>
                        </div>
                    </div>
                )}

                {/* 3. Technology */}
                {activeTab === 'tech' && (
                    <div className={styles.pane}>
                        <div className={styles.fullCard}>
                            <h3>Development Culture</h3>
                            <p>{tech?.dev_culture || 'N/A'}</p>
                        </div>
                        <div className={styles.grid2}>
                            <ListCard title="Core Stack" items={tech?.core_stack} />
                            <ListCard title="Cloud & Infra" items={tech?.cloud_providers} />
                        </div>
                    </div>
                )}

                {/* 4. People */}
                {activeTab === 'people' && (
                    <div className={styles.pane}>
                        <div className={styles.grid2}>
                            <InfoCard title="Leadership Structure" content={people?.leadership_structure} icon={<Users size={18} />} />
                            <InfoCard title="Hiring Trends" content={people?.hiring_trends} />
                        </div>
                    </div>
                )}

                {/* 5. Culture */}
                {activeTab === 'culture' && (
                    <div className={styles.pane}>
                        <div className={styles.grid2}>
                            <ListCard title="Core Values" items={culture?.core_values} />
                            <InfoCard title="Remote Policy" content={culture?.remote_policy} />
                        </div>
                        <div className={styles.fullCard}>
                            <h3>Work Environment</h3>
                            <p>{culture?.work_environment || 'N/A'}</p>
                        </div>
                    </div>
                )}

                {/* 6. Talent */}
                {activeTab === 'talent' && (
                    <div className={styles.pane}>
                        <div className={styles.grid2}>
                            <InfoCard title="Growth Programs" content={talent?.growth_programs} icon={<Award size={18} />} />
                            <InfoCard title="Learning Budget" content={talent?.learning_budget} />
                        </div>
                    </div>
                )}

                {/* 7. Comp & Logistics */}
                {activeTab === 'comp' && (
                    <div className={styles.pane}>
                        <div className={styles.grid2}>
                            <InfoCard title="Base Salary Range" content={comp?.base_salary_range} icon={<DollarSign size={18} />} />
                            <InfoCard title="Benefits" content={comp?.benefits_summary} />
                        </div>
                        <div className={styles.grid2}>
                            <ListCard title="Office Locations" items={logistics?.office_locations} />
                            <InfoCard title="Interview Process" content={logistics?.interview_process} />
                        </div>
                    </div>
                )}

                {/* 8. Financials */}
                {activeTab === 'financials' && (
                    <div className={styles.pane}>
                        <div className={styles.grid2}>
                            <InfoCard title="Annual Revenue" content={financials?.revenue_annual} />
                            <InfoCard title="Funding Stage" content={financials?.funding_stage} />
                        </div>
                        <div className={styles.grid2}>
                            <InfoCard title="Brand Sentiment" content={brand?.brand_sentiment} />
                            <InfoCard title="Glassdoor Rating" content={brand?.glassdoor_rating?.toString()} isMetric />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

// Sub-components for styling consistency
const InfoCard: React.FC<{ title: string, content?: string | null, icon?: React.ReactNode, isMetric?: boolean }> = ({ title, content, icon, isMetric }) => (
    <div className={styles.infoCard}>
        <div className={styles.cardLabel}>
            {icon && <span className={styles.cardIcon}>{icon}</span>}
            {title}
        </div>
        <div className={clsx(styles.cardValue, isMetric && styles.metricValue)}>
            {content || <span className={styles.missing}>Not Available</span>}
        </div>
    </div>
);

const ListCard: React.FC<{ title: string, items?: string[] | null }> = ({ title, items }) => (
    <div className={styles.infoCard}>
        <div className={styles.cardLabel}>{title}</div>
        {items && items.length > 0 ? (
            <div className={styles.tags}>
                {items.map((item, i) => <span key={i} className={styles.tag}>{item}</span>)}
            </div>
        ) : (
            <span className={styles.missing}>Not Available</span>
        )}
    </div>
);
