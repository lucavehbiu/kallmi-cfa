import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import WhatsAppButton from '@/components/WhatsAppButton'

const Shop = dynamic(() => import('@/components/Shop'), {
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        SHOP
      </div>
    </div>
  )
})

export const metadata = {
  title: 'Shop | Kallmi Estate',
  description: 'Shop our premium olive oil products',
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
          <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
            SHOP
          </div>
        </div>
      }
    >
      <Shop />
      <WhatsAppButton />
    </Suspense>
  )
}