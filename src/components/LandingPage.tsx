'use client'

console.log('Loading LandingPage.tsx module')

import Image from 'next/image'
import Link from 'next/link'
import { AnimateDiv, AnimateButton } from './motion/MotionWrapper'
import LandingHero from './sections/LandingHero'
import { features, pressReviews } from '@/data/content'
import { useEffect } from 'react'
import TastingNotes from './sections/TastingNotes'
import Certifications from './sections/Certifications'
import LimitedEditionPage from './LimitedEditionPage'

export default function LandingPage() {
  console.log('LandingPage component rendering')

  useEffect(() => {
    console.log('LandingPage component mounted')
    return () => console.log('LandingPage component unmounting')
  }, [])

  return (
    <div className="font-cormorant text-gray-800 overflow-hidden">
      <LandingHero />

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {features.map((feature, index) => (
              <AnimateDiv
                key={feature.title}
                animation="slide-up"
                duration={0.5}
                delay={index * 0.2}
                className="group text-center p-8 rounded-lg hover:bg-white/80 hover:shadow-2xl
                           backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2
                           border border-transparent hover:border-gray-100"
              >
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    fill
                    sizes="160px"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6Oj03MS85RkVHSnBwcHp6eXp4eXl5eXl5eXn/2wBDARUXFyAeIBogHh4gIiEgMSEhISEhMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
                <h3 className="text-2xl text-[#8B7355] mb-4 group-hover:text-[#6B563F]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </AnimateDiv>
            ))}
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
                src="/images/contact.webp"
                alt="Kallmi Estate olive groves"
                className="object-cover hover:scale-105 transition-transform duration-700"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6Oj03MS85RkVHSnBwcHp6eXp4eXl5eXl5eXn/2wBDARUXFyAeIBogHh4gIiEgMSEhISEhMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>
        </AnimateDiv>
      </section>

      <TastingNotes />
      <Certifications />

      {/* Press Section */}
      <section className="py-24 bg-[#F8F6F3]">
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
      </section>

      {/* Limited Edition Section */}
      {/* <LimitedEditionPage /> */}

      {/* WhatsApp button */}
      <AnimateButton
        href="https://wa.me/355682450851"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] p-4 rounded-full shadow-lg
                   hover:shadow-2xl transition-all duration-300 group
                   hover:bg-[#1ea952] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        animation="scale"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full animate-ping bg-[#25D366] opacity-40"></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-white group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </AnimateButton>
    </div>
  )
}