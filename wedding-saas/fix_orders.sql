-- FIX MISSING COLUMNS & TABLES (REVISED)
-- Jalankan ulang script ini. Script ini aman dijalankan berkali-kali.

-- 1. Tambahkan kolom ke tabel Orders (Jika belum ada)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS details JSONB;

-- 2. Pastikan Tabel Invitations Ada & Lengkap
CREATE TABLE IF NOT EXISTS invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tambahkan kolom satu per satu (untuk jaga-jaga jika tabel sudah ada tapi tidak lengkap)
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '{}'::jsonb;

-- Pastikan Slug Unique (jika belum)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'invitations_slug_key') THEN
        ALTER TABLE invitations ADD CONSTRAINT invitations_slug_key UNIQUE (slug);
    END IF;
END $$;

-- 3. Policies for Invitations (Hapus yang lama dulu biar bersih)
DROP POLICY IF EXISTS "Users Manage Own Invitation" ON invitations;
DROP POLICY IF EXISTS "Public Read Invitations" ON invitations;

ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Invitations" ON invitations FOR SELECT USING (true);
CREATE POLICY "Users Manage Own Invitation" ON invitations USING (auth.uid() = user_id);

-- 4. Reload Schema Cache (Supabase specific)
NOTIFY pgrst, 'reload schema';
