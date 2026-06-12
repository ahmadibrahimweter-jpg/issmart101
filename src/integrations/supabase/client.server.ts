import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

if (!isConfigured) {
  console.warn('[Supabase Admin] Not configured — admin features disabled.');
}

export const supabaseAdmin = isConfigured
  ? createClient<Database>(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
