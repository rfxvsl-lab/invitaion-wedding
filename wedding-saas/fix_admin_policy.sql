
-- Drop existing admin policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Re-create with potentially more robust check (or just correct syntax)
-- Ensure we check for both emails and handle potential formatting issues
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    lower(auth.jwt() ->> 'email') IN ('mhmmadridho64@gmail.com', 'undangankita.co.id@gmail.com')
  );
