-- Insert default payment configuration into site_content
INSERT INTO site_content (section, key, value) VALUES
('payment', 'payment_intro_title', 'Secure Checkout'),
('payment', 'payment_intro_desc', 'Selesaikan pembayaran untuk mengaktifkan undangan Anda.'),
('payment', 'payment_price_basic', 'Rp 50.000'),
('payment', 'payment_price_premium', 'Rp 100.000'),
('payment', 'payment_price_exclusive', 'Rp 150.000'),
('payment', 'payment_qris_image', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Commons_QR_code.png/150px-Commons_QR_code.png'),
('payment', 'payment_bank_bca', '1234567890 a.n PT Undangan Kita'),
('payment', 'payment_bank_mandiri', '0987654321 a.n PT Undangan Kita'),
('payment', 'payment_bank_bni', '1122334455 a.n PT Undangan Kita'),
('payment', 'payment_bank_bri', '5544332211 a.n PT Undangan Kita')
ON CONFLICT (key) DO NOTHING;
