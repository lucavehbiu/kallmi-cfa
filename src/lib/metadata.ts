import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'

const BASE_URL = 'https://www.kallmibukur.al'

type PageKey = 'home' | 'restaurant' | 'stay' | 'camping' | 'shop' | 'ourStory' | 'contact'

const pagePaths: Record<PageKey, string> = {
  home: '',
  restaurant: '/restaurant',
  stay: '/stay',
  camping: '/camping',
  shop: '/shop',
  ourStory: '/our-story',
  contact: '/contact',
}

export function generatePageMetadata({
  page,
  locale,
  title,
  description,
}: {
  page: PageKey
  locale: Locale
  title: string
  description: string
}): Metadata {
  const path = pagePaths[page]
  const url = `${BASE_URL}/${locale}${path}`

  const alternates: Record<string, string> = {}
  for (const loc of routing.locales) {
    alternates[loc] = `${BASE_URL}/${loc}${path}`
  }
  alternates['x-default'] = `${BASE_URL}/en${path}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Kallmi Estate',
      locale: locale === 'sq' ? 'sq_AL' : locale,
      type: page === 'home' ? 'website' : 'article',
      images: [
        {
          url: `${BASE_URL}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: 'Kallmi Estate - Albanian Olive Oil',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/images/hero.webp`],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
