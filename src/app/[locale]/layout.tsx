import { Cormorant } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale, getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

const cormorant = Cormorant({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kallmibukur.al'),
  title: {
    template: '%s | Kallmi Estate',
    default: 'Kallmi Estate | Premium Albanian Olive Oil'
  },
  description: 'Experience the finest extra virgin olive oil from Albania\'s Kallmi Estate. Hand-harvested, cold-pressed, and crafted with centuries of tradition.',
  keywords: ['olive oil', 'albania', 'kallmi estate', 'premium', 'extra virgin', 'organic'],
  alternates: {
    canonical: 'https://www.kallmibukur.al',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Kallmi Estate',
    title: 'Kallmi Estate | Premium Albanian Olive Oil',
    description: 'Experience the finest extra virgin olive oil from Albania\'s Kallmi Estate.',
    url: 'https://www.kallmibukur.al',
    images: [{
      url: 'https://storage.googleapis.com/kallmi/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Kallmi Estate Olive Oil'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kallmi Estate | Premium Albanian Olive Oil',
    description: 'Experience the finest extra virgin olive oil from Albania\'s Kallmi Estate.',
    images: ['https://storage.googleapis.com/kallmi/images/og-image.jpg'],
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale} className={cormorant.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5BC0XC4J09"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5BC0XC4J09');
          `}
        </Script>
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
