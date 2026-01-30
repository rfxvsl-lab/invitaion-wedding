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
