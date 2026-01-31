
import React, { useEffect, useState } from 'react';
import { supabase } from '../../data/supabaseClient';
import type { Database } from '../../data/supabaseTypes';
import { aggregateDashboardData, type DashboardMetrics } from '../../aggregation/dashboardAggregations';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const { data, error } = await supabase
                    .from('companies')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                const companies = data as Database['public']['Tables']['companies']['Row'][] | null;

                if (companies) {
                    const metrics = aggregateDashboardData(companies);
                    setMetrics(metrics);
                }
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
    }, []);

    if (loading) return <div className="p-4">Loading system overview...</div>;

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.pageTitle}>System Overview</h1>
                <p className={styles.pageSubtitle}>Real-time placement ecosystem analytics</p>
            </header>

            <div className={styles.grid}>
                {/* Metric Cards - ENABLED */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>Total Companies</div>
                    <div className={styles.bigNumber}>{metrics?.totalCompanies || 0}</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>By Company Type</div>
                    <ul className={styles.list}>
                        {Object.entries(metrics?.byType || {}).map(([type, count]) => (
                            <li key={type} className={styles.listItem}>
                                <span>{type}</span>
                                <span className={styles.count}>{count}</span>
                            </li>
                        ))}
                        {Object.keys(metrics?.byType || {}).length === 0 && <li className={styles.empty}>No data available</li>}
                    </ul>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>By Category</div>
                    <ul className={styles.list}>
                        {Object.entries(metrics?.byCategory || {}).map(([cat, count]) => (
                            <li key={cat} className={styles.listItem}>
                                <span>{cat}</span>
                                <span className={styles.count}>{count}</span>
                            </li>
                        ))}
                        {Object.keys(metrics?.byCategory || {}).length === 0 && <li className={styles.empty}>No data available</li>}
                    </ul>
                </div>

                {/* Recently Added - ENABLED */}
                <div className={styles.cardLandscape}>
                    <div className={styles.cardHeader}>Recently Onboarded Partners</div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Type</th>
                                    <th>Category</th>
                                    <th>Added</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics?.recentCompanies.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.name}</td>
                                        <td>{c.company_type}</td>
                                        <td>{c.category}</td>
                                        <td>{new Date(c.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                                {metrics?.recentCompanies.length === 0 && (
                                    <tr><td colSpan={4} className={styles.empty}>No companies found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Coming Soon Blocks - DISABLED */}
                <div className={`${styles.card} ${styles.disabledCard}`}>
                    <div className={styles.cardHeaderDisabled}>Employability Snapshot</div>
                    <div className={styles.comingSoonOverlay}>
                        <span>Coming Soon</span>
                        <small>Requires student performance datasets</small>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.disabledCard}`}>
                    <div className={styles.cardHeaderDisabled}>Skill Readiness</div>
                    <div className={styles.comingSoonOverlay}>
                        <span>Coming Soon</span>
                        <small>Requires skill mapping tables</small>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.disabledCard}`}>
                    <div className={styles.cardHeaderDisabled}>Personalized Focus</div>
                    <div className={styles.comingSoonOverlay}>
                        <span>Coming Soon</span>
                        <small>Requires user personalization engine</small>
                    </div>
                </div>

            </div>
        </div>
    );
};
