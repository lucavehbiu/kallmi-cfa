import type { Locale } from '@/i18n/routing'

const BASE_URL = 'https://www.kallmibukur.al'

const localeLangMap: Record<Locale, string> = {
  en: 'en',
  sq: 'sq',
  it: 'it',
  de: 'de',
  fr: 'fr',
}

function localeUrl(locale: Locale, path: string = '') {
  return `${BASE_URL}/${locale}${path}`
}

export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kallmi Estate',
    url: BASE_URL,
    logo: 'https://storage.googleapis.com/kallmi/images/logo.webp',
    image: `${BASE_URL}/images/hero.webp`,
    description: 'A family-owned olive estate in Durrës, Albania, producing premium extra virgin olive oil for over a century.',
    foundingDate: '1920',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Durrës',
      addressCountry: 'AL',
    },
    sameAs: [
      'https://www.instagram.com/kallmiestate',
      'https://www.facebook.com/kallmiestate',
    ],
    inLanguage: localeLangMap[locale],
  }
}

export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kallmi Estate',
    url: localeUrl(locale),
    inLanguage: localeLangMap[locale],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function restaurantSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Kallmi Estate Restaurant',
    url: localeUrl(locale, '/restaurant'),
    image: `${BASE_URL}/images/hero.webp`,
    description: 'Farm-to-table restaurant serving authentic Albanian and Mediterranean cuisine with estate-produced olive oil.',
    servesCuisine: ['Albanian', 'Mediterranean'],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Durrës',
      addressCountry: 'AL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.3275',
      longitude: '19.4515',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '23:00',
        validFrom: '2025-04-01',
        validThrough: '2025-10-31',
      },
    ],
    acceptsReservations: true,
    inLanguage: localeLangMap[locale],
  }
}

export function lodgingSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Kallmi Estate Accommodations',
    url: localeUrl(locale, '/stay'),
    image: `${BASE_URL}/images/hero.webp`,
    description: 'Luxury accommodations nestled among century-old olive groves with breathtaking Adriatic Sea views.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Durrës',
      addressCountry: 'AL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.3275',
      longitude: '19.4515',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Breakfast Included', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Olive Oil Tasting', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Sea View', value: true },
    ],
    inLanguage: localeLangMap[locale],
  }
}

export function campgroundSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Campground',
    name: 'Kallmi Estate Camping & Glamping',
    url: localeUrl(locale, '/camping'),
    image: `${BASE_URL}/images/hero.webp`,
    description: 'Glamping and camping among ancient olive groves overlooking the Adriatic Sea.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Durrës',
      addressCountry: 'AL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.3275',
      longitude: '19.4515',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Electrical Hookups', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Restaurant Access', value: true },
    ],
    inLanguage: localeLangMap[locale],
  }
}

export function productSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Kallmi Estate Extra Virgin Olive Oil',
    url: localeUrl(locale, '/shop'),
    image: `${BASE_URL}/images/hero.webp`,
    description: 'Premium cold-pressed extra virgin olive oil from hand-harvested Albanian olives.',
    brand: {
      '@type': 'Brand',
      name: 'Kallmi Estate',
    },
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Albania',
    },
    material: 'Extra Virgin Olive Oil',
    inLanguage: localeLangMap[locale],
  }
}

export function faqSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}
