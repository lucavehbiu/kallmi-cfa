# Code Style & Conventions

## TypeScript
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Module resolution: bundler
- Target: ES2017

## ESLint
- Extends: `next/core-web-vitals`
- `react/no-unescaped-entities` is disabled

## Tailwind CSS
- Custom design tokens in `tailwind.config.ts`
- CSS custom properties in `globals.css` (`:root { --color-brand-olive: ... }`)
- IMPORTANT: `@apply` with custom Tailwind colors does NOT work in CSS files - use CSS variables instead
- Golden ratio scale for typography and spacing

## Component Patterns
- Page-level components in `src/components/` (e.g., `Restaurant.tsx`, `Shop.tsx`)
- Pages in `src/app/(public)/` import and render these components
- Sections, layout, UI, common, and motion sub-directories for organization

## Design Guidelines
- LandingHero.tsx must NOT be changed (user-approved design)
- Avoid "AI generic" aesthetics (no excessive pulse animations, subtle shadows)
- Brand fonts: Cormorant Garamond for headings, Inter for body
- Brand colors: olive (#8B7355), gold (#D4AF37)
