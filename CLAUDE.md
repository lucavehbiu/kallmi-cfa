# Kallmi Estate - Project Memory for Claude

## Project Overview

This is a Next.js 15 website for Kallmi Estate, a premium Albanian olive oil estate. The site showcases:
- Olive oil products (shop)
- Estate restaurant
- Accommodations (stay/camping)
- Contact and booking functionality

## Tech Stack

- **Next.js**: 15.1.6 (App Router not used - uses pages directory)
- **React**: 19.0.0
- **TypeScript**: 5.7.3
- **Tailwind CSS**: 3.4.17
- **Email**: Mailjet API for contact forms

## Key Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint
```

## Project Structure

- `src/pages/` - Next.js pages (index, our-story, shop, restaurant, stay, camping, contact)
- `src/components/` - React components (LandingPage, Navigation, Footer, etc.)
- `src/styles/` - Global CSS and Tailwind config
- `public/images/` - Static images (hero.webp, sunset.webp, etc.)
- `next.config.mjs` - Next.js configuration including image domains

## Image Configuration

Remote images require domains to be whitelisted in `next.config.mjs` under `images.remotePatterns`. Currently allowed:
- kallmibukur.al
- Various food image CDNs (imgur, tripadvisor, etc.)

## Common Issues & Solutions

### Node.js malloc error / server crash
If you see `malloc: *** error for object: pointer being freed was not allocated`:

**Root cause**: Node.js v25 has a memory bug with Next.js. Must use **Node 20 LTS**.
```bash
nvm use 20
rm -rf .next node_modules/.cache
npm run dev
```
If `nvm use` doesn't work, use: `export PATH="$HOME/.nvm/versions/node/v20.19.2/bin:$PATH"`

### Image optimizer crash on stay/restaurant pages
Even on Node 20, the sharp image optimizer can crash when processing missing local images or certain remote images.

**Fix applied**: `unoptimized: process.env.NODE_ENV === 'development'` in `next.config.mjs` `images` config. This disables sharp processing in dev (images served as-is) while keeping optimization in production builds.

### Images not rendering in dev
- Check if domain is in `remotePatterns` in next.config.mjs
- Clear `.next` cache: `rm -rf .next && npm run dev`
- Missing local images show 404 in console but DON'T crash the server

### Slow dev server startup
- Clear node_modules and reinstall: `rm -rf node_modules .next && npm install`

### React version mismatch
- Next.js 15 requires React 19. Don't downgrade to React 18.

### Multiple lockfile warning
The warning about multiple lockfiles is harmless. To fix permanently, delete `/Users/lucavehbiu/Documents/GitHub/package-lock.json` (the parent directory one).

## Environment Variables

Required in `.env.local`:
```
MJ_APIKEY_PUBLIC=xxx
MJ_APIKEY_PRIVATE=xxx
```

## Deployment

The site uses `output: 'standalone'` in next.config.mjs for containerized deployments.

## Browser Testing with Playwright MCP

Claude has access to Playwright MCP for browser automation:
- `browser_navigate` - Go to URLs
- `browser_snapshot` - Get page accessibility tree
- `browser_take_screenshot` - Capture screenshots
- `browser_click` - Click elements
- `browser_type` - Type into inputs

Use these to debug visual issues or test functionality.
