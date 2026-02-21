'use client'

import { Link } from '@/i18n/navigation'
import { useState } from 'react'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('FooterFull')
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-[#1A1A1A] via-[#1C1C1C] to-[#0F0F0F] text-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#8B7355]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/2 rounded-full blur-3xl" />
      </div>

      {/* Elegant Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B7355]/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">

          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="font-cormorant text-3xl lg:text-4xl font-light tracking-wider text-[#D4AF37]">
                KALLMI
              </h3>
              <div className="w-16 h-px bg-gradient-to-r from-[#8B7355] to-[#D4AF37] mx-auto md:mx-0" />
              <p className="text-sm lg:text-base text-white/70 leading-relaxed max-w-xs mx-auto md:mx-0">
                {t('brandDescription')}
              </p>
            </div>

            {/* Heritage Badge */}
            <div className="inline-block backdrop-blur-sm bg-white/5 rounded-2xl px-4 py-3 border border-white/10">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <HeartIcon className="w-4 h-4" />
                <span className="text-xs font-medium tracking-widest uppercase">{t('est')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-cormorant text-xl lg:text-2xl font-light mb-6 text-white/90">
              {t('discover')}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t('ourHeritage'), href: '/our-story' as const },
                { name: t('premiumOils'), href: '/shop' as const },
                { name: t('fineDining'), href: '/restaurant' as const },
                { name: t('estateStay'), href: '/camping' as const },
                { name: t('visitUs'), href: '/contact' as const }
              ].map((link, index) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-white/70 hover:text-[#D4AF37] transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-[#8B7355] transition-all duration-300 mr-0 group-hover:mr-3" />
                    <span className="text-sm lg:text-base font-light">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h4 className="font-cormorant text-xl lg:text-2xl font-light mb-6 text-white/90">
              {t('visitTitle')}
            </h4>
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-start justify-center md:justify-start space-x-3 text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  <MapPinIcon className="w-5 h-5 mt-0.5 text-[#8B7355] group-hover:text-[#D4AF37] transition-colors duration-300" />
                  <address className="not-italic text-sm lg:text-base leading-relaxed">
                    Kallmi Estate<br />
                    Rruga Currila, 2001<br />
                    Durrës, Albania
                  </address>
                </div>
              </div>

              <div className="group">
                <a
                  href="tel:+355682450851"
                  className="flex items-center justify-center md:justify-start space-x-3 text-white/70 hover:text-[#D4AF37] transition-all duration-300 group"
                >
                  <PhoneIcon className="w-5 h-5 text-[#8B7355] group-hover:text-[#D4AF37] transition-colors duration-300" />
                  <span className="text-sm lg:text-base">+355 68 24 50 851</span>
                </a>
              </div>

              <div className="group">
                <a
                  href="mailto:kallmibukur@gmail.com"
                  className="flex items-center justify-center md:justify-start space-x-3 text-white/70 hover:text-[#D4AF37] transition-all duration-300 group"
                >
                  <EnvelopeIcon className="w-5 h-5 text-[#8B7355] group-hover:text-[#D4AF37] transition-colors duration-300" />
                  <span className="text-sm lg:text-base">info@kallmibukur.al</span>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-center md:text-left">
            <h4 className="font-cormorant text-xl lg:text-2xl font-light mb-6 text-white/90">
              {t('stayConnected')}
            </h4>
            <div className="space-y-4">
              <p className="text-sm text-white/60 leading-relaxed">
                {t('newsletterText')}
              </p>

              <form onSubmit={handleSubscribe} className="space-y-4 max-w-xs mx-auto md:mx-0">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#8B7355] focus:bg-white/10 transition-all duration-300"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/20 to-[#D4AF37]/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                </div>

                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="w-full bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribed ? (
                    <span className="flex items-center justify-center space-x-2">
                      <HeartIcon className="w-4 h-4" />
                      <span>{t('thankYou')}</span>
                    </span>
                  ) : (
                    t('joinFamily')
                  )}
                </button>
              </form>

              {/* Social Proof */}
              <div className="text-xs text-white/40 italic">
                {t('socialProof')}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            {/* Copyright */}
            <div className="text-center md:text-left space-y-1">
              <p className="text-sm text-white/50">
                © {new Date().getFullYear()} Kallmi Estate. Crafted with
                <HeartIcon className="w-4 h-4 inline mx-1 text-red-400" />
                in Albania.
              </p>
              <p className="text-xs text-white/40">
                Developed by{' '}
                <a 
                  href="https://lucavehbiu.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#8B7355] hover:text-[#D4AF37] transition-colors duration-300"
                >
                  Luca
                </a>
              </p>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 text-white/60 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105"
            >
              <span className="text-sm font-light">{t('backToTop')}</span>
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#8B7355]/20 transition-all duration-300">
                <ArrowUpIcon className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>

        {/* Floating Quote */}
        <div className="mt-12 text-center">
          <div className="inline-block backdrop-blur-sm bg-white/5 rounded-3xl px-8 py-6 border border-white/10 max-w-2xl">
            <p className="text-white/70 italic font-light text-sm lg:text-base leading-relaxed">
              {t('quote')}
            </p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B7355]/30 to-transparent" />
    </footer>
  )
}