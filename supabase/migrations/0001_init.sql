-- Hala marketplace schema
-- Shared by the Next.js website (web/) and the Expo mobile app.
-- Run with: supabase db push  (or paste into the Supabase SQL editor)

-- ---------------------------------------------------------------- profiles
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  handle text unique not null check (handle ~ '^[a-z0-9_.]{3,30}$'),
  display_name text not null,
  bio text default '',
  avatar_url text,
  emirate text not null default 'Dubai',
  neighborhood text default '',
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "profiles are public" on public.profiles for select using (true);
create policy "users update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "users insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- ---------------------------------------------------------------- listings
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles on delete cascade,
  title text not null check (char_length(title) between 3 and 70),
  description text not null default '',
  brand text not null default 'No brand',
  size text not null default 'One size',
  condition text not null check (condition in
    ('New with tags','New without tags','Very good','Good','Fair')),
  color text not null default '',
  price_aed integer not null check (price_aed > 0),
  original_price_aed integer,
  category text not null,
  subcategory text not null default '',
  emirate text not null,
  neighborhood text not null default '',
  images text[] not null default '{}',
  open_to_offers boolean not null default true,
  status text not null default 'active' check (status in ('active','reserved','sold')),
  delivery text[] not null default '{meetup}',
  created_at timestamptz not null default now()
);

create index listings_search_idx on public.listings
  using gin (to_tsvector('english', title || ' ' || brand || ' ' || description));
create index listings_category_idx on public.listings (category, subcategory);
create index listings_emirate_idx on public.listings (emirate);
create index listings_price_idx on public.listings (price_aed);

alter table public.listings enable row level security;
create policy "listings are public" on public.listings for select using (true);
create policy "sellers insert own listings" on public.listings
  for insert with check (auth.uid() = seller_id);
create policy "sellers update own listings" on public.listings
  for update using (auth.uid() = seller_id);
create policy "sellers delete own listings" on public.listings
  for delete using (auth.uid() = seller_id);

-- ---------------------------------------------------------------- favourites
create table public.favourites (
  user_id uuid references public.profiles on delete cascade,
  listing_id uuid references public.listings on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

alter table public.favourites enable row level security;
create policy "users manage own favourites" on public.favourites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------- conversations & messages
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings on delete cascade,
  buyer_id uuid not null references public.profiles on delete cascade,
  seller_id uuid not null references public.profiles on delete cascade,
  created_at timestamptz not null default now(),
  unique (listing_id, buyer_id)
);

alter table public.conversations enable row level security;
create policy "participants read conversations" on public.conversations
  for select using (auth.uid() in (buyer_id, seller_id));
create policy "buyers start conversations" on public.conversations
  for insert with check (auth.uid() = buyer_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations on delete cascade,
  sender_id uuid not null references public.profiles on delete cascade,
  body text,
  offer_aed integer check (offer_aed > 0),
  offer_status text check (offer_status in ('pending','accepted','declined')),
  created_at timestamptz not null default now(),
  check (body is not null or offer_aed is not null)
);

create index messages_conversation_idx on public.messages (conversation_id, created_at);

alter table public.messages enable row level security;
create policy "participants read messages" on public.messages
  for select using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id and auth.uid() in (c.buyer_id, c.seller_id)
    )
  );
create policy "participants send messages" on public.messages
  for insert with check (
    auth.uid() = sender_id and exists (
      select 1 from public.conversations c
      where c.id = conversation_id and auth.uid() in (c.buyer_id, c.seller_id)
    )
  );
create policy "recipients respond to offers" on public.messages
  for update using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id and auth.uid() in (c.buyer_id, c.seller_id)
    )
  );

-- ---------------------------------------------------------------- reviews
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles on delete cascade,
  reviewer_id uuid not null references public.profiles on delete cascade,
  listing_id uuid references public.listings on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text not null default '',
  created_at timestamptz not null default now(),
  unique (reviewer_id, listing_id)
);

alter table public.reviews enable row level security;
create policy "reviews are public" on public.reviews for select using (true);
create policy "buyers leave reviews" on public.reviews
  for insert with check (auth.uid() = reviewer_id);

-- ---------------------------------------------------------------- follows
create table public.follows (
  follower_id uuid references public.profiles on delete cascade,
  followed_id uuid references public.profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followed_id),
  check (follower_id <> followed_id)
);

alter table public.follows enable row level security;
create policy "follows are public" on public.follows for select using (true);
create policy "users manage own follows" on public.follows
  for all using (auth.uid() = follower_id) with check (auth.uid() = follower_id);

-- ---------------------------------------------------------------- saved searches
create table public.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  query jsonb not null,
  alert boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.saved_searches enable row level security;
create policy "users manage own saved searches" on public.saved_searches
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------- reports & blocks
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles on delete cascade,
  listing_id uuid references public.listings on delete cascade,
  reported_user_id uuid references public.profiles on delete cascade,
  reason text not null,
  created_at timestamptz not null default now(),
  check (listing_id is not null or reported_user_id is not null)
);

alter table public.reports enable row level security;
create policy "users file reports" on public.reports
  for insert with check (auth.uid() = reporter_id);

create table public.blocked_users (
  blocker_id uuid references public.profiles on delete cascade,
  blocked_id uuid references public.profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id)
);

alter table public.blocked_users enable row level security;
create policy "users manage own blocks" on public.blocked_users
  for all using (auth.uid() = blocker_id) with check (auth.uid() = blocker_id);

-- ---------------------------------------------------------------- storage
insert into storage.buckets (id, name, public) values ('listing-images', 'listing-images', true);

create policy "listing images are public" on storage.objects
  for select using (bucket_id = 'listing-images');
create policy "authenticated users upload listing images" on storage.objects
  for insert with check (bucket_id = 'listing-images' and auth.role() = 'authenticated');
