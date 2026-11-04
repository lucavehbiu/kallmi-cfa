-- Kallmi Estate schema for Neon Postgres.
-- Run once against the Neon database: psql "$DATABASE_URL" -f db/schema.sql
-- Safe to re-run (IF NOT EXISTS everywhere).
--
-- ids are uuids, matching the existing Supabase rows so the migration can
-- preserve them.

create table if not exists stay_bookings (
  id               uuid        primary key default gen_random_uuid(),
  name             text        not null,
  email            text        not null,
  phone            text        not null,
  room_id          text        not null,          -- '1', '2' or '1,2'
  room_name        text        not null,
  guests           integer     not null default 1,
  check_in         date        not null,
  check_out        date        not null,
  special_requests text,
  status           text        not null default 'pending', -- pending | awaiting_payment | confirmed
  created_at       timestamptz not null default now()
);

create index if not exists stay_bookings_created_at_idx on stay_bookings (created_at desc);
create index if not exists stay_bookings_check_in_idx   on stay_bookings (check_in);
create index if not exists stay_bookings_status_idx     on stay_bookings (status);

create table if not exists restaurant_reservations (
  id               uuid        primary key default gen_random_uuid(),
  name             text        not null,
  email            text        not null,
  phone            text        not null,
  reservation_date date        not null,
  reservation_time time        not null,
  guests           integer     not null default 1,
  special_requests text,
  status           text        not null default 'pending', -- pending | confirmed
  created_at       timestamptz not null default now()
);

create index if not exists restaurant_reservations_created_at_idx on restaurant_reservations (created_at desc);
create index if not exists restaurant_reservations_date_idx       on restaurant_reservations (reservation_date);
create index if not exists restaurant_reservations_status_idx     on restaurant_reservations (status);

-- Nightly room rate per calendar month (1-12). Empty table = hardcoded defaults in src/lib/pricing.ts.
create table if not exists seasonal_rates (
  month      integer     primary key check (month between 1 and 12),
  rate       integer     not null,
  created_at timestamptz not null default now()
);
