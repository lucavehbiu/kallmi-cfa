'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { FadeIn } from '../motion/FadeIn'
import { Section } from '../layout/Section'
import { Button } from '../ui/Button'
import { useTranslations } from 'next-intl'

export default function AccommodationsSnippet() {
  const t = useTranslations('AccommodationsSnippet')
  return (
    <Section spacing="lg" background="default">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <FadeIn animation="slide-up">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src="https://storage.googleapis.com/kallmi/images/stay_snippet.webp"
              alt="Kallmi Estate Accommodations"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              quality={85}
              loading="lazy"
            />
          </div>
        </FadeIn>

        {/* Content */}
        <div className="space-y-6">
          <FadeIn animation="slide-up">
            <div className="space-y-4">
              <span className="text-overline">{t('overline')}</span>
              <div className="divider-accent" />
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.1}>
            <h2 className="text-heading text-brand-olive">{t('title')}</h2>
          </FadeIn>

          <FadeIn animation="fade" delay={0.2}>
            <div className="space-y-4 text-body-lg">
              <p>
                {t('text1')}
              </p>
              <p>
                {t('text2')}
              </p>
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.3}>
            <Link href="/stay">
              <Button variant="primary" className="mt-4">
                {t('cta')}
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
