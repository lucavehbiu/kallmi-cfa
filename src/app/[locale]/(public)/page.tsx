import ClientLandingWrapper from '@/components/ClientLandingWrapper'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, websiteSchema, faqSchema } from '@/lib/schemas'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata.home' })
  return generatePageMetadata({
    page: 'home',
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'FAQ.home' })

  const faqData = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
  ]

  return (
    <>
      <JsonLd data={[
        organizationSchema(locale as Locale),
        websiteSchema(locale as Locale),
        faqSchema(faqData),
      ]} />
      <ClientLandingWrapper />
    </>
  )
}