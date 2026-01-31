
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, GraduationCap, BarChart3, Lightbulb } from 'lucide-react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    disabled?: boolean;
    comingSoon?: boolean;
    comingSoonReason?: string;
}

const NAV_ITEMS: NavItem[] = [
    {
        label: 'Dashboard',
        path: '/',
        icon: <LayoutDashboard size={20} />
    },
    {
        label: 'Companies',
        path: '/companies',
        icon: <Building2 size={20} />
    },
    {
        label: 'Skills',
        path: '/skills',
        icon: <GraduationCap size={20} />,
        disabled: true,
        comingSoon: true,
        comingSoonReason: 'Requires student & skill datasets'
    },
    {
        label: 'Analytics',
        path: '/analytics',
        icon: <BarChart3 size={20} />
    },
    {
        label: 'Innovation',
        path: '/innovation',
        icon: <Lightbulb size={20} />,
        disabled: true,
        comingSoon: true,
        comingSoonReason: 'Requires IP & research roadmap integration'
    }
];

export const Sidebar: React.FC = () => {

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoArea}>
                <div className={styles.logoText}>SRM DCC</div>
                <div className={styles.logoSub}>Career OS</div>
            </div>

            <nav className={styles.nav}>
                {NAV_ITEMS.map((item) => {
                    if (item.disabled) {
                        return (
                            <div
                                key={item.label}
                                className={clsx(styles.navItem, styles.disabled)}
                                title={item.comingSoonReason}
                            >
                                <div className={styles.icon}>{item.icon}</div>
                                <div className={styles.labelGroup}>
                                    <span className={styles.labelText}>{item.label}</span>
                                    {item.comingSoon && (
                                        <span className={styles.comingSoonBadge}>Coming Soon</span>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                        >
                            <div className={styles.icon}>{item.icon}</div>
                            <span className={styles.labelText}>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <div className={styles.footerNote}>
                    Built by students via <span className={styles.highlight}>Talenciaglobal</span>
                </div>
            </div>
        </aside>
    );
};
