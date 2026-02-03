-- BACKFILL MISSING PROFILES
-- Matches every user in auth.users that does NOT have a row in public.profiles
-- and inserts a default 'Free' profile for them.

INSERT INTO public.profiles (id, email, full_name, tier, tokens, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', 'User ' || substr(au.id::text, 1, 4)),
    CASE WHEN au.email = 'mhmmadridho64@gmail.com' THEN 'exclusive' ELSE 'free' END,
    CASE WHEN au.email = 'mhmmadridho64@gmail.com' THEN 999999 ELSE 5 END,
    now(),
    now()
FROM auth.users au
LEFT JOIN public.profiles pp ON au.id = pp.id
WHERE pp.id IS NULL;

-- Also Ensure Admin is definitely Exclusive (Idempotent)
UPDATE public.profiles
SET tier = 'exclusive', tokens = 999999
WHERE email = 'mhmmadridho64@gmail.com';
