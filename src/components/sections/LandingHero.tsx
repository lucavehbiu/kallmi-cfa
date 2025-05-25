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
    <section className="relative h-screen overflow-hidden">
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

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#8B7355]/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative flex items-center justify-center h-full text-center text-white px-4 sm:px-6">
        <div className="max-w-5xl space-y-8 sm:space-y-12">

          {/* Animated Badge */}
          <AnimateDiv
            animation="fade"
            duration={1.0}
            delay={0.3}
            className="inline-block"
          >
            <div className="backdrop-blur-md bg-white/10 rounded-full px-6 py-3 border border-white/20 mb-6">
              <span className="text-sm sm:text-base font-medium tracking-widest uppercase text-white/90">
                Est. 1920 • Albania's Hidden Gem
              </span>
            </div>
          </AnimateDiv>

          {/* Main Headline with Staggered Animation */}
          <div className="space-y-4 sm:space-y-6">
            <AnimateDiv
              animation="slide-up"
              duration={1.2}
              delay={0.6}
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-extralight tracking-[0.1em] sm:tracking-[0.2em] leading-tight">
                <span className="block">KALLMI</span>
                <span className="block text-3xl sm:text-5xl md:text-7xl italic font-light text-[#D4AF37] mt-2">
                  Estate
                </span>
          </h1>
            </AnimateDiv>

            {/* Elegant Divider */}
            <AnimateDiv
              animation="fade"
              duration={0.8}
              delay={1.0}
              className="flex items-center justify-center space-x-4"
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </AnimateDiv>

            {/* Poetic Subtitle */}
            <AnimateDiv
              animation="slide-up"
              duration={1.0}
              delay={1.2}
            >
              <p className="text-lg sm:text-2xl md:text-3xl font-light italic opacity-95 leading-relaxed max-w-4xl mx-auto">
                Where ancient olive groves whisper secrets to the
                <span className="text-[#D4AF37]"> Adriatic breeze</span>
              </p>
            </AnimateDiv>
          </div>

          {/* Floating Description Card */}
          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={1.5}
            className="max-w-2xl mx-auto"
          >
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <p className="text-base sm:text-lg font-light leading-relaxed text-white/90">
                Four generations of passion have cultivated this sacred land,
                creating Albania's finest extra virgin olive oil from sun-kissed groves
                that dance between mountain and sea.
              </p>
            </div>
          </AnimateDiv>

          {/* Call-to-Action Buttons */}
          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={1.8}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4"
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
                variant="outline"
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

          {/* Scroll Indicator */}
          <AnimateDiv
            animation="fade"
            duration={1.0}
            delay={2.2}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center space-y-2 text-white/70">
              <span className="text-xs sm:text-sm font-light tracking-widest uppercase">
                Scroll to Explore
              </span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </AnimateDiv>
        </div>
      </div>

      {/* Floating Stats - Desktop Only */}
      <div className="hidden lg:block absolute bottom-12 left-12 right-12">
        <div className="flex justify-between items-end">
          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={2.0}
            className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <div className="text-3xl font-light text-[#D4AF37] mb-1">100+</div>
            <div className="text-sm text-white/80 font-medium">Years of Heritage</div>
          </AnimateDiv>

          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={2.2}
            className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <div className="text-3xl font-light text-[#D4AF37] mb-1">4th</div>
            <div className="text-sm text-white/80 font-medium">Generation</div>
          </AnimateDiv>

          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={2.4}
            className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20"
          >
            <div className="text-3xl font-light text-[#D4AF37] mb-1">Premium</div>
            <div className="text-sm text-white/80 font-medium">Extra Virgin</div>
          </AnimateDiv>
        </div>
      </div>
    </section>
  )
}