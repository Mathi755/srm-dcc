
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          company_type: string
          category: string
          employee_size: string
          headquarters_address: string
          description: string | null
          website_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          company_type: string
          category: string
          employee_size: string
          headquarters_address: string
          description?: string | null
          website_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          company_type?: string
          category?: string
          employee_size?: string
          headquarters_address?: string
          description?: string | null
          website_url?: string | null
          created_at?: string
        }
      }
      company_business: {
        Row: {
          id: string
          company_id: string
          business_model: string | null
          strategy_summary: string | null
          market_position: string | null
        }
        Insert: {
          id?: string
          company_id: string
          business_model?: string | null
          strategy_summary?: string | null
          market_position?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          business_model?: string | null
          strategy_summary?: string | null
          market_position?: string | null
        }
      }
      company_technologies: {
        Row: {
          id: string
          company_id: string
          core_stack: string[] | null
          cloud_providers: string[] | null
          dev_culture: string | null
        }
        Insert: {
          id?: string
          company_id: string
          core_stack?: string[] | null
          cloud_providers?: string[] | null
          dev_culture?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          core_stack?: string[] | null
          cloud_providers?: string[] | null
          dev_culture?: string | null
        }
      }
      company_people: {
        Row: {
          id: string
          company_id: string
          leadership_structure: string | null
          hiring_trends: string | null
        }
        Insert: {
          id?: string
          company_id: string
          leadership_structure?: string | null
          hiring_trends?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          leadership_structure?: string | null
          hiring_trends?: string | null
        }
      }
      company_culture: {
        Row: {
          id: string
          company_id: string
          core_values: string[] | null
          work_environment: string | null
          remote_policy: string | null
        }
        Insert: {
          id?: string
          company_id: string
          core_values?: string[] | null
          work_environment?: string | null
          remote_policy?: string | null
        }
        Update: {
          id?: string
          company_id?: string
          core_values?: string[] | null
          work_environment?: string | null
          remote_policy?: string | null
        }
      }
      company_talent_growth: {
        Row: {
            id: string
            company_id: string
            growth_programs: string | null
            learning_budget: string | null
        }
        Insert: {
            id?: string
            company_id: string
            growth_programs?: string | null
            learning_budget?: string | null
        }
        Update: {
            id?: string
            company_id?: string
            growth_programs?: string | null
            learning_budget?: string | null
        }
      }
      company_compensation: {
        Row: {
            id: string
            company_id: string
            base_salary_range: string | null
            benefits_summary: string | null
        }
        Insert: {
            id?: string
            company_id: string
            base_salary_range?: string | null
            benefits_summary?: string | null
        }
        Update: {
            id?: string
            company_id?: string
            base_salary_range?: string | null
            benefits_summary?: string | null
        }
      }
      company_logistics: {
        Row: {
            id: string
            company_id: string
            office_locations: string[] | null
            interview_process: string | null
        }
        Insert: {
            id?: string
            company_id: string
            office_locations?: string[] | null
            interview_process?: string | null
        }
        Update: {
            id?: string
            company_id?: string
            office_locations?: string[] | null
            interview_process?: string | null
        }
      }
      company_financials: {
        Row: {
            id: string
            company_id: string
            revenue_annual: string | null
            funding_stage: string | null
        }
        Insert: {
            id?: string
            company_id: string
            revenue_annual?: string | null
            funding_stage?: string | null
        }
        Update: {
            id?: string
            company_id?: string
            revenue_annual?: string | null
            funding_stage?: string | null
        }
      }
      company_brand_reputation: {
        Row: {
            id: string
            company_id: string
            glassdoor_rating: number | null
            brand_sentiment: string | null
        }
        Insert: {
            id?: string
            company_id: string
            glassdoor_rating?: number | null
            brand_sentiment?: string | null
        }
        Update: {
            id?: string
            company_id?: string
            glassdoor_rating?: number | null
            brand_sentiment?: string | null
        }
      }
    }
  }
}
