import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { orderId, status } = req.body;

    if (!orderId || !status) {
        return res.status(400).json({ error: 'Missing orderId or status' });
    }

    try {
        // 1. Update Order Status
        const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (orderError || !order) {
            throw new Error('Failed to update order status: ' + (orderError?.message || 'Unknown error'));
        }

        // 2. If PAID, process tier upgrade logic
        if (status === 'paid' && order.user_id) {
            console.log('🔄 Processing paid order (Server-Side):', order.id, 'for user:', order.user_id);

            // B. Update User Profile (Tier)
            let maxChanges = 0;
            let slugSlots = 1;
            const tier = order.tier_selected;

            switch (tier) {
                case 'basic':
                    maxChanges = 2;
                    slugSlots = 1;
                    break;
                case 'premium':
                    maxChanges = 5;
                    slugSlots = 1;
                    break;
                case 'exclusive':
                    maxChanges = 10;
                    slugSlots = 3;
                    break;
                default:
                    // Free or unknown
                    maxChanges = 0;
                    slugSlots = 1;
            }

            const { error: profileError } = await supabaseAdmin.from('profiles').update({
                tier: tier,
                max_slug_changes: maxChanges,
                slug_slots: slugSlots,
                updated_at: new Date().toISOString()
            }).eq('id', order.user_id);

            if (profileError) {
                console.error('❌ Failed to update profile tier:', profileError);
                // We don't rollback the order update, but we log the error.
                // In a perfect world, we'd use a transaction or rollback.
            } else {
                console.log('✅ Successfully updated user tier to:', tier);
            }

            // C. Update Existing Invitation Metadata
            const { data: invitations } = await supabaseAdmin
                .from('invitations')
                .select('id, metadata')
                .eq('user_id', order.user_id);

            if (invitations && invitations.length > 0) {
                for (const inv of invitations) {
                    const currentMeta = inv.metadata || {};
                    const newMeta = {
                        ...currentMeta,
                        tier: tier,
                        expires_at: tier === 'exclusive'
                            ? new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString()
                            : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                    };

                    await supabaseAdmin.from('invitations').update({
                        metadata: newMeta
                    }).eq('id', inv.id);
                }
                console.log(`✅ Updated metadata for ${invitations.length} invitations.`);
            }
        }

        return res.status(200).json({ success: true, order });

    } catch (error: any) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
