-- Tambahan konten untuk Footer Lengkap
INSERT INTO site_content (key, value, section) VALUES
('footer_menu_title', 'Menu', 'footer'),
('footer_legal_title', 'Legal', 'footer'),
('footer_contact_title', 'Hubungi Kami', 'footer'),
('contact_wa', '+62 812 3456 7890', 'footer'),
('contact_email', 'hello@undangankita.com', 'footer'),
('footer_bottom_right', 'Made with ❤️ in Indonesia.', 'footer')
ON CONFLICT (key) DO NOTHING;
