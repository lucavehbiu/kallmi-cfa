import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { LoadingSpinner } from '@/components/ui'

const Header = dynamic(() => import('@/components/Header'), {
  ssr: true,
  loading: () => <LoadingSpinner variant="header" />
})

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
  loading: () => <LoadingSpinner variant="header" />
})

const LandingPage = dynamic(() => import('@/components/LandingPage'), {
  ssr: true,
  loading: () => <LoadingSpinner />
})

export const metadata: Metadata = {
  title: 'Kallmi Estate | Premium Albanian Olive Oil',
  description: 'Experience the finest extra virgin olive oil from Albania\'s Kallmi Estate. Hand-harvested, cold-pressed, and crafted with centuries of tradition.',
  keywords: ['olive oil', 'albania', 'kallmi estate', 'premium', 'extra virgin', 'organic'],
  openGraph: {
    title: 'Kallmi Estate | Premium Albanian Olive Oil',
    description: 'Experience the finest extra virgin olive oil from Albania\'s Kallmi Estate.',
    images: ['/images/hero-3rd.webp'],
  }
}

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Suspense fallback={<LoadingSpinner variant="header" />}>
        <Header />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <LandingPage />
      </Suspense>

      <Suspense fallback={<LoadingSpinner variant="header" />}>
        <Footer />
      </Suspense>
    </main>
  )
}