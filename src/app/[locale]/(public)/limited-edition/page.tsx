import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import LimitedEditionPage from '@/components/LimitedEditionPage'

export const metadata: Metadata = {
  title: 'Limited Edition 2024 | Kallmi Estate',
  description: 'Experience our exclusive first cold press of the 2024 harvest. Limited to only 500 numbered bottles in hand-blown glass with 24k gold leaf details.',
}

export default async function Page({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { setRequestLocale } = await import('next-intl/server')
  setRequestLocale(locale)
  redirect(`/${locale}/our-story`)
  return null
}
