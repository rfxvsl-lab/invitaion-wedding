-- FIX LOGIC FINAL (ADMIN EXCLUSIVE & TOKEN RULES)
-- 1. SET ADMIN TO EXCLUSIVE & UNLIMITED (Logic handled in App, but set DB state too)
UPDATE profiles 
SET tier = 'exclusive', tokens = 999999 
WHERE email = 'mhmmadridho64@gmail.com';

-- 2. RESET REGULAR USERS TO FREE & 5 TOKENS
UPDATE profiles 
SET tier = 'free', tokens = 5 
WHERE email IS DISTINCT FROM 'mhmmadridho64@gmail.com' 
AND (tier IS NULL OR tier = 'free');

-- 3. ENSURE INVITATIONS TABLE EXISTS & CORRECT
create table if not exists invitations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  slug text unique not null,
  metadata jsonb default '{}'::jsonb,
  content jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. POLICIES UPDATED FOR EDITOR ACCESS
-- Allow Users to SELECT their own invitation
drop policy if exists "Users Select Own Invitation" on invitations;
create policy "Users Select Own Invitation" on invitations for select using (auth.uid() = user_id);

-- Allow Users to UPDATE their own invitation
drop policy if exists "Users Update Own Invitation" on invitations;
create policy "Users Update Own Invitation" on invitations for update using (auth.uid() = user_id);

-- Allow Users to INSERT their own invitation
drop policy if exists "Users Insert Own Invitation" on invitations;
create policy "Users Insert Own Invitation" on invitations for insert with check (auth.uid() = user_id);

-- Allow Public to READ invitations (for Guests view)
drop policy if exists "Public Read Invitations" on invitations;
create policy "Public Read Invitations" on invitations for select using (true);


-- 5. TRIGGER FOR NEW USER -> FREE TIER & 5 TOKENS
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email, tier, tokens)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    new.email,
    CASE WHEN new.email = 'mhmmadridho64@gmail.com' THEN 'exclusive' ELSE 'free' END,
    CASE WHEN new.email = 'mhmmadridho64@gmail.com' THEN 999999 ELSE 5 END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RECREATE TRIGGER
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- REFRESH
NOTIFY pgrst, 'reload schema';
