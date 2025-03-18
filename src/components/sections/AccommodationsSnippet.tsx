'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimateDiv } from '../motion/MotionWrapper'

export default function AccommodationsSnippet() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern.webp')] opacity-5"></div>
      <AnimateDiv
        className="max-w-7xl mx-auto px-4 sm:px-8 relative"
        animation="fade"
        duration={0.8}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/stay_snippet.webp"
              alt="Kallmi Estate Accommodations"
              className="object-cover hover:scale-105 transition-transform duration-700"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              quality={75}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6Oj03MS85RkVHSnBwcHp6eXp4eXl5eXl5eXn/2wBDARUXFyAeIBogHh4gIiEgMSEhISEhMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355]">Stay With Us</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Immerse yourself in the serene beauty of Kallmi Estate with a stay in our
                boutique accommodations, nestled among centuries-old olive trees with
                breathtaking views of the Adriatic Sea.
              </p>
              <p>
                Each room is thoughtfully designed with traditional Albanian elements and
                modern comforts, providing a peaceful retreat after a day of exploration.
                Wake up to birdsong and the gentle rustle of olive groves.
              </p>
              <Link
                href="/stay"
                className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-md hover:bg-[#6B563F] transition-colors duration-300 mt-4"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </AnimateDiv>
    </section>
  )
}