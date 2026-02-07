'use client'

import { useState, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  SparklesIcon,
  HeartIcon,
  FireIcon,
  MapPinIcon,
  StarIcon,
  SunIcon,
  MoonIcon,
  HomeIcon
} from '@heroicons/react/24/outline'

interface AnimationProps {
  children: ReactNode
  className?: string
  animation?: 'fade' | 'slide-up' | 'scale'
  duration?: number
  delay?: number
  [key: string]: any
}

const AnimateDiv = ({
  children,
  className = '',
  animation = 'fade',
  ...props
}: AnimationProps) => {
  return (
    <div
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}

interface CampSite {
  id: number
  name: string
  description: string
  price: number
  capacity: number
  amenities: string[]
  images: string[]
  featured?: boolean
}

const campsites: CampSite[] = [
  {
    id: 1,
    name: "Olive Grove Campsite",
    description: "Experience camping under ancient olive trees with partial views of the Adriatic Sea. Each site includes a cleared area for your tent and access to shared facilities.",
    price: 35,
    capacity: 4,
    amenities: ["Fire pit", "Picnic table", "Shared bathrooms", "Drinking water", "BBQ area", "Wifi hotspot"],
    images: ["/images/room-olive-1.webp", "/images/room-olive-2.webp"],
    featured: true
  },
  {
    id: 2,
    name: "Seaside Pitch",
    description: "Premium camping spots with direct sea views and private beach access. Enjoy the sounds of the waves as you fall asleep under the stars.",
    price: 45,
    capacity: 4,
    amenities: ["Private beach access", "Fire pit", "Picnic table", "Shared bathrooms", "Drinking water", "Hammock"],
    images: ["/images/room-garden-1.webp", "/images/room-garden-2.webp"],
    featured: true
  },
  {
    id: 3,
    name: "Forest Retreat",
    description: "Secluded camping spots nestled in a small forest area of the estate. Perfect for those seeking shade and privacy.",
    price: 30,
    capacity: 6,
    amenities: ["Fire pit", "Picnic table", "Shared bathrooms", "Drinking water", "Extra shade", "Wildlife viewing"],
    images: ["/images/room-family-1.webp", "/images/room-family-2.webp"]
  },
  {
    id: 4,
    name: "Glamping Tent",
    description: "Pre-set luxury bell tents with comfortable beds, linens, and furnishings. The perfect blend of camping and comfort.",
    price: 75,
    capacity: 2,
    amenities: ["Real bed", "Linens provided", "Solar lighting", "Private bathroom", "Outdoor lounge", "Breakfast included"],
    images: ["/images/room-heritage-1.webp", "/images/room-heritage-2.webp"],
    featured: true
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(price)
}

export default function Camping() {
  const [selectedSite, setSelectedSite] = useState<CampSite | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 font-cormorant relative overflow-hidden">

      {/* Hero Section - matching restaurant style */}
      <section className="relative min-h-[70vh] lg:min-h-[60vh] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/stay_snippet.webp"
            alt="Kallmi Estate Camping - Under the Stars"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 sm:px-6 py-20">
          <div className="max-w-4xl space-y-6">
            <AnimateDiv animation="fade" duration={1.0} delay={0.2}>
              <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium tracking-wide">
                <FireIcon className="w-4 h-4" />
                Wild & Free
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.3}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide">
                Kallmi
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic text-[#D4AF37] mt-2">
                  Camping
                </span>
              </h1>
            </AnimateDiv>

            <AnimateDiv animation="fade" duration={1.0} delay={0.5}>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-px bg-white/40" />
                <HomeIcon className="w-5 h-5 text-[#D4AF37]" />
                <div className="w-16 h-px bg-white/40" />
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.6}>
              <p className="text-lg sm:text-xl lg:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                Sleep under <span className="text-[#D4AF37]">ancient olive trees</span> and wake to
                breathtaking Adriatic sunrises
              </p>
            </AnimateDiv>

            {/* Info Cards */}
            <AnimateDiv animation="slide-up" duration={1.0} delay={0.8}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: HomeIcon, text: "Olive Grove Sites" },
                  { icon: SunIcon, text: "Sea Views" },
                  { icon: MoonIcon, text: "Stargazing" },
                ].map((item, index) => (
                  <div key={index} className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-3 min-w-[120px] text-center">
                    <item.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                    <p className="text-white/90 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimateDiv>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative py-12 sm:py-16 lg:py-24">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* Content Side */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-block">
                  <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                    Wild Adventure
                  </span>
                  <div className="w-16 h-px bg-[#8B7355] mt-2" />
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight text-[#8B7355] leading-tight">
                  Camping Among
                  <span className="block italic mt-1 sm:mt-2">Ancient Olives</span>
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-light">
                <p className="relative pl-4 sm:pl-6 border-l-2 border-[#8B7355]/30">
                  Immerse yourself in nature's embrace where centuries-old olive trees whisper stories
                  of the past while the Adriatic Sea serenades you to sleep under a blanket of stars.
                </p>
                <p className="relative pl-4 sm:pl-6 border-l-2 border-[#8B7355]/30">
                  From rustic tent sites to luxury glamping, experience the perfect balance of adventure
                  and comfort in Albania's most pristine coastal setting.
                </p>
                <p className="relative pl-4 sm:pl-6 border-l-2 border-[#8B7355]/30">
                  Wake to stunning sunrises, explore hidden beaches, and create memories that will
                  last a lifetime in this untouched paradise.
                </p>
              </div>

              {/* Experience Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8">
                {[
                  { number: '4', label: 'Unique Sites' },
                  { number: '5★', label: 'Experience' },
                  { number: '24/7', label: 'Nature' }
                ].map((stat, index) => (
                  <AnimateDiv
                    key={index}
                    animation="slide-up"
                    delay={0.8 + index * 0.2}
                    className="text-center"
                  >
                    <div className="backdrop-blur-sm bg-white/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/40">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-light text-[#8B7355]">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">{stat.label}</div>
                    </div>
                  </AnimateDiv>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-5 order-1 lg:order-2 mb-8 lg:mb-0">
              <AnimateDiv
                animation="slide-up"
                duration={1.0}
                delay={0.3}
                className="relative group"
              >
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="aspect-[3/4] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src="/images/room-interior.webp"
                      alt="Camping Under Olive Trees"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={85}
                    />
                  </div>
                  <div className="aspect-[3/4] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl mt-4 sm:mt-8 group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src="/images/room-view.webp"
                      alt="Adriatic Sea Views"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={85}
                    />
                  </div>
                </div>
                {/* Floating Frame Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#8B7355]/20 to-transparent rounded-3xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </AnimateDiv>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Campsites Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-stone-50/50 to-white">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-20">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                Choose Your Adventure
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mt-4 mb-6 leading-tight">
                Our Campsites
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                From rustic tent pitches under ancient olives to luxury glamping with all amenities,
                find your perfect camping experience
              </p>
            </AnimateDiv>
          </div>

          {/* Campsites Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {campsites.map((site, index) => (
              <AnimateDiv
                key={site.id}
                animation="slide-up"
                duration={0.8}
                delay={index * 0.2}
                className="group"
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/30 hover:border-[#8B7355]/30">

                  {/* Featured Badge */}
                  {site.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <SparklesIcon className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Site Image */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-stone-50 to-stone-100">
                    <Image
                      src={site.images[0]}
                      alt={site.name}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      quality={85}
                    />

                    {/* Floating Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B7355]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Site Info */}
                  <div className="p-6 lg:p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl lg:text-2xl font-light text-[#8B7355] group-hover:text-[#A0845C] transition-colors duration-300">
                        {site.name}
                      </h3>
                      <span className="text-xl lg:text-2xl font-light text-[#8B7355] whitespace-nowrap ml-4">
                        €{formatPrice(site.price)} / night
                      </span>
                    </div>

                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-light">
                      {site.description}
                    </p>

                    {/* Capacity & Amenities Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-[#8B7355]/10 text-[#8B7355] px-3 py-1 rounded-full font-medium">
                        Up to {site.capacity} people
                      </span>
                      {site.amenities.slice(0, 2).map((amenity, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {site.amenities.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          +{site.amenities.length - 2} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSite(site)
                        setCurrentImageIndex(0)
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                    >
                      View Details & Book
                    </button>
                  </div>
                </div>
              </AnimateDiv>
            ))}
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Reservation Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-stone-50">
        <div className="absolute inset-0 bg-[url('/images/pattern.webp')] opacity-5"></div>
        <AnimateDiv
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10"
          animation="fade"
          duration={1.0}
        >
          <div className="space-y-6 mb-12">
            <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
              Book Your Adventure
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight text-[#8B7355] leading-tight">
              Reserve Your
              <span className="block italic">Perfect Campsite</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
              Secure your spot under the stars and create unforgettable memories
              in Albania's most enchanting camping destination.
            </p>
          </div>

          <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative group">
                <select className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light">
                  <option value="">Select Campsite Type</option>
                  {campsites.map(site => (
                    <option key={site.id} value={site.id}>{site.name}</option>
                  ))}
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              <div className="relative group">
                <select className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light">
                  <option value="">Number of Campers</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative group">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">Check-in Date</label>
                <input
                  type="date"
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              <div className="relative group">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">Check-out Date</label>
                <input
                  type="date"
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            <div className="mb-8 relative group">
              <textarea
                placeholder="Special Requests or Equipment Needs"
                className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 h-32 resize-none font-light"
              ></textarea>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </div>

            <button className="w-full px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-lg">
              Check Availability
            </button>
          </div>

          <p className="mt-8 text-gray-500 font-light">
            For group bookings or special arrangements, contact us at{' '}
            <a href="mailto:reservations@kallmibukur.al" className="text-[#8B7355] hover:text-[#A0845C] transition-colors duration-300">
              reservations@kallmibukur.al
            </a>
          </p>
        </AnimateDiv>
      </section>

      {/* Enhanced Outdoor Activities Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-stone-50/50 to-white">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          <div className="text-center mb-12 sm:mb-20">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                Adventure Awaits
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mt-4 mb-6 leading-tight">
                Outdoor Activities
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Discover endless adventures from hiking ancient trails to stargazing
                under pristine Albanian skies
              </p>
            </AnimateDiv>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: MapPinIcon,
                title: "Hiking Trails",
                description: "Explore scenic trails through olive groves, along the coastline, and into nearby mountains with spectacular panoramic views.",
                delay: 0.1
              },
              {
                icon: SunIcon,
                title: "Beach Access",
                description: "Enjoy private access to pristine Adriatic beaches, perfect for swimming, snorkeling, and sunbathing during your stay.",
                delay: 0.2
              },
              {
                icon: MoonIcon,
                title: "Stargazing",
                description: "Experience the magic of unpolluted night skies with guided stargazing sessions and astronomy talks.",
                delay: 0.3
              }
            ].map((activity, index) => (
              <AnimateDiv
                key={index}
                animation="slide-up"
                duration={0.8}
                delay={activity.delay}
                className="group text-center"
              >
                <div className="backdrop-blur-sm bg-white/60 rounded-3xl p-8 lg:p-10 border border-white/40 hover:border-[#8B7355]/30 transition-all duration-500 hover:shadow-xl">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#8B7355]/10 to-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <activity.icon className="w-8 h-8 text-[#8B7355]" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-light text-[#8B7355] mb-4 group-hover:text-[#A0845C] transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-light">
                    {activity.description}
                  </p>
                </div>
              </AnimateDiv>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <HeartIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>Plan Your Adventure</span>
            </Link>
          </div>
        </AnimateDiv>
      </section>

      {/* Enhanced Campsite Detail Modal */}
      {selectedSite && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/30">
            <div className="relative h-80">
              <Image
                src={selectedSite.images[currentImageIndex]}
                alt={selectedSite.name}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                quality={85}
              />
              <button
                onClick={() => setSelectedSite(null)}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {selectedSite.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : selectedSite.images.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev < selectedSite.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {selectedSite.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl lg:text-3xl font-light text-[#8B7355]">{selectedSite.name}</h3>
                <span className="text-2xl lg:text-3xl font-light text-[#8B7355]">€{formatPrice(selectedSite.price)} / night</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-sm bg-[#8B7355]/10 text-[#8B7355] px-4 py-2 rounded-full font-medium">
                  Up to {selectedSite.capacity} people
                </span>
                {selectedSite.featured && (
                  <span className="text-sm bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white px-4 py-2 rounded-full font-medium">
                    Featured Site
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-8 text-lg leading-relaxed font-light">{selectedSite.description}</p>

              <div className="mb-8">
                <h4 className="text-xl text-[#8B7355] mb-4 font-light">Amenities & Features</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedSite.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#8B7355]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#8B7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-light">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="w-full px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-lg"
                onClick={() => {
                  setSelectedSite(null)
                  // Scroll to booking section
                  document.querySelector('.booking-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Book This Campsite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}