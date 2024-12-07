import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        CONTACT
      </div>
    </div>
  )
})

export const metadata = {
  title: 'Contact | Kallmi Estate',
  description: 'Get in touch with Kallmi Estate',
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
          <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
            CONTACT
          </div>
        </div>
      }
    >
      <Contact />
    </Suspense>
  )
}