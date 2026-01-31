
import { createClient } from '@supabase/supabase-js'
import type { Database } from './supabaseTypes'

// These should be in .env in a real setup.
// For now, we'll anticipate them.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
