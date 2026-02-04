
-- UNIFIED REPORT: Check for Duplicates in All Tables
-- Columns: Table Name | Total Rows | Unique IDs | Unique Secondary (Email/Slug/Key)

SELECT 
    'profiles' as table_name, 
    count(*) as total_rows, 
    count(distinct id) as unique_ids, 
    count(distinct email) as unique_secondary_key
FROM profiles

UNION ALL

SELECT 
    'invitations' as table_name, 
    count(*) as total_rows, 
    count(distinct id) as unique_ids, 
    count(distinct slug) as unique_secondary_key
FROM invitations

UNION ALL

SELECT 
    'themes' as table_name, 
    count(*) as total_rows, 
    count(distinct id) as unique_ids, 
    count(distinct slug) as unique_secondary_key
FROM themes

UNION ALL

SELECT 
    'orders' as table_name, 
    count(*) as total_rows, 
    count(distinct id) as unique_ids, 
    NULL as unique_secondary_key
FROM orders

UNION ALL

SELECT 
    'site_content' as table_name, 
    count(*) as total_rows, 
    count(distinct key) as unique_ids, 
    NULL as unique_secondary_key
FROM site_content

UNION ALL

SELECT 
    'testimonials' as table_name, 
    count(*) as total_rows, 
    count(distinct id) as unique_ids, 
    NULL as unique_secondary_key
FROM testimonials

UNION ALL

SELECT 
    'faqs' as table_name, 
    count(*) as total_rows, 
    count(distinct id) as unique_ids, 
    NULL as unique_secondary_key
FROM faqs;
