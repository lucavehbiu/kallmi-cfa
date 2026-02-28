'use client'

import { FadeIn } from './motion/FadeIn'
import LandingHero from './sections/LandingHero'
import RestaurantSnippet from './sections/RestaurantSnippet'
import AccommodationsSnippet from './sections/AccommodationsSnippet'
import WhatsAppButton from './WhatsAppButton'
import OptimizedImage from './common/OptimizedImage'
import { Card } from './ui/Card'
import { Section, SectionHeader } from './layout/Section'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function LandingPage() {
  const t = useTranslations('Landing')
  return (
    <main className="font-cormorant bg-surface-primary">
      <LandingHero />

      {/* Story Section - Clean editorial style */}
      <Section id="story" spacing="lg" background="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
            <FadeIn animation="slide-up">
              <div className="space-y-4">
                <span className="text-overline">{t('heritageOverline')}</span>
                <div className="divider-accent" />
              </div>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-brand-olive leading-tight">
                {t('heritageTitle1')}
                <span className="block italic mt-2">{t('heritageTitle2')}</span>
              </h2>
            </FadeIn>

            <FadeIn animation="fade" delay={0.2}>
              <div className="space-y-6">
                <p className="text-body-lg pl-6 border-l-2 border-brand-olive/30">
                  {t('heritageText1')}
                </p>
                <p className="text-body-lg pl-6 border-l-2 border-brand-olive/30">
                  {t('heritageText2')}
                </p>
              </div>
            </FadeIn>

            {/* Stats - Clean cards instead of glass-morphism */}
            <FadeIn animation="slide-up" delay={0.3}>
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { number: '2004', label: t('established') },
                  { number: '20+', label: t('years') },
                  { number: '4th', label: t('generation') }
                ].map((stat, index) => (
                  <Card key={index} variant="subtle" padding="md" className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-brand-olive">
                      {stat.number}
                    </div>
                    <div className="text-caption mt-1">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <FadeIn animation="slide-up" delay={0.2}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                <OptimizedImage
                  src="https://storage.googleapis.com/kallmi/images/about_snippet.webp"
                  alt="Kallmi Estate olive groves"
                  className="object-cover img-hover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  quality={90}
                  loading="lazy"
                  id="about_snippet"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Experience Section - Editorial magazine style */}
      <Section id="experience" spacing="lg" background="secondary">
        <FadeIn animation="fade">
          <SectionHeader
            overline={t('discoverOverline')}
            title={
              <h2 className="text-display text-brand-olive">
                {t('discoverTitle')}
              </h2>
            }
            subtitle={t('discoverSubtitle')}
            align="center"
          />
        </FadeIn>

        {/* Featured Experience Card */}
        <FadeIn animation="slide-up" delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-lg group">
              <div className="aspect-[16/10] relative">
                <OptimizedImage
                  src="https://storage.googleapis.com/kallmi/images/sunset3.webp"
                  alt="Breathtaking Adriatic Sunsets"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  quality={90}
                  loading="lazy"
                  id="sunset3"
                />
                {/* Single clean overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Content - No glass-morphism, clean solid treatment */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl text-white font-light tracking-wide mb-3">
                    {t('goldenHourTitle')}
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg lg:text-xl font-light max-w-2xl">
                    {t('goldenHourText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Restaurant Section */}
      <RestaurantSnippet />

      {/* Accommodations Section */}
      <AccommodationsSnippet />

      {/* Sunset Gallery - Clean editorial layout */}
      <Section id="sunsets" spacing="lg" background="default">
        <FadeIn animation="fade">
          <div className="text-center mb-16 lg:mb-24">
            <span className="text-overline mb-4 block">{t('sunsetOverline')}</span>
            <h2 className="text-display text-brand-olive mt-4 mb-6">
              {t('sunsetTitle1')}
              <span className="block italic mt-2">{t('sunsetTitle2')}</span>
            </h2>
            <p className="text-subheading max-w-3xl mx-auto">
              {t('sunsetText')}
            </p>
            <div className="divider-center mt-8" />
          </div>
        </FadeIn>

        {/* Two-column image grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <FadeIn animation="slide-up" delay={0.1}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group">
              <OptimizedImage
                src="https://storage.googleapis.com/kallmi/images/story.webp"
                alt="Adriatic Sunset View"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                id="story"
              />
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.2}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group">
              <OptimizedImage
                src="https://storage.googleapis.com/kallmi/images/sunset2.webp"
                alt="Golden Hour at Kallmi Beach"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                id="sunset2"
              />
            </div>
          </FadeIn>
        </div>

        {/* Quote - Clean card, no glass-morphism */}
        <FadeIn animation="fade" delay={0.4}>
          <Card variant="elevated" padding="lg" className="max-w-4xl mx-auto mt-16 text-center">
            <p className="text-xl sm:text-2xl text-text-secondary italic font-light leading-relaxed">
              {t('sunsetQuote')}
            </p>
            <div className="divider-accent mx-auto mt-8" />
          </Card>
        </FadeIn>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg" background="inverse">
        <FadeIn animation="fade">
          <div className="text-center">
            <h2 className="text-display text-text-on-dark mb-6">
              {t('ctaTitle')}
            </h2>
            <p className="text-text-on-dark-muted text-xl max-w-2xl mx-auto mb-10">
              {t('ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/stay"
                className="btn-primary-on-dark btn-lg"
              >
                {t('ctaBook')}
              </Link>
              <Link
                href="/restaurant"
                className="btn-ghost-on-dark btn-lg"
              >
                {t('ctaDine')}
              </Link>
              <Link
                href="/shop"
                className="btn-ghost-on-dark btn-lg"
              >
                {t('ctaShop')}
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>

      <WhatsAppButton />
    </main>
  )
}
