# Kallmi Estate - Project Overview

## Purpose
Premium website for Kallmi Estate, an Albanian olive oil estate. Showcases olive oil products, estate restaurant, accommodations (stay/camping), limited edition products, and booking/contact functionality.

## Tech Stack
- **Framework**: Next.js 15.1.6 with App Router (`src/app/`)
- **React**: 19.0.0
- **TypeScript**: 5.7.3 (strict mode)
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **Email**: Mailjet API (node-mailjet)
- **Database/Auth**: Supabase (@supabase/supabase-js, @supabase/ssr)
- **Calendar**: Google APIs (googleapis)
- **UI**: @heroicons/react, react-day-picker, react-intersection-observer

## Route Structure (App Router)
- `src/app/(public)/` - Public pages (home, restaurant, stay, camping, shop, our-story, contact, checkout, limited-edition)
- `src/app/admin/` - Admin dashboard with login
- `src/app/api/` - API routes (contact, booking, availability, newsletter, restaurant-reservation, pricing-estimate, admin actions, sitemap)

## Component Structure
- `src/components/` - Page-level components (LandingPage, Restaurant, Shop, Accommodations, Camping, etc.)
- `src/components/sections/` - Section components (LandingHero, etc.)
- `src/components/layout/` - Layout components (Header, Footer)
- `src/components/ui/` - Reusable UI components
- `src/components/common/` - Common shared components
- `src/components/motion/` - Animation/motion components

## Other directories
- `src/data/` - Data files
- `src/features/` - Feature modules
- `src/hooks/` - Custom React hooks
- `src/lib/` - Library/utility code
- `src/utils/` - Utility functions
- `src/context/` - React context providers

## Design System
- Golden ratio typography scale (1.618)
- Custom brand colors: olive (#8B7355), gold (#D4AF37)
- Fonts: Cormorant Garamond (serif headings), Inter (sans body)
- CSS custom properties in globals.css
- Subtle shadows and restrained animations (avoid "AI generic" look)

## CRITICAL: Node.js Version
Must use **Node 20 LTS**. Node 25 causes malloc crashes with Next.js.
