// Database helper functions
import { supabase } from './supabase';
import { Theme, FAQ, Order, CreateOrderInput } from '../types/database';

// ===== THEMES =====
export async function getAllThemes(): Promise<Theme[]> {
    const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('tier', { ascending: true });

    if (error) {
        console.error('Error fetching themes:', error);
        return [];
    }
    return data || [];
}

export async function getThemesByTier(tier: string): Promise<Theme[]> {
    const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('tier', tier);

    if (error) {
        console.error('Error fetching themes by tier:', error);
        return [];
    }
    return data || [];
}

export async function deleteTheme(id: string): Promise<boolean> {
    const { error } = await supabase.from('themes').delete().eq('id', id);
    if (error) {
        console.error('Error deleting theme:', error);
        return false;
    }
    return true;
}

// ===== FAQs =====
export async function getAllFAQs(): Promise<FAQ[]> {
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching FAQs:', error);
        return [];
    }
    return data || [];
}

export async function deleteFAQ(id: string): Promise<boolean> {
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) {
        console.error('Error deleting FAQ:', error);
        return false;
    }
    return true;
}

// ===== ORDERS =====
export async function createOrder(orderData: CreateOrderInput): Promise<{ success: boolean; orderId?: string; error?: string }> {
    // Get current user session
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'User harus login terlebih dahulu untuk melakukan pembayaran.' };
    }

    const { data, error } = await supabase
        .from('orders')
        .insert([{
            user_id: user.id, // Include user_id for RLS
            customer_name: orderData.customer_name,
            customer_email: orderData.customer_email,
            customer_phone: orderData.customer_phone,
            tier_selected: orderData.tier_selected,
            payment_method: orderData.payment_method,
            proof_url: orderData.proof_url,
            slug: orderData.slug,
        }])
        .select('id')
        .single();

    if (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
    }

    return { success: true, orderId: data.id };
}

export async function getAllOrders(page: number = 0, limit: number = 20): Promise<{ data: Order[]; count: number }> {
    const from = page * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching orders:', error);
        return { data: [], count: 0 };
    }
    return { data: data || [], count: count || 0 };
}

export async function getPendingOrders(page: number = 0, limit: number = 20): Promise<{ data: Order[]; count: number }> {
    const from = page * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching pending orders:', error);
        return { data: [], count: 0 };
    }
    return { data: data || [], count: count || 0 };
}

export async function updateOrderStatus(orderId: string, status: 'paid' | 'rejected'): Promise<boolean> {
    // 1. Update Order Status
    const { data: order, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

    if (error) {
        console.error('Error updating order status:', error);
        return false;
    }

    // 2. If PAID, process logic
    if (status === 'paid' && order) {
        console.log('🔄 Processing paid order:', order.id, 'for user:', order.user_id);

        // A. Validate user_id exists
        if (!order.user_id) {
            console.error('❌ CRITICAL: Order', order.id, 'has no user_id! Cannot update tier.');
            return false;
        }

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
                maxChanges = 10; // More flexibility for exclusive
                slugSlots = 3;
                break;
            default:
                // Free or unknown
                maxChanges = 0;
                slugSlots = 1;
        }

        console.log(`📝 Updating user ${order.user_id} to tier: ${tier} (Slots: ${slugSlots}, Changes: ${maxChanges})`);

        const { error: profileError } = await supabase.from('profiles').update({
            tier: tier,
            max_slug_changes: maxChanges,
            slug_slots: slugSlots,
            updated_at: new Date().toISOString()
        }).eq('id', order.user_id);

        if (profileError) {
            console.error('❌ Failed to update profile tier:', profileError);
            return false;
        }

        console.log('✅ Successfully updated user tier to:', tier);

        // C. Update Existing Invitation Metadata (Extend Expiry & Set Tier)
        // Find invitation by user_id
        const { data: invitations } = await supabase
            .from('invitations')
            .select('id, metadata')
            .eq('user_id', order.user_id);

        if (invitations && invitations.length > 0) {
            // Update ALL invitations for this user (or just the primary one? For now update all to match tier)
            // Or usually user has 1 invitation.

            for (const inv of invitations) {
                const currentMeta = inv.metadata || {};
                const newMeta = {
                    ...currentMeta,
                    tier: tier,
                    // Basic/Premium: 1 Year active. Exclusive: Forever? Or longer.
                    // Let's set 1 year for all paid for now, or per config.
                    // If Exclusive, maybe set to 5 years.
                    expires_at: tier === 'exclusive'
                        ? new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString()
                        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                };

                await supabase.from('invitations').update({
                    metadata: newMeta
                }).eq('id', inv.id);
            }
            console.log(`✅ Updated metadata for ${invitations.length} invitations.`);
        }
    }

    return true;
}

export async function checkSlugAvailability(slug: string): Promise<boolean> {
    if (!slug || slug.length < 3) return false;
    const { data } = await supabase.from('invitations').select('id').eq('slug', slug).maybeSingle();
    return !data;
}

// ===== STORAGE =====
export async function uploadPaymentProof(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `proofs/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(filePath, file);

    if (uploadError) {
        console.error('Error uploading file:', uploadError);
        return { success: false, error: uploadError.message };
    }

    const { data } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };
}

export async function uploadSiteAsset(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    const fileExt = file.name.split('.').pop();
    const fileName = `asset-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file);

    if (uploadError) {
        console.error('Error uploading asset:', uploadError);
        return { success: false, error: uploadError.message };
    }

    const { data } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };
}
