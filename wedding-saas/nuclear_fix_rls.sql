-- NUCLEAR OPTION: FIX RLS BY ALLOWING ALL READS
-- Use this if the specific Admin policy isn't working.
-- This allows ANY logged-in user to see the list of profiles.

-- 1. Reset Policies
DROP POLICY IF EXISTS "Admin Select All Profiles" ON profiles;
DROP POLICY IF EXISTS "Admin View All Profiles" ON profiles;
DROP POLICY IF EXISTS "Users View Own Profile" ON profiles;
DROP POLICY IF EXISTS "Allow All Select" ON profiles;

-- 2. NUCLEAR POLICY: Allow ALL Authenticated Users to Select (Read) Profiles
-- This guarantees that if you are logged in, you can see the data.
CREATE POLICY "Allow All Select" ON profiles
    FOR SELECT
    TO authenticated
    USING (true);

-- 3. Verify RLS is on (it should be, but this policy makes it permissive for SELECT)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
