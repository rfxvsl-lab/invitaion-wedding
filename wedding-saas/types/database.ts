// Database Schema Types for SaaS Expansion

export interface Theme {
    id: string;
    name: string;
    slug: string;
    thumbnail_url: string | null;
    preview_url: string | null;
    tier: 'free' | 'basic' | 'premium' | 'exclusive';
    created_at: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    display_order: number;
    created_at: string;
}

export type OrderStatus = 'pending' | 'paid' | 'rejected';

export interface Order {
    id: string;
    user_id: string | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    tier_selected: string;
    payment_method: string;
    proof_url: string;
    slug?: string;
    details?: any; // To store extra info like couple names separate from customer_name
}

export interface Order {
    id: string;
    user_id: string | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    tier_selected: string;
    payment_method: string;
    proof_url: string;
    status: OrderStatus;
    created_at: string;
    slug?: string;
}

export interface CreateOrderInput {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    tier_selected: string;
    payment_method: string;
    proof_url: string;
    slug?: string;
}
