
import React, { useEffect, useState } from 'react';
import { supabase } from '../../data/supabaseClient';
import { aggregateAnalyticsData, type AnalyticsRawData, type AnalyticsStats } from '../../aggregation/analyticsAggregations';
import styles from './Analytics.module.css';

export const Analytics: React.FC = () => {
    const [stats, setStats] = useState<AnalyticsStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            setLoading(true);
            const { data } = await supabase
                .from('companies')
                .select(`
                    company_type,
                    company_technologies (core_stack),
                    company_culture (work_environment)
                `);

            if (data) {
                const stats = aggregateAnalyticsData(data as unknown as AnalyticsRawData[]);
                setStats(stats);
            }
            setLoading(false);
        }
        fetchAnalytics();
    }, []);

    if (loading) return <div className={styles.loading}>Calculating ecosystem metrics...</div>;

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>Placement Analytics</h1>
                <p className={styles.subtitle}>Aggregated trends across the partner ecosystem</p>
            </header>

            <div className={styles.grid}>
                {/* Enabled: Tech Stack Frequency */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Top Technologies</h3>
                    <div className={styles.barChart}>
                        {stats?.topTech.map(([tech, count]: [string, number]) => (
                            <div key={tech} className={styles.barRow}>
                                <div className={styles.barLabel}>{tech}</div>
                                <div className={styles.barTrack}>
                                    <div className={styles.barFill} style={{ width: `${Math.min((count / 10) * 100, 100)}%` }}></div>
                                    <span className={styles.barValue}>{count}</span>
                                </div>
                            </div>
                        ))}
                        {stats?.topTech.length === 0 && <div className={styles.empty}>No technology data available</div>}
                    </div>
                </div>

                {/* Enabled: Work Environment */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Work Environment Distribution</h3>
                    <div className={styles.statsList}>
                        {Object.entries(stats?.workEnv || {}).map(([env, count]: [string, any]) => (
                            <div key={env} className={styles.statItem}>
                                <span className={styles.statLabel}>{env}</span>
                                <span className={styles.statValue}>{count}</span>
                            </div>
                        ))}
                        {Object.keys(stats?.workEnv || {}).length === 0 && <div className={styles.empty}>No culture data available</div>}
                    </div>
                </div>

                {/* Coming Soon */}
                <div className={`${styles.card} ${styles.disabled}`}>
                    <h3 className={styles.cardTitleDisabled}>Skill Gap Analysis</h3>
                    <div className={styles.overlay}>
                        <span>Coming Soon</span>
                        <small>Requires historical placement data</small>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.disabled}`}>
                    <h3 className={styles.cardTitleDisabled}>Outcome Correlations</h3>
                    <div className={styles.overlay}>
                        <span>Coming Soon</span>
                        <small>Requires offer letter integration</small>
                    </div>
                </div>
            </div>
        </div>
    );
};
