'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'

export default function LandingHero() {
  return (
    <section className="relative h-screen -mt-24">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.webp"
          alt="Olive grove"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      <div className="relative flex items-center justify-center h-full text-center text-white px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-[0.15em] sm:tracking-[0.25em]">
            KALLMI ESTATE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl italic opacity-90">
            Liquid gold from the sun-kissed shores of Albania
          </p>
          <Link href="/shop">
            <Button size="lg">
              Experience Our Heritage
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}