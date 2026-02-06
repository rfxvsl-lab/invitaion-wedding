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

-- KONFIRMASI
-- Setelah dijalankan, query 'select' dengan 'order by created_at' akan jauh lebih cepat.
