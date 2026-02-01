-- FIX ADMIN RLS POLICY (Typo Correction)
-- Drop existing policies first to be safe
drop policy if exists "Allow admin update access on site_content" on site_content;
drop policy if exists "Allow admin insert access on site_content" on site_content;

-- Re-create with CORRECT email (without dot)
create policy "Allow admin update access on site_content"
  on site_content for update
  using (auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com')
  with check (auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');

create policy "Allow admin insert access on site_content"
  on site_content for insert
  with check (auth.jwt() ->> 'email' = 'mhmmadridho64@gmail.com');


-- UPDATE PROFILES TABLE (Subscription Tier)
alter table profiles 
add column if not exists subscription_plan text default 'free'; -- 'free', 'basic', 'premium'

-- ADD STORAGE FOR MUSIC
-- Note: You usually create buckets in the dashboard, but we can try inserting if storage schema is accessible
insert into storage.buckets (id, name, public)
values ('music', 'music', true)
on conflict (id) do nothing;

-- Storage Policies for Music
-- 1. Public Read
create policy "Public Access Music"
  on storage.objects for select
  using ( bucket_id = 'music' );

-- 2. Authenticated Upload (Any auth user for now)
create policy "Auth Upload Music"
  on storage.objects for insert
  with check ( bucket_id = 'music' and auth.role() = 'authenticated' );

-- 3. Owner Update/Delete
create policy "Owner Update Music"
  on storage.objects for update
  using ( bucket_id = 'music' and auth.uid() = owner );

create policy "Owner Delete Music"
  on storage.objects for delete
  using ( bucket_id = 'music' and auth.uid() = owner );
