
-- Add new columns for advanced testimonials
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS template_name TEXT,
ADD COLUMN IF NOT EXISTS image_base64 TEXT;

-- Enable RLS (if not already)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can View Approved Testimonials (assuming we might want approval workflow later, but for now Public View)
DROP POLICY IF EXISTS "Public can view testimonials" ON testimonials;
CREATE POLICY "Public can view testimonials" ON testimonials
FOR SELECT USING (true);

-- Policy: Authenticated Users can Insert their own testimonial
DROP POLICY IF EXISTS "Users can create testimonials" ON testimonials;
CREATE POLICY "Users can create testimonials" ON testimonials
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admin can do everything (already covered generally, but explicit is good)
-- (Admin logic usually handled by service_role or specific admin policies, sticking to public for now)
