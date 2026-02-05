import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { supabase } from '@/lib/supabase'; // Client for auth verification

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Verify Authentication
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Missing token' });

        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // 2. Fetch User's Invitations securely using Service Role
        // We get 'type' (legacy theme slug) or related 'themes.name'
        const { data: invitations, error: dbError } = await supabaseAdmin
            .from('invitations')
            .select(`
                id,
                type,
                metadata,
                theme:themes(name)
            `)
            .eq('user_id', user.id);

        if (dbError) throw dbError;

        // 3. Extract Unique Theme Names
        const themes = new Set<string>();

        invitations?.forEach((inv: any) => {
            // Try getting name from Relation -> Metadata -> Type -> Fallback
            if (inv.theme?.name) {
                themes.add(inv.theme.name);
            } else if (inv.metadata?.theme_name) {
                themes.add(inv.metadata.theme_name);
            } else if (inv.type) {
                themes.add(inv.type); // Might be slug like 'modern-arch', acceptable if no name
            }
        });

        return res.status(200).json({ themes: Array.from(themes) });

    } catch (error: any) {
        console.error('My-Themes API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
