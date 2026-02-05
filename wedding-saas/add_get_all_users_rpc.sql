-- Function to get all users, bypassing RLS (God Mode)
-- Only allows execution if the caller is the specific admin email.

CREATE OR REPLACE FUNCTION get_all_users()
RETURNS SETOF profiles
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the user is the admin (Double security)
  IF auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com' THEN
    RETURN QUERY SELECT * FROM profiles ORDER BY created_at DESC;
  ELSE
    -- If not admin, return empty or raise error
    RAISE EXCEPTION 'Access Denied: Admin Only';
  END IF;
END;
$$;
