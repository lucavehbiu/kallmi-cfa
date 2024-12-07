import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

const Header = dynamic(() => import('@/components/Header'), {
  ssr: true,
  loading: () => <div className="h-20 bg-stone-900 animate-pulse" />
})

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true,
  loading: () => <div className="h-20 bg-stone-900 animate-pulse" />
})

const LandingPage = dynamic(() => import('@/components/LandingPage'), {
  ssr: true,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        KALLMI ESTATE
      </div>
    </div>
  )
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
      <Suspense fallback={<div className="h-20 bg-stone-900 animate-pulse" />}>
        <Header />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
            <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
              KALLMI ESTATE
            </div>
          </div>
        }
      >
        <LandingPage />
      </Suspense>

      <Suspense fallback={<div className="h-20 bg-stone-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  )
}