import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import WhatsAppButton from '@/components/WhatsAppButton'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { productSchema, faqSchema } from '@/lib/schemas'
import type { Locale } from '@/i18n/routing'

const Shop = dynamic(() => import('@/components/Shop'), {
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        SHOP
      </div>
    </div>
  )
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata.shop' })
  return generatePageMetadata({
    page: 'shop',
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function ShopPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'FAQ.shop' })
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
            SHOP
          </div>
        </div>
      }
    >
      <JsonLd data={[productSchema(locale as Locale), faqSchema(faqData)]} />
      <Shop />
      <WhatsAppButton />
    </Suspense>
  )
}