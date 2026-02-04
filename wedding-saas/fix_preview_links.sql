-- FIX THEMES PREVIEW URLS
-- Updates all existing themes to use the correct dynamic preview URL format.
-- Prevents "refresh/bounce" behavior caused by empty URLs.

UPDATE public.themes
SET preview_url = '/preview/' || slug
WHERE preview_url IS NULL 
   OR preview_url = '' 
   OR preview_url = '#'
   OR preview_url = 'https://example.com';

-- Also insert default if empty (Safety Net)
INSERT INTO public.themes (name, slug, thumbnail_url, tier, preview_url)
SELECT 'Modern Architecture', 'modern-arch', 'https://images.unsplash.com/photo-1605218427368-35b86d9a9249', 'free', '/preview/modern-arch'
WHERE NOT EXISTS (SELECT 1 FROM public.themes);
