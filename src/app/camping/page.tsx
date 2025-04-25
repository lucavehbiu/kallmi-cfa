import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import WhatsAppButton from '@/components/WhatsAppButton'

const Camping = dynamic(() => import('@/components/Camping'), {
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        CAMPING
      </div>
    </div>
  )
})

export const metadata = {
  title: 'Camp With Us | Kallmi Estate',
  description: 'Experience unique camping and glamping options nestled among olive groves with breathtaking views of the Adriatic Sea at Kallmi Estate in Albania',
}

export default function CampingPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
          <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
            CAMPING
          </div>
        </div>
      }
    >
      <Camping />
      <WhatsAppButton />
    </Suspense>
  )
}