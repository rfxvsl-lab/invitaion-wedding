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
        .insert([orderData])
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
    const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

    if (error) {
        console.error('Error updating order status:', error);
        return false;
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
