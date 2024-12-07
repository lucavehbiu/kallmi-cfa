import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <ContactLoading />
})

function ContactLoading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-50">
      <div className="text-stone-800 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        CONTACT
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Contact | Kallmi Estate',
  description: 'Get in touch with Kallmi Estate. Visit our olive groves in Durrës, Albania, or reach out to learn more about our premium olive oil products.',
  openGraph: {
    title: 'Contact | Kallmi Estate',
    description: 'Get in touch with Kallmi Estate. Visit our olive groves in Durrës, Albania, or reach out to learn more about our premium olive oil products.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <Contact />
    </Suspense>
  )
}