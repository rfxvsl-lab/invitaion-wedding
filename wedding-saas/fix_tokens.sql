-- FIX TOKENS
-- Reset user tokens to default 5 (except Admin)
-- Jalankan ini untuk memperbaiki user yang tiba-tiba punya 999999 Token.

UPDATE profiles
SET tokens = 5
WHERE email IS DISTINCT FROM 'mhmmadridho64@gmail.com'
AND (tokens > 5 OR tokens IS NULL);

-- Pastikan default value di database benar
ALTER TABLE profiles ALTER COLUMN tokens SET DEFAULT 5;
