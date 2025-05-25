import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import WhatsAppButton from '@/components/WhatsAppButton'

const Restaurant = dynamic(() => import('@/components/Restaurant'), {
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        RESTAURANT
      </div>
    </div>
  )
})

export const metadata = {
  title: 'Restaurant | Kallmi Estate',
  description: 'Experience authentic Albanian cuisine with a modern twist at our estate restaurant, featuring the freshest local ingredients and our own olive oil',
}

export default function RestaurantPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
          <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
            RESTAURANT
          </div>
        </div>
      }
    >
      <Restaurant />
      <WhatsAppButton />
    </Suspense>
  )
}