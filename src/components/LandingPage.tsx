'use client'

console.log('Loading LandingPage.tsx module')

import Image from 'next/image'
import { AnimateDiv } from './motion/MotionWrapper'
import LandingHero from './sections/LandingHero'
import { useEffect } from 'react'
import RestaurantSnippet from './sections/RestaurantSnippet'
import AccommodationsSnippet from './sections/AccommodationsSnippet'
import WhatsAppButton from './WhatsAppButton'

export default function LandingPage() {
  console.log('LandingPage component rendering')

  useEffect(() => {
    console.log('LandingPage component mounted')
    return () => console.log('LandingPage component unmounting')
  }, [])

  return (
    <main className="font-cormorant text-gray-800 overflow-hidden">
      <LandingHero />

      {/* Experience Preview Section */}
      <section className="py-16 sm:py-24 bg-white text-center">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355] mb-8">Experience Kallmi Estate</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            Discover Albania's hidden gem, where you can immerse yourself in authentic experiences,
            savor local flavors, and create unforgettable memories.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.1}
              className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-2"
            >
              <div className="relative h-64">
                <Image
                  src="/images/sunset3.webp"
                  alt="Breathtaking Adriatic Sunsets"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  quality={75}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-3xl text-white font-light tracking-wider">Sunsets</h3>
                </div>
              </div>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.2}
              className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-2"
            >
              <div className="relative h-64">
                <Image
                  src="/images/restaurant_snippet.webp"
                  alt="Fine Dining Restaurant"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  quality={75}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-3xl text-white font-light tracking-wider">Dine</h3>
                </div>
              </div>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.3}
              className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-2"
            >
              <div className="relative h-64">
                <Image
                  src="/images/stay_snippet.webp"
                  alt="Luxurious Accommodations"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  quality={75}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-3xl text-white font-light tracking-wider">Stay</h3>
                </div>
              </div>
            </AnimateDiv>
          </div>
        </AnimateDiv>
      </section>

      {/* Story Section */}
      <section id="our-story" className="py-20 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.webp')] opacity-5"></div>
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8 relative"
          animation="fade"
          duration={0.8}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355]">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Nestled along the pristine beaches of Kallmi, our olive groves have been
                  cultivated by our family for generations. The unique microclimate, where
                  sea breezes meet mountain air, creates olives of exceptional character.
                </p>
                <p>
                  Our extra virgin olive oil captures the essence of this magical place -
                  bright, peppery, with notes of fresh herbs and a velvety finish that
                  lingers on the palate.
                </p>
                <p>
                  Every bottle tells the story of our land, our family, and our unwavering
                  commitment to producing the finest olive oil in Albania.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/about_snippet.webp"
                alt="Kallmi Estate olive groves"
                className="object-cover hover:scale-105 transition-transform duration-700"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={75}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6Oj03MS85RkVHSnBwcHp6eXp4eXl5eXl5eXn/2wBDARUXFyAeIBogHh4gIiEgMSEhISEhMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Restaurant Section */}
      <RestaurantSnippet />

      {/* Accommodations Section */}
      <AccommodationsSnippet />

      {/* Sunset Gallery Section */}
      <section className="py-24 bg-[#F8F6F3]">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-6">Breathtaking Sunsets</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center">
            Experience the magic of Adriatic sunsets from Kallmi Estate, where every evening brings a spectacular
            display of colors reflecting over the sea.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.1}
              className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg group"
            >
              <Image
                src="/images/story.webp"
                alt="Adriatic Sunset View"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.2}
              className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg group"
            >
              <Image
                src="/images/sunset2.webp"
                alt="Golden Hour at Kallmi Beach"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.3}
              className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg group"
            >
              <Image
                src="/images/sunset3.webp"
                alt="Sunset View from Restaurant Terrace"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
            </AnimateDiv>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 italic">
              "The sun setting over the Adriatic Sea from Kallmi Estate creates a canvas of colors that words cannot describe."
            </p>
          </div>
        </AnimateDiv>
      </section>

      {/* Press Section */}
      {/* <section className="py-24 bg-[#F8F6F3]">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-16">Press & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReviews.map((review, index) => (
              <AnimateDiv
                key={index}
                animation="slide-up"
                duration={0.5}
                delay={index * 0.2}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-8 relative mb-6 rounded-full overflow-hidden">
                  <Image
                    src={review.imageUrl}
                    alt={review.source}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <p className="text-gray-600 italic mb-4">&ldquo;{review.quote}&rdquo;</p>
                <p className="text-[#8B7355] font-semibold">{review.source}</p>
              </AnimateDiv>
            ))}
          </div>
        </AnimateDiv>
      </section> */}

      <WhatsAppButton />
    </main>
  )
}