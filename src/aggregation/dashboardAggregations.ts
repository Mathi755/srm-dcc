
import type { Database } from '../data/supabaseTypes';

type Company = Database['public']['Tables']['companies']['Row'];

export interface DashboardMetrics {
    totalCompanies: number;
    byType: Record<string, number>;
    byCategory: Record<string, number>;
    recentCompanies: Company[];
}

export function aggregateDashboardData(companies: Company[]): DashboardMetrics {
    const totalCompanies = companies.length;
    const byType: Record<string, number> = {};
    const byCategory: Record<string, number> = {};

    companies.forEach(c => {
        byType[c.company_type] = (byType[c.company_type] || 0) + 1;
        byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    });

    // Recent 5
    const recentCompanies = companies.slice(0, 5);

    return {
        totalCompanies,
        byType,
        byCategory,
        recentCompanies
    };
}
