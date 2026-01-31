
import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../../data/supabaseClient';
import type { Database } from '../../data/supabaseTypes';
import { CompanyCard } from '../components/CompanyCard';
import { Search } from 'lucide-react';
import styles from './Companies.module.css';

type Company = Database['public']['Tables']['companies']['Row'];

export const Companies: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters state
    const [filterType, setFilterType] = useState<string>('');
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchCompanies() {
            setLoading(true);
            const { data, error } = await supabase
                .from('companies')
                .select('*')
                .order('name');

            if (error) console.error(error);
            if (data) setCompanies(data);
            setLoading(false);
        }
        fetchCompanies();
    }, []);

    // Derived unique values for filters
    const companyTypes = useMemo(() => Array.from(new Set(companies.map(c => c.company_type))).sort(), [companies]);
    const categories = useMemo(() => Array.from(new Set(companies.map(c => c.category))).sort(), [companies]);

    // Filter logic
    const filteredCompanies = useMemo(() => {
        return companies.filter(company => {
            const matchesType = filterType ? company.company_type === filterType : true;
            const matchesCategory = filterCategory ? company.category === filterCategory : true;
            const matchesSearch = searchQuery
                ? company.name.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            return matchesType && matchesCategory && matchesSearch;
        });
    }, [companies, filterType, filterCategory, searchQuery]);

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>Companies</h1>
                <div className={styles.controls}>
                    <div className={styles.searchBox}>
                        <Search size={16} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={styles.filters}>
                        <div className={styles.selectWrapper}>
                            <select
                                value={filterType}
                                onChange={e => setFilterType(e.target.value)}
                                className={styles.select}
                            >
                                <option value="">All Types</option>
                                {companyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className={styles.selectWrapper}>
                            <select
                                value={filterCategory}
                                onChange={e => setFilterCategory(e.target.value)}
                                className={styles.select}
                            >
                                <option value="">All Categories</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </header>

            {loading ? (
                <div className={styles.loading}>Loading directory...</div>
            ) : (
                <div className={styles.grid}>
                    {filteredCompanies.map(company => (
                        <CompanyCard key={company.company_id} company={company} />
                    ))}
                    {filteredCompanies.length === 0 && (
                        <div className={styles.emptyState}>
                            No companies match your criteria.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
