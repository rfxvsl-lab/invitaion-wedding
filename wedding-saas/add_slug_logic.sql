-- Add slug management columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS slug_change_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS max_slug_changes INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS slug_slots INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS contact_email TEXT;

-- Update existing profiles based on their tier (Backfill logic)
-- Free
UPDATE public.profiles SET max_slug_changes = 0, slug_slots = 1 WHERE tier = 'free';
-- Basic
UPDATE public.profiles SET max_slug_changes = 2, slug_slots = 1 WHERE tier = 'basic';
-- Premium
UPDATE public.profiles SET max_slug_changes = 5, slug_slots = 1 WHERE tier = 'premium';
-- Exclusive
UPDATE public.profiles SET max_slug_changes = 5, slug_slots = 3 WHERE tier = 'exclusive';
