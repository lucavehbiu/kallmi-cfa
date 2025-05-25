'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { useEffect, useState } from 'react'
import { AnimateDiv } from '../motion/MotionWrapper'

export default function LandingHero() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    // Trigger loading animation
    const timer = setTimeout(() => setIsLoaded(true), 500)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background with Parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 scale-110"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(1.1)`
          }}
        >
        <Image
          src="/images/hero.webp"
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

        {/* Sophisticated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/20 via-transparent to-[#8B7355]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Floating Decorative Elements - Reduced on Mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-4 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-48 right-4 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 bg-[#8B7355]/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-4 sm:left-20 w-20 sm:w-40 h-20 sm:h-40 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content - Fixed Mobile Layout */}
      <div className="relative flex items-center justify-center min-h-screen text-center text-white px-4 sm:px-6 pt-24 lg:pt-32 pb-16">
        <div className="max-w-5xl space-y-6 sm:space-y-8 lg:space-y-12">

          {/* Animated Badge - Smaller on Mobile */}
          <AnimateDiv
            animation="fade"
            duration={1.0}
            delay={0.3}
            className="inline-block"
          >
            <div className="backdrop-blur-md bg-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm lg:text-base font-medium tracking-widest uppercase text-white/90">
                Albania's Hidden Gem
              </span>
            </div>
          </AnimateDiv>

          {/* Main Headline - Mobile Optimized */}
          <div className="space-y-3 sm:space-y-4 lg:space-y-6">
            <AnimateDiv
              animation="slide-up"
              duration={1.2}
              delay={0.6}
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extralight tracking-[0.05em] sm:tracking-[0.1em] lg:tracking-[0.2em] leading-tight">
                <span className="block">KALLMI</span>
                <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-7xl italic font-light text-[#D4AF37] mt-1 sm:mt-2">
                  Estate
                </span>
          </h1>
            </AnimateDiv>

            {/* Elegant Divider - Smaller on Mobile */}
            <AnimateDiv
              animation="fade"
              duration={0.8}
              delay={1.0}
              className="flex items-center justify-center space-x-3 sm:space-x-4"
            >
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#D4AF37] rounded-full" />
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </AnimateDiv>

            {/* Poetic Subtitle - Mobile Optimized */}
            <AnimateDiv
              animation="slide-up"
              duration={1.0}
              delay={1.2}
            >
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-light italic opacity-95 leading-relaxed max-w-4xl mx-auto px-2">
                Where ancient olive groves whisper secrets to the
                <span className="text-[#D4AF37]"> Adriatic breeze</span>
              </p>
            </AnimateDiv>
          </div>

          {/* Floating Description Card - Desktop Only */}
          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={1.5}
            className="hidden sm:block max-w-2xl mx-auto"
          >
            <div className="backdrop-blur-md bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl">
              <p className="text-sm sm:text-base lg:text-lg font-light leading-relaxed text-white/90">
                Four generations of passion have cultivated this sacred land,
                creating Albania's hidden gem. Experience tasty food and raw nature
              </p>
            </div>
          </AnimateDiv>

          {/* Desktop Buttons - In Content Flow */}
          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={1.8}
            className="hidden sm:flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center pt-4"
          >
            <Link href="/shop" className="group">
              <Button
                size="lg"
                className="bg-[#8B7355] hover:bg-[#8B7355]/90 text-white px-8 py-4 rounded-2xl font-medium tracking-wide transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl backdrop-blur-sm border border-[#8B7355]/30"
              >
                <span className="flex items-center space-x-2">
                  <span>Discover Our Heritage</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
            </Link>

            <Link href="/our-story" className="group">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-8 py-4 rounded-2xl font-medium tracking-wide transition-all duration-300 transform group-hover:scale-105 backdrop-blur-sm"
              >
                <span className="flex items-center space-x-2">
                  <span>Our Story</span>
                  <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
            </Button>
          </Link>
          </AnimateDiv>
        </div>

        {/* Mobile Buttons - Positioned at Bottom */}
        <div className="sm:hidden absolute bottom-8 left-4 right-4">
          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={1.8}
            className="flex flex-col gap-3 justify-center items-center"
          >
            <Link href="/shop" className="group w-full">
              <Button
                size="lg"
                className="w-full bg-[#8B7355] hover:bg-[#8B7355]/90 text-white px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl backdrop-blur-sm border border-[#8B7355]/30"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span className="text-sm">Discover Our Heritage</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>
            </Link>

            <Link href="/our-story" className="group w-full">
              <Button
                variant="secondary"
                size="lg"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-300 transform group-hover:scale-105 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span className="text-sm">Our Story</span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
            </Button>
          </Link>
          </AnimateDiv>
        </div>
      </div>
    </section>
  )
}