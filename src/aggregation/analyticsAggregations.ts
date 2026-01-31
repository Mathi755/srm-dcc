
import type { Database } from '../data/supabaseTypes';

// We define the shape of the data we expect from the join query
export type AnalyticsRawData = {
    company_type: string;
    company_technologies: Pick<Database['public']['Tables']['company_technologies']['Row'], 'core_stack'> | null;
    company_culture: Pick<Database['public']['Tables']['company_culture']['Row'], 'work_environment'> | null;
};

export interface AnalyticsStats {
    topTech: [string, number][];
    workEnv: Record<string, number>;
}

export function aggregateAnalyticsData(data: AnalyticsRawData[]): AnalyticsStats {
    const techCounts: Record<string, number> = {};
    const envCounts: Record<string, number> = {};

    data.forEach(row => {
        // Tech Stack
        if (row.company_technologies?.core_stack) {
            row.company_technologies.core_stack.forEach((tech: string) => {
                techCounts[tech] = (techCounts[tech] || 0) + 1;
            });
        }

        // Work Environment
        const env = row.company_culture?.work_environment;
        if (env) {
            envCounts[env] = (envCounts[env] || 0) + 1;
        }
    });

    // Sort stats
    const sortedTech = Object.entries(techCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10); // Top 10

    return {
        topTech: sortedTech,
        workEnv: envCounts
    };
}
