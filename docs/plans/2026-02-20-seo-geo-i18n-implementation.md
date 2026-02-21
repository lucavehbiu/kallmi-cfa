# SEO/GEO + i18n Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 5-language support (EN/SQ/IT/DE/FR) with subdirectory routing, full JSON-LD schema markup, GEO optimization for AI search engines, and complete SEO meta tags across all pages.

**Architecture:** Use `next-intl` for locale-based subdirectory routing (`/en/`, `/sq/`, etc.) integrated into the existing Next.js 15 App Router structure. Move all public pages under a `[locale]` dynamic segment. Add JSON-LD structured data via a reusable component. Merge the new i18n middleware with the existing Supabase auth middleware.

**Tech Stack:** next-intl, Next.js 15 App Router, TypeScript, JSON-LD schema.org markup

---

## Task 1: Install next-intl and configure plugin

**Files:**
- Modify: `package.json`
- Modify: `next.config.mjs`

**Step 1: Install next-intl**

Run: `npm install next-intl`

**Step 2: Wrap next.config.mjs with createNextIntlPlugin**

Add `import createNextIntlPlugin from 'next-intl/plugin';` at the top.
Create `const withNextIntl = createNextIntlPlugin();` before nextConfig.
Change `export default nextConfig` to `export default withNextIntl(nextConfig);`.
Keep ALL existing config intact.

**Step 3: Verify dev server starts**

Run: `npm run dev` — should start (may warn about missing i18n config)

**Step 4: Commit**

`git commit -m "feat: install next-intl and configure plugin"`

---

## Task 2: Create i18n routing and request config

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`

**Step 1: Create routing config** (`src/i18n/routing.ts`)

Define routing with locales: `['en', 'sq', 'it', 'de', 'fr']`, defaultLocale: `'en'`.

**Step 2: Create request config** (`src/i18n/request.ts`)

Use `getRequestConfig` to validate locale against routing.locales and import messages dynamically from `../../messages/${locale}.json`.

**Step 3: Commit**

`git commit -m "feat: add i18n routing and request configuration"`

---

## Task 3: Create translation message files

**Files:**
- Create: `messages/en.json`, `messages/sq.json`, `messages/it.json`, `messages/de.json`, `messages/fr.json`

Each file contains namespaced translations:
- `Navigation` — nav links (Home, Our Story, Restaurant, Shop, Stay, Camping, Contact)
- `Footer` — footer text, newsletter, address
- `Metadata` — SEO titles and descriptions for every page
- `Common` — shared UI strings (buttons, labels, form fields)
- `Hero` — landing hero section text
- `FAQ` — structured FAQ content per page (for FAQPage schema + GEO)

The English file is the source of truth. Other languages translate all keys.

**Step 4: Commit**

`git commit -m "feat: add translation files for EN, SQ, IT, DE, FR"`

---

## Task 4: Restructure app routes under [locale] segment

This is the biggest structural change.

**Files:**
- Modify: `src/app/layout.tsx` → thin wrapper (just `return children`)
- Create: `src/app/[locale]/layout.tsx` → main layout with NextIntlClientProvider
- Move: `src/app/(public)/` → `src/app/[locale]/(public)/`
- Keep: `src/app/api/` stays at root (API routes don't get localized)

**Step 1:** Make `src/app/layout.tsx` a minimal passthrough (no html/body tags)

**Step 2:** Create `src/app/[locale]/layout.tsx` with:
- `generateStaticParams` returning all locales
- Locale validation via `hasLocale`
- `setRequestLocale(locale)` for static rendering
- `NextIntlClientProvider` wrapping children
- html `lang={locale}` attribute
- Google Analytics scripts
- All existing metadata

**Step 3:** Move `src/app/(public)/` to `src/app/[locale]/(public)/`

**Step 4:** Update each page.tsx to accept `params: Promise<{locale: string}>` and call `setRequestLocale(locale)`

**Step 5:** Verify: `http://localhost:3000/en` and `http://localhost:3000/sq`

**Step 6: Commit**

`git commit -m "feat: restructure routes under [locale] segment for i18n"`

---

## Task 5: Update middleware for i18n + Supabase auth

**Files:**
- Modify: `src/middleware.ts`

Merge the `next-intl` middleware (locale detection/redirect) with the existing Supabase admin auth:
- Admin routes (`/admin`, `/{locale}/admin`): Supabase auth check
- All other routes: `next-intl` locale middleware
- Update matcher to include all paths (not just `/admin`)

**Verify:**
- `/` → redirects to `/en`
- `/shop` → redirects to `/en/shop`
- `/en/admin` → redirects to login if not authed

**Commit:** `git commit -m "feat: merge i18n middleware with Supabase auth"`

---

## Task 6: Add per-page metadata with generateMetadata + hreflang

**Files:**
- Create: `src/lib/metadata.ts` — shared metadata helper
- Modify: All 7 public page.tsx files

**Step 1:** Create `generatePageMetadata()` helper that:
- Takes locale, page key, path, optional OG image
- Uses `getTranslations` to get localized title/description
- Generates `alternates.languages` with all 5 locales + x-default
- Returns full OpenGraph + Twitter card metadata

**Step 2:** Update each page to use `export async function generateMetadata()` calling the helper.

**Verify:** `curl -s http://localhost:3000/en/restaurant | grep hreflang` — all 5 + x-default

**Commit:** `git commit -m "feat: add per-page SEO metadata with hreflang alternates"`

---

## Task 7: Add JSON-LD schema markup

**Files:**
- Create: `src/components/JsonLd.tsx` — renders `<script type="application/ld+json">`
- Modify: All 7 public page.tsx files

Schema per page:
- **Homepage**: Organization + WebSite + FAQPage
- **Restaurant**: Restaurant + FAQPage (servesCuisine, acceptsReservations, priceRange)
- **Stay**: LodgingBusiness + FAQPage (amenities, checkinTime, geo)
- **Camping**: Campground + FAQPage
- **Shop**: Product + FAQPage (offers, brand, sku)
- **Our Story**: AboutPage + Organization
- **Contact**: ContactPage + LocalBusiness (geo, openingHours, telephone)

All FAQ content comes from the translation files, making it multilingual.

NOTE: The JsonLd component uses script tag with type="application/ld+json" and
`JSON.stringify(data)` for the content. This is the standard Next.js pattern for
structured data and is safe because the data is developer-controlled, not user input.

**Verify:** Google Rich Results Test on deployed URL

**Commit:** `git commit -m "feat: add JSON-LD schema markup for all pages"`

---

## Task 8: Update sitemap with all pages and locale variants

**Files:**
- Modify: `src/app/api/sitemap/route.ts`

Rewrite to:
- Include ALL actual pages (add restaurant, stay, camping; remove /about, /blog)
- Generate entries for each locale (5 locales x 7 pages = 35 URLs)
- Add `xhtml:link` hreflang alternates in each `<url>` entry
- Add `xmlns:xhtml` namespace

**Verify:** `curl http://localhost:3000/api/sitemap | head -30`

**Commit:** `git commit -m "feat: update sitemap with all pages and locale hreflang alternates"`

---

## Task 9: Update robots.txt with all AI crawlers

**Files:**
- Create: `public/robots.txt`

Include User-agent entries for:
- `*` (general), `Googlebot`, `Bingbot`
- `GPTBot`, `ChatGPT-User` (OpenAI/ChatGPT)
- `ClaudeBot`, `anthropic-ai` (Claude)
- `PerplexityBot` (Perplexity)
- `CCBot` (Common Crawl)
- `Brave` (Brave Search, used by Claude)

All allow `/`, disallow `/api/` and `/admin/`.
Point to sitemap: `https://www.kallmibukur.al/api/sitemap`

**Commit:** `git commit -m "feat: add comprehensive robots.txt with AI crawler access"`

---

## Task 10: Wire translations into UI components + LanguageSwitcher

**Files:**
- Create: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`

**Step 1:** Create `LanguageSwitcher` — buttons (EN/SQ/IT/DE/FR) that switch locale in URL

**Step 2:** Add LanguageSwitcher to Header navigation

**Step 3:** Update Header/Footer links to use locale-prefixed paths

**Commit:** `git commit -m "feat: wire i18n translations into UI, add LanguageSwitcher"`

---

## Task 11: Add next-intl navigation helpers

**Files:**
- Create: `src/i18n/navigation.ts`

Export locale-aware `Link`, `redirect`, `usePathname`, `useRouter` from `createNavigation(routing)`.

Update component imports to use these instead of `next/link` and `next/navigation`.

**Commit:** `git commit -m "feat: add next-intl navigation helpers"`

---

## Task 12: Build verification and final fixes

**Step 1:** Run `npm run lint` — fix errors
**Step 2:** Run `npm run build` — fix build errors
**Step 3:** Manual verification:
- `/en`, `/sq`, `/it`, `/de`, `/fr` all load
- hreflang tags present in source
- JSON-LD schema in source
- `/api/sitemap` has all locale variants
- `/robots.txt` shows AI bots
- LanguageSwitcher works
- Admin auth still works

**Step 4:** `git commit -m "feat: complete SEO/GEO + i18n - 5 languages, schema, sitemap"`

---

## Task Summary

| # | Task | Description |
|---|------|-------------|
| 1 | Install next-intl | npm install + plugin config |
| 2 | i18n routing/request | Locale routing + request config |
| 3 | Translation files | 5 language JSON files with all strings |
| 4 | Route restructuring | Move pages under [locale] segment |
| 5 | Middleware merge | i18n + Supabase auth middleware |
| 6 | Per-page metadata | generateMetadata + hreflang on all pages |
| 7 | JSON-LD schema | Structured data for all pages |
| 8 | Sitemap update | All pages + locale hreflang alternates |
| 9 | robots.txt | AI crawler access |
| 10 | UI translations | Header, Footer, LanguageSwitcher |
| 11 | Navigation helpers | Locale-aware Link, router |
| 12 | Build verification | Lint, build, manual test |
