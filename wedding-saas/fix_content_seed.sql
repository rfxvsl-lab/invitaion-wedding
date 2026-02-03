-- FIX CMS CONTENT SEED
-- Jalankan script ini untuk mengisi konten awal Frontend (Homepage)
-- Ini akan memperbaiki masalah "Site Content Belum Muncul"

INSERT INTO site_content (key, value) VALUES
-- Hero Section
('hero_badge', '#1 Platform Undangan Digital'),
('hero_title', 'Bagikan Momen Bahagiamu dengan Elegan.'),
('hero_subtitle', 'Buat undangan pernikahan digital yang memukau dalam hitungan menit. Fitur lengkap, desain premium, dan integrasi pembayaran hadiah cashless.'),
('hero_cta_primary', 'Buat Undangan Sekarang'),
('hero_cta_secondary', 'Lihat Tema'),
('hero_image', 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80'),

-- Features Section
('features_badge', 'Kenapa Kami?'),
('features_title', 'Fitur Terlengkap'),
('feature_1_title', 'Responsive'),
('feature_1_desc', 'Tampilan sempurna di semua layar HP & Desktop.'),
('feature_2_title', 'Audio Latar'),
('feature_2_desc', 'Musik romantis mengiringi undangan Anda.'),
('feature_3_title', 'Digital Gift'),
('feature_3_desc', 'Terima angpao cashless dengan mudah.')

ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;

-- Refresh Cache just in case
NOTIFY pgrst, 'reload schema';
