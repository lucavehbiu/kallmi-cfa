import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import WhatsAppButton from '@/components/WhatsAppButton'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { campgroundSchema, faqSchema } from '@/lib/schemas'
import type { Locale } from '@/i18n/routing'

const Camping = dynamic(() => import('@/components/Camping'), {
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        CAMPING
      </div>
    </div>
  )
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata.camping' })
  return generatePageMetadata({
    page: 'camping',
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function CampingPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'FAQ.camping' })
  const faqData = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
  ]
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
      <JsonLd data={[campgroundSchema(locale as Locale), faqSchema(faqData)]} />
      <Camping />
      <WhatsAppButton />
    </Suspense>
  )
}