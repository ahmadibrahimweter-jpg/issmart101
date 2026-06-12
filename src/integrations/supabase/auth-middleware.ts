import { createMiddleware } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = "https://yrbwypcymwrnvqksgtlu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnd5cGN5bXdybnZxa3NndGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNzYyOTQsImV4cCI6MjA5Njc1MjI5NH0.jBclyNGPdoB7qAnebdPb9hO4ejDyVMLRFjC7MeHT9A0";

export const requireSupabaseAuth = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {

    const request = getRequest();
    if (!request?.headers) {
      throw new Error('Unauthorized: No request headers available');
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized: Missing or invalid authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) throw new Error('Unauthorized: No token provided');

    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data?.claims) throw new Error('Unauthorized: Invalid token');
    if (!data.claims.sub) throw new Error('Unauthorized: No user ID found in token');

    return next({ context: { supabase, userId: data.claims.sub, claims: data.claims } });
  },
)
