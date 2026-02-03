-- 1. Buat tabel invitations jika belum ada
CREATE TABLE IF NOT EXISTS invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Pastikan kolom updated_at ada (jika tabel sudah ada sebelumnya tapi tanpa kolom ini)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invitations' AND column_name = 'updated_at') THEN
        ALTER TABLE invitations ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());
    END IF;
END $$;

-- 3. Aktifkan Row Level Security (RLS) - Penting untuk keamanan, tapi kita buka aksesnya dulu agar bisa save
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- 4. Buat policy agar Publik (siapapun) bisa membaca data (SELECT)
CREATE POLICY "Public Read Access" 
ON invitations FOR SELECT 
USING (true);

-- 5. Buat policy agar Publik bisa menyimpan/update data (INSERT/UPDATE)
-- PERINGATAN: Ini membuat database terbuka untuk ditulis siapa saja.
-- Idealnya harus pakai autentikasi (Auth). Namun untuk tahap awal/demo ini oke.
CREATE POLICY "Public Insert Access" 
ON invitations FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public Update Access" 
ON invitations FOR UPDATE 
USING (true);

-- 6. Setup Storage Bucket untuk Upload Gambar (Jika fitur upload dipakai)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('invitations', 'invitations', true)
ON CONFLICT (id) DO NOTHING;

-- Policy untuk Storage (Upload & Read Public)
CREATE POLICY "Public Storage Read"
ON storage.objects FOR SELECT
USING ( bucket_id = 'invitations' );

CREATE POLICY "Public Storage Insert"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'invitations' );
