-- FINAL REPAIR SCRIPT (SAFETY FIRST) - UPDATED VERSION
-- Script ini AMAN dijalankan berkali-kali. 
-- Ini akan memperbaiki tabel, kolom, penyimpanan, dan permission untuk SEMUA FITUR.

-- ==========================================
-- 1. FIX TABLES & COLUMNS
-- ==========================================

-- PROFILES
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'free';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tokens INTEGER DEFAULT 5;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS phone_length;

-- ORDERS
ALTER TABLE orders ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS details JSONB;

-- THEMES
CREATE TABLE IF NOT EXISTS themes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    thumbnail_url TEXT,
    preview_url TEXT,
    tier TEXT CHECK (tier IN ('free', 'basic', 'premium', 'exclusive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- FAQS
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INVITATIONS
CREATE TABLE IF NOT EXISTS invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '{}'::jsonb;

-- Ensure Slug Unique for Invitations
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'invitations_slug_key') THEN
        ALTER TABLE invitations ADD CONSTRAINT invitations_slug_key UNIQUE (slug);
    END IF;
END $$;

-- SITE_CONTENT
CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 2. FIX STORAGE BUCKETS (Force Public)
-- ==========================================
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true) ON CONFLICT (id) DO UPDATE SET public = true;
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-proofs', 'payment-proofs', true) ON CONFLICT (id) DO UPDATE SET public = true;
INSERT INTO storage.buckets (id, name, public) VALUES ('invitations', 'invitations', true) ON CONFLICT (id) DO UPDATE SET public = true;


-- ==========================================
-- 3. FIX POLICIES (DROP First to Avoid Errors)
-- ==========================================

-- THEMES Policies
DROP POLICY IF EXISTS "Public Read Themes" ON themes;
DROP POLICY IF EXISTS "Admin All Themes" ON themes;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Themes" ON themes FOR SELECT USING (true);
CREATE POLICY "Admin All Themes" ON themes USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

-- FAQS Policies
DROP POLICY IF EXISTS "Public Read FAQs" ON faqs;
DROP POLICY IF EXISTS "Admin All FAQs" ON faqs;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read FAQs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Admin All FAQs" ON faqs USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

-- INVITATIONS Policies
DROP POLICY IF EXISTS "Public Read Invitations" ON invitations;
DROP POLICY IF EXISTS "Users Manage Own Invitation" ON invitations;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Invitations" ON invitations FOR SELECT USING (true);
CREATE POLICY "Users Manage Own Invitation" ON invitations USING (auth.uid() = user_id);

-- ORDERS Policies
DROP POLICY IF EXISTS "Public Insert Orders" ON orders;
DROP POLICY IF EXISTS "Users View Own Orders" ON orders;
DROP POLICY IF EXISTS "Admin Manage Orders" ON orders;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users View Own Orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin Manage Orders" ON orders USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

-- SITE_CONTENT Policies
DROP POLICY IF EXISTS "Public Read Content" ON site_content;
DROP POLICY IF EXISTS "Admin Manage Content" ON site_content;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Admin Manage Content" ON site_content USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

-- STORAGE Policies
DROP POLICY IF EXISTS "Public Read Assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Assets" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Proofs" ON storage.objects;
DROP POLICY IF EXISTS "Admin View Proofs" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Proofs" ON storage.objects;
DROP POLICY IF EXISTS "Public View Proofs" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Invitations" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Invitations" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Invitations Storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Invitations Storage" ON storage.objects;

-- Re-create Storage Policies
-- site-assets
CREATE POLICY "Public Read Assets" ON storage.objects FOR SELECT USING ( bucket_id = 'site-assets' );
CREATE POLICY "Admin Upload Assets" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'site-assets' );

-- payment-proofs
CREATE POLICY "Public Upload Proofs" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'payment-proofs' );
CREATE POLICY "Admin View Proofs" ON storage.objects FOR SELECT USING ( bucket_id = 'payment-proofs' );
CREATE POLICY "Public Read Proofs" ON storage.objects FOR SELECT USING ( bucket_id = 'payment-proofs' );

-- invitations (Assets)
CREATE POLICY "Public Read Invitations Storage" ON storage.objects FOR SELECT USING ( bucket_id = 'invitations' );
CREATE POLICY "Admin Upload Invitations Storage" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'invitations' );

-- ==========================================
-- 4. REFRESH CACHE
-- ==========================================
NOTIFY pgrst, 'reload schema';
