'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '../motion/FadeIn'
import { Section } from '../layout/Section'
import { Button } from '../ui/Button'

export default function AccommodationsSnippet() {
  return (
    <Section spacing="lg" background="default">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <FadeIn animation="slide-up">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg group">
            <Image
              src="https://storage.googleapis.com/kallmi/images/stay_snippet.webp"
              alt="Kallmi Estate Accommodations"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              quality={85}
              loading="lazy"
            />
          </div>
        </FadeIn>

        {/* Content */}
        <div className="space-y-6">
          <FadeIn animation="slide-up">
            <div className="space-y-4">
              <span className="text-overline">Boutique Retreat</span>
              <div className="divider-accent" />
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.1}>
            <h2 className="text-heading text-brand-olive">Stay With Us</h2>
          </FadeIn>

          <FadeIn animation="fade" delay={0.2}>
            <div className="space-y-4 text-body-lg">
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
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.3}>
            <Link href="/stay">
              <Button variant="primary" className="mt-4">
                Book Your Stay
              </Button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
