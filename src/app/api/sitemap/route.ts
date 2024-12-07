import { NextResponse } from 'next/server';

function generateSiteMap() {
  const pages = [
    {
      url: '/',
      lastMod: new Date().toISOString().split('T')[0],
      changeFreq: 'weekly',
      priority: 1.0,
    },
    {
      url: '/shop',
      lastMod: new Date().toISOString().split('T')[0],
      changeFreq: 'daily',
      priority: 0.9,
    },
    {
      url: '/contact',
      lastMod: new Date().toISOString().split('T')[0],
      changeFreq: 'monthly',
      priority: 0.8,
    },
    {
      url: '/limited-edition',
      lastMod: new Date().toISOString().split('T')[0],
      changeFreq: 'weekly',
      priority: 0.9,
    },
    {
      url: '/about',
      lastMod: new Date().toISOString().split('T')[0],
      changeFreq: 'monthly',
      priority: 0.8,
    },
    {
      url: '/blog',
      lastMod: new Date().toISOString().split('T')[0],
      changeFreq: 'weekly',
      priority: 0.7,
    },
  ];

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kallmiestate.com';

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(({ url, lastMod, changeFreq, priority }) => {
          return `
            <url>
              <loc>${baseUrl}${url}</loc>
              <lastmod>${lastMod}</lastmod>
              <changefreq>${changeFreq}</changefreq>
              <priority>${priority}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;
}

export async function GET() {
  const sitemap = generateSiteMap();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}