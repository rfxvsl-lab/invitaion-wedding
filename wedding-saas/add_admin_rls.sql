-- Enable RLS on profiles if not already enabled (usually it is)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow admin to SELECT all rows
-- Replace 'mhmmadridho64@gmail.com' with your actual admin email if different, 
-- but this matches the hardcoded one in your code.
CREATE POLICY "Admin Access All Profiles"
ON profiles
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com'
);

-- Note: Ensure that your standard user policy (e.g., "Users can see own profile") 
-- does not conflict. Supabase policies are "OR" by default, so adding this 
-- grants additional access to the admin without breaking existing access.
