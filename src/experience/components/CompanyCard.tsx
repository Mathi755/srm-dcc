
import React from 'react';
import type { Database } from '../../data/supabaseTypes';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Users } from 'lucide-react';
import styles from './CompanyCard.module.css';

type Company = Database['public']['Tables']['companies']['Row'];

interface CompanyCardProps {
    company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.card}
            onClick={() => navigate(`/companies/${company.company_id}`)}
            role="button"
            tabIndex={0}
        >
            <div className={styles.header}>
                <div className={styles.logoPlaceholder}>
                    {company.logo_url ? (
                        <img src={company.logo_url} alt={company.name} className={styles.logo} />
                    ) : (
                        <Building2 size={24} color="#5F6368" />
                    )}
                </div>
                <div>
                    <h3 className={styles.name}>{company.name}</h3>
                    <div className={styles.metaRow}>
                        <span className={styles.badge}>{company.company_type}</span>
                        <span className={styles.badgeSecondary}>{company.category}</span>
                    </div>
                </div>
            </div>

            <div className={styles.body}>
                <div className={styles.infoRow}>
                    <Users size={16} className={styles.icon} />
                    <span>{company.employee_size} employees</span>
                </div>
                <div className={styles.infoRow}>
                    <MapPin size={16} className={styles.icon} />
                    {/* Note: 'operating_countries' is a filter requirement, but 'headquarters_address' is the card requirement. */}
                    <span className={styles.address}>{company.headquarters_address}</span>
                </div>
            </div>
        </div>
    );
};
