'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimateDiv } from './motion/MotionWrapper'

interface Room {
  id: number
  name: string
  description: string
  price: number
  size: string
  capacity: number
  amenities: string[]
  images: string[]
  featured?: boolean
}

const rooms: Room[] = [
  {
    id: 1,
    name: "Olive View Suite",
    description: "Luxurious suite with panoramic views of our olive groves and the Adriatic Sea. Features a king-sized bed, spacious living area, and private balcony.",
    price: 120,
    size: "45 m²",
    capacity: 2,
    amenities: ["King bed", "Private balcony", "Ensuite bathroom", "Air conditioning", "Mini fridge", "Free WiFi", "Daily housekeeping"],
    images: ["/images/room-olive-1.webp", "/images/room-olive-2.webp", "/images/room-olive-3.webp"],
    featured: true
  },
  {
    id: 2,
    name: "Garden Retreat",
    description: "Charming room overlooking our lush gardens. Features a queen-sized bed, cozy sitting area, and traditional Albanian furnishings.",
    price: 90,
    size: "30 m²",
    capacity: 2,
    amenities: ["Queen bed", "Garden view", "Ensuite bathroom", "Air conditioning", "Free WiFi", "Daily housekeeping"],
    images: ["/images/room-garden-1.webp", "/images/room-garden-2.webp"]
  },
  {
    id: 3,
    name: "Family Cottage",
    description: "Spacious cottage ideal for families, with a master bedroom, second bedroom with twin beds, and a comfortable living area.",
    price: 160,
    size: "65 m²",
    capacity: 4,
    amenities: ["King bed", "Two twin beds", "Full kitchen", "Living area", "Private patio", "Air conditioning", "Free WiFi", "Daily housekeeping"],
    images: ["/images/room-family-1.webp", "/images/room-family-2.webp", "/images/room-family-3.webp"],
    featured: true
  },
  {
    id: 4,
    name: "Heritage Room",
    description: "Traditional room featuring authentic Albanian decor and craftsmanship. Offers a queen-sized bed and views of the countryside.",
    price: 85,
    size: "25 m²",
    capacity: 2,
    amenities: ["Queen bed", "Countryside view", "Ensuite bathroom", "Air conditioning", "Free WiFi", "Daily housekeeping"],
    images: ["/images/room-heritage-1.webp", "/images/room-heritage-2.webp"]
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export default function Accommodations() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="min-h-screen bg-stone-50 font-cormorant">
      {/* Hero Section */}
      <div className="h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/accommodations-hero.webp"
          alt="Kallmi Estate Accommodations"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4 text-center">Stay With Us</h1>
          <p className="text-xl md:text-2xl max-w-2xl text-center font-light">
            Experience authentic Albanian hospitality in our boutique accommodations
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
              <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355]">Your Home in Albania</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  At Kallmi Estate, we invite you to experience the genuine warmth of Albanian
                  hospitality in our thoughtfully designed accommodations. Each room is a perfect
                  blend of traditional elements and modern comforts.
                </p>
                <p>
                  Nestled among centuries-old olive trees with breathtaking views of the Adriatic Sea,
                  our accommodations offer a peaceful retreat from the bustle of everyday life.
                </p>
                <p>
                  Whether you're enjoying a morning coffee on your private balcony, relaxing in our gardens,
                  or stargazing in the evening, you'll feel a deep connection to the natural beauty and
                  rich heritage of Albania.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/room-interior.webp"
                  alt="Room Interior"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={80}
                />
              </div>
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg mt-8">
                <Image
                  src="/images/room-view.webp"
                  alt="Room with a View"
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

      {/* Our Rooms Section */}
      <section className="py-20 bg-[#F8F6F3]">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-16">Our Accommodations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room) => (
              <AnimateDiv
                key={room.id}
                animation="slide-up"
                duration={0.5}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                  {room.featured && (
                    <div className="absolute top-4 right-4 bg-[#8B7355] text-white px-3 py-1 rounded-full text-sm">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl text-[#8B7355]">{room.name}</h3>
                    <span className="text-xl text-[#8B7355]">{formatPrice(room.price)} / night</span>
                  </div>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">{room.size}</span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">Sleeps {room.capacity}</span>
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">{amenity}</span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">+{room.amenities.length - 3} more</span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRoom(room)
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
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-[url('/images/pattern.webp')] opacity-5"></div>
        <AnimateDiv
          className="max-w-3xl mx-auto px-4 sm:px-8 text-center relative"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355] mb-6">Book Your Stay</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Experience the serenity of Kallmi Estate. Reserve your accommodation and create lasting memories with us.
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
                  <option value="">Select Room Type</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                >
                  <option value="">Number of Guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
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
            For special arrangements or group bookings, please contact us directly at <span className="text-[#8B7355]">stay@kallmiestate.com</span>
          </p>
        </AnimateDiv>
      </section>

      {/* Experiences Section */}
      <section className="py-20 bg-stone-50">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-16">Guest Experiences</h2>

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
              <h3 className="text-2xl text-[#8B7355] mb-4">Olive Oil Tasting</h3>
              <p className="text-gray-600">
                Join our experts for a guided tasting of our estate-produced olive oils, learning about
                the distinctive qualities of different varieties and production methods.
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
              <h3 className="text-2xl text-[#8B7355] mb-4">Cooking Workshops</h3>
              <p className="text-gray-600">
                Learn the secrets of traditional Albanian cuisine in our hands-on cooking classes,
                using ingredients freshly harvested from our gardens.
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
              <h3 className="text-2xl text-[#8B7355] mb-4">Local Excursions</h3>
              <p className="text-gray-600">
                Explore the stunning Albanian coastline, historic sites, and charming villages with our
                guided tours, discovering the rich culture and natural beauty of the region.
              </p>
            </AnimateDiv>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-md hover:bg-[#6B563F] transition-colors duration-300"
            >
              Inquire About Activities
            </Link>
          </div>
        </AnimateDiv>
      </section>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-80">
              <Image
                src={selectedRoom.images[currentImageIndex]}
                alt={selectedRoom.name}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                quality={85}
              />
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {selectedRoom.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : selectedRoom.images.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev < selectedRoom.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {selectedRoom.images.map((_, index) => (
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
                <h3 className="text-3xl text-[#8B7355]">{selectedRoom.name}</h3>
                <span className="text-2xl text-[#8B7355]">{formatPrice(selectedRoom.price)} / night</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{selectedRoom.size}</span>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">Sleeps {selectedRoom.capacity}</span>
              </div>

              <p className="text-gray-700 mb-6">{selectedRoom.description}</p>

              <div className="mb-6">
                <h4 className="text-xl text-[#8B7355] mb-2">Amenities</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedRoom.amenities.map((amenity, index) => (
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
                  setSelectedRoom(null)
                  // Scroll to booking section
                  document.querySelector('.booking-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Book This Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}