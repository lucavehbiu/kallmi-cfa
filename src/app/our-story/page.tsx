import type { Metadata } from 'next'
import Image from 'next/image'
import { AnimateDiv } from '@/components/motion/MotionWrapper'
import WhatsAppButton from '@/components/WhatsAppButton'
import {
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  BeakerIcon,
  SunIcon,
  GlobeAltIcon,
  UserGroupIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Our Story | Kallmi Estate - Premium Albanian Olive Oil Heritage',
  description: 'Discover the enchanting heritage of Kallmi Estate, a family-owned olive grove in Durrës, Albania. Our century-old tradition of crafting premium olive oil continues through four generations.',
  openGraph: {
    title: 'Our Story | Kallmi Estate - Premium Albanian Olive Oil Heritage',
    description: 'Discover the enchanting heritage of Kallmi Estate, a family-owned olive grove in Durrës, Albania. Our century-old tradition of crafting premium olive oil continues through four generations.',
    images: ['/images/entrance.webp'],
  },
}

export default function OurStory() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 font-cormorant relative overflow-hidden">

      {/* Hero Section - matching restaurant style */}
      <section className="relative min-h-[70vh] lg:min-h-[60vh] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/entrance.webp"
            alt="Kallmi Estate - Gateway to Heritage"
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
            <AnimateDiv animation="fade" duration={1.0} delay={0.2}>
              <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium tracking-wide">
                <SparklesIcon className="w-4 h-4" />
                Four Generations of Excellence
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.3}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide">
                Our
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic text-[#D4AF37] mt-2">
                  Story
                </span>
              </h1>
            </AnimateDiv>

            <AnimateDiv animation="fade" duration={1.0} delay={0.5}>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-px bg-white/40" />
                <HeartIcon className="w-5 h-5 text-[#D4AF37]" />
                <div className="w-16 h-px bg-white/40" />
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.6}>
              <p className="text-lg sm:text-xl lg:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                A <span className="text-[#D4AF37]">century of tradition</span>,
                a lifetime of passion, and the eternal pursuit of
                <span className="text-[#D4AF37]"> liquid gold</span>
              </p>
            </AnimateDiv>

            {/* Info Cards */}
            <AnimateDiv animation="slide-up" duration={1.0} delay={0.8}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: ClockIcon, text: "20+ Years" },
                  { icon: MapPinIcon, text: "Durrës, Albania" },
                  { icon: UserGroupIcon, text: "4th Generation" },
                ].map((item, index) => (
                  <div key={index} className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-3 min-w-[120px] text-center">
                    <item.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                    <p className="text-white/90 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimateDiv>
          </div>
        </div>
      </section>

      {/* Enhanced Heritage Section */}
      <section className="relative py-20 sm:py-32 lg:py-40">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">

            {/* Content Side */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-12 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-block group">
                  <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase flex items-center space-x-2 group-hover:text-[#A0845C] transition-colors duration-300">
                    <MapPinIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>Durrës, Albania</span>
                  </span>
                  <div className="w-20 h-px bg-gradient-to-r from-[#8B7355] to-[#D4AF37] mt-3 group-hover:w-32 transition-all duration-500" />
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extralight text-[#8B7355] leading-tight">
                  Our
                  <span className="block italic text-[#D4AF37] mt-2">Heritage</span>
                </h2>
              </div>

              <div className="space-y-8 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-light">
                <div className="relative group">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#8B7355] to-[#D4AF37] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <p className="relative pl-8 group-hover:text-gray-800 transition-colors duration-300">
                    Nestled in the sun-kissed hills of <span className="text-[#8B7355] font-medium">Durrës, Albania</span>, Kallmi Estate has been a testament
                    to the art of olive oil making for over a century. Our story began with our ancestors,
                    who recognized the unique potential of this <span className="text-[#D4AF37] font-medium">fertile land</span>.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-[#8B7355] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <p className="relative pl-8 group-hover:text-gray-800 transition-colors duration-300">
                    They planted the first olive trees that would become our <span className="text-[#8B7355] font-medium">legacy</span>, understanding that
                    this sacred land would nurture generations of <span className="text-[#D4AF37] font-medium">liquid gold</span>. Each tree tells a story
                    of patience, wisdom, and unwavering dedication.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#8B7355] to-[#D4AF37] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  <p className="relative pl-8 group-hover:text-gray-800 transition-colors duration-300">
                    Today, we continue to honor their wisdom by maintaining <span className="text-[#8B7355] font-medium">traditional methods</span> while
                    embracing modern techniques. Each bottle carries not just the pure essence of our olives,
                    but the <span className="text-[#D4AF37] font-medium">rich history</span> of our land and the soul of our people.
                  </p>
                </div>
              </div>

              {/* Enhanced Heritage Timeline */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {[
                  { year: '1920', event: 'Family Legacy Begins', icon: HeartIcon },
                  { year: '2004', event: 'Estate Founded', icon: StarIcon },
                  { year: '2007', event: 'Restaurant Opens', icon: SunIcon },
                  { year: '2025', event: 'Thriving Heritage', icon: TrophyIcon }
                ].map((milestone, index) => (
                  <AnimateDiv
                    key={index}
                    animation="slide-up"
                    delay={0.8 + index * 0.2}
                    className="text-center group cursor-pointer"
                  >
                    <div className="backdrop-blur-sm bg-white/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/40 group-hover:bg-white/80 group-hover:border-[#8B7355]/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl">
                      <milestone.icon className="w-6 sm:w-8 h-6 sm:h-8 text-[#8B7355] mx-auto mb-3 group-hover:text-[#D4AF37] group-hover:scale-110 transition-all duration-300" />
                      <div className="text-xl sm:text-2xl lg:text-3xl font-light text-[#8B7355] group-hover:text-[#A0845C] transition-colors duration-300">{milestone.year}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">{milestone.event}</div>
                    </div>
                  </AnimateDiv>
                ))}
              </div>
            </div>

            {/* Enhanced Image Side */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <AnimateDiv
                animation="slide-up"
                duration={1.4}
                delay={0.3}
                className="relative group"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-2nd.webp"
                    alt="Historic view of Kallmi Estate olive grove"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={90}
                  />

                  {/* Enhanced Floating Heritage Badge */}
                  <div className="absolute top-6 left-6 backdrop-blur-xl bg-white/20 rounded-2xl p-4 border border-white/30 group-hover:bg-white/30 transition-all duration-500">
                    <div className="text-white text-sm sm:text-base font-medium">Est. 2004</div>
                    <div className="text-white/80 text-xs sm:text-sm">Albania's Heritage</div>
                  </div>

                  {/* Floating Stats Badge */}
                  <div className="absolute bottom-6 right-6 backdrop-blur-xl bg-black/20 rounded-2xl p-4 border border-white/20 group-hover:bg-black/30 transition-all duration-500">
                    <div className="text-[#D4AF37] text-sm sm:text-base font-medium">100+ Years</div>
                    <div className="text-white/80 text-xs sm:text-sm">Of Tradition</div>
                  </div>
                </div>

                {/* Enhanced Floating Frame Effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-[#8B7355]/20 via-[#D4AF37]/10 to-[#8B7355]/20 rounded-3xl -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-12 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-3xl -z-20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200" />
              </AnimateDiv>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Values Section */}
      <section className="relative py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-stone-50/50 to-white overflow-hidden">

        {/* Section Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#8B7355]/5 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl animate-pulse delay-3000" />
        </div>

        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.0}
        >
          {/* Enhanced Section Header */}
          <div className="text-center mb-16 sm:mb-24 lg:mb-32">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <div className="inline-block group mb-6">
                <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase group-hover:text-[#A0845C] transition-colors duration-300">
                  Core Principles
                </span>
                <div className="w-16 h-px bg-gradient-to-r from-[#8B7355] to-[#D4AF37] mx-auto mt-3 group-hover:w-24 transition-all duration-500" />
              </div>
              <h2 className="text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-extralight text-[#8B7355] mb-6 leading-tight">
                Our Values
              </h2>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                The timeless principles that guide every drop of <span className="text-[#D4AF37] font-medium">liquid gold</span> we create
              </p>
            </AnimateDiv>
          </div>

          {/* Enhanced Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: ClockIcon,
                title: "Tradition",
                description: "We preserve century-old methods passed down through generations, ensuring each bottle tells our story of heritage and craftsmanship that spans over 100 years.",
                color: "from-[#8B7355] to-[#A0845C]",
                accent: "text-[#8B7355]"
              },
              {
                icon: StarIcon,
                title: "Quality",
                description: "From harvest to bottle, we maintain the highest standards of excellence, producing olive oil that meets the most discerning palates and exceeds expectations.",
                color: "from-[#D4AF37] to-[#F4D03F]",
                accent: "text-[#D4AF37]"
              },
              {
                icon: BeakerIcon,
                title: "Sustainability",
                description: "We are committed to sustainable farming practices that protect our environment and ensure our olive groves thrive for future generations to come.",
                color: "from-[#8B7355] to-[#D4AF37]",
                accent: "text-[#8B7355]"
              }
            ].map((value, index) => (
              <AnimateDiv
                key={index}
                animation="slide-up"
                duration={0.8}
                delay={0.4 + index * 0.2}
                className="group cursor-pointer"
              >
                <div className="relative backdrop-blur-sm bg-white/80 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 hover:border-[#8B7355]/30 h-full group-hover:scale-105">

                  {/* Enhanced Icon with Gradient Background */}
                  <div className={`inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
                  </div>

                  <h3 className={`text-2xl lg:text-3xl xl:text-4xl font-light ${value.accent} mb-4 group-hover:text-[#A0845C] transition-colors duration-300`}>
                    {value.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed font-light text-base lg:text-lg group-hover:text-gray-800 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Enhanced Floating Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B7355]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-3xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </AnimateDiv>
            ))}
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Process Section */}
      <section className="relative py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-[#8B7355] via-[#7A6B4F] to-[#6B563F] text-white overflow-hidden">

        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full animate-pulse delay-2000" />
          <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-white/20 rounded-full animate-pulse delay-3000" />
        </div>

        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.0}
        >
          {/* Enhanced Section Header */}
          <div className="text-center mb-16 sm:mb-24 lg:mb-32">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <div className="inline-block group mb-6">
                <span className="text-sm sm:text-base text-[#D4AF37] font-medium tracking-widest uppercase group-hover:text-[#F4D03F] transition-colors duration-300">
                  Artisanal Craftsmanship
                </span>
                <div className="w-20 h-px bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] mx-auto mt-3 group-hover:w-32 transition-all duration-500" />
              </div>
              <h2 className="text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-extralight mb-6 leading-tight">
                Our Process
              </h2>
              <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
                Where ancient wisdom meets modern precision in every <span className="text-[#D4AF37] font-medium">golden drop</span>
              </p>
            </AnimateDiv>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">

            {/* Enhanced Image Side */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <AnimateDiv
                animation="slide-up"
                duration={1.4}
                delay={0.3}
                className="relative group"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hand-harvested.webp"
                    alt="Artisanal olive oil production process at Kallmi Estate"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={90}
                  />

                  {/* Enhanced Process Badge */}
                  <div className="absolute bottom-6 left-6 backdrop-blur-xl bg-black/20 rounded-2xl p-4 border border-white/30 group-hover:bg-black/30 transition-all duration-500">
                    <div className="text-[#D4AF37] text-sm sm:text-base font-medium">Cold-Pressed</div>
                    <div className="text-white/80 text-xs sm:text-sm">Within Hours</div>
                  </div>

                  {/* Quality Badge */}
                  <div className="absolute top-6 right-6 backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20 group-hover:bg-white/20 transition-all duration-500">
                    <div className="text-white text-sm sm:text-base font-medium">Extra Virgin</div>
                    <div className="text-white/80 text-xs sm:text-sm">Premium Quality</div>
                  </div>
                </div>

                {/* Enhanced Floating Glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-[#D4AF37]/30 via-[#F4D03F]/20 to-transparent rounded-3xl -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -inset-12 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-3xl -z-20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300" />
              </AnimateDiv>
            </div>

            {/* Enhanced Content Side */}
            <div className="lg:col-span-6 space-y-8 sm:space-y-12 order-1 lg:order-2">

              {/* Enhanced Process Steps */}
              <div className="space-y-8 sm:space-y-10">
                {[
                  {
                    icon: SunIcon,
                    title: "Hand-Picked Harvest",
                    description: "We carefully hand-pick our olives at the optimal moment of ripeness, ensuring each fruit contributes to the exceptional quality of our liquid gold.",
                    color: "from-[#D4AF37] to-[#F4D03F]"
                  },
                  {
                    icon: SparklesIcon,
                    title: "Cold-Pressed Excellence",
                    description: "Within hours of harvest, the olives are cold-pressed in our state-of-the-art facility, preserving their natural flavors and nutritional benefits.",
                    color: "from-[#F4D03F] to-[#D4AF37]"
                  },
                  {
                    icon: HeartIcon,
                    title: "Pure Perfection",
                    description: "This careful process results in an extra virgin olive oil of remarkable purity and character, carrying the essence of our Albanian heritage.",
                    color: "from-[#D4AF37] to-[#F4D03F]"
                  }
                ].map((step, index) => (
                  <AnimateDiv
                    key={index}
                    animation="slide-up"
                    delay={0.6 + index * 0.3}
                    className="flex items-start space-x-6 group cursor-pointer"
                  >
                    <div className={`flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <step.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <h3 className="text-xl lg:text-2xl xl:text-3xl font-light text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed font-light text-base lg:text-lg group-hover:text-white transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </AnimateDiv>
                ))}
              </div>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Family Legacy Section */}
      <section className="relative py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-white via-stone-50/50 to-white overflow-hidden">

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-40 h-40 bg-[#8B7355]/3 rounded-full blur-3xl animate-pulse delay-2000" />
          <div className="absolute bottom-1/3 right-1/5 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl animate-pulse delay-4000" />
        </div>

        <AnimateDiv
          className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.0}
        >
          <div className="text-center space-y-8 sm:space-y-12 lg:space-y-16">

            {/* Enhanced Section Header */}
            <AnimateDiv animation="slide-up" delay={0.2}>
              <div className="inline-block group mb-6">
                <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase group-hover:text-[#A0845C] transition-colors duration-300">
                  Generational Wisdom
                </span>
                <div className="w-20 h-px bg-gradient-to-r from-[#8B7355] to-[#D4AF37] mx-auto mt-3 group-hover:w-32 transition-all duration-500" />
              </div>
              <h2 className="text-3xl sm:text-6xl lg:text-7xl xl:text-8xl font-extralight text-[#8B7355] mb-6 leading-tight">
                A Family
                <span className="block italic text-[#D4AF37] mt-2">Legacy</span>
              </h2>
            </AnimateDiv>

            {/* Enhanced Legacy Content */}
            <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 lg:p-16 xl:p-20 shadow-2xl border border-white/30 space-y-8 sm:space-y-12 hover:shadow-3xl hover:bg-white/90 transition-all duration-700 group">

              <AnimateDiv animation="slide-up" delay={0.4}>
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#8B7355] to-transparent group-hover:via-[#A0845C] transition-colors duration-500" />
                  <GlobeAltIcon className="w-8 sm:w-10 h-8 sm:h-10 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
                  <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#8B7355] to-transparent group-hover:via-[#A0845C] transition-colors duration-500" />
                </div>
              </AnimateDiv>

              <AnimateDiv animation="slide-up" delay={0.6}>
                <p className="text-lg sm:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-light mb-8 group-hover:text-gray-800 transition-colors duration-300">
                  Through generations, our family has been the <span className="text-[#8B7355] font-medium">custodian</span> of these ancient olive groves.
                  Each generation has added its own chapter to our story while maintaining the <span className="text-[#D4AF37] font-medium">core values</span>
                  that make Kallmi Estate special.
                </p>
              </AnimateDiv>

              <AnimateDiv animation="slide-up" delay={0.8}>
                <p className="text-lg sm:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-light mb-12 group-hover:text-gray-800 transition-colors duration-300">
                  Today, we invite you to be part of our continuing story. Every bottle of Kallmi Estate
                  olive oil is more than just a product – it's a piece of our <span className="text-[#8B7355] font-medium">heritage</span>, a taste of our
                  <span className="text-[#D4AF37] font-medium"> tradition</span>, and a promise of our commitment to excellence.
                </p>
              </AnimateDiv>

              {/* Enhanced Call to Action */}
              <AnimateDiv animation="slide-up" delay={1.0}>
                <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer group-hover:shadow-xl">
                  <HeartIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Join Our Legacy</span>
                </div>
              </AnimateDiv>
            </div>

            {/* Enhanced Heritage Quote */}
            <AnimateDiv animation="fade" delay={1.2}>
              <div className="max-w-4xl mx-auto">
                <div className="backdrop-blur-sm bg-gradient-to-r from-[#8B7355]/5 via-white/60 to-[#D4AF37]/5 rounded-3xl p-8 lg:p-12 border border-white/40 group hover:border-[#8B7355]/30 transition-all duration-500">
                  <SparklesIcon className="w-10 sm:w-12 h-10 sm:h-12 text-[#D4AF37] mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl italic text-[#8B7355] font-light leading-relaxed group-hover:text-[#A0845C] transition-colors duration-300">
                    "Every drop tells a story, every bottle carries a legacy,
                    every taste connects you to our Albanian soul."
                  </blockquote>
                  <div className="w-16 h-px bg-gradient-to-r from-[#8B7355] to-[#D4AF37] mx-auto mt-6 group-hover:w-24 transition-all duration-500" />
                  <p className="text-sm sm:text-base text-gray-600 font-medium mt-4 group-hover:text-gray-700 transition-colors duration-300">
                    — The Vehbiu Family
                  </p>
                </div>
              </div>
            </AnimateDiv>
          </div>
        </AnimateDiv>
      </section>

      <WhatsAppButton />
    </main>
  )
}