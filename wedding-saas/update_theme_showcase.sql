-- 1. Create Storage Bucket for Theme Thumbnails
insert into storage.buckets (id, name, public)
values ('theme-thumbnails', 'theme-thumbnails', true)
on conflict (id) do nothing;

-- 2. Storage Policies for Theme Thumbnails
-- Public Read
create policy "Public Access Theme Thumbnails"
  on storage.objects for select
  using ( bucket_id = 'theme-thumbnails' );

-- Auth Upload (Admin only ideally, but auth is fine for now)
create policy "Auth Upload Theme Thumbnails"
  on storage.objects for insert
  with check ( bucket_id = 'theme-thumbnails' and auth.role() = 'authenticated' );

-- Owner Update/Delete
create policy "Owner Update Theme Thumbnails"
  on storage.objects for update
  using ( bucket_id = 'theme-thumbnails' and auth.uid() = owner );

create policy "Owner Delete Theme Thumbnails"
  on storage.objects for delete
  using ( bucket_id = 'theme-thumbnails' and auth.uid() = owner );


-- 3. Seed site_content with Theme Keys
-- We will use 3 slots: theme_1, theme_2, theme_3
-- Section: 'themes'

-- Theme 1 (Default: Rustic Wood)
insert into site_content (key, value, section) values
('theme_1_id', 'rustic-wood', 'themes'),
('theme_1_title', 'Floral Rustic Elegance', 'themes'),
('theme_1_desc', 'Floral, Modern, Natural', 'themes'),
('theme_1_img', 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop', 'themes');

-- Theme 2 (Default: Classic Serif)
insert into site_content (key, value, section) values
('theme_2_id', 'classic-serif', 'themes'),
('theme_2_title', 'Clean White Minimalist', 'themes'),
('theme_2_desc', 'Minimalist, Elegant, Clean', 'themes'),
('theme_2_img', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop', 'themes');

-- Theme 3 (Default: Dark Luxury)
insert into site_content (key, value, section) values
('theme_3_id', 'dark-luxury', 'themes'),
('theme_3_title', 'Golden Luxury Night', 'themes'),
('theme_3_desc', 'Luxury, Gold, Premium', 'themes'),
('theme_3_img', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop', 'themes');
