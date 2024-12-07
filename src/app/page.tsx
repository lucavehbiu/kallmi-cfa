import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports with loading states
const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <div className="h-20 bg-stone-900 animate-pulse" />
})

const LandingPage = dynamic(() => import('@/components/LandingPage'), {
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        KALLMI ESTATE
      </div>
    </div>
  )
})

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-20 bg-stone-900 animate-pulse" />
})

export default function Home() {
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