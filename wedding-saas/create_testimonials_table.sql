-- Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Pengantin', -- e.g. "Pengantin", "Partner", etc.
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    avatar_url TEXT, -- We can use ui-avatars.com if empty
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow read access to everyone (public)
CREATE POLICY "Public can view testimonials" ON testimonials
    FOR SELECT USING (true);

-- Allow full access to admins/service role (assuming checks are done in app or strict admin emails)
-- For simplicity in this project, we might just allow authenticated users to view/edit if they are admin,
-- but typically we want stricter RLS. For now, let's allow authenticated users to CRUD if they are the hardcoded admin.
-- Or just "Authenticated can insert/update/delete" but we'll trust the app logic for now given previous patterns.

CREATE POLICY "Admins can manage testimonials" ON testimonials
    FOR ALL
    USING (auth.email() IN ('mhmmadridho64@gmail.com', 'undangankita.co.id@gmail.com'));
