'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimateDiv } from './motion/MotionWrapper'

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
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export default function Camping() {
  const [selectedSite, setSelectedSite] = useState<CampSite | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="min-h-screen bg-stone-50 font-cormorant">
      {/* Hero Section */}
      <div className="h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/stay_snippet.webp"
          alt="Kallmi Estate Camping"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4 text-center">Camp With Us</h1>
          <p className="text-xl md:text-2xl max-w-2xl text-center font-light">
            Experience the beauty of the Albanian coast under the stars
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355]">Camping at Kallmi Estate</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Immerse yourself in the natural beauty of Albania with our unique camping experience
                  at Kallmi Estate. Camp among centuries-old olive trees with breathtaking views of the
                  Adriatic Sea.
                </p>
                <p>
                  Whether you prefer a simple tent site or our luxurious glamping option, you'll connect
                  with nature while enjoying access to the amenities and experiences of the estate.
                </p>
                <p>
                  Wake up to stunning sunrises, spend your days exploring the coastline, and fall asleep
                  under a blanket of stars, all while being just steps away from our restaurant and facilities.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/room-interior.webp"
                  alt="Camping Site"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={80}
                />
              </div>
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg mt-8">
                <Image
                  src="/images/room-view.webp"
                  alt="Camping View"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={80}
                />
              </div>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Campsites Section */}
      <section className="py-20 bg-[#F8F6F3]">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-16">Our Campsites</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campsites.map((site) => (
              <AnimateDiv
                key={site.id}
                animation="slide-up"
                duration={0.5}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={site.images[0]}
                    alt={site.name}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                  {site.featured && (
                    <div className="absolute top-4 right-4 bg-[#8B7355] text-white px-3 py-1 rounded-full text-sm">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl text-[#8B7355]">{site.name}</h3>
                    <span className="text-xl text-[#8B7355]">{formatPrice(site.price)} / night</span>
                  </div>
                  <p className="text-gray-600 mb-4">{site.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">Up to {site.capacity} people</span>
                    {site.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">{amenity}</span>
                    ))}
                    {site.amenities.length > 3 && (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">+{site.amenities.length - 3} more</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSite(site)
                      setCurrentImageIndex(0)
                    }}
                    className="px-6 py-2 bg-[#8B7355] text-white rounded hover:bg-[#6B563F] transition-colors w-full"
                  >
                    View Details & Book
                  </button>
                </div>
              </AnimateDiv>
            ))}
          </div>
        </AnimateDiv>
      </section>

      {/* Reservation Section */}
      <section className="py-20 bg-white relative booking-section">
        <div className="absolute inset-0 bg-[url('/images/pattern.webp')] opacity-5"></div>
        <AnimateDiv
          className="max-w-3xl mx-auto px-4 sm:px-8 text-center relative"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355] mb-6">Book Your Campsite</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Reserve your perfect camping spot at Kallmi Estate and create unforgettable memories under the Albanian stars.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                >
                  <option value="">Select Campsite Type</option>
                  {campsites.map(site => (
                    <option key={site.id} value={site.id}>{site.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                >
                  <option value="">Number of Campers</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-medium mb-1 text-left">Check-in Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-medium mb-1 text-left">Check-out Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                />
              </div>
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Special Requests"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355] h-24"
              ></textarea>
            </div>
            <button
              className="w-full px-6 py-3 bg-[#8B7355] text-white rounded-md hover:bg-[#6B563F] transition-colors duration-300 text-lg"
            >
              Check Availability
            </button>
          </div>
          <p className="mt-8 text-gray-500">
            For special arrangements or group bookings, please contact us directly at <span className="text-[#8B7355]">camping@kallmiestate.com</span>
          </p>
        </AnimateDiv>
      </section>

      {/* Outdoor Activities Section */}
      <section className="py-20 bg-stone-50">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-16">Outdoor Activities</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.1}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#8B7355]/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8B7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl text-[#8B7355] mb-4">Hiking Trails</h3>
              <p className="text-gray-600">
                Explore scenic trails from the estate through olive groves, along the coastline, and into the nearby mountains with spectacular views.
              </p>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.2}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#8B7355]/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8B7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl text-[#8B7355] mb-4">Beach Access</h3>
              <p className="text-gray-600">
                Enjoy private access to the pristine Adriatic beaches, perfect for swimming, snorkeling, and sunbathing during your camping stay.
              </p>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.3}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-[#8B7355]/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#8B7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h3 className="text-2xl text-[#8B7355] mb-4">Stargazing</h3>
              <p className="text-gray-600">
                Experience the magic of the night sky with minimal light pollution. We offer guided stargazing sessions with our resident astronomy enthusiast.
              </p>
            </AnimateDiv>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-md hover:bg-[#6B563F] transition-colors duration-300"
            >
              Ask About Activities
            </Link>
          </div>
        </AnimateDiv>
      </section>

      {/* Campsite Detail Modal */}
      {selectedSite && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {selectedSite.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : selectedSite.images.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev < selectedSite.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
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
                        className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl text-[#8B7355]">{selectedSite.name}</h3>
                <span className="text-2xl text-[#8B7355]">{formatPrice(selectedSite.price)} / night</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">Up to {selectedSite.capacity} people</span>
              </div>

              <p className="text-gray-700 mb-6">{selectedSite.description}</p>

              <div className="mb-6">
                <h4 className="text-xl text-[#8B7355] mb-2">Amenities</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedSite.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8B7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="w-full px-6 py-3 bg-[#8B7355] text-white rounded-md hover:bg-[#6B563F] transition-colors duration-300 text-lg"
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