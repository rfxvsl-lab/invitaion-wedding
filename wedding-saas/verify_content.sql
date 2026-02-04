-- CHECK AND SEED SITE CONTENT (COMPLETE VERSION WITH PRICING)
-- Ensures all CMS fields used in pages/index.tsx AND pages/pricing.tsx are present.

-- 1. Insert/Update Keys
INSERT INTO public.site_content (key, value, section)
VALUES 
    -- Hero Section
    ('hero_badge', '#1 Platform Undangan Digital', 'hero'),
    ('hero_title', 'Bagikan Momen Bahagiamu dengan Elegan.', 'hero'),
    ('hero_subtitle', 'Buat undangan pernikahan digital yang memukau dalam hitungan menit. Fitur lengkap, desain premium, dan integrasi pembayaran hadiah cashless.', 'hero'),
    ('hero_cta_primary', 'Buat Undangan Sekarang', 'hero'),
    ('hero_cta_secondary', 'Lihat Tema', 'hero'),
    ('hero_image', 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80', 'hero'),

    -- Features Section
    ('features_badge', 'Kenapa Kami?', 'features'),
    ('features_title', 'Fitur Terlengkap', 'features'),
    ('feature_1_title', 'Desain Responsif', 'features'),
    ('feature_1_desc', 'Tampil sempurna di semua perangkat smartphone dan desktop.', 'features'),
    ('feature_2_title', 'Musik Latar', 'features'),
    ('feature_2_desc', 'Musik romantis mengiringi undangan Anda.', 'features'),
    ('feature_3_title', 'Digital Gift', 'features'),
    ('feature_3_desc', 'Terima angpao cashless dengan mudah.', 'features'),

    -- PRICING SECTION (New)
    ('pricing_title', 'Pilihan Paket Hemat', 'pricing'),
    ('pricing_desc', 'Tanpa biaya bulanan. Bayar sekali, aktif selamanya.', 'pricing'),

    -- Basic Package
    ('pricing_1_name', 'Basic', 'pricing'),
    ('pricing_1_price', 'Rp 50.000', 'pricing'),
    ('pricing_1_full', 'Rp 99.000', 'pricing'),
    ('pricing_1_desc', '100 Tamu, 3 Pilihan Tema, Music Auto Play, Masa Aktif 3 Bulan', 'pricing'),

    -- Premium Package
    ('pricing_2_name', 'Premium', 'pricing'),
    ('pricing_2_price', 'Rp 100.000', 'pricing'),
    ('pricing_2_full', 'Rp 149.000', 'pricing'),
    ('pricing_2_desc', 'Tamu Tak Terbatas, Semua Tema Premium, Digital Envelope, Masa Aktif Selamanya', 'pricing'),

    -- Exclusive Package
    ('pricing_3_name', 'Exclusive', 'pricing'),
    ('pricing_3_price', 'Rp 150.000', 'pricing'),
    ('pricing_3_full', 'Rp 299.000', 'pricing'),
    ('pricing_3_desc', 'Custom Domain (.com), Prioritas Support, Hapus Watermark, Video Invitation', 'pricing')

ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value,
    section = EXCLUDED.section;

-- 2. Verify Themes Exist (at least one)
INSERT INTO public.themes (name, slug, thumbnail_url, tier, preview_url)
SELECT 'Modern Architecture', 'modern-arch', 'https://images.unsplash.com/photo-1605218427368-35b86d9a9249', 'free', '#'
WHERE NOT EXISTS (SELECT 1 FROM public.themes);

-- 3. Verify FAQs Exist
INSERT INTO public.faqs (question, answer, display_order)
VALUES 
    ('Apakah ada masa aktifnya?', 'Undangan aktif selama 12 bulan sejak pembuatan.', 1),
    ('Bagaimana cara edit?', 'Anda bisa edit kapan saja lewat dashboard.', 2)
ON CONFLICT DO NOTHING;
