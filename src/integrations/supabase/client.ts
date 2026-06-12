import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://yrbwypcymwrnvqksgtlu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnd5cGN5bXdybnZxa3NndGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNzYyOTQsImV4cCI6MjA5Njc1MjI5NH0.jBclyNGPdoB7qAnebdPb9hO4ejDyVMLRFjC7MeHT9A0';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});
