'use client'

import { Link } from '@/i18n/navigation'
import { FadeIn } from '../motion/FadeIn'
import { AnimateDiv } from '../motion/MotionWrapper'
import { Section } from '../layout/Section'
import { Card } from '../ui/Card'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  HeartIcon,
  SparklesIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function ContactSection() {
  const t = useTranslations('ContactPage')

  const contactMethods = [
    {
      href: 'mailto:kallmibukur@gmail.com',
      external: false,
      icon: EnvelopeIcon,
      label: t('emailLabel'),
      value: 'kallmibukur@gmail.com'
    },
    {
      href: 'tel:+355682450851',
      external: false,
      icon: PhoneIcon,
      label: t('callLabel'),
      value: '+355 682 450 851'
    },
    {
      href: 'https://instagram.com/kallmi_bukur',
      external: true,
      icon: InstagramIcon,
      label: t('followLabel'),
      value: '@kallmi_bukur'
    }
  ]

  return (
    <section id="contact" className="relative bg-surface-primary overflow-hidden">

      {/* Hero */}
      <div className="relative min-h-[68vh] lg:min-h-[58vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://storage.googleapis.com/kallmi/images/entrance.webp"
            alt="Kallmi Estate Entrance - Welcome to Our Heritage"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Same overlay language as the other page heroes */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 min-h-[68vh] lg:min-h-[58vh] flex items-center justify-center text-center text-white px-4 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="max-w-3xl space-y-5 sm:space-y-6">
            <AnimateDiv animation="fade" duration={1.0} delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-light tracking-wide backdrop-blur-sm">
                <EnvelopeIcon className="w-4 h-4 text-[#C4A862]" />
                {t('heroBadge')}
              </span>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.2}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-wide leading-[1.05]">
                {t('heroTitle')}
                <span className="block font-serif italic text-[#C4A862] mt-2 text-3xl sm:text-5xl lg:text-6xl">
                  {t('heroTitleAccent')}
                </span>
              </h1>
            </AnimateDiv>

            <AnimateDiv animation="fade" duration={0.8} delay={0.4} className="flex items-center justify-center gap-3">
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C4A862]" />
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.0} delay={0.5}>
              <p className="text-base sm:text-xl font-light italic opacity-90 max-w-2xl mx-auto">
                {t('heroDescription')}
              </p>
            </AnimateDiv>

            {/* Quick facts — single hairline band, not a row of glass boxes */}
            <AnimateDiv animation="slide-up" duration={1.0} delay={0.7}>
              <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm max-w-md mx-auto">
                {[
                  { icon: MapPinIcon, text: t('infoLocation') },
                  { icon: ClockIcon, text: t('infoHours') },
                  { icon: SparklesIcon, text: t('infoTours') }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-1.5 px-2 py-4">
                    <item.icon className="w-5 h-5 text-[#C4A862]" />
                    <p className="text-white/90 text-xs sm:text-sm font-light leading-snug text-center">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateDiv>
          </div>
        </div>
      </div>

      {/* Connect + Map */}
      <Section spacing="lg" background="default" containerWidth="md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Connect details */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <FadeIn animation="slide-up">
              <span className="label-eyebrow text-overline block">{t('connectOverline')}</span>
              <div className="divider-accent mt-3" />
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.1}>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extralight text-brand-olive leading-tight">
                {t('connectTitle')}
                <span className="block italic mt-1 sm:mt-2">{t('connectTitleAccent')}</span>
              </h2>
            </FadeIn>

            {/* Contact methods — elegant typographic rows on a single hairline list */}
            <FadeIn animation="fade" delay={0.2}>
              <ul className="mt-8 sm:mt-10 divide-y divide-brand-olive/10 border-y border-brand-olive/10">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <li key={index}>
                      <a
                        href={method.href}
                        {...(method.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="group flex items-center gap-4 sm:gap-6 py-5 min-h-[44px] transition-colors duration-200"
                      >
                        <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-brand-olive transition-colors duration-200 group-hover:bg-brand-olive group-hover:text-white">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-caption">{method.label}</span>
                          <span className="block text-lg sm:text-xl font-light text-brand-olive transition-colors duration-200 group-hover:text-brand-olive-light">
                            {method.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </FadeIn>

            {/* Actions */}
            <FadeIn animation="slide-up" delay={0.3}>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact#visit"
                  className="btn-primary btn-lg w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <MapPinIcon className="w-5 h-5" />
                  {t('visitEstateButton')}
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline btn-lg w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <HeartIcon className="w-5 h-5" />
                  {t('contactUsButton')}
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Map */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <FadeIn animation="slide-up" duration={0.8} delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card border border-brand-olive/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11983.527505482583!2d19.4110409697754!3d41.333181900000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134fda8c7a364bcd%3A0x8399697acbf36121!2sKallmi%20i%20Bukur!5e0!3m2!1sen!2snl!4v1733650293269!5m2!1sen!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kallmi Estate location map"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Heritage Quote */}
      <Section spacing="lg" background="secondary" containerWidth="sm">
        <FadeIn animation="fade">
          <Card variant="elevated" padding="lg" className="max-w-4xl mx-auto text-center">
            <SparklesIcon className="w-10 h-10 text-[#D4AF37] mx-auto mb-6" />
            <blockquote className="text-xl sm:text-2xl text-text-secondary italic font-light leading-relaxed font-sans">
              &ldquo;{t('quote')}&rdquo;
            </blockquote>
            <div className="divider-accent mx-auto mt-8 mb-4" />
            <p className="text-caption">{t('quoteAuthor')}</p>
          </Card>
        </FadeIn>
      </Section>
    </section>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}
