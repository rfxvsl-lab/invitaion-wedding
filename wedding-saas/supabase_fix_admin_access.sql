-- ============================================
-- FIX ADMIN ACCESS - CORRECT COLUMN NAMES
-- ============================================

-- Step 1: Check current admin data using phone/name
SELECT * FROM profiles 
WHERE full_name ILIKE '%ridho%' 
   OR full_name ILIKE '%admin%';

-- Step 2: Update admin user to 'exclusive' plan
-- (Ganti 'Ridho Febriyansyah' atau ID yang sesuai)
UPDATE profiles 
SET 
  subscription_plan = 'exclusive',
  updated_at = NOW()
WHERE full_name = 'Ridho Febriyansyah';
-- Atau kalau tahu ID-nya:
-- WHERE id = '91e9d245-b528-b1ff-33238-...';

-- Step 3: Verify update
SELECT id, full_name, phone_number, subscription_plan 
FROM profiles 
WHERE subscription_plan = 'exclusive';

-- Step 4 (OPTIONAL): Add tokens column if needed
-- Uncomment kalau mau add column tokens:
-- ALTER TABLE profiles ADD COLUMN tokens INTEGER DEFAULT 5;
-- UPDATE profiles SET tokens = 999999 WHERE subscription_plan = 'exclusive';
