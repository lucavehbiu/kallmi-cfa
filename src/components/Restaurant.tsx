'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { AnimateDiv } from './motion/MotionWrapper'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: 'starters' | 'mains' | 'desserts'
  image: string
  seasonal?: boolean
  featured?: boolean
}

const menu: MenuItem[] = [
  {
    id: 1,
    name: "Wild Herb Salad",
    description: "Foraged herbs with feta, pomegranate, and our estate olive oil",
    price: 8,
    category: "starters",
    image: "/images/salad.webp",
    seasonal: true,
    featured: true
  },
  {
    id: 2,
    name: "Grilled Vegetables",
    description: "Seasonal vegetables grilled over olive wood, drizzled with herb-infused oil",
    price: 9,
    category: "starters",
    image: "/images/grilled-veg.webp"
  },
  {
    id: 3,
    name: "Traditional Byrek",
    description: "Layered filo pastry with spinach and local cheese",
    price: 7,
    category: "starters",
    image: "/images/byrek.webp",
    featured: true
  },
  {
    id: 4,
    name: "Seafood Risotto",
    description: "Arborio rice with fresh Adriatic seafood and saffron",
    price: 18,
    category: "mains",
    image: "/images/risotto.webp",
    featured: true
  },
  {
    id: 5,
    name: "Slow-Roasted Lamb",
    description: "Mountain lamb with herbs, roasted for 12 hours",
    price: 22,
    category: "mains",
    image: "/images/lamb.webp",
    featured: true
  },
  {
    id: 6,
    name: "Fresh Catch",
    description: "Daily fish selection from local fishermen, grilled with olive oil and lemon",
    price: 20,
    category: "mains",
    image: "/images/fish.webp",
    seasonal: true
  },
  {
    id: 7,
    name: "Olive Oil Cake",
    description: "Light sponge infused with our olive oil and orange blossom",
    price: 7,
    category: "desserts",
    image: "/images/cake.webp",
    featured: true
  },
  {
    id: 8,
    name: "Honey Baklava",
    description: "Layers of filo with walnuts and estate honey",
    price: 8,
    category: "desserts",
    image: "/images/baklava.webp"
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export default function Restaurant() {
  const [activeCategory, setActiveCategory] = useState<'featured' | 'starters' | 'mains' | 'desserts'>('featured')

  const filteredMenu = activeCategory === 'featured'
    ? menu.filter(item => item.featured)
    : menu.filter(item => item.category === activeCategory)

  // Load external stylesheets
  useEffect(() => {
    // Ensure this only runs in the browser
    if (typeof window !== 'undefined') {
      // Add Restaurant Guru badge stylesheet
      const link = document.createElement('link');
      link.href = 'https://awards.infcdn.net/2024/badge-circledLeaves27.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Clean up function
      return () => {
        document.head.removeChild(link);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-cormorant">
      {/* Hero Section */}
      <div className="h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/restaurant-hero.webp"
          alt="Kallmi Estate Restaurant"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4 text-center">Our Restaurant</h1>
          <p className="text-xl md:text-2xl max-w-2xl text-center font-light">
            Authentic Albanian cuisine with a contemporary twist
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
              <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355]">A Culinary Journey</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  At Kallmi Estate, our restaurant celebrates the rich culinary heritage of Albania
                  while embracing modern techniques and presentation. Every dish tells a story of our land,
                  our traditions, and our commitment to authentic flavors.
                </p>
                <p>
                  Our menu changes with the seasons, always featuring the freshest ingredients from our
                  own gardens and local producers. Our olive oil, produced on the estate, is the cornerstone
                  of our cuisine, adding its distinctive character to every dish.
                </p>
                <p>
                  Dine with us and experience the true taste of Albania, with panoramic views of our olive
                  groves and the sparkling Adriatic Sea as your backdrop.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/chef.webp"
                  alt="Our Executive Chef"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  quality={80}
                />
              </div>
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg mt-8">
                <Image
                  src="/images/dining-interior.webp"
                  alt="Restaurant Interior"
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

      {/* Menu Section */}
      <section className="py-20 bg-[#F8F6F3]">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-16">Our Menu</h2>

          {/* Menu Categories */}
          <div className="flex justify-center mb-12 space-x-8 overflow-x-auto pb-4">
            {['featured', 'starters', 'mains', 'desserts'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as any)}
                className={`px-6 py-2 text-lg transition-colors duration-300 rounded-full ${
                  activeCategory === category
                    ? 'bg-[#8B7355] text-white'
                    : 'text-[#8B7355] hover:bg-[#8B7355]/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenu.map((item) => (
              <AnimateDiv
                key={item.id}
                animation="slide-up"
                duration={0.5}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                  {item.seasonal && (
                    <div className="absolute top-4 right-4 bg-[#8B7355] text-white px-3 py-1 rounded-full text-sm">
                      Seasonal
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl text-[#8B7355]">{item.name}</h3>
                    <span className="text-xl text-[#8B7355]">{formatPrice(item.price)}</span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
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
          <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355] mb-6">Make a Reservation</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Join us for lunch or dinner and experience the flavors of Kallmi Estate.
            We recommend reservations, especially during peak season.
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
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                />
              </div>
              <div className="flex-1">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                >
                  <option value="">Select Time</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="13:30">1:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
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
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="7+">7+ Guests</option>
                </select>
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
              Request Reservation
            </button>
          </div>
          <p className="mt-8 text-gray-500">
            For large groups or special events, please contact us directly at <span className="text-[#8B7355]">restaurant@kallmiestate.com</span>
          </p>
        </AnimateDiv>
      </section>

      {/* Private Events */}
      <section className="py-20 bg-stone-50">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8"
          animation="fade"
          duration={0.8}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355]">Private Events</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Celebrate your special occasions in the stunning setting of Kallmi Estate.
                  Our restaurant offers private dining experiences for weddings, anniversaries,
                  corporate events, and more.
                </p>
                <p>
                  Our team will work with you to create a customized menu and experience that
                  exceeds your expectations, with attentive service and breathtaking views.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-[#8B7355] text-white rounded-md hover:bg-[#6B563F] transition-colors duration-300 mt-4"
                >
                  Inquire About Events
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/private-event.webp"
                alt="Private Dining at Kallmi Estate"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={80}
              />
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Recognition & Certificates Section */}
      <section className="py-20 bg-white">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-8 text-center"
          animation="fade"
          duration={0.8}
        >
          <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355] mb-16">Recognition & Certificates</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Kallmi i Bukur has been recognized for our commitment to culinary excellence and outstanding dining experience.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 flex-wrap">
            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              className="flex flex-col items-center"
            >
              <div className="mb-16">
                <a
                  href="https://al.sluurpy.com/durres/restaurant/6026481/kallmi-bukur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Image
                    src="https://foto1.sluurpy.com/bollini_2025/6026481.png"
                    alt="Sluurpy Certificate"
                    width={150}
                    height={150}
                    unoptimized={true} // Because it's an external image
                  />
                </a>
              </div>
              <p className="text-gray-600">Sluurpy 2025 Certificate of Excellence</p>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.5}
              delay={0.2}
              className="flex flex-col items-center"
            >
              <div className="mb-4">
                {/* Custom wrapper to control size of Restaurant Guru Badge */}
                <div className="flex justify-center items-center scale-[1] transform-gpu">
                  <a
                    id="b-circledLeaves27"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://restaurantguru.com/Kallmi-Bukur-Durres"
                    className="b-circledLeaves27--light b-circledLeaves27--2025 transition-transform hover:scale-105"
                  >
                    <span className="b-circledLeaves27__title">Recommended</span>
                    <span className="b-circledLeaves27__separator"></span>
                    <span className="b-circledLeaves27__name">Kallmi i Bukur</span>
                  </a>
                </div>
              </div>
              <p className="text-gray-600">Restaurant Guru 2025 Recommendation</p>
            </AnimateDiv>
          </div>

          <p className="mt-16 text-lg text-gray-700">
            We're honored to be recognized for our commitment to quality and authentic Albanian cuisine.
          </p>
        </AnimateDiv>
      </section>
    </div>
  )
}
