# Typography System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Cormorant Garamond + Inter with a three-font system (Instrument Serif + DM Sans) that ties the brand together — headers echo the logo DNA, body is clean and legible.

**Architecture:** Load fonts via `next/font/google` in the locale layout, expose as CSS variables, wire into Tailwind config, then update globals.css semantic classes. No component-level font changes needed — it all flows from the CSS variables.

**Font System:**
| Role | Font | Weight | Notes |
|------|------|--------|-------|
| H1 / Hero display | Instrument Serif | 400 / italic | Related DNA to logo sub-brands |
| H2–H3 / Section labels | DM Sans | 500 | Uppercase, spaced, neutral |
| Body text | DM Sans | 400 | 16–18px, warm geometric |
| Nav / UI / Buttons | DM Sans | 500 | 13–14px clean utility |

**Tech Stack:** Next.js 15, `next/font/google`, Tailwind CSS 3.4, CSS custom properties

---

### Task 1: Load fonts in locale layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Replace the font import**

Current code loads only `Cormorant`. Replace with:

```tsx
import { Instrument_Serif, DM_Sans } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif'
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-dm-sans'
})
```

**Step 2: Apply both variables to `<html>`**

Change:
```tsx
<html lang={locale} className={cormorant.variable}>
```
To:
```tsx
<html lang={locale} className={`${instrumentSerif.variable} ${dmSans.variable}`}>
```

**Step 3: Verify dev server still starts**

```bash
npm run dev
```
Expected: No errors, page loads at localhost:3000/en

**Step 4: Commit**

```bash
git add src/app/\[locale\]/layout.tsx
git commit -m "feat: load Instrument Serif + DM Sans fonts via next/font"
```

---

### Task 2: Wire fonts into Tailwind config

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Update `fontFamily` in theme**

Replace the existing `fontFamily` block:
```ts
fontFamily: {
  'cormorant': ['Cormorant Garamond', 'Georgia', 'serif'],
  'sans': ['Inter', 'system-ui', 'sans-serif'],
},
```
With:
```ts
fontFamily: {
  'serif': ['var(--font-instrument-serif)', 'Georgia', 'serif'],
  'sans': ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
  // Keep cormorant alias for any legacy usage during migration
  'cormorant': ['var(--font-instrument-serif)', 'Georgia', 'serif'],
},
```

**Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: wire Instrument Serif + DM Sans into Tailwind fontFamily"
```

---

### Task 3: Update globals.css base styles

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Update body font and add semantic font vars**

Replace the `body` rule:
```css
body {
  color: var(--color-text-primary);
  line-height: 1.618;
  background-color: var(--color-surface-primary);
  font-family: 'Cormorant Garamond', Georgia, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
With:
```css
body {
  color: var(--color-text-primary);
  line-height: 1.618;
  background-color: var(--color-surface-primary);
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Step 2: Add semantic heading classes to `:root`**

Add to the `:root` block:
```css
/* Typography semantic roles */
--font-display: var(--font-instrument-serif), Georgia, serif;
--font-body: var(--font-dm-sans), system-ui, sans-serif;
```

**Step 3: Update the `.text-heading` utility class** (find it in globals.css below the component layer comment):

```css
/* Typography helpers */
h1, h2, h3, h4 {
  font-family: var(--font-instrument-serif), Georgia, serif;
}
```

**Step 4: Verify visually**

Navigate to localhost:3000/en — headers should be in Instrument Serif, body in DM Sans.

**Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update globals.css — body→DM Sans, headings→Instrument Serif"
```

---

### Task 4: Update component font classes

**Context:** Components use `font-cormorant` class (Tailwind) scattered throughout. Now that `font-cormorant` maps to Instrument Serif in Tailwind this is automatically handled. BUT we also need to ensure UI text (nav, buttons, labels) explicitly uses `font-sans`.

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/components/ui/Button.tsx`
- Modify: `src/components/Footer.tsx`

**Step 1: Header — ensure nav text is DM Sans**

In `src/components/Header.tsx`, the nav items and logo text are inside `<header>`. Add `font-sans` to the nav links className if not already sans (the header component doesn't set `font-cormorant` so body default DM Sans applies — just verify).

Check: the nav `<Link>` items currently have no font class → they inherit body → DM Sans ✓ (no change needed)

**Step 2: Button — ensure button text is DM Sans medium**

Open `src/components/ui/Button.tsx`. Find the base button className string and ensure it includes `font-sans font-medium tracking-wide`. If it already has these, skip.

**Step 3: Footer — section headings**

In `src/components/Footer.tsx`, section headings like "KALLMI", "Discover", "Visit Our Estate" — these should be `font-sans font-medium tracking-widest uppercase text-sm` for the utility labels, while "KALLMI" as the brand mark stays as-is.

**Step 4: Verify**

Screenshot localhost:3000/en on desktop and mobile. Check:
- Body paragraphs: DM Sans (geometric, clean)
- H1 "KALLMI" on hero: still Instrument Serif / letter-spaced
- Section headings "Generations of Passion": Instrument Serif
- Nav links: DM Sans medium
- Buttons: DM Sans medium

**Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/ui/Button.tsx src/components/Footer.tsx
git commit -m "feat: enforce font roles in nav, buttons, footer"
```

---

### Task 5: Update section label typography

**Context:** Section eyebrow labels like "OUR HERITAGE", "CULINARY EXPERIENCE", "DISCOVER KALLMI" should be DM Sans 500, uppercase, wide tracking — not serif. Currently they may be `font-cormorant`.

**Files:**
- Modify: `src/app/globals.css` — add a `.label-eyebrow` utility
- Modify: `src/components/LandingPage.tsx` (section labels)
- Modify: `src/components/sections/*.tsx` (eyebrow labels)

**Step 1: Add utility class to globals.css**

```css
/* Section eyebrow labels */
.label-eyebrow {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
```

**Step 2: Find all eyebrow label elements**

```bash
grep -r "text-xs.*tracking\|tracking-widest\|uppercase.*text-xs\|text-sm.*uppercase" src/components --include="*.tsx" -l
```

**Step 3: Apply `label-eyebrow` class** to all small uppercase section labels (e.g. "Our Heritage", "Culinary Experience", "Discover Kallmi", "Albania's Hidden Gem"). Add the class alongside existing ones — no need to remove Tailwind classes that overlap.

**Step 4: Verify on localhost:3000/en** — eyebrow labels should feel crisply typeset, clearly differentiated from the serif headings above them.

**Step 5: Commit**

```bash
git add src/app/globals.css src/components/LandingPage.tsx src/components/sections/
git commit -m "feat: DM Sans eyebrow labels for section titles"
```

---

### Task 6: Italic accent text

**Context:** Pull quotes, hero subtitles, and italic accents (e.g. *Estate*, *bukur*, *view*) should use Instrument Serif italic — they already do via `italic` Tailwind class since we loaded both styles. Just verify.

**Step 1: Check italic rendering**

On localhost:3000/en, the hero subtitle *"Where ancient olive groves whisper secrets to the Adriatic breeze"* uses `font-light italic` — verify it renders in Instrument Serif italic (should have visible stroke contrast).

**Step 2: Check hero "Estate" italic**

The `<span className="... italic ...">Estate</span>` in LandingHero — should render Instrument Serif italic. If it's still `font-cormorant italic` it maps to Instrument Serif ✓ via Tailwind alias.

**Step 3: No code changes needed** if rendering correctly. If italic looks wrong (falls back to browser default italic), add `font-serif` class explicitly to italic elements.

**Step 4: Commit if any fixes needed**

```bash
git commit -m "fix: ensure italic accent text uses Instrument Serif"
```

---

### Task 7: Final visual QA + CSS variable update

**Step 1: Update the `--color-brand-gold` token to match logo**

In `src/app/globals.css`, update:
```css
--color-brand-gold: #C4A862;
--color-brand-gold-light: #E2BC6A;
--color-brand-gold-dark: #9A7D3A;
```
(Aligns with the logo dot color we identified — currently inconsistent)

**Step 2: Check all pages on mobile (390px) and desktop (1440px)**

Pages to check:
- `/en` (landing)
- `/en/stay`
- `/en/restaurant`
- `/en/shop`
- `/en/our-story`

Look for: any remaining `Cormorant Garamond` rendering, broken fallbacks, incorrect font weights.

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete typography system — Instrument Serif + DM Sans brand fonts"
```
