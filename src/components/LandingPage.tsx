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

      {/* Floating Navigation Dots - Mobile First */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {['experience', 'story', 'restaurant', 'stay', 'sunsets'].map((section, index) => (
          <button
            key={section}
            className="w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-[#8B7355]/60 transition-all duration-300 hover:scale-125"
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>

      {/* Immersive Experience Preview Section */}
      <section id="experience" className="relative py-12 sm:py-20 overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/images/pattern.webp')",
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        />

        <AnimateDiv
          className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.2}
        >
          {/* Floating Header */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block">
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mb-4 tracking-wide">
                Hidden Treasures
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto mb-6" />
              <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
                Where ancient olive groves meet the Adriatic's embrace
              </p>
            </div>
          </div>

          {/* Staggered Card Layout - Mobile Optimized */}
          <div className="space-y-8 sm:space-y-16">
            {/* Sunsets Card */}
            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              delay={0.2}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] shadow-2xl hover:shadow-3xl transition-all duration-700">
                <div className="aspect-[4/3] sm:aspect-[16/9] relative">
                  <OptimizedImage
                    src="/images/sunset3.webp"
                    alt="Breathtaking Adriatic Sunsets"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    quality={90}
                    loading="lazy"
                    id="sunset3"
                  />
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/20 to-transparent" />

                  {/* Floating Content */}
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12">
                    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 sm:p-8 border border-white/20">
                      <h3 className="text-2xl sm:text-4xl text-white font-light mb-2 sm:mb-4 tracking-wider">
                        Golden Hour Magic
                      </h3>
                      <p className="text-white/90 text-sm sm:text-lg font-light leading-relaxed">
                        Watch the sun paint the Adriatic in shades of amber and rose
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateDiv>

            {/* Split Layout for Dine & Stay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Dine Card */}
              <AnimateDiv
                animation="slide-up"
                duration={0.8}
                delay={0.4}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 h-full">
                  <div className="aspect-[3/4] relative">
                    <OptimizedImage
                      src="/images/restaurant_snippet.webp"
                      alt="Fine Dining Restaurant"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      quality={85}
                      loading="lazy"
                      id="restaurant_snippet"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                      <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 sm:p-6 border border-white/20">
                        <h3 className="text-xl sm:text-2xl text-white font-light mb-1 sm:mb-2">
                          Culinary Journey
                        </h3>
                        <p className="text-white/90 text-xs sm:text-sm font-light">
                          Farm-to-table excellence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateDiv>

              {/* Stay Card */}
              <AnimateDiv
                animation="slide-up"
                duration={0.8}
                delay={0.6}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 h-full">
                  <div className="aspect-[3/4] relative">
                    <OptimizedImage
                      src="/images/stay_snippet.webp"
                      alt="Luxurious Accommodations"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 100vw, 45vw"
                      quality={85}
                      loading="lazy"
                      id="stay_snippet"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                      <div className="backdrop-blur-sm bg-white/10 rounded-xl p-3 sm:p-6 border border-white/20">
                        <h3 className="text-xl sm:text-2xl text-white font-light mb-1 sm:mb-2">
                          Serene Retreat
                        </h3>
                        <p className="text-white/90 text-xs sm:text-sm font-light">
                          Where comfort meets nature
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateDiv>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Immersive Story Section */}
      <section id="story" className="relative py-16 sm:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#8B7355]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#8B7355]/3 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <AnimateDiv
          className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.0}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16 items-center">
            {/* Content Side */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                    Our Heritage
                  </span>
                  <div className="w-16 h-px bg-[#8B7355] mt-2" />
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-[#8B7355] leading-tight">
                  Generations of
                  <span className="block italic">Passion</span>
                </h2>
              </div>

              <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                <p className="relative pl-6 border-l-2 border-[#8B7355]/30">
                  Where ancient olive trees whisper stories of generations past,
                  our family has cultivated this sacred land with unwavering devotion.
                </p>
                <p className="relative pl-6 border-l-2 border-[#8B7355]/30">
                  The marriage of sea breeze and mountain air creates an alchemy
                  that transforms our olives into liquid gold.
                </p>
                <p className="relative pl-6 border-l-2 border-[#8B7355]/30">
                  Each drop carries the essence of Kallmi - a testament to our
                  commitment to preserving Albania's finest traditions.
                </p>
              </div>

              {/* Floating Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { number: '1920', label: 'Est.' },
                  { number: '100+', label: 'Years' },
                  { number: '4th', label: 'Generation' }
                ].map((stat, index) => (
                  <AnimateDiv
                    key={index}
                    animation="slide-up"
                    delay={0.8 + index * 0.2}
                    className="text-center"
                  >
                    <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-4 border border-white/40">
                      <div className="text-2xl sm:text-3xl font-light text-[#8B7355]">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </AnimateDiv>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <AnimateDiv
                animation="slide-up"
                duration={1.0}
                delay={0.3}
                className="relative group"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src="/images/about_snippet.webp"
                    alt="Kallmi Estate olive groves"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={90}
                    loading="lazy"
                    id="about_snippet"
                  />
                  {/* Floating Frame Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#8B7355]/20 to-transparent rounded-3xl -z-10 blur-xl" />
                </div>
              </AnimateDiv>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Restaurant Section */}
      <RestaurantSnippet />

      {/* Accommodations Section */}
      <AccommodationsSnippet />

      {/* Reimagined Sunset Gallery */}
      <section id="sunsets" className="relative py-16 sm:py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-rose-50/30" />

        <AnimateDiv
          className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.0}
        >
          {/* Poetic Header */}
          <div className="text-center mb-12 sm:mb-20">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                Nature's Theater
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mt-4 mb-6 leading-tight">
                When Day Kisses
                <span className="block italic">the Sea Goodnight</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Every evening, the Adriatic becomes a canvas where nature paints
                her most breathtaking masterpiece
              </p>
            </AnimateDiv>
          </div>

          {/* Masonry-style Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {/* Large Featured Image */}
            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              delay={0.3}
              className="col-span-2 lg:col-span-2 row-span-2 group"
            >
              <div className="relative aspect-[4/3] lg:aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700">
                <OptimizedImage
                  src="/images/story.webp"
                  alt="Adriatic Sunset View"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  quality={90}
                  id="story"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                  <div className="backdrop-blur-md bg-white/10 rounded-xl p-3 sm:p-6 border border-white/20">
                    <h3 className="text-lg sm:text-2xl text-white font-light mb-1 sm:mb-2">
                      The Golden Hour
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm font-light">
                      When time stands still
                    </p>
                  </div>
                </div>
              </div>
            </AnimateDiv>

            {/* Smaller Images */}
            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              delay={0.5}
              className="group"
            >
              <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700">
                <OptimizedImage
                  src="/images/sunset2.webp"
                  alt="Golden Hour at Kallmi Beach"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={85}
                  id="sunset2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              delay={0.7}
              className="group"
            >
              <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700">
                <OptimizedImage
                  src="/images/sunset3.webp"
                  alt="Sunset View from Restaurant Terrace"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={85}
                  id="sunset3_gallery"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </AnimateDiv>
          </div>

          {/* Poetic Quote */}
          <AnimateDiv
            animation="fade"
            delay={1.0}
            className="text-center mt-12 sm:mt-20"
          >
            <div className="backdrop-blur-sm bg-white/40 rounded-3xl p-6 sm:p-12 border border-white/30 max-w-4xl mx-auto">
              <p className="text-lg sm:text-2xl text-gray-700 italic font-light leading-relaxed">
                "Here, where the ancient olive trees have witnessed countless sunsets,
                each evening brings a symphony of colors that reminds us why
                Kallmi remains Albania's best-kept secret."
              </p>
              <div className="w-16 h-px bg-[#8B7355] mx-auto mt-6" />
            </div>
          </AnimateDiv>
        </AnimateDiv>
      </section>

      <WhatsAppButton />
    </main>
  )
}