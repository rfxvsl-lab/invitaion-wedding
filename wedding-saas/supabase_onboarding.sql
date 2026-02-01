-- Create Profiles Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  phone_number text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint phone_length check (char_length(phone_number) >= 10)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create Policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Handle existing users (insert if not exists)
-- This is optional but good if you have existing users without profiles
-- insert into public.profiles (id)
-- select id from auth.users
-- on conflict (id) do nothing;
