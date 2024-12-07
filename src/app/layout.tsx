import { Cormorant } from 'next/font/google'
import { Metadata } from 'next'
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
  description: 'Experience the finest cold-pressed extra virgin olive oil from Albania\'s pristine Kallmi coast.',
  openGraph: {
    type: 'website',
    siteName: 'Kallmi Estate',
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
        {children}
      </body>
    </html>
  )
}

