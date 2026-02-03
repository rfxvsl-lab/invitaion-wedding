-- CHECK AND SEED SITE CONTENT
-- Ensure site_content has data, otherwise the homepage will look default/empty.

-- 1. Hero Content
INSERT INTO public.site_content (key, value)
VALUES 
    ('hero_title', 'Undangan Pernikahan Impian Anda'),
    ('hero_subtitle', 'Buat undangan digital elegan dengan mudah dan cepat. Tersedia berbagai tema premium untuk momen spesial Anda.'),
    ('hero_cta_primary', 'Buat Sekarang'),
    ('hero_cta_secondary', 'Lihat Tema'),
    ('features_title', 'Kenapa Memilih Kami?'),
    ('feature_1_title', 'Desain Responsif'),
    ('feature_1_desc', 'Tampil sempurna di semua perangkat smartphone dan desktop.'),
    ('feature_2_title', 'Musik Latar'),
    ('feature_2_desc', 'Tambahkan lagu romantis favorit Anda.'),
    ('feature_3_title', 'Amplop Digital'),
    ('feature_3_desc', 'Terima hadiah pernikahan via QRIS atau Transfer Bank.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. Verify Themes Exist (at least one)
INSERT INTO public.themes (name, slug, thumbnail_url, tier, preview_url)
SELECT 'Modern Architecture', 'modern-arch', 'https://images.unsplash.com/photo-1605218427368-35b86d9a9249', 'free', '#'
WHERE NOT EXISTS (SELECT 1 FROM public.themes);

-- 3. Verify FAQs Exist
INSERT INTO public.faqs (question, answer, display_order)
VALUES ('Apakah ada masa aktifnya?', 'Undangan aktif selama 12 bulan sejak pembuatan.', 1)
ON CONFLICT DO NOTHING;
