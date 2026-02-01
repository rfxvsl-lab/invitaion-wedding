-- Create table for invitations
create table invitations (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table invitations enable row level security;

-- Create policy to allow read access to everyone
create policy "Allow public read access"
  on invitations for select
  using (true);

-- Create policy to allow insert/update access to everyone (for demo purposes)
-- In a real production app, you would restrict this to authenticated users
create policy "Allow public insert/update access"
  on invitations for insert
  with check (true);

create policy "Allow public update access"
  on invitations for update
  using (true);

-- Table for dynamic site content (Managed by Admin)
create table site_content (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value text,
  section text, -- e.g., 'hero', 'pricing', 'features'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for site_content
alter table site_content enable row level security;

-- Policy: Everyone can read content
create policy "Allow public read access on site_content"
  on site_content for select
  using (true);

-- Policy: Only Admin can update
create policy "Allow admin update access on site_content"
  on site_content for update
  using (auth.jwt() ->> 'email' = 'mhmmadridho.64@gmail.com')
  with check (auth.jwt() ->> 'email' = 'mhmmadridho.64@gmail.com');

create policy "Allow admin insert access on site_content"
  on site_content for insert
  with check (auth.jwt() ->> 'email' = 'mhmmadridho.64@gmail.com');
