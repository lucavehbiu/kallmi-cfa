import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { LoadingSpinner } from '@/components/ui'

console.log('Loading page.tsx module')

const Header = dynamic(() => {
  console.log('Loading Header dynamically')
  return import('@/components/Header')
})

const Footer = dynamic(() => {
  console.log('Loading Footer dynamically')
  return import('@/components/Footer')
})

const LandingPage = dynamic(() => import('@/components/LandingPage'), {
  ssr: false,
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
  console.log('Rendering HomePage component')
  return (
    <>
      <Suspense fallback={<LoadingSpinner variant="header" />}>
        <Header />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <LandingPage />
      </Suspense>

      <Suspense fallback={<LoadingSpinner variant="header" />}>
        <Footer />
      </Suspense>
    </>
  )
}