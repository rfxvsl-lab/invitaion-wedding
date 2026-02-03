-- SAAS EXPANSION MIGRATION

-- 1. THEMES TABLE
CREATE TABLE IF NOT EXISTS themes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    thumbnail_url TEXT,
    preview_url TEXT,
    tier TEXT CHECK (tier IN ('free', 'basic', 'premium', 'exclusive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies for Themes
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Themes" ON themes FOR SELECT USING (true);
CREATE POLICY "Admin All Themes" ON themes USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

-- 2. FAQS TABLE
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies for FAQs
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read FAQs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Admin All FAQs" ON faqs USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id), -- Optional, if logged in
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    tier_selected TEXT NOT NULL,
    payment_method TEXT NOT NULL,
    proof_url TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies for Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- Public can insert (Checkout)
CREATE POLICY "Public Insert Orders" ON orders FOR INSERT WITH CHECK (true);
-- Users can view their own orders
CREATE POLICY "Users View Own Orders" ON orders FOR SELECT USING (auth.uid() = user_id);
-- Admin can view/update all
CREATE POLICY "Admin Manage Orders" ON orders USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');


-- 4. STORAGE FOR PAYMENT PROOFS
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Anyone can upload proof (for checkout)
CREATE POLICY "Public Upload Proofs" ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'payment-proofs' );

-- Admin can view proofs
CREATE POLICY "Admin View Proofs" ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-proofs' AND (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com') );

-- Also allow public read for now to simplify frontend 'success' page preview if needed, 
-- though ideally strict. Let's start with Public Read to avoid "Image not found" errors during verification demo.
CREATE POLICY "Public View Proofs" ON storage.objects FOR SELECT USING ( bucket_id = 'payment-proofs' );

-- 5. STORAGE FOR SITE ASSETS (QRIS, Logo, etc)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Assets" ON storage.objects FOR SELECT
USING ( bucket_id = 'site-assets' );

CREATE POLICY "Admin Upload Assets" ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'site-assets' AND (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com') );

