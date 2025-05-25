'use client'

console.log('Loading LandingPage.tsx module')

import { AnimateDiv } from './motion/MotionWrapper'
import LandingHero from './sections/LandingHero'
import { useEffect, useState } from 'react'
import RestaurantSnippet from './sections/RestaurantSnippet'
import AccommodationsSnippet from './sections/AccommodationsSnippet'
import WhatsAppButton from './WhatsAppButton'
import OptimizedImage from './common/OptimizedImage'

// Fallback image handler
const handleImageError = (e: any) => {
  console.error('Image failed to load, using fallback', e);
  e.currentTarget.src = '/images/placeholders/fallback.webp';
};

export default function LandingPage() {
  console.log('LandingPage component rendering')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    console.log('LandingPage component mounted')

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    return () => {
      console.log('LandingPage component unmounting')
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="font-cormorant text-gray-800 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <LandingHero />

      {/* Simplified Navigation Dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {['story', 'experience', 'sunsets'].map((section, index) => (
          <button
            key={section}
            className="w-2 h-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-[#8B7355]/70 transition-all duration-300 hover:scale-150"
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>

      {/* Spacious Story Section */}
      <section id="story" className="relative py-16 sm:py-24 lg:py-32 xl:py-40 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-16 w-48 h-48 bg-[#8B7355]/3 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 right-16 w-64 h-64 bg-[#8B7355]/2 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.2}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center">
            {/* Content Side */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 lg:space-y-12 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-block">
                  <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                    Our Heritage
                  </span>
                  <div className="w-20 h-px bg-[#8B7355] mt-3" />
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-[#8B7355] leading-tight">
                  Generations of
                  <span className="block italic mt-1 sm:mt-2">Passion</span>
                </h2>
              </div>

              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-light">
                <p className="relative pl-6 sm:pl-8 border-l-2 border-[#8B7355]/30">
                  Where ancient olive trees whisper stories of generations past,
                  our family has cultivated this sacred land with unwavering devotion.
                </p>
                <p className="relative pl-6 sm:pl-8 border-l-2 border-[#8B7355]/30">
                  Each drop carries the essence of Kallmi - a testament to our
                  commitment to preserving Albania's finest traditions.
                </p>
              </div>

              {/* Minimal Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-12">
                {[
                  { number: '2004', label: 'Est.' },
                  { number: '20+', label: 'Years' },
                  { number: '4th', label: 'Generation' }
                ].map((stat, index) => (
                  <AnimateDiv
                    key={index}
                    animation="slide-up"
                    delay={1.0 + index * 0.2}
                    className="text-center"
                  >
                    <div className="backdrop-blur-sm bg-white/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/40">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-[#8B7355]">{stat.number}</div>
                      <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium mt-1 sm:mt-2">{stat.label}</div>
                    </div>
                  </AnimateDiv>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-6 order-1 lg:order-2 mb-8 lg:mb-0">
              <AnimateDiv
                animation="slide-up"
                duration={1.2}
                delay={0.4}
                className="relative group"
              >
                <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src="/images/about_snippet.webp"
                    alt="Kallmi Estate olive groves"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={95}
                    loading="lazy"
                    id="about_snippet"
                  />
                  {/* Subtle Frame Effect */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-[#8B7355]/10 to-transparent rounded-3xl -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </AnimateDiv>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Simplified Experience Section */}
      <section id="experience" className="relative py-16 sm:py-24 lg:py-32 xl:py-40 overflow-hidden">
        <AnimateDiv
          className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.2}
        >
          {/* Centered Header */}
          <div className="text-center mb-12 sm:mb-20 lg:mb-32">
            <div className="inline-block">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-[#8B7355] mb-4 sm:mb-6 tracking-wide">
                Hidden Treasures
              </h2>
              <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto mb-6 sm:mb-8" />
              <p className="text-base sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
                Where ancient olive groves meet the Adriatic's embrace
              </p>
            </div>
          </div>

          {/* Single Featured Experience */}
          <AnimateDiv
            animation="slide-up"
            duration={1.0}
            delay={0.3}
            className="group max-w-5xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[3rem] shadow-2xl hover:shadow-3xl transition-all duration-700">
              <div className="aspect-[4/3] sm:aspect-[16/10] relative">
                <OptimizedImage
                  src="/images/sunset3.webp"
                  alt="Breathtaking Adriatic Sunsets"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  quality={95}
                  loading="lazy"
                  id="sunset3"
                />
                {/* Elegant Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/20 to-transparent" />

                {/* Floating Content */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 lg:bottom-16 lg:left-16 lg:right-16">
                  <div className="backdrop-blur-md bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-white/20">
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl text-white font-extralight mb-2 sm:mb-4 lg:mb-6 tracking-wider">
                      Golden Hour Magic
                    </h3>
                    <p className="text-white/90 text-sm sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                      Watch the sun paint the Adriatic in shades of amber and rose,
                      creating moments that live forever in memory
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateDiv>
        </AnimateDiv>
      </section>

      {/* Restaurant Section */}
      <RestaurantSnippet />

      {/* Accommodations Section */}
      <AccommodationsSnippet />

      {/* Minimal Sunset Gallery */}
      <section id="sunsets" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 via-orange-50/10 to-rose-50/20" />

        <AnimateDiv
          className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.0}
        >
          {/* Elegant Header */}
          <div className="text-center mb-20 sm:mb-32">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                Nature's Theater
              </span>
              <h2 className="text-4xl sm:text-7xl font-extralight text-[#8B7355] mt-6 mb-8 leading-tight">
                When Day Kisses
                <span className="block italic mt-2">the Sea Goodnight</span>
              </h2>
              <p className="text-lg sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Every evening, the Adriatic becomes a canvas where nature paints
                her most breathtaking masterpiece
              </p>
            </AnimateDiv>
          </div>

          {/* Clean Two-Image Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              delay={0.4}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700">
                <OptimizedImage
                  src="/images/story.webp"
                  alt="Adriatic Sunset View"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  id="story"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              delay={0.6}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700">
                <OptimizedImage
                  src="/images/sunset2.webp"
                  alt="Golden Hour at Kallmi Beach"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  id="sunset2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </AnimateDiv>
          </div>

          {/* Elegant Quote */}
          <AnimateDiv
            animation="fade"
            delay={1.0}
            className="text-center mt-20 sm:mt-32"
          >
            <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-8 sm:p-16 border border-white/30 max-w-5xl mx-auto">
              <p className="text-xl sm:text-3xl text-gray-700 italic font-light leading-relaxed">
                "Here, where the ancient olive trees have witnessed countless sunsets,
                each evening brings a symphony of colors that reminds us why
                Kallmi remains Albania's best-kept secret."
              </p>
              <div className="w-20 h-px bg-[#8B7355] mx-auto mt-8" />
            </div>
          </AnimateDiv>
        </AnimateDiv>
      </section>

      <WhatsAppButton />
    </main>
  )
}