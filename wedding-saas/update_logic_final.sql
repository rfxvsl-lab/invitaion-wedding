-- 1. UPDATE USER PROFILES SCHEMA --
-- Menambahkan kolom yang dibutuhkan untuk logika bisnis baru
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS tokens INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Pastikan constraints
ALTER TABLE profiles 
DROP CONSTRAINT IF EXISTS phone_length;

-- 2. RESET/INIT DATA (OPTIONAL - SAFE) --
-- Update data lama yang null agar memiliki nilai default
UPDATE profiles SET tier = 'free' WHERE tier IS NULL;
UPDATE profiles SET tokens = 5 WHERE tokens IS NULL;

-- 3. LOGIKA TOKENS --
-- Kita bisa menggunakan trigger atau handle di API application level. 
-- Untuk keamanan, RLS tetap diaktifkan.

-- 4. SITE CONTENT TABLE (Untuk CMS Frontend) --
CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TRIGGER UNTUK USER BARU OTOMATIS FREE + 5 TOKENS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, tier, tokens, email)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    'free',
    5,
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pastikan trigger tidak duplikat
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Seed Initial Content (Agar Frontend tidak error)
INSERT INTO site_content (key, value) VALUES
('hero_title', 'Bagikan Kebahagiaan Tanpa Batas'),
('hero_subtitle', 'Buat undangan pernikahan digital dalam hitungan menit.'),
('feature_1_title', 'Responsive Design'),
('feature_1_desc', 'Tampilan sempurna di semua perangkat.'),
('feature_2_title', 'Audio Latar'),
('feature_2_desc', 'Musik romantis mengiringi undangan Anda.')
ON CONFLICT (key) DO NOTHING;

-- 5. POLICIES UPDATE (Admin Access) --
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Admin Manage Content" ON site_content USING (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

-- 6. PASTIKAN ORDERS TABLE UPDATE --
ALTER TABLE orders ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS details JSONB;

-- 7. INVITATIONS TABLE (CONTENT SOURCE) --
CREATE TABLE IF NOT EXISTS invitations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    slug TEXT UNIQUE NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb, -- Store theme_id, expires_at
    content JSONB DEFAULT '{}'::jsonb, -- Store hero text, couple names, etc
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies if needed
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Invitations" ON invitations FOR SELECT USING (true);
CREATE POLICY "Users Manage Own Invitation" ON invitations USING (auth.uid() = user_id);

