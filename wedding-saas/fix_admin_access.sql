-- FIX ADMIN ACCESS & RLS POLICIES
-- Run this script to ensure Admin can see all users.

-- 1. Grant Basic Permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- 2. Ensure RLS is Enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Users can view their own profile
DROP POLICY IF EXISTS "Users View Own Profile" ON public.profiles;
CREATE POLICY "Users View Own Profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- 4. Policy: Admin (mhmmadridho64@gmail.com) can view ALL profiles
-- We use a precise email check.
DROP POLICY IF EXISTS "Admin View All Profiles" ON public.profiles;
CREATE POLICY "Admin View All Profiles" ON public.profiles
FOR SELECT USING (
  (auth.jwt() ->> 'email') = 'mhmmadridho64@gmail.com' 
  OR 
  auth.role() = 'service_role'
);

-- 5. Policy: Allow Update for Own Profile
DROP POLICY IF EXISTS "Users Update Own Profile" ON public.profiles;
CREATE POLICY "Users Update Own Profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- 6. Policy: Allow Insert (for new users)
DROP POLICY IF EXISTS "Users Insert Own Profile" ON public.profiles;
CREATE POLICY "Users Insert Own Profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);
