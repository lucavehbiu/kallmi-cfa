'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { FireIcon, HomeIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { AnimateDiv } from './motion/MotionWrapper'

export default function Camping() {
  const t = useTranslations('CampingPage')
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return

    // Parallax only earns its keep on desktop pointers. Skip it for touch /
    // small screens and anyone who prefers reduced motion — hero stays static.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(min-width: 640px)').matches
    if (reduceMotion || !isDesktop) return

    let ticking = false
    const update = () => {
      // Write straight to the node and stay on the GPU — no React re-render.
      el.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0) scale(1.12)`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const heroCards = [
    { icon: HomeIcon, text: t('heroCard1') },
    { icon: SunIcon, text: t('heroCard2') },
    { icon: MoonIcon, text: t('heroCard3') },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--color-surface-primary)' }}>

      {/* Hero */}
      <section className="relative min-h-[88vh] sm:min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <div
            ref={parallaxRef}
            className="absolute inset-0 will-change-transform"
            style={{ transform: 'scale(1.12)' }}
          >
            <Image
              src="https://storage.googleapis.com/kallmi/images/stay_snippet.webp"
              alt="Kallmi Estate Camping - Under the Stars"
              className="object-cover object-center"
              fill
              priority
              sizes="100vw"
              quality={90}
            />
          </div>

          {/* Gradient overlays — same family as other page heroes */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[88vh] sm:min-h-[80vh] text-center text-white px-5 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="max-w-3xl space-y-6 sm:space-y-7">
            <AnimateDiv animation="fade" duration={1.0} delay={0.15} className="inline-flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] backdrop-blur-sm">
                <FireIcon className="h-3.5 w-3.5 text-[#D4AF37]" />
                {t('heroBadge')}
              </span>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.1} delay={0.3}>
              <h1 className="font-serif text-5xl font-extralight leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                {t('heroTitle')}
                <span className="mt-2 block italic text-[#D4AF37]">
                  {t('heroTitleAccent')}
                </span>
              </h1>
            </AnimateDiv>

            <AnimateDiv animation="fade" duration={0.8} delay={0.55} className="flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/50 sm:w-16" />
              <HomeIcon className="h-5 w-5 text-[#D4AF37]" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/50 sm:w-16" />
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.0} delay={0.7}>
              <p className="mx-auto max-w-xl text-base font-light leading-relaxed opacity-90 sm:text-lg">
                {t.rich('heroSubtitle', {
                  accent: (chunks) => <span className="text-[#D4AF37]">{chunks}</span>,
                })}
              </p>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.0} delay={0.9}>
              <ul className="mx-auto grid max-w-md grid-cols-3 gap-3 sm:gap-4">
                {heroCards.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.08] px-2 py-4 text-center backdrop-blur-sm"
                  >
                    <item.icon className="h-5 w-5 text-[#D4AF37]" />
                    <span className="text-xs font-light leading-tight text-white/90 sm:text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </AnimateDiv>
          </div>
        </div>
      </section>

      {/* Booking / Contact */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-lg px-5 sm:px-6">
          <AnimateDiv animation="slide-up" duration={0.8} className="text-center">
            <span className="label-eyebrow" style={{ color: 'var(--color-brand-olive)' }}>
              {t('bookingOverline')}
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl" style={{ color: 'var(--color-text-primary)' }}>
              {t('bookingTitle')}
            </h2>
            <div className="divider-accent mx-auto my-5" />
            <p className="text-body mx-auto max-w-md">
              {t('bookingSubtitle')}
            </p>
          </AnimateDiv>

          <AnimateDiv animation="slide-up" duration={0.8} delay={0.15}>
            <form className="mt-10 space-y-4 text-left">
              <input
                type="text"
                placeholder={t('formName')}
                className="input-field text-sm"
              />
              <input
                type="email"
                placeholder={t('formEmail')}
                className="input-field text-sm"
              />
              <textarea
                placeholder={t('formSpecialRequests')}
                rows={5}
                className="textarea-field text-sm"
              />
              <button
                type="submit"
                className="btn-primary w-full justify-center py-4 text-center text-sm font-medium"
              >
                {t('formSubmit')}
              </button>
            </form>

            <p className="mt-6 text-center text-sm font-light" style={{ color: 'var(--color-text-tertiary)' }}>
              Or email us at{' '}
              <a
                href="mailto:reservations@kallmibukur.al"
                className="link-underline"
              >
                reservations@kallmibukur.al
              </a>
            </p>
          </AnimateDiv>
        </div>
      </section>

    </div>
  )
}
