'use client'

import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'
import { AnimateDiv } from '../motion/MotionWrapper'
import { useTranslations } from 'next-intl'

export default function LandingHero() {
  const t = useTranslations('LandingHero')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with subtle parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 scale-110"
          style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.1)` }}
        >
          <Image
            src="https://storage.googleapis.com/kallmi/images/hero.webp"
            alt="Kallmi Estate - Where ancient olive groves meet the Adriatic Sea"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
          />
        </div>

        {/* Gradient overlays — same as other page heroes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/20 via-transparent to-[#8B7355]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Desktop content */}
      <div className="relative z-10 hidden sm:flex items-center justify-center min-h-screen text-center text-white px-6 pt-32 pb-16">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <AnimateDiv animation="fade" duration={1.0} delay={0.2} className="inline-block">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="12" cy="12" r="12" fill="#C4A862" />
            </svg>
          </AnimateDiv>

          <AnimateDiv animation="slide-up" duration={1.2} delay={0.4}>
            <h1 className="text-5xl lg:text-7xl font-extralight tracking-[0] leading-tight font-serif italic text-[#C4A862]">
              {t('tagline')}
            </h1>
          </AnimateDiv>

          <AnimateDiv animation="fade" duration={0.8} delay={0.7} className="flex items-center justify-center space-x-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="w-1.5 h-1.5 bg-[#C4A862] rounded-full" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </AnimateDiv>

          <AnimateDiv animation="slide-up" duration={1.0} delay={0.9}>
            <p className="text-lg font-light italic opacity-90 max-w-2xl mx-auto">{t('description')}</p>
          </AnimateDiv>

          <AnimateDiv animation="slide-up" duration={1.0} delay={1.1} className="flex flex-row gap-4 justify-center items-center pt-2">
            <Link href="/stay">
              <button className="bg-[#C4A862] hover:bg-[#B89852] text-[#1C1B18] px-8 py-4 rounded font-medium tracking-wide transition-all duration-200 text-base">
                {t('cta1')}
              </button>
            </Link>
            <Link href="/restaurant" className="text-white/80 hover:text-white text-sm font-light tracking-wide transition-colors duration-300 px-4 py-4">
              {t('cta2')}
            </Link>
            <Link href="/shop" className="text-white/80 hover:text-white text-sm font-light tracking-wide transition-colors duration-300 px-4 py-4">
              {t('cta3')}
            </Link>
          </AnimateDiv>
        </div>
      </div>

      {/* Mobile content */}
      <div className="sm:hidden relative z-10 flex flex-col min-h-screen text-center text-white px-4 pt-24">
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-5">
            <AnimateDiv animation="fade" duration={1.0} delay={0.2} className="inline-block">
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="9" cy="9" r="9" fill="#C4A862" />
              </svg>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.4}>
              <h1 className="text-4xl font-extralight tracking-[0] leading-tight font-serif italic text-[#C4A862]">
                {t('tagline')}
              </h1>
            </AnimateDiv>

            <AnimateDiv animation="fade" duration={0.8} delay={0.7} className="flex items-center justify-center space-x-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="w-1.5 h-1.5 bg-[#C4A862] rounded-full" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.0} delay={0.9}>
              <p className="text-base font-light italic opacity-90 max-w-xs mx-auto">{t('description')}</p>
            </AnimateDiv>
          </div>
        </div>

        <div className="pb-8 px-4">
          <AnimateDiv animation="slide-up" duration={1.0} delay={1.1} className="flex flex-col gap-4 items-center w-full">
            <Link href="/stay" className="w-full max-w-xs">
              <button className="w-full bg-[#C4A862] hover:bg-[#B89852] text-[#1C1B18] px-6 py-4 rounded font-medium tracking-wide transition-all duration-200 text-sm">
                {t('cta1')}
              </button>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/restaurant" className="text-white/80 hover:text-white text-sm font-light tracking-wide transition-colors duration-300">
                {t('cta2')}
              </Link>
              <span className="text-white/30">·</span>
              <Link href="/shop" className="text-white/80 hover:text-white text-sm font-light tracking-wide transition-colors duration-300">
                {t('cta3')}
              </Link>
            </div>
          </AnimateDiv>
        </div>
      </div>
    </section>
  )
}
