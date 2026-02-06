-- OPTIMISASI DATABASE SUPABASE
-- Salin dan jalankan kode ini di SQL Editor pada Dashboard Supabase Anda.

-- 1. Index untuk Orders (Mempercepat sorting & filter)
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- 2. Index untuk Profiles/Users (Mempercepat sorting)
CREATE INDEX IF NOT EXISTS idx_users_updated_at ON profiles(updated_at);

-- 3. Index untuk Invitations (Mempercepat load dashboard user)
CREATE INDEX IF NOT EXISTS idx_invitations_user_id ON invitations(user_id);

-- Optional: Index untuk pencarian slug (agar cek ketersediaan link cepat)
CREATE INDEX IF NOT EXISTS idx_invitations_slug ON invitations(slug);


-- 4. STORAGE BUCKETS (Agar tidak perlu buat manual)
-- Masukkan bucket ke tabel system Supabase
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('site-assets', 'site-assets', true),
  ('music', 'music', true),
  ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- 5. STORAGE POLICIES (Agar User bisa Upload & Lihat)
-- Hapus policy lama jika ada untuk menghindari error "already exists"
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "User Upload" ON storage.objects;

-- Policy: Semua orang bisa melihat (Public Read)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT
USING ( bucket_id IN ('site-assets', 'music', 'videos') );

-- Policy: User yang login bisa upload (Authenticated Upload)
CREATE POLICY "User Upload" ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('site-assets', 'music', 'videos') 
  AND auth.role() = 'authenticated'
);

-- KONFIRMASI
-- Setelah dijalankan, query 'select' dengan 'order by created_at' akan jauh lebih cepat.
-- Dan bucket storage akan otomatis muncul.
