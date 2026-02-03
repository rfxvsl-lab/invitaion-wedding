-- FIX CMS & SITE CONTENT ACCESS
-- Ensure Admin can edit site content and everyone can read it.

-- 1. Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- 2. SITE CONTENT POLICIES
-- Everyone can read site content (Homepage needs this)
DROP POLICY IF EXISTS "Public Read Site Content" ON public.site_content;
CREATE POLICY "Public Read Site Content" ON public.site_content
FOR SELECT USING (true);

-- Admin can Insert/Update/Delete
DROP POLICY IF EXISTS "Admin Manage Site Content" ON public.site_content;
CREATE POLICY "Admin Manage Site Content" ON public.site_content
FOR ALL USING ((auth.jwt() ->> 'email') = 'mhmmadridho64@gmail.com');

-- 3. THEMES POLICIES
DROP POLICY IF EXISTS "Public Read Themes" ON public.themes;
CREATE POLICY "Public Read Themes" ON public.themes
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Manage Themes" ON public.themes;
CREATE POLICY "Admin Manage Themes" ON public.themes
FOR ALL USING ((auth.jwt() ->> 'email') = 'mhmmadridho64@gmail.com');

-- 4. FAQS POLICIES
DROP POLICY IF EXISTS "Public Read FAQs" ON public.faqs;
CREATE POLICY "Public Read FAQs" ON public.faqs
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Manage FAQs" ON public.faqs;
CREATE POLICY "Admin Manage FAQs" ON public.faqs
FOR ALL USING ((auth.jwt() ->> 'email') = 'mhmmadridho64@gmail.com');
