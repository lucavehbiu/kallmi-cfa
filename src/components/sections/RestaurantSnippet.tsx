'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '../motion/FadeIn'
import { Section } from '../layout/Section'
import { Button } from '../ui/Button'

export default function RestaurantSnippet() {
  return (
    <Section spacing="lg" background="secondary">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Content */}
        <div className="order-2 lg:order-1 space-y-6">
          <FadeIn animation="slide-up">
            <div className="space-y-4">
              <span className="text-overline">Culinary Experience</span>
              <div className="divider-accent" />
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.1}>
            <h2 className="text-heading text-brand-olive">Dine With Us</h2>
          </FadeIn>

          <FadeIn animation="fade" delay={0.2}>
            <div className="space-y-4 text-body-lg">
              <p>
                Experience the authentic flavors of Albania at our estate restaurant, where we
                craft seasonal dishes using the freshest local ingredients, including our own
                olive oil harvest.
              </p>
              <p>
                Our menu celebrates traditional Albanian cuisine with a modern twist,
                letting the pure flavors of each ingredient shine. Enjoy your meal with
                panoramic views of our olive groves and the Adriatic coastline.
              </p>
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.3}>
            <Link href="/restaurant">
              <Button variant="primary" className="mt-4">
                Explore Our Menu
              </Button>
            </Link>
          </FadeIn>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          <FadeIn animation="slide-up" delay={0.2}>
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src="/images/restaurant_snippet.webp"
                alt="Kallmi Estate Restaurant"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={85}
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
