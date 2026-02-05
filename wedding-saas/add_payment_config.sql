-- Insert default payment configuration into site_content
INSERT INTO site_content (section, key, value) VALUES
-- Global Settings
('payment', 'payment_intro_title', 'Secure Checkout'),
('payment', 'payment_intro_desc', 'Selesaikan pembayaran untuk mengaktifkan undangan Anda.'),
('payment', 'payment_qris_image', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Commons_QR_code.png/150px-Commons_QR_code.png'),

-- Bank Accounts (Global)
('payment', 'payment_bank_bca', '1234567890 a.n PT Undangan Kita'),
('payment', 'payment_bank_mandiri', '0987654321 a.n PT Undangan Kita'),
('payment', 'payment_bank_bni', '1122334455 a.n PT Undangan Kita'),
('payment', 'payment_bank_bri', '5544332211 a.n PT Undangan Kita'),

-- Basic Tier
('payment', 'payment_price_basic', 'Rp 50.000'),
('payment', 'payment_original_price_basic', 'Rp 99.000'),
('payment', 'payment_features_basic', 'Undangan Digital,Masa Aktif 6 Bulan,Maks 500 Tamu,Tema Basic'),

-- Premium Tier
('payment', 'payment_price_premium', 'Rp 100.000'),
('payment', 'payment_original_price_premium', 'Rp 199.000'),
('payment', 'payment_features_premium', 'Fitur Basic +,Masa Aktif 1 Tahun,Unlimited Tamu,Musik Latar,RSVP & Ucapan,Galeri Foto'),

-- Exclusive Tier
('payment', 'payment_price_exclusive', 'Rp 150.000'),
('payment', 'payment_original_price_exclusive', 'Rp 299.000'),
('payment', 'payment_features_exclusive', 'Fitur Premium +,Masa Aktif Selamanya,Prioritas Support,Custom Domain,Hapus Watermark')

ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
