import { createClient } from '@supabase/supabase-js';

// Direct string values for Supabase configuration
// This ensures the client will always have valid values
const SUPABASE_URL = 'https://okfzcsomvoibjnpdliam.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZnpjc29tdm9pYmpucGRsaWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MDYxODQsImV4cCI6MjA1NjE4MjE4NH0.hIy4TZiSkC0McXfusAxzZe7HnlBZAxQUTw4KjPY2JUE';

// Log for debugging
console.log('Initializing Supabase client with URL:', SUPABASE_URL);

// Create Supabase client with error handling
let supabase;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  // Create a mock client that logs errors instead of failing
  supabase = {
    auth: {
      signUp: () => {
        console.error('Supabase client failed to initialize. Auth operations will not work.');
        return { data: null, error: new Error('Supabase client not initialized') };
      },
      signInWithPassword: () => {
        console.error('Supabase client failed to initialize. Auth operations will not work.');
        return { data: null, error: new Error('Supabase client not initialized') };
      },
      signOut: () => {
        console.error('Supabase client failed to initialize. Auth operations will not work.');
        return { error: new Error('Supabase client not initialized') };
      },
      getSession: () => {
        console.error('Supabase client failed to initialize. Auth operations will not work.');
        return { data: { session: null }, error: new Error('Supabase client not initialized') };
      },
      getUser: () => {
        console.error('Supabase client failed to initialize. Auth operations will not work.');
        return { data: { user: null }, error: new Error('Supabase client not initialized') };
      },
      onAuthStateChange: (callback) => {
        console.error('Supabase client failed to initialize. Auth state changes will not be detected.');
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          order: () => ({
            then: (resolve) => resolve({ data: [], error: null })
          }),
          single: () => ({
            then: (resolve) => resolve({ data: null, error: null })
          })
        }),
        delete: () => ({
          eq: () => ({
            then: (resolve) => resolve({ error: null })
          })
        }),
        insert: () => ({
          select: () => ({
            then: (resolve) => resolve({ data: [], error: null })
          })
        })
      })
    })
  };
}

export default supabase; 