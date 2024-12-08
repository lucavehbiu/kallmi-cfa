'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimateDiv } from './motion/MotionWrapper'
import { SparklesIcon } from '@heroicons/react/24/outline'

const limitedEditionDetails = {
  name: "Limited Edition 2024",
  price: 149.99,
  description: "Experience our most exclusive offering - the first cold press of the 2024 harvest. Each bottle is individually numbered and features hand-blown glass with 24k gold leaf details. Limited to only 500 bottles worldwide.",
  specs: [
    "500ml hand-blown glass bottle",
    "24k gold leaf details",
    "Individually numbered",
    "First cold press of 2024",
    "Limited to 500 bottles"
  ]
}

export default function LimitedEditionPage() {
  const [isReserving, setIsReserving] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F6F3]">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/images/limited-edition-hero.webp"
          alt="Limited Edition 2024"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-4">
          <h1 className="text-6xl sm:text-7xl font-light mb-6">Limited Edition 2024</h1>
          <p className="text-xl sm:text-2xl max-w-2xl mx-auto font-light tracking-wide">
            A masterpiece of nature and craftsmanship
          </p>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimateDiv animation="fade" className="relative aspect-square">
            <Image
              src="/images/limited-bottle.webp"
              alt="Limited Edition Bottle"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={100}
            />
          </AnimateDiv>

          <AnimateDiv animation="slide-up" className="flex flex-col justify-center">
            <h2 className="text-4xl text-[#8B7355] mb-4">{limitedEditionDetails.name}</h2>
            <p className="text-3xl text-[#8B7355] mb-8">${limitedEditionDetails.price}</p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {limitedEditionDetails.description}
            </p>
            <ul className="space-y-3 mb-12">
              {limitedEditionDetails.specs.map((spec) => (
                <li key={spec} className="flex items-center text-gray-600">
                  <SparklesIcon className="w-5 h-5 text-[#8B7355] mr-3" />
                  {spec}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsReserving(true)}
              className="bg-[#8B7355] text-white px-8 py-4 text-lg tracking-wider hover:bg-[#725f46] transition-colors duration-300"
            >
              RESERVE YOUR BOTTLE
            </button>
          </AnimateDiv>
        </div>
      </section>
    </div>
  )
}
