
-- Disable RLS temporarily to avoid lock issues during policy drop (optional but safe)
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- DROP ALL KNOWN DUPLICATE POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users Select Own Profile" ON profiles;
DROP POLICY IF EXISTS "Allow All Select" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
DROP POLICY IF EXISTS "Users Update Own Profile" ON profiles;

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users Insert Own Profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles; -- duplicate name check

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;


-- RE-ENABLE RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RE-CREATE STANDARD POLICIES (CLEAN SET)

-- 1. VIEW: Users can see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- 2. UPDATE: Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 3. INSERT: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 4. ADMIN VIEW: Admins can see all
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    auth.jwt() ->> 'email' IN ('mhmmadridho64@gmail.com', 'undangankita.co.id@gmail.com')
  );
