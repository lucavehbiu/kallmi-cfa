import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kallmi | Premium Olive Oil',
  description: 'Experience the finest olive oil from our estate',
  keywords: ['olive oil', 'premium', 'estate', 'kallmi', 'organic'],
  authors: [{ name: 'Kallmi Estate' }],
  creator: 'Kallmi Estate',
  publisher: 'Kallmi Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className={`${inter.className} w-full min-h-screen`}>
        <div id="root" className="w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}