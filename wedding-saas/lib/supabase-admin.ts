import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    // Only warn in server context to avoid leaking info, though this file should be server-only mostly.
    if (typeof window === 'undefined') {
        console.warn('Missing Supabase Service Role Key!');
    }
}

// Create a Supabase client with the SERVICE ROLE KEY
// This client bypasses Row Level Security (RLS) entirely.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
