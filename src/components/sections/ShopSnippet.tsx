'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimateDiv } from '../motion/MotionWrapper'

export default function ShopSnippet() {
  return (
    <section className="py-24 bg-[#F8F6F3] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/kallmi/images/pattern.webp')] opacity-5"></div>
      <AnimateDiv
        className="max-w-7xl mx-auto px-4 sm:px-8 relative"
        animation="fade"
        duration={0.8}
      >
        <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-16">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimateDiv
            animation="slide-up"
            duration={0.5}
            delay={0.1}
            className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            <div className="relative h-80">
              <Image
                src="https://storage.googleapis.com/kallmi/images/product.webp"
                alt="Premium Olive Oil"
                className="object-cover hover:scale-105 transition-transform duration-700"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                quality={75}
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl text-[#8B7355] mb-2">Premium Olive Oil</h3>
              <p className="text-gray-600 mb-6">Experience the rich flavors of our estate-grown olives, cold-pressed to perfection.</p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2 border border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-white transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </AnimateDiv>

          <AnimateDiv
            animation="slide-up"
            duration={0.5}
            delay={0.2}
            className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            <div className="relative h-80">
              <Image
                src="https://storage.googleapis.com/kallmi/images/honey.webp"
                alt="Local Honey"
                className="object-cover hover:scale-105 transition-transform duration-700"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                quality={75}
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl text-[#8B7355] mb-2">Local Honey</h3>
              <p className="text-gray-600 mb-6">Sweet, aromatic honey made by bees that pollinate our estate and surrounding wildflowers.</p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2 border border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-white transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </AnimateDiv>

          <AnimateDiv
            animation="slide-up"
            duration={0.5}
            delay={0.3}
            className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            <div className="relative h-80">
              <Image
                src="https://storage.googleapis.com/kallmi/images/artisan.webp"
                alt="Artisan Crafts"
                className="object-cover hover:scale-105 transition-transform duration-700"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                quality={75}
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl text-[#8B7355] mb-2">Artisan Crafts</h3>
              <p className="text-gray-600 mb-6">Hand-crafted items made by local artisans, showcasing Albanian traditions and craftsmanship.</p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2 border border-[#8B7355] text-[#8B7355] rounded-md hover:bg-[#8B7355] hover:text-white transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </AnimateDiv>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-md hover:bg-[#6B563F] transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </AnimateDiv>
    </section>
  )
}