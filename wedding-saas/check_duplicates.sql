
-- SUMMARY REPORT: Check for Duplicates in All Tables

-- 1. PROFILES (Check ID and Email uniqueness)
SELECT 'profiles' as table_name, 
       count(*) as total_rows, 
       count(distinct id) as unique_ids, 
       count(distinct email) as unique_emails 
FROM profiles;

-- 2. INVITATIONS (Check ID and Slug uniqueness)
SELECT 'invitations' as table_name, 
       count(*) as total_rows, 
       count(distinct id) as unique_ids, 
       count(distinct slug) as unique_slugs 
FROM invitations;

-- 3. THEMES (Check ID and Slug uniqueness)
SELECT 'themes' as table_name, 
       count(*) as total_rows, 
       count(distinct id) as unique_ids, 
       count(distinct slug) as unique_slugs 
FROM themes;

-- 4. ORDERS (Check ID uniqueness)
SELECT 'orders' as table_name, 
       count(*) as total_rows, 
       count(distinct id) as unique_ids 
FROM orders;

-- 5. SITE_CONTENT (Check Key uniqueness)
SELECT 'site_content' as table_name, 
       count(*) as total_rows, 
       count(distinct key) as unique_keys 
FROM site_content;

-- 6. TESTIMONIALS (Check ID uniqueness)
SELECT 'testimonials' as table_name, 
       count(*) as total_rows, 
       count(distinct id) as unique_ids 
FROM testimonials;

-- 7. FAQS (Check ID uniqueness)
SELECT 'faqs' as table_name, 
       count(*) as total_rows, 
       count(distinct id) as unique_ids 
FROM faqs;
