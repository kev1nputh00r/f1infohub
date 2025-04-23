
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize the Supabase client only if URL is available
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to safely use supabase client
export const getSupabase = () => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Please check your environment variables.');
    return null;
  }
  return supabase;
};
