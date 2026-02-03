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
    const { data, error } = await supabase
        .from('orders')
        .insert([{
            customer_name: orderData.customer_name,
            customer_email: orderData.customer_email,
            customer_phone: orderData.customer_phone,
            tier_selected: orderData.tier_selected,
            payment_method: orderData.payment_method,
            proof_url: orderData.proof_url,
            slug: orderData.slug,
            // Store raw details if needed, for now just flattened or standard columns
        }])
        .select('id')
        .single();

    if (error) {
        console.error('Error creating order:', error);
        return { success: false, error: error.message };
    }

    return { success: true, orderId: data.id };
}

export async function getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
    return data || [];
}

export async function getPendingOrders(): Promise<Order[]> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching pending orders:', error);
        return [];
    }
    return data || [];
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
        // A. Update User Profile (Tier)
        if (order.user_id) {
            await supabase.from('profiles').update({
                tier: order.tier_selected
            }).eq('id', order.user_id);
        }

        // B. Create Invitation Record (if slug exists)
        if (order.slug) {
            // Define defaults first
            const defaultThemes: Record<string, string> = {
                'free': 'modern-arch',
                'basic': 'dark-luxury',
                'premium': 'elegant-vanilla',
                'exclusive': 'royal-arabian'
            };

            // Check if slug taken by another user
            const { data: existing } = await supabase
                .from('invitations')
                .select('id, user_id')
                .eq('slug', order.slug)
                .single();

            if (existing && existing.user_id !== order.user_id) {
                // Conflict: Slug Taken by someone else
                // We could append a random string or just fail silently/log it
                // For safety, let's append a random number
                const newSlug = `${order.slug}-${Math.floor(Math.random() * 1000)}`;
                // Recursively insert with new slug or just try once
                await supabase.from('invitations').insert({
                    slug: newSlug,
                    user_id: order.user_id,
                    metadata: {
                        theme_id: defaultThemes[order.tier_selected] || 'modern-arch',
                        tier: order.tier_selected,
                        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                    },
                    content: {
                        hero: {
                            title: "The Wedding Of",
                            nicknames: order.customer_name.split(' ')[0] + " & Partner",
                        },
                        couple: {
                            groom: { name: "Nama Pria", father: "Nama Ayah", mother: "Nama Ibu" },
                            bride: { name: "Nama Wanita", father: "Nama Ayah", mother: "Nama Ibu" }
                        }
                    }
                });
            } else {
                // Safe to Insert or Update (if same user)
                await supabase.from('invitations').upsert({
                    slug: order.slug,
                    user_id: order.user_id,
                    metadata: {
                        theme_id: defaultThemes[order.tier_selected] || 'modern-arch',
                        tier: order.tier_selected,
                        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                    },
                    content: {
                        hero: {
                            title: "The Wedding Of",
                            nicknames: order.customer_name.split(' ')[0] + " & Partner",
                        },
                        couple: {
                            groom: { name: "Nama Pria", father: "Nama Ayah", mother: "Nama Ibu" },
                            bride: { name: "Nama Wanita", father: "Nama Ayah", mother: "Nama Ibu" }
                        }
                    }
                }, { onConflict: 'slug' });
            }
        }
    }

    return true;
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
