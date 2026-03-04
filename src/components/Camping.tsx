'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FireIcon, HomeIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function Camping() {
  const t = useTranslations('CampingPage')

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface-primary)' }}>

      {/* Hero */}
      <section className="relative min-h-[70vh] lg:min-h-[60vh] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://storage.googleapis.com/kallmi/images/stay_snippet.webp"
            alt="Kallmi Estate Camping - Under the Stars"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 sm:px-6 py-20">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 text-sm font-sans font-medium tracking-wide">
              <FireIcon className="w-4 h-4" />
              {t('heroBadge')}
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide">
              {t('heroTitle')}
              <span className="block text-3xl sm:text-5xl lg:text-6xl italic text-[#D4AF37] mt-2">
                {t('heroTitleAccent')}
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-white/40" />
              <HomeIcon className="w-5 h-5 text-[#D4AF37]" />
              <div className="w-16 h-px bg-white/40" />
            </div>

            <p className="text-lg sm:text-xl font-sans font-light opacity-90 max-w-2xl mx-auto">
              {t.rich('heroSubtitle', {
                accent: (chunks) => <span className="text-[#D4AF37]">{chunks}</span>
              })}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {[
                { icon: HomeIcon, text: t('heroCard1') },
                { icon: SunIcon, text: t('heroCard2') },
                { icon: MoonIcon, text: t('heroCard3') },
              ].map((item, index) => (
                <div key={index} className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-3 min-w-[120px] text-center">
                  <item.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                  <p className="text-white/90 text-sm font-sans">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 sm:py-28">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <span className="label-eyebrow" style={{ color: 'var(--color-brand-olive)' }}>
            {t('bookingOverline')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-light mt-4 mb-3" style={{ color: 'var(--color-brand-olive)' }}>
            {t('bookingTitle')}
          </h2>
          <p className="font-sans text-base mb-10 font-light" style={{ color: 'var(--color-text-secondary)' }}>
            {t('bookingSubtitle')}
          </p>

          <div className="space-y-4 text-left">
            <input
              type="text"
              placeholder={t('formName')}
              className="w-full px-5 py-3.5 rounded-xl border font-sans text-sm focus:outline-none transition-colors"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-secondary)', color: 'var(--color-text-primary)' }}
            />
            <input
              type="email"
              placeholder={t('formEmail')}
              className="w-full px-5 py-3.5 rounded-xl border font-sans text-sm focus:outline-none transition-colors"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-secondary)', color: 'var(--color-text-primary)' }}
            />
            <textarea
              placeholder={t('formSpecialRequests')}
              rows={5}
              className="w-full px-5 py-3.5 rounded-xl border font-sans text-sm focus:outline-none transition-colors resize-none"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-secondary)', color: 'var(--color-text-primary)' }}
            />
            <button
              className="w-full py-4 rounded-xl text-white font-sans font-medium text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--color-brand-olive)' }}
            >
              {t('formSubmit')}
            </button>
          </div>

          <p className="mt-6 text-sm font-sans" style={{ color: 'var(--color-text-tertiary)' }}>
            Or email us at{' '}
            <a href="mailto:reservations@kallmibukur.al" className="underline" style={{ color: 'var(--color-brand-olive)' }}>
              reservations@kallmibukur.al
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
