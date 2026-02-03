-- FIX STORAGE BUCKETS
-- Jalankan script ini jika mengalami error "Bucket not found"

-- 1. Create 'site-assets' bucket (Untuk Logo, QRIS, dll)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Assets" ON storage.objects FOR SELECT
USING ( bucket_id = 'site-assets' );

CREATE POLICY "Admin Upload Assets" ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'site-assets' AND (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com') );

-- 2. Create 'payment-proofs' bucket (Untuk Bukti Transfer User)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Upload Proofs" ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'payment-proofs' );

CREATE POLICY "Admin View Proofs" ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-proofs' AND (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com') );
-- Allow public read for success page preview
CREATE POLICY "Public Read Proofs" ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-proofs' );


-- 3. Create 'invitations' bucket (Untuk Thumbnail Tema / Assets Undangan)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('invitations', 'invitations', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Invitations" ON storage.objects FOR SELECT
USING ( bucket_id = 'invitations' );

CREATE POLICY "Admin Upload Invitations" ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'invitations' AND (auth.role() = 'service_role' OR auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com') );
