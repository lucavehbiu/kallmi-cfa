import type { Metadata } from 'next'
import Image from 'next/image'
import { AnimateDiv } from '@/components/motion/MotionWrapper'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Our Story | Kallmi i Bukur - Premium Albanian Olive Oil',
  description: 'Discover the rich heritage of Kallmi i Bukur, a family-owned olive grove in Durrës, Albania. Our century-old tradition of crafting premium olive oil continues to this day.',
  openGraph: {
    title: 'Our Story | Kallmi i Bukur - Premium Albanian Olive Oil',
    description: 'Discover the rich heritage of Kallmi i Bukur, a family-owned olive grove in Durrës, Albania. Our century-old tradition of crafting premium olive oil continues to this day.',
    images: ['/images/entrance.webp'],
  },
}

export default function OurStory() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-white">
        <Image
          src="/images/entrance.webp"
          alt="Kallmi i Bukur olive grove entrance"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl opacity-90">
            A century of tradition, a lifetime of passion
          </p>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-24 bg-stone-100">
        <AnimateDiv
          className="max-w-6xl mx-auto px-4"
          animation="slide-up"
          duration={0.8}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-stone-900">
                Our Heritage
              </h2>
              <p className="text-lg text-stone-700">
                Nestled in the sun-kissed hills of Durrës, Albania, Kallmi i Bukur has been a testament to the art of olive oil making for over a century. Our story began with our ancestors, who recognized the unique potential of this fertile land and planted the first olive trees that would become our legacy.
              </p>
              <p className="text-lg text-stone-700">
                Today, we continue to honor their wisdom by maintaining traditional methods while embracing modern techniques to produce olive oil of exceptional quality. Each bottle carries with it not just the pure essence of our olives, but the rich history of our land and people.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/hero-2nd.webp"
                alt="Historic view of Kallmi i Bukur olive grove"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <AnimateDiv
          className="max-w-6xl mx-auto px-4"
          animation="slide-up"
          duration={0.8}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 text-center mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-stone-50 shadow-sm">
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Tradition</h3>
              <p className="text-stone-700">
                We preserve century-old methods passed down through generations, ensuring each bottle tells our story of heritage and craftsmanship.
              </p>
            </div>
            <div className="p-8 rounded-lg bg-stone-50 shadow-sm">
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Quality</h3>
              <p className="text-stone-700">
                From harvest to bottle, we maintain the highest standards of quality, producing olive oil that meets the most discerning palates.
              </p>
            </div>
            <div className="p-8 rounded-lg bg-stone-50 shadow-sm">
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Sustainability</h3>
              <p className="text-stone-700">
                We are committed to sustainable farming practices that protect our environment and ensure our olive groves thrive for future generations.
              </p>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-stone-900 text-white">
        <AnimateDiv
          className="max-w-6xl mx-auto px-4"
          animation="slide-up"
          duration={0.8}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
            Our Process
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/hand-harvested.webp"
                alt="Olive oil production process at Kallmi i Bukur"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg">
                Our olive oil production combines time-honored traditions with modern precision. We carefully hand-pick our olives at the optimal moment of ripeness, ensuring each fruit contributes to the exceptional quality of our oil.
              </p>
              <p className="text-lg">
                Within hours of harvest, the olives are cold-pressed in our state-of-the-art facility, preserving their natural flavors and nutritional benefits. This careful process results in an extra virgin olive oil of remarkable purity and character.
              </p>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Family Legacy Section */}
      <section className="py-24 bg-stone-100">
        <AnimateDiv
          className="max-w-6xl mx-auto px-4"
          animation="slide-up"
          duration={0.8}
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900 mb-8">
              A Family Legacy
            </h2>
            <p className="text-lg text-stone-700 mb-6">
              Through generations, our family has been the custodian of these ancient olive groves. Each generation has added its own chapter to our story while maintaining the core values that make Kallmi i Bukur special.
            </p>
            <p className="text-lg text-stone-700">
              Today, we invite you to be part of our continuing story. Every bottle of Kallmi i Bukur olive oil is more than just a product – it's a piece of our heritage, a taste of our tradition, and a promise of our commitment to excellence.
            </p>
          </div>
        </AnimateDiv>
      </section>

      <WhatsAppButton />
    </main>
  )
}