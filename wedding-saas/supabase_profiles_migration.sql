-- Create profiles table for user subscription management
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text,
  subscription_tier text DEFAULT 'free',
  tokens integer DEFAULT 5,
  active_until timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile  
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Allow public insert for new user signup
CREATE POLICY "Allow insert on signup"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, subscription_tier, tokens)
  VALUES (
    new.id,
    new.email,
    'free',
    5
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Manually create profile for existing admin user (if not exists)
INSERT INTO profiles (id, email, subscription_tier, tokens)
SELECT 
  id,
  email,
  'exclusive' AS subscription_tier,
  999999 AS tokens
FROM auth.users
WHERE email = 'mhmmadridho64@gmail.com'
ON CONFLICT (id) DO UPDATE 
SET 
  subscription_tier = 'exclusive',
  tokens = 999999;
