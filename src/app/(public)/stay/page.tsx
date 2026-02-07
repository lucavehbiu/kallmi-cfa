import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import WhatsAppButton from '@/components/WhatsAppButton'

const Accommodations = dynamic(() => import('@/components/Accommodations'), {
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        ACCOMMODATIONS
      </div>
    </div>
  )
})

export const metadata = {
  title: 'Stay With Us | Kallmi Estate',
  description: 'Experience luxury accommodations nestled among olive groves with breathtaking views of the Adriatic Sea at Kallmi Estate in Albania',
}

export default function AccommodationsPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
          <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
            ACCOMMODATIONS
          </div>
        </div>
      }
    >
      <Accommodations />
      <WhatsAppButton />
    </Suspense>
  )
}