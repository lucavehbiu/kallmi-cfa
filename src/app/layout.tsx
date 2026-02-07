import { Cormorant } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

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
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Kallmi Estate Olive Oil'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kallmi Estate | Premium Albanian Olive Oil',
    description: 'Experience the finest extra virgin olive oil from Albania\'s Kallmi Estate.',
    images: ['/images/og-image.jpg'],
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Add your Google verification code
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cormorant.variable}>
      <head>
        {/* Google Analytics */}
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
        {children}
      </body>
    </html>
  )
}
