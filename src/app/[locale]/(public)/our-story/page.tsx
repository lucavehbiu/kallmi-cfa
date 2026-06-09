import Image from 'next/image'
import { AnimateDiv } from '@/components/motion/MotionWrapper'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Section, SectionHeader } from '@/components/layout/Section'
import {
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  BeakerIcon,
  SunIcon,
  GlobeAltIcon,
  UserGroupIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata.ourStory' })
  return generatePageMetadata({
    page: 'ourStory',
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function OurStory({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'OurStory' })

  const milestones = [
    { year: t('milestone1Year'), event: t('milestone1Event'), icon: HeartIcon },
    { year: t('milestone2Year'), event: t('milestone2Event'), icon: StarIcon },
    { year: t('milestone3Year'), event: t('milestone3Event'), icon: SunIcon },
    { year: t('milestone4Year'), event: t('milestone4Event'), icon: TrophyIcon },
  ]

  const values = [
    { icon: ClockIcon, title: t('valueTraditionTitle'), description: t('valueTraditionDesc') },
    { icon: StarIcon, title: t('valueQualityTitle'), description: t('valueQualityDesc') },
    { icon: BeakerIcon, title: t('valueSustainabilityTitle'), description: t('valueSustainabilityDesc') },
  ]

  const processSteps = [
    { icon: SunIcon, title: t('processStep1Title'), description: t('processStep1Desc') },
    { icon: SparklesIcon, title: t('processStep2Title'), description: t('processStep2Desc') },
    { icon: HeartIcon, title: t('processStep3Title'), description: t('processStep3Desc') },
  ]

  const heroInfo = [
    { icon: ClockIcon, text: t('infoYears') },
    { icon: MapPinIcon, text: t('infoLocation') },
    { icon: UserGroupIcon, text: t('infoGeneration') },
  ]

  return (
    <main className="bg-surface-primary">

      {/* Hero Section */}
      <section className="relative min-h-[78vh] sm:min-h-[70vh] lg:min-h-[64vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://storage.googleapis.com/kallmi/images/entrance.webp"
            alt="Kallmi Estate - Gateway to Heritage"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/65" />
        </div>

        <div className="relative z-10 w-full text-center text-white px-5 sm:px-6 py-20">
          <div className="max-w-3xl mx-auto space-y-7">
            <AnimateDiv animation="fade" duration={1.0} delay={0.1}>
              <span className="inline-flex items-center gap-2 text-overline text-white/80">
                <SparklesIcon className="w-4 h-4 text-[#D4AF37]" />
                {t('heroBadge')}
              </span>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.0} delay={0.2}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-wide leading-[1.05]">
                {t('heroTitle')}
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic text-[#D4AF37] mt-2">
                  {t('heroTitleAccent')}
                </span>
              </h1>
            </AnimateDiv>

            <AnimateDiv animation="fade" duration={1.0} delay={0.4}>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-white/40" />
                <HeartIcon className="w-5 h-5 text-[#D4AF37]" />
                <div className="w-12 h-px bg-white/40" />
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.0} delay={0.5}>
              <p className="text-lg sm:text-xl font-light text-white/90 max-w-xl mx-auto leading-relaxed">
                {t('heroDescription1')}<span className="text-[#D4AF37]">{t('heroDescriptionAccent1')}</span>
                {t('heroDescription2')}
                <span className="text-[#D4AF37]">{t('heroDescriptionAccent2')}</span>
              </p>
            </AnimateDiv>

            {/* Info row - hairline-divided band, no glass boxes */}
            <AnimateDiv animation="slide-up" duration={1.0} delay={0.7}>
              <div className="flex items-stretch justify-center max-w-md mx-auto mt-10 border-y border-white/20">
                {heroInfo.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-1 py-4 px-2 text-center ${index > 0 ? 'border-l border-white/20' : ''}`}
                  >
                    <item.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
                    <p className="text-white/90 text-xs sm:text-sm leading-snug">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimateDiv>
          </div>
        </div>
      </section>

      {/* Heritage Section - editorial two-column */}
      <Section spacing="lg" background="default" containerWidth="md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

          {/* Content Side */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <AnimateDiv animation="slide-up">
              <div className="space-y-4">
                <span className="label-eyebrow text-overline flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  {t('heritageOverline')}
                </span>
                <div className="divider-accent" />
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" delay={0.1}>
              <h2 className="text-display text-brand-olive leading-tight mt-6">
                {t('heritageTitle')}
                <span className="block italic text-[#D4AF37] mt-2">{t('heritageTitleAccent')}</span>
              </h2>
            </AnimateDiv>

            {/* Long-form body at comfortable reading width — no side-stripe borders */}
            <AnimateDiv animation="fade" delay={0.2}>
              <div className="mt-8 space-y-6 max-w-prose">
                <p className="text-body-lg">{t('heritageText1')}</p>
                <p className="text-body-lg">{t('heritageText2')}</p>
                <p className="text-body-lg">{t('heritageText3')}</p>
              </div>
            </AnimateDiv>

            {/* Heritage timeline - hairline-divided band */}
            <AnimateDiv animation="slide-up" delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-4 mt-10 border-y border-brand-olive/15">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`text-center py-6 px-3 ${
                      index % 2 !== 0 ? 'border-l border-brand-olive/15' : ''
                    } ${index >= 2 ? 'border-t border-brand-olive/15 sm:border-t-0' : ''} ${
                      index !== 0 ? 'sm:border-l sm:border-brand-olive/15' : ''
                    }`}
                  >
                    <milestone.icon className="w-6 h-6 text-[#D4AF37] mx-auto mb-3" />
                    <div className="text-2xl lg:text-3xl font-light text-brand-olive leading-none">
                      {milestone.year}
                    </div>
                    <div className="text-caption mt-2">{milestone.event}</div>
                  </div>
                ))}
              </div>
            </AnimateDiv>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <AnimateDiv animation="slide-up" duration={1.2} delay={0.2}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://storage.googleapis.com/kallmi/images/hero-2nd.webp"
                  alt="Historic view of Kallmi Estate olive grove"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 600px"
                  quality={85}
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                  <div>
                    <div className="text-sm font-medium">{t('imageBadgeEst')}</div>
                    <div className="text-white/75 text-xs">{t('imageBadgeHeritage')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#D4AF37] text-sm font-medium">{t('imageBadgeYears')}</div>
                    <div className="text-white/75 text-xs">{t('imageBadgeTradition')}</div>
                  </div>
                </div>
              </div>
            </AnimateDiv>
          </div>
        </div>
      </Section>

      {/* Values Section - editorial hairline-divided list, not identical cards */}
      <Section spacing="lg" background="secondary" containerWidth="md">
        <AnimateDiv animation="fade">
          <SectionHeader
            overline={t('valuesOverline')}
            title={<h2 className="text-display text-brand-olive">{t('valuesTitle')}</h2>}
            subtitle={t('valuesSubtitle')}
            align="center"
          />
        </AnimateDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-brand-olive/15 border-t border-brand-olive/15">
          {values.map((value, index) => (
            <AnimateDiv
              key={index}
              animation="slide-up"
              duration={0.7}
              delay={0.15 + index * 0.15}
              className="group"
            >
              <div className="h-full px-2 py-10 md:px-8 lg:px-10 text-center md:text-left border-b border-brand-olive/15 md:border-b-0">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-olive/10 text-brand-olive mb-6 transition-colors duration-300 group-hover:bg-brand-olive group-hover:text-white">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-light text-brand-olive mb-4">
                  {value.title}
                </h3>
                <p className="text-body max-w-prose mx-auto md:mx-0">
                  {value.description}
                </p>
              </div>
            </AnimateDiv>
          ))}
        </div>
      </Section>

      {/* Process Section - dark editorial */}
      <Section spacing="lg" background="inverse" containerWidth="md">
        <AnimateDiv animation="fade">
          <div className="text-center mb-14 sm:mb-20">
            <span className="text-overline text-[#D4AF37] block mb-4">{t('processOverline')}</span>
            <h2 className="text-display text-text-on-dark">{t('processTitle')}</h2>
            <p className="text-text-on-dark-muted text-lg sm:text-xl font-light max-w-2xl mx-auto mt-5 leading-relaxed">
              {t('processSubtitle')}
            </p>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-7" />
          </div>
        </AnimateDiv>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">

          {/* Image Side */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <AnimateDiv animation="slide-up" duration={1.2} delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="https://storage.googleapis.com/kallmi/images/hand-harvested.webp"
                  alt="Artisanal olive oil production process at Kallmi Estate"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  quality={85}
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                  <div>
                    <div className="text-[#D4AF37] text-sm font-medium">{t('processBadgeColdPressed')}</div>
                    <div className="text-white/75 text-xs">{t('processBadgeWithinHours')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{t('processBadgeExtraVirgin')}</div>
                    <div className="text-white/75 text-xs">{t('processBadgePremiumQuality')}</div>
                  </div>
                </div>
              </div>
            </AnimateDiv>
          </div>

          {/* Steps Side - numbered editorial list */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {processSteps.map((step, index) => (
                <AnimateDiv
                  key={index}
                  animation="slide-up"
                  delay={0.3 + index * 0.15}
                >
                  <div className="flex items-start gap-5 py-7 group">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-[#D4AF37] transition-colors duration-300 group-hover:bg-[#D4AF37] group-hover:text-[#6B563F]">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="text-[#D4AF37]/70 text-sm font-light tabular-nums">
                          0{index + 1}
                        </span>
                        <h3 className="text-xl lg:text-2xl font-light text-text-on-dark">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-text-on-dark-muted font-light leading-relaxed mt-2 max-w-prose">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimateDiv>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Family Legacy Section - centered long-form + pull quote */}
      <Section spacing="lg" background="default" containerWidth="sm">
        <div className="text-center">
          <AnimateDiv animation="slide-up">
            <span className="text-overline block mb-4">{t('legacyOverline')}</span>
            <h2 className="text-display text-brand-olive leading-tight">
              {t('legacyTitle')}
              <span className="block italic text-[#D4AF37] mt-2">{t('legacyTitleAccent')}</span>
            </h2>
          </AnimateDiv>

          <AnimateDiv animation="fade" delay={0.2}>
            <div className="flex items-center justify-center gap-4 mt-10 mb-10">
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-brand-olive/40" />
              <GlobeAltIcon className="w-8 h-8 text-[#D4AF37]" />
              <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-brand-olive/40" />
            </div>
          </AnimateDiv>

          {/* Flat, no nested card — body at reading width */}
          <AnimateDiv animation="slide-up" delay={0.3}>
            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-lg sm:text-2xl text-text-secondary leading-relaxed font-light">
                {t('legacyText1')}
              </p>
              <p className="text-lg sm:text-2xl text-text-secondary leading-relaxed font-light">
                {t('legacyText2')}
              </p>
            </div>
          </AnimateDiv>

          <AnimateDiv animation="slide-up" delay={0.45}>
            <div className="inline-flex items-center gap-3 px-8 py-4 mt-12 bg-brand-olive hover:bg-brand-olive-dark text-white rounded-2xl font-medium transition-colors duration-300">
              <HeartIcon className="w-5 h-5" />
              <span>{t('legacyCta')}</span>
            </div>
          </AnimateDiv>
        </div>

        {/* Pull quote - centered, no glass, hairline framing */}
        <AnimateDiv animation="fade" delay={0.5}>
          <figure className="max-w-3xl mx-auto mt-20 text-center">
            <SparklesIcon className="w-10 h-10 text-[#D4AF37] mx-auto mb-6" />
            <blockquote className="text-2xl sm:text-3xl italic text-brand-olive font-light leading-relaxed">
              &ldquo;{t('legacyQuote')}&rdquo;
            </blockquote>
            <div className="divider-accent mx-auto mt-8" />
            <figcaption className="text-caption mt-4">
              {t('legacyQuoteAuthor')}
            </figcaption>
          </figure>
        </AnimateDiv>
      </Section>

      <WhatsAppButton />
    </main>
  )
}
