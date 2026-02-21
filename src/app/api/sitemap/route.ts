import { NextResponse } from 'next/server'

const BASE_URL = 'https://www.kallmibukur.al'
const LOCALES = ['en', 'sq', 'it', 'de', 'fr']

const pages = [
  { path: '', changeFreq: 'weekly', priority: 1.0 },
  { path: '/our-story', changeFreq: 'monthly', priority: 0.9 },
  { path: '/restaurant', changeFreq: 'weekly', priority: 0.9 },
  { path: '/stay', changeFreq: 'weekly', priority: 0.9 },
  { path: '/camping', changeFreq: 'weekly', priority: 0.8 },
  { path: '/shop', changeFreq: 'daily', priority: 0.9 },
  { path: '/contact', changeFreq: 'monthly', priority: 0.7 },
]

function generateSiteMap() {
  const today = new Date().toISOString().split('T')[0]

  const urls = pages.flatMap(({ path, changeFreq, priority }) =>
    LOCALES.map((locale) => {
      const loc = `${BASE_URL}/${locale}${path}`
      const xhtmlLinks = LOCALES.map(
        (alt) =>
          `        <xhtml:link rel="alternate" hreflang="${alt}" href="${BASE_URL}/${alt}${path}" />`
      ).join('\n')
      const xDefault = `        <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/en${path}" />`

      return `    <url>
      <loc>${loc}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${changeFreq}</changefreq>
      <priority>${priority}</priority>
${xhtmlLinks}
${xDefault}
    </url>`
    })
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('\n')}
</urlset>`
}

export async function GET() {
  const sitemap = generateSiteMap()

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  })
}
