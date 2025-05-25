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
  GlobeAltIcon
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

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#8B7355]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#8B7355]/3 rounded-full blur-3xl animate-pulse delay-3000" />
      </div>

      {/* Immersive Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 scale-110">
          <Image
            src="/images/entrance.webp"
            alt="Kallmi Estate - Gateway to Heritage"
            fill
            className="object-cover object-center"
            priority
            quality={95}
            sizes="100vw"
          />
        </div>

        {/* Sophisticated Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/30 via-transparent to-[#D4AF37]/20" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 sm:px-6">
          <div className="max-w-5xl space-y-6 sm:space-y-10">

            {/* Floating Heritage Badge */}
            <AnimateDiv
              animation="fade"
              duration={1.2}
              delay={0.3}
              className="inline-block"
            >
              <div className="backdrop-blur-md bg-white/10 rounded-full px-6 py-3 border border-white/20 mb-6">
                <span className="text-sm sm:text-base font-medium tracking-widest uppercase text-white/90 flex items-center space-x-2">
                  <SparklesIcon className="w-4 h-4" />
                  <span>Est. 1920 • Four Generations</span>
                  <SparklesIcon className="w-4 h-4" />
                </span>
              </div>
            </AnimateDiv>

            {/* Main Title */}
            <AnimateDiv
              animation="slide-up"
              duration={1.4}
              delay={0.6}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extralight tracking-wide leading-tight">
                <span className="block">Our</span>
                <span className="block text-3xl sm:text-5xl lg:text-7xl italic font-light text-[#D4AF37] mt-2">
                  Story
                </span>
              </h1>
            </AnimateDiv>

            {/* Elegant Divider */}
            <AnimateDiv
              animation="fade"
              duration={1.0}
              delay={1.0}
              className="flex items-center justify-center space-x-4"
            >
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <HeartIcon className="w-6 h-6 text-[#D4AF37]" />
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </AnimateDiv>

            {/* Subtitle */}
            <AnimateDiv
              animation="slide-up"
              duration={1.2}
              delay={1.3}
            >
              <p className="text-lg sm:text-2xl lg:text-3xl font-light opacity-95 leading-relaxed max-w-4xl mx-auto">
                A <span className="text-[#D4AF37]">century of tradition</span>,
                a lifetime of passion, and the eternal pursuit of
                <span className="text-[#D4AF37]"> liquid gold</span>
              </p>
            </AnimateDiv>

            {/* Heritage Stats */}
            <AnimateDiv
              animation="slide-up"
              duration={1.0}
              delay={1.6}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12"
            >
              {[
                { icon: ClockIcon, number: "100+", text: "Years of Heritage" },
                { icon: BeakerIcon, number: "4th", text: "Generation" },
                { icon: StarIcon, number: "1920", text: "Founded" }
              ].map((item, index) => (
                <div key={index} className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
                  <item.icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                  <div className="text-2xl sm:text-3xl font-light text-white mb-1">{item.number}</div>
                  <p className="text-white/90 text-sm font-light">{item.text}</p>
                </div>
              ))}
            </AnimateDiv>
          </div>
        </div>

        {/* Scroll Indicator */}
        <AnimateDiv
          animation="fade"
          duration={1.0}
          delay={2.0}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 text-white/70">
            <span className="text-xs sm:text-sm font-light tracking-widest uppercase">
              Discover Our Heritage
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Heritage Section */}
      <section className="relative py-20 sm:py-32">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">

            {/* Content Side */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-12 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase flex items-center space-x-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>Durrës, Albania</span>
                  </span>
                  <div className="w-20 h-px bg-[#8B7355] mt-3" />
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-[#8B7355] leading-tight">
                  Our
                  <span className="block italic text-[#D4AF37]">Heritage</span>
                </h2>
              </div>

              <div className="space-y-8 text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#8B7355] to-[#D4AF37] rounded-full opacity-30" />
                  <p className="relative pl-8">
                    Nestled in the sun-kissed hills of Durrës, Albania, Kallmi Estate has been a testament
                    to the art of olive oil making for over a century. Our story began with our ancestors,
                    who recognized the unique potential of this fertile land.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-[#8B7355] rounded-full opacity-30" />
                  <p className="relative pl-8">
                    They planted the first olive trees that would become our legacy, understanding that
                    this sacred land would nurture generations of liquid gold. Each tree tells a story
                    of patience, wisdom, and unwavering dedication.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#8B7355] to-[#D4AF37] rounded-full opacity-30" />
                  <p className="relative pl-8">
                    Today, we continue to honor their wisdom by maintaining traditional methods while
                    embracing modern techniques. Each bottle carries not just the pure essence of our olives,
                    but the rich history of our land and the soul of our people.
                  </p>
                </div>
              </div>

              {/* Heritage Timeline */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {[
                  { year: '1920', event: 'Founded' },
                  { year: '1950', event: 'Expanded' },
                  { year: '1980', event: 'Modernized' },
                  { year: '2024', event: 'Thriving' }
                ].map((milestone, index) => (
                  <AnimateDiv
                    key={index}
                    animation="slide-up"
                    delay={0.8 + index * 0.2}
                    className="text-center group"
                  >
                    <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-4 border border-white/40 group-hover:bg-white/80 transition-all duration-300">
                      <div className="text-xl sm:text-2xl font-light text-[#8B7355]">{milestone.year}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">{milestone.event}</div>
                    </div>
                  </AnimateDiv>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <AnimateDiv
                animation="slide-up"
                duration={1.2}
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

                  {/* Floating Heritage Badge */}
                  <div className="absolute top-6 left-6 backdrop-blur-md bg-white/20 rounded-2xl p-4 border border-white/30">
                    <div className="text-white text-sm font-medium">Est. 1920</div>
                    <div className="text-white/80 text-xs">Albania's Heritage</div>
                  </div>
                </div>

                {/* Floating Frame Effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-[#8B7355]/20 to-[#D4AF37]/20 rounded-3xl -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </AnimateDiv>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Values Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-stone-50/50 to-white">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-24">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                Core Principles
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mt-4 mb-6 leading-tight">
                Our Values
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                The timeless principles that guide every drop of liquid gold we create
              </p>
            </AnimateDiv>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: ClockIcon,
                title: "Tradition",
                description: "We preserve century-old methods passed down through generations, ensuring each bottle tells our story of heritage and craftsmanship that spans over 100 years.",
                color: "from-[#8B7355] to-[#A0845C]"
              },
              {
                icon: StarIcon,
                title: "Quality",
                description: "From harvest to bottle, we maintain the highest standards of excellence, producing olive oil that meets the most discerning palates and exceeds expectations.",
                color: "from-[#D4AF37] to-[#F4D03F]"
              },
              {
                icon: BeakerIcon,
                title: "Sustainability",
                description: "We are committed to sustainable farming practices that protect our environment and ensure our olive groves thrive for future generations to come.",
                color: "from-[#8B7355] to-[#D4AF37]"
              }
            ].map((value, index) => (
              <AnimateDiv
                key={index}
                animation="slide-up"
                duration={0.8}
                delay={0.4 + index * 0.2}
                className="group"
              >
                <div className="relative backdrop-blur-sm bg-white/80 rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 hover:border-[#8B7355]/30 h-full">

                  {/* Icon with Gradient Background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-light text-[#8B7355] mb-4 group-hover:text-[#A0845C] transition-colors duration-300">
                    {value.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed font-light">
                    {value.description}
                  </p>

                  {/* Floating Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B7355]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </div>
              </AnimateDiv>
            ))}
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Process Section */}
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#8B7355] to-[#6B563F] text-white overflow-hidden">

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full" />
        </div>

        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10"
          animation="fade"
          duration={1.0}
        >
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-24">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <span className="text-sm sm:text-base text-[#D4AF37] font-medium tracking-widest uppercase">
                Artisanal Craftsmanship
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight mt-4 mb-6 leading-tight">
                Our Process
              </h2>
              <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
                Where ancient wisdom meets modern precision in every golden drop
              </p>
            </AnimateDiv>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">

            {/* Image Side */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <AnimateDiv
                animation="slide-up"
                duration={1.2}
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

                  {/* Process Badge */}
                  <div className="absolute bottom-6 left-6 backdrop-blur-md bg-black/20 rounded-2xl p-4 border border-white/30">
                    <div className="text-white text-sm font-medium">Cold-Pressed</div>
                    <div className="text-white/80 text-xs">Within Hours</div>
                  </div>
                </div>

                {/* Floating Glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-[#D4AF37]/30 to-transparent rounded-3xl -z-10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </AnimateDiv>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 space-y-8 sm:space-y-12 order-1 lg:order-2">

              {/* Process Steps */}
              <div className="space-y-8">
                {[
                  {
                    icon: SunIcon,
                    title: "Hand-Picked Harvest",
                    description: "We carefully hand-pick our olives at the optimal moment of ripeness, ensuring each fruit contributes to the exceptional quality of our liquid gold."
                  },
                  {
                    icon: SparklesIcon,
                    title: "Cold-Pressed Excellence",
                    description: "Within hours of harvest, the olives are cold-pressed in our state-of-the-art facility, preserving their natural flavors and nutritional benefits."
                  },
                  {
                    icon: HeartIcon,
                    title: "Pure Perfection",
                    description: "This careful process results in an extra virgin olive oil of remarkable purity and character, carrying the essence of our Albanian heritage."
                  }
                ].map((step, index) => (
                  <AnimateDiv
                    key={index}
                    animation="slide-up"
                    delay={0.6 + index * 0.3}
                    className="flex items-start space-x-6 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl lg:text-2xl font-light text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed font-light">
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
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-white to-stone-50">
        <AnimateDiv
          className="max-w-5xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          <div className="text-center space-y-8 sm:space-y-12">

            {/* Section Header */}
            <AnimateDiv animation="slide-up" delay={0.2}>
              <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                Generational Wisdom
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mt-4 mb-6 leading-tight">
                A Family
                <span className="block italic text-[#D4AF37]">Legacy</span>
              </h2>
            </AnimateDiv>

            {/* Legacy Content */}
            <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 lg:p-16 shadow-2xl border border-white/30 space-y-8">

              <AnimateDiv animation="slide-up" delay={0.4}>
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#8B7355] to-transparent" />
                  <GlobeAltIcon className="w-8 h-8 text-[#D4AF37]" />
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#8B7355] to-transparent" />
                </div>
              </AnimateDiv>

              <AnimateDiv animation="slide-up" delay={0.6}>
                <p className="text-lg sm:text-2xl text-gray-700 leading-relaxed font-light mb-8">
                  Through generations, our family has been the custodian of these ancient olive groves.
                  Each generation has added its own chapter to our story while maintaining the core values
                  that make Kallmi Estate special.
                </p>
              </AnimateDiv>

              <AnimateDiv animation="slide-up" delay={0.8}>
                <p className="text-lg sm:text-2xl text-gray-700 leading-relaxed font-light mb-12">
                  Today, we invite you to be part of our continuing story. Every bottle of Kallmi Estate
                  olive oil is more than just a product – it's a piece of our heritage, a taste of our
                  tradition, and a promise of our commitment to excellence.
                </p>
              </AnimateDiv>

              {/* Call to Action */}
              <AnimateDiv animation="slide-up" delay={1.0}>
                <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <HeartIcon className="w-5 h-5" />
                  <span>Join Our Legacy</span>
                </div>
              </AnimateDiv>
            </div>

            {/* Heritage Quote */}
            <AnimateDiv animation="fade" delay={1.2}>
              <div className="max-w-3xl mx-auto">
                <blockquote className="text-xl sm:text-2xl italic text-[#8B7355] font-light leading-relaxed">
                  "Every drop tells a story, every bottle carries a legacy,
                  every taste connects you to our Albanian soul."
                </blockquote>
                <div className="w-16 h-px bg-[#D4AF37] mx-auto mt-6" />
              </div>
            </AnimateDiv>
          </div>
        </AnimateDiv>
      </section>

      <WhatsAppButton />
    </main>
  )
}