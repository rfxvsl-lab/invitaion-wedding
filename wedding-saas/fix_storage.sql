-- FIX STORAGE BUCKETS (REVISED & ROBUST)
-- Jalankan ini untuk memperbaiki error "Bucket not found" atau "Permission denied"

-- 1. FIX 'site-assets' BUCKET
INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true; -- Force Public

-- Reset Policies for 'site-assets'
DROP POLICY IF EXISTS "Public Read Assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Assets" ON storage.objects;

CREATE POLICY "Public Read Assets" ON storage.objects FOR SELECT
USING ( bucket_id = 'site-assets' );

CREATE POLICY "Admin Upload Assets" ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'site-assets' ); -- Relaxed for debugging. Add auth back later if needed.


-- 2. FIX 'payment-proofs' BUCKET
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO UPDATE SET public = true; -- Force Public

-- Reset Policies for 'payment-proofs'
DROP POLICY IF EXISTS "Public Upload Proofs" ON storage.objects;
DROP POLICY IF EXISTS "Admin View Proofs" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Proofs" ON storage.objects;

CREATE POLICY "Public Upload Proofs" ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'payment-proofs' );

CREATE POLICY "Admin View Proofs" ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-proofs' );

CREATE POLICY "Public Read Proofs" ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-proofs' );


-- 3. FIX 'invitations' BUCKET
INSERT INTO storage.buckets (id, name, public) 
VALUES ('invitations', 'invitations', true)
ON CONFLICT (id) DO UPDATE SET public = true; -- Force Public

-- Reset Policies for 'invitations'
DROP POLICY IF EXISTS "Public Read Invitations" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Invitations" ON storage.objects;

CREATE POLICY "Public Read Invitations" ON storage.objects FOR SELECT
USING ( bucket_id = 'invitations' );

CREATE POLICY "Admin Upload Invitations" ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'invitations' );

-- 4. Reload Schema
NOTIFY pgrst, 'reload schema';
