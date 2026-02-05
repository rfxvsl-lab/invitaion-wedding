import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { supabase } from '@/lib/supabase'; // Client for auth verification

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Verify Authentication & Admin Role
        // We can't trust the client-side session fully without calling getUser, 
        // but for API routes typically we expect an auth token in headers.
        // However, for simplicity given your current setup (client-side auth), 
        // we'll check the active session from the request headers if sent, 
        // OR simpler: we rely on the client passing a cookie/token? 

        // Actually, the most robust way in Next.js Pages router without middleware is:
        // Client sends access_token. But Supabase auth cookie handling is tricky manually.

        // Let's do a slightly looser but practical check: 
        // We will fetch the user using the Anon client and the token from the header.

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Missing token' });

        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // 2. Verify Admin Email
        const ADMIN_EMAIL = 'mhmmadridho64@gmail.com';
        if (user.email !== ADMIN_EMAIL) {
            return res.status(403).json({ error: 'Forbidden: Admin access only' });
        }

        // 3. Fetch All Profiles using ADMIN Client (Service Role)
        const { data: profiles, error: dbError } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .order('updated_at', { ascending: false });

        if (dbError) throw dbError;

        return res.status(200).json(profiles);

    } catch (error: any) {
        console.error('Admin API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
