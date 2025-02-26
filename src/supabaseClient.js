import { createClient } from '@supabase/supabase-js';

// Get environment variables from window.ENV if available (for production/GitHub Pages)
// or from process.env (for local development)
const supabaseUrl = window.ENV?.REACT_APP_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = window.ENV?.REACT_APP_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// Log for debugging
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseAnonKey);

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 