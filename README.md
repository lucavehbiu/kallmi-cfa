# Kallmi Estate

Premium Albanian olive oil estate website built with Next.js 15 and React 19.

## Tech Stack

- **Framework**: Next.js 15.1.6
- **React**: 19.0.0
- **Styling**: Tailwind CSS 3.4.17
- **Language**: TypeScript 5.7.3
- **Email**: Mailjet API

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Other Commands

```bash
# Run linting
npm run lint

# Optimize images
npm run optimize-images
```

## Project Structure

```
src/
├── components/     # React components
├── pages/          # Next.js pages
├── styles/         # Global styles
└── utils/          # Utility functions
public/
├── images/         # Static images
└── fonts/          # Custom fonts
```

## Environment Variables

Create a `.env.local` file with:

```
# Mailjet API (for contact forms)
MJ_APIKEY_PUBLIC=your_public_key
MJ_APIKEY_PRIVATE=your_private_key
```

## Database (Neon) and Admin Login (Clerk)

Bookings, restaurant reservations and seasonal rates live in **Neon Postgres**
(`src/lib/db.ts`, plain SQL via `@neondatabase/serverless`). The `/admin` area
uses **Clerk** for sign-in, restricted to the emails in `ADMIN_EMAILS`.

### Environment variables

Add to `.env.local` (and to the hosting provider):

```
# Neon: pooled connection string from the Neon console (Connect > Pooled)
DATABASE_URL=postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require

# Clerk: dashboard.clerk.com > API keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/login

# Comma-separated list of emails allowed into /admin (matched against the
# Clerk user's primary email, case-insensitive). Everyone else gets 403.
ADMIN_EMAILS=owner@kallmibukur.al
```

The old `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
`SUPABASE_SECRET_KEY` are no longer read by the app (only by the one-off
migration script below).

### One-time setup

1. **Neon**: create a project at console.neon.tech, copy the pooled connection
   string into `DATABASE_URL`, then create the tables:
   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   ```
   (or paste `db/schema.sql` into the Neon SQL editor). Safe to re-run.
2. **Clerk**: create an application at dashboard.clerk.com with Email sign-in,
   disable public sign-ups (Configure > Restrictions, or allowlist the admin
   emails), create the admin user(s), and copy the keys into the env vars above.
3. **Copy data from Supabase** (idempotent, re-runnable; preserves ids and
   `created_at`, resets the id sequences, prints row counts from both sides):
   ```bash
   SUPABASE_URL=https://xxx.supabase.co \
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key \
   DATABASE_URL=postgresql://... \
   npx tsx scripts/migrate-supabase-to-neon.ts
   ```
   It also falls back to `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SECRET_KEY`
   if those are already in your shell.

## Playwright MCP (Browser Automation)

This project has Playwright MCP configured for browser testing and automation. Claude can use it to:

- Navigate to pages and take screenshots
- Fill forms and click buttons
- Debug visual issues

The Playwright MCP server runs automatically when Claude Code is started.

## Development Notes

- Images use Next.js Image component with optimization
- Remote images are configured in `next.config.mjs` under `remotePatterns`
- The site uses standalone output mode for deployment
