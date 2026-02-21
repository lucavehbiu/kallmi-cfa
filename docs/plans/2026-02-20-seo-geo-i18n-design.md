# SEO/GEO + Internationalization Design

**Date**: 2026-02-20
**Goal**: Make kallmibukur.al fully optimized for traditional search (Google, Bing) and AI search engines (ChatGPT, Perplexity, Gemini, Claude), with 5-language support.

## Languages

| Code | Language | Locale |
|------|----------|--------|
| `en` | English | en (default) |
| `sq` | Albanian (Shqip) | sq |
| `it` | Italian | it |
| `de` | German | de |
| `fr` | French | fr |

Note: Using `sq` (ISO 639-1) for Albanian, not `al` (which is the country code).

## 1. i18n Architecture

### Approach: Subdirectory routing with `next-intl`

**URL structure**:
- `kallmibukur.al/` → redirects to `/en/` (or detects browser locale)
- `kallmibukur.al/en/shop`
- `kallmibukur.al/sq/shop`
- `kallmibukur.al/it/restaurant`
- `kallmibukur.al/de/stay`
- `kallmibukur.al/fr/contact`

**File structure changes**:
```
src/
  i18n/
    request.ts          # next-intl request config
    routing.ts          # locale routing config
  messages/
    en.json             # English translations
    sq.json             # Albanian translations
    it.json             # Italian translations
    de.json             # German translations
    fr.json             # French translations
  app/
    [locale]/           # Dynamic locale segment
      (public)/
        layout.tsx      # Public layout with locale
        page.tsx        # Homepage
        restaurant/page.tsx
        stay/page.tsx
        camping/page.tsx
        shop/page.tsx
        our-story/page.tsx
        contact/page.tsx
        checkout/page.tsx
        limited-edition/page.tsx
      admin/            # Admin stays non-localized or under /en/
      layout.tsx        # Root locale layout with hreflang
  middleware.ts         # Locale detection + redirect
```

### hreflang Implementation

Every page will have hreflang alternate links:
```html
<link rel="alternate" hreflang="en" href="https://www.kallmibukur.al/en/shop" />
<link rel="alternate" hreflang="sq" href="https://www.kallmibukur.al/sq/shop" />
<link rel="alternate" hreflang="it" href="https://www.kallmibukur.al/it/shop" />
<link rel="alternate" hreflang="de" href="https://www.kallmibukur.al/de/shop" />
<link rel="alternate" hreflang="fr" href="https://www.kallmibukur.al/fr/shop" />
<link rel="alternate" hreflang="x-default" href="https://www.kallmibukur.al/en/shop" />
```

## 2. JSON-LD Schema Markup

### Homepage: Organization + LocalBusiness + WebSite
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Kallmi Estate",
      "url": "https://www.kallmibukur.al",
      "logo": "https://storage.googleapis.com/kallmi/images/logo.png",
      "description": "Premium Albanian olive oil estate in Durres",
      "foundingDate": "1900",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Durres",
        "addressCountry": "AL"
      },
      "sameAs": ["https://instagram.com/kallmiestate"]
    },
    {
      "@type": "WebSite",
      "name": "Kallmi Estate",
      "url": "https://www.kallmibukur.al",
      "inLanguage": ["en", "sq", "it", "de", "fr"]
    }
  ]
}
```

### Restaurant page: Restaurant schema
### Stay page: LodgingBusiness schema
### Shop page: Product schema (for each product)
### Camping page: LodgingBusiness + Campground schema
### Our Story: Organization + AboutPage schema
### Contact: ContactPage + LocalBusiness with geo coordinates

### All pages: FAQPage schema (+40% AI visibility)
Each page gets 3-5 relevant FAQs in structured data.

## 3. Sitemap Enhancement

Update `src/app/api/sitemap/route.ts` to include:
- All actual pages (add restaurant, stay, camping, limited-edition)
- All locale variants with `xhtml:link` hreflang alternates
- Remove non-existent pages (/about, /blog)

```xml
<url>
  <loc>https://www.kallmibukur.al/en/shop</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.kallmibukur.al/en/shop"/>
  <xhtml:link rel="alternate" hreflang="sq" href="https://www.kallmibukur.al/sq/shop"/>
  <xhtml:link rel="alternate" hreflang="it" href="https://www.kallmibukur.al/it/shop"/>
  <xhtml:link rel="alternate" hreflang="de" href="https://www.kallmibukur.al/de/shop"/>
  <xhtml:link rel="alternate" hreflang="fr" href="https://www.kallmibukur.al/fr/shop"/>
</url>
```

## 4. Per-Page Meta Tags

Every page gets full metadata:
- Unique `title` with primary keyword
- Unique `description` (150-160 chars) with keyword
- `keywords` array
- Full `openGraph` with page-specific image
- `twitter` card
- Per-page `canonical` URL
- `alternates.languages` for hreflang

## 5. robots.txt Update

Add PerplexityBot and ClaudeBot (currently has Anthropic-AI and Claude-Web but not the actual bot names):
```
User-agent: PerplexityBot
Allow: /
Disallow: /api/

User-agent: ClaudeBot
Allow: /
Disallow: /api/
```

## 6. GEO Optimization (AI Search Engines)

Apply Princeton GEO methods to content:
- **Citations** (+40%): Add source references to content
- **Statistics** (+37%): Include numbers and data
- **Authoritative tone** (+25%): Confident expert language
- **FAQPage schema** (+40% AI visibility): Structured Q&A per page
- **SpeakableSpecification**: Mark key content for voice search

## 7. Translation Strategy

Phase 1 (this implementation):
- Translate all UI strings (navigation, buttons, labels, form fields)
- Translate page-level SEO metadata (titles, descriptions)
- Translate key content headings and descriptions

Phase 2 (future):
- Professional translation of full page content
- Locale-specific content (Albanian market vs Italian market)

## Success Criteria

- [ ] All 5 locales accessible via subdirectory URLs
- [ ] hreflang tags on every page
- [ ] JSON-LD schema on every page (validates in Google Rich Results Test)
- [ ] Complete sitemap with all pages and locale variants
- [ ] AI bots can access all content
- [ ] FAQPage schema on key pages
- [ ] All pages have full meta tags (title, description, OG, Twitter)
- [ ] robots.txt updated for all AI crawlers
- [ ] Google verification code set (when provided)
- [ ] Build succeeds with `npm run build`
