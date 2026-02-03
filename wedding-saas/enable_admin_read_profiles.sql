-- ENABLE ADMIN READ ACCESS ON PROFILES
-- Allows standard SELECT for authenticated users (or restrict to Admin if preferred)
-- Currently, profiles might not be readable by everyone.
-- Let's enable read for everyone (public profiles) or at least for the Admin.

-- Policy: Admin can Read All Profiles
DROP POLICY IF EXISTS "Admin Select All Profiles" ON profiles;
CREATE POLICY "Admin Select All Profiles" ON profiles
    FOR SELECT
    USING (auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

-- Policy: Users can Read Own Profile (Usually exists, but good to ensure)
DROP POLICY IF EXISTS "Users Select Own Profile" ON profiles;
CREATE POLICY "Users Select Own Profile" ON profiles
    FOR SELECT
    USING (auth.uid() = id);
