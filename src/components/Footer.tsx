'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

export function Footer() {
  const t = useTranslations('FooterFull')

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navLinks: Array<{ label: string; href: string }> = [
    { label: t('ourHeritage'), href: '/our-story' },
    { label: t('premiumOils'), href: '/shop' },
    { label: t('fineDining'), href: '/restaurant' },
    { label: t('estateStay'), href: '/camping' },
    { label: t('visitUs'), href: '/contact' },
  ]

  return (
    <footer
      className="relative overflow-hidden font-sans"
      style={{ backgroundColor: '#1A1814' }}
    >
      {/* Top gold rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, #C4A862 40%, #C4A862 60%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-10 lg:pt-20 lg:pb-12">

        {/* ── MOBILE LAYOUT: single column centered ── */}
        {/* ── LG LAYOUT: three balanced columns ── */}

        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-8">

          {/* Column 1 — Logo + Tagline */}
          <div className="flex flex-col items-center lg:items-start gap-5 lg:max-w-[220px]">
            <Link href="/" className="block opacity-90 hover:opacity-100 transition-opacity duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/kallmi-white.svg"
                alt="Kallmi Estate"
                style={{ width: '180px', height: '52px', objectFit: 'contain' }}
              />
            </Link>

            <p
              className="text-center lg:text-left text-sm leading-relaxed italic"
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                color: 'rgba(250,250,248,0.60)',
              }}
            >
              {t('brandDescription')}
            </p>
          </div>

          {/* Column 2 — Nav links */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <span
              className="text-[10px] tracking-[0.18em] uppercase mb-1 font-sans"
              style={{ color: '#C4A862' }}
            >
              {t('discover')}
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as '/our-story' | '/shop' | '/restaurant' | '/camping' | '/contact'}
                className="text-sm font-sans tracking-wide transition-colors duration-300 hover:text-white"
                style={{ color: 'rgba(250,250,248,0.65)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <span
              className="text-[10px] tracking-[0.18em] uppercase mb-1 font-sans"
              style={{ color: '#C4A862' }}
            >
              {t('visitTitle')}
            </span>

            <address className="not-italic text-sm font-sans leading-relaxed text-center lg:text-left"
              style={{ color: 'rgba(250,250,248,0.65)' }}
            >
              Rruga Currila, 2001<br />
              Durrës, Albania
            </address>

            <a
              href="tel:+355682450851"
              className="text-sm font-sans tracking-wide transition-colors duration-300 hover:text-white"
              style={{ color: 'rgba(250,250,248,0.65)' }}
            >
              +355 68 24 50 851
            </a>

            <a
              href="mailto:info@kallmibukur.al"
              className="text-sm font-sans tracking-wide transition-colors duration-300 hover:text-white"
              style={{ color: 'rgba(250,250,248,0.65)' }}
            >
              info@kallmibukur.al
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-12 mb-7 h-px"
          style={{ backgroundColor: 'rgba(250,250,248,0.08)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">

          {/* Copyright */}
          <p
            className="text-xs font-sans tracking-wide text-center"
            style={{ color: 'rgba(250,250,248,0.35)' }}
          >
            &copy; {new Date().getFullYear()} Kallmi Estate &mdash; Albania
          </p>

          {/* Developer credit */}
          <p
            className="text-xs font-sans text-center"
            style={{ color: 'rgba(250,250,248,0.25)' }}
          >
            {t('developedBy')}{' '}
            <a
              href="https://lucavehbiu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white"
              style={{ color: 'rgba(196,168,98,0.7)' }}
            >
              Luca
            </a>
          </p>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-sans tracking-widest uppercase transition-colors duration-300 hover:text-white"
            style={{ color: 'rgba(250,250,248,0.40)' }}
          >
            <span>{t('backToTop')}</span>
            <ArrowUpIcon
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
