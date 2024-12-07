import { Cormorant } from 'next/font/google'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kallmiestate.com'),
  title: {
    template: '%s | Kallmi Estate',
    default: 'Kallmi Estate | Premium Albanian Olive Oil'
  },
  description: 'Experience the finest extra virgin olive oil from Albania\'s Kallmi Estate. Hand-harvested, cold-pressed, and crafted with centuries of tradition.',
  keywords: ['olive oil', 'albania', 'kallmi estate', 'premium', 'extra virgin', 'organic'],
  openGraph: {
    type: 'website',
    siteName: 'Kallmi Estate',
    title: 'Kallmi Estate | Premium Albanian Olive Oil',
    description: 'Experience the finest extra virgin olive oil from Albania\'s Kallmi Estate.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Kallmi Estate Olive Oil'
    }]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="min-h-screen bg-stone-50">
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

