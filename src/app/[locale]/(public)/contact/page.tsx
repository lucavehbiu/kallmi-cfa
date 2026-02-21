import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import WhatsAppButton from '@/components/WhatsAppButton'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import type { Locale } from '@/i18n/routing'

const ContactSection = dynamic(() => import('@/components/sections/Contact'), {
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata.contact' })
  return generatePageMetadata({
    page: 'contact',
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactSection />
      <WhatsAppButton />
    </Suspense>
  )
}