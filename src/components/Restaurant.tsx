'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { AnimateDiv } from './motion/MotionWrapper'
import {
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: 'featured' | 'salads' | 'fish' | 'farmed-fish' | 'drinks'
  image: string
  seasonal?: boolean
  featured?: boolean
  unit?: string
}

const menu: MenuItem[] = [
  // Featured Items
  {
    id: 1,
    name: "Sea Bass",
    description: "Fresh catch from the Adriatic, grilled to perfection with herbs and our estate olive oil",
    price: 4800,
    category: "featured",
    image: "https://fishandmore.co.uk/wp-content/uploads/2021/07/frozen-fish-bbq-grilled-whole-sea-bass-recipe.jpg",
    featured: true,
    unit: "per KG"
  },
  {
    id: 2,
    name: "Cold Octopus Salad",
    description: "Tender octopus with Mediterranean herbs, olive oil, and fresh vegetables",
    price: 1700,
    category: "featured",
    image: "https://www.charlottefashionplate.com/wp-content/uploads/2019/12/fullsizeoutput_edb8.jpeg",
    featured: true
  },
  {
    id: 3,
    name: "Grilled Vegetables",
    description: "Red peppers and aubergines with balsamic vinegar and garlic",
    price: 600,
    category: "featured",
    image: "https://yourguardianchef.com/wp-content/uploads/2022/06/Grilled-Zucchini-Eggplants-And-Peppers-Salad-3.jpg",
    featured: true
  },

  // Salads
  {
    id: 4,
    name: "Greek Salad",
    description: "Traditional Greek salad with feta, olives, and fresh vegetables",
    price: 600,
    category: "salads",
    image: "https://images.themodernproper.com/production/posts/GreekSalad_9.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1718650734&s=70119bf37604d243d0729db7f4cda445"
  },
  {
    id: 5,
    name: "Green Salad",
    description: "Fresh mixed greens with our signature olive oil dressing",
    price: 600,
    category: "salads",
    image: "https://saladswithanastasia.com/wp-content/uploads/2020/11/maroulosalata-close-up.webp"
  },
  {
    id: 6,
    name: "Rucola Salad",
    description: "Peppery arugula with parmesan and balsamic reduction",
    price: 600,
    category: "salads",
    image: "https://i0.wp.com/happyhealthymama.com/wp-content/uploads/2023/06/Arugula-Quinoa-Salad-3.jpg?fit=1340%2C1800&ssl=1"
  },
  {
    id: 7,
    name: "Cold Octopus Salad",
    description: "Tender octopus with Mediterranean herbs and olive oil",
    price: 1700,
    category: "salads",
    image: "https://www.charlottefashionplate.com/wp-content/uploads/2019/12/fullsizeoutput_edb8.jpeg",
    seasonal: true
  },
  {
    id: 8,
    name: "Grilled Potatoes",
    description: "With oregano, crumbled feta cheese and olive oil",
    price: 600,
    category: "salads",
    image: "https://fitfoodiefinds.com/wp-content/uploads/2019/06/baked-potatoes.jpg"
  },
  {
    id: 9,
    name: "Grilled Vegetables",
    description: "Red peppers and aubergines with balsamic vinegar and garlic",
    price: 600,
    category: "salads",
    image: "https://yourguardianchef.com/wp-content/uploads/2022/06/Grilled-Zucchini-Eggplants-And-Peppers-Salad-3.jpg"
  },
  {
    id: 10,
    name: "Bruschetta",
    description: "Toasted bread with fresh tomatoes, basil and garlic",
    price: 300,
    category: "salads",
    image: "https://www.allrecipes.com/thmb/QSsjryxShEx1L6o0HLer1Nn4jwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/54165-balsamic-bruschetta-DDMFS-4x3-e2b55b5ca39b4c1783e524a2461634ea.jpg"
  },

  // Fresh Fish
  {
    id: 11,
    name: "Sea Bass",
    description: "Fresh from the Adriatic, grilled with herbs and olive oil",
    price: 4800,
    category: "fish",
    image: "https://fishandmore.co.uk/wp-content/uploads/2021/07/frozen-fish-bbq-grilled-whole-sea-bass-recipe.jpg",
    unit: "per kg"
  },
  {
    id: 12,
    name: "Koce (Orata)",
    description: "Premium Mediterranean fish, simply grilled",
    price: 6500,
    category: "fish",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/13/b4/88/4f/koce-fish-fresh-served.jpg",
    unit: "per kg"
  },
  {
    id: 13,
    name: "Shrimps",
    description: "Fresh Adriatic shrimps, grilled or sautéed (250gr)",
    price: 1200,
    category: "fish",
    image: "https://www.seriouseats.com/thmb/ch4c6o15shxPyfO8jnSfUh_wQ0s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__08__09102015-grilled-lemongrass-shrimp-shaozhizhong-8-a5525792ce7a4c9693af0a564eae74a4.jpg"
  },
  {
    id: 14,
    name: "Octopus",
    description: "Tender grilled octopus with olive oil and herbs",
    price: 1300,
    category: "fish",
    image: "https://www.allrecipes.com/thmb/J7hX8IQcYGf3vlvfZrz5r7pd29U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6723522-af2855be1a38418ebd9fc516034ffecc.jpg"
  },
  {
    id: 15,
    name: "Mullet",
    description: "Local catch, grilled to perfection",
    price: 1300,
    category: "fish",
    image: "https://cookingwithnonna.com/images/com_yoorecipe/cropped-grilled-mullets-700.jpg"
  },
  {
    id: 16,
    name: "Calamari",
    description: "Fresh squid, grilled or fried",
    price: 1300,
    category: "fish",
    image: "https://i.imgur.com/3RZIQkw.png"
  },

  {
    id: 17,
    name: "Cuttlefish",
    description: "Fresh cuttlefish, grilled to perfection",
    price: 1300,
    category: "fish",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrpHrOQeImHqGb_OJj9H71CpQlJbBpvPwig&s"
  },

  // Farmed Fish
  {
    id: 18,
    name: "Farmed Sea Bass",
    description: "Quality farmed sea bass, 300gr portion",
    price: 1200,
    category: "farmed-fish",
    image: "https://fishandmore.co.uk/wp-content/uploads/2021/07/frozen-fish-bbq-grilled-whole-sea-bass-recipe.jpg"
  },
  {
    id: 19,
    name: "Farmed Koce",
    description: "Quality farmed koce, 300gr portion",
    price: 1200,
    category: "farmed-fish",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/13/b4/88/4f/koce-fish-fresh-served.jpg"
  }
]

const drinks = [
  // Beers
  { name: "Korca", price: 250, category: "beer" },
  { name: "Corona", price: 500, category: "beer" },
  { name: "Heineken", price: 300, category: "beer" },
  { name: "Paulaner", price: 500, category: "beer" },

  // Cocktails
  { name: "Mojito", price: 700, category: "cocktail" },
  { name: "Cuba Libre", price: 700, category: "cocktail" },
  { name: "Hugo", price: 700, category: "cocktail" },
  { name: "Aperol Spritz", price: 700, category: "cocktail" },
  { name: "Caipirinha", price: 700, category: "cocktail" },
  { name: "Vodka Sour", price: 700, category: "cocktail" },

  // Soft Drinks
  { name: "Cola", price: 250, category: "soft" },
  { name: "Fanta", price: 250, category: "soft" },
  { name: "Schweppes", price: 150, category: "soft" },
  { name: "Water", price: 100, category: "soft" },
  { name: "Large Water", price: 250, category: "soft" },

  // Coffee
  { name: "Coffee", price: 120, category: "coffee" },
  { name: "Cappuccino", price: 200, category: "coffee" },
  { name: "Macchiato", price: 140, category: "coffee" }
]

const formatPrice = (price: number, unit?: string) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(price)
  return `${formatted}L${unit ? ` ${unit}` : ''}`
}

export default function Restaurant() {
  const [activeCategory, setActiveCategory] = useState<'featured' | 'salads' | 'fish' | 'farmed-fish' | 'drinks'>('featured')
  const [showDrinks, setShowDrinks] = useState(false)

  const filteredMenu = menu.filter(item => item.category === activeCategory)

  // Load external stylesheets
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.href = 'https://awards.infcdn.net/2024/badge-circledLeaves27.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 font-cormorant relative overflow-hidden">

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#8B7355]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      {/* Immersive Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 scale-110">
          <Image
            src="/images/restaurant_snippet.webp"
            alt="Kallmi Estate Restaurant - Adriatic Dining Experience"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Sophisticated Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/30 via-transparent to-[#D4AF37]/20" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 sm:px-6">
          <div className="max-w-4xl space-y-6 sm:space-y-8">

            {/* Floating Badge */}
            <AnimateDiv
              animation="fade"
              duration={1.0}
              delay={0.3}
              className="inline-block"
            >
              <div className="backdrop-blur-md bg-white/10 rounded-full px-6 py-3 border border-white/20 mb-4">
                <span className="text-sm sm:text-base font-medium tracking-widest uppercase text-white/90">
                  Mediterrenean Cuisine
                </span>
              </div>
            </AnimateDiv>

            {/* Main Title */}
            <AnimateDiv
              animation="slide-up"
              duration={1.2}
              delay={0.6}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-wide leading-tight">
                <span className="block">Kallmi</span>
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic font-light text-[#D4AF37] mt-2">
                  Restaurant
                </span>
              </h1>
            </AnimateDiv>

            {/* Elegant Divider */}
            <AnimateDiv
              animation="fade"
              duration={0.8}
              delay={1.0}
              className="flex items-center justify-center space-x-4"
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <HeartIcon className="w-5 h-5 text-[#D4AF37]" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </AnimateDiv>

            {/* Subtitle */}
            <AnimateDiv
              animation="slide-up"
              duration={1.0}
              delay={1.2}
            >
              <p className="text-lg sm:text-2xl font-light opacity-95 leading-relaxed max-w-3xl mx-auto">
                Where <span className="text-[#D4AF37]">authentic Albanian cuisine</span> meets
                contemporary elegance, overlooking the sparkling Adriatic Sea
              </p>
            </AnimateDiv>

            {/* Restaurant Info Cards */}
            <AnimateDiv
              animation="slide-up"
              duration={1.0}
              delay={1.5}
              className="flex justify-center max-w-3xl mx-auto mt-8"
            >
              {[
                { icon: ClockIcon, text: "13:00 - 16:00" },
                { icon: MapPinIcon, text: "Seaside Terrace" },
              ].map((item, index) => (
                <div key={index} className="backdrop-blur-md bg-white/10 rounded-2xl p-4 border border-white/20 mx-2 min-w-[140px] flex flex-col items-center">
                  <item.icon className="w-6 h-6 text-[#D4AF37] mb-2" />
                  <p className="text-white/90 text-sm font-light text-center">{item.text}</p>
                </div>
              ))}
            </AnimateDiv>
          </div>
        </div>

        {/* Scroll Indicator */}
        <AnimateDiv
          animation="fade"
          duration={1.0}
          delay={1.8}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 text-white/70">
            <span className="text-xs sm:text-sm font-light tracking-widest uppercase">
              Discover Our Menu
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </AnimateDiv>
      </div>

      {/* Introduction Section */}
      <section className="relative py-16 sm:py-24">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Content Side */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                    Culinary Heritage
                  </span>
                  <div className="w-16 h-px bg-[#8B7355] mt-2" />
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-[#8B7355] leading-tight">
                  A Journey Through
                  <span className="block italic">Albanian Flavors</span>
                </h2>
              </div>

              <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                <p className="relative pl-6 border-l-2 border-[#8B7355]/30">
                  Every dish tells a story of our land, featuring the freshest catch from the Adriatic
                  and ingredients from our own gardens, all enhanced by our estate's liquid gold.
                </p>
                <p className="relative pl-6 border-l-2 border-[#8B7355]/30">
                  Dine with panoramic views of olive groves and the sparkling sea as your backdrop,
                  creating memories that last a lifetime.
                </p>
              </div>

              {/* Experience Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { number: '15+', label: 'Fresh Dishes' },
                  { number: '4.8★', label: 'Guest Rating' },
                  { number: 'Daily', label: 'Fresh Catch' }
                ].map((stat, index) => (
                  <AnimateDiv
                    key={index}
                    animation="slide-up"
                    delay={0.8 + index * 0.2}
                    className="text-center"
                  >
                    <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-4 border border-white/40">
                      <div className="text-2xl sm:text-3xl font-light text-[#8B7355]">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </AnimateDiv>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <AnimateDiv
                animation="slide-up"
                duration={1.0}
                delay={0.3}
                className="relative group"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src="https://storage.googleapis.com/oda-images/IMG_0655.jpg"
                      alt="Our Executive Chef"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={85}
                    />
                  </div>
                  <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-xl mt-8 group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src="/images/interior.webp"
                      alt="Restaurant Interior"
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

      {/* Enhanced Menu Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-stone-50/50 to-white">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          {/* Menu Header */}
          <div className="text-center mb-12 sm:mb-20">
            <AnimateDiv animation="slide-up" delay={0.2}>
              <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                Fresh Daily Selection
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mt-4 mb-6 leading-tight">
                Our Menu
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Discover our carefully curated selection of fresh Adriatic seafood,
                vibrant salads, and traditional Albanian specialties
              </p>
            </AnimateDiv>
          </div>

          {/* Enhanced Menu Categories */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-4">
            <div className="flex space-x-2 sm:space-x-4 bg-white/60 backdrop-blur-sm rounded-3xl p-2 border border-white/30">
              {[
                { key: 'featured', label: 'Featured', icon: SparklesIcon },
                { key: 'salads', label: 'Salads', icon: HeartIcon },
                { key: 'fish', label: 'Fresh Fish', icon: StarIcon },
                { key: 'farmed-fish', label: 'Farmed Fish', icon: StarIcon }
              ].map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key as any)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-3 text-sm sm:text-base transition-all duration-300 rounded-2xl font-medium whitespace-nowrap ${
                    activeCategory === category.key
                      ? 'bg-gradient-to-r from-[#8B7355] to-[#A0845C] text-white shadow-lg'
                      : 'text-[#8B7355] hover:bg-[#8B7355]/10'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {filteredMenu.map((item, index) => (
              <AnimateDiv
                key={item.id}
                animation="slide-up"
                duration={0.8}
                delay={index * 0.1}
                className="group"
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/30 hover:border-[#8B7355]/30">

                  {/* Seasonal Badge */}
                  {item.seasonal && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <SparklesIcon className="w-3 h-3" />
                        <span>Seasonal</span>
                      </div>
                    </div>
                  )}

                  {/* Dish Image */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-stone-50 to-stone-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                    />

                    {/* Floating Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8B7355]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Dish Info */}
                  <div className="p-6 lg:p-8 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl lg:text-2xl font-light text-[#8B7355] group-hover:text-[#A0845C] transition-colors duration-300">
                        {item.name}
                      </h3>
                      <span className="text-xl lg:text-2xl font-light text-[#8B7355] whitespace-nowrap ml-4">
                        {formatPrice(item.price, item.unit)}
                      </span>
                    </div>
                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimateDiv>
            ))}
          </div>

          {/* Drinks Section Toggle */}
          <div className="text-center">
            <button
              onClick={() => setShowDrinks(!showDrinks)}
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <HeartIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>{showDrinks ? 'Hide' : 'View'} Drinks Menu</span>
            </button>
          </div>

          {/* Drinks Menu */}
          {showDrinks && (
            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              className="mt-12 backdrop-blur-sm bg-white/60 rounded-3xl p-8 border border-white/40"
            >
              <h3 className="text-2xl lg:text-3xl font-light text-[#8B7355] mb-8 text-center">Beverages</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {['beer', 'cocktail', 'soft', 'coffee'].map((category) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-lg font-medium text-[#8B7355] capitalize border-b border-[#8B7355]/30 pb-2">
                      {category === 'soft' ? 'Soft Drinks' : category}s
                    </h4>
                    <div className="space-y-3">
                      {drinks
                        .filter(drink => drink.category === category)
                        .map((drink, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-700 font-light">{drink.name}</span>
                            <span className="text-[#8B7355] font-medium">{formatPrice(drink.price)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateDiv>
          )}
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
              Reserve Your Table
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight text-[#8B7355] leading-tight">
              Join Us for an
              <span className="block italic">Unforgettable Experience</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
              Secure your table overlooking the Adriatic Sea and let us create
              a memorable dining experience for you and your loved ones.
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div className="relative group">
                <input
                  type="date"
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              <div className="relative group">
                <select className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light">
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              <div className="relative group">
                <select className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light">
                  <option value="">Number of Guests</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="7+">7+ Guests</option>
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            <div className="mb-8 relative group">
              <textarea
                placeholder="Special Requests or Dietary Requirements"
                className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 h-32 resize-none font-light"
              ></textarea>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </div>

            <button className="w-full px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-lg">
              Request Reservation
            </button>
          </div>

          <p className="mt-8 text-gray-500 font-light">
            For large groups or special events, please contact us directly at{' '}
            <a href="tel:+355682450851" className="text-[#8B7355] hover:text-[#A0845C] transition-colors duration-300">
              +355 68 24 50 851
            </a>
          </p>
        </AnimateDiv>
      </section>

      {/* Private Events Section */}
      <section className="relative py-16 sm:py-24">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                  Special Occasions
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-[#8B7355] leading-tight">
                  Private Events &
                  <span className="block italic">Celebrations</span>
                </h2>
              </div>

              <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                <p className="relative pl-6 border-l-2 border-[#8B7355]/30">
                  Celebrate life's most precious moments in the stunning setting of Kallmi Estate,
                  where every detail is crafted to perfection.
                </p>
                <p className="relative pl-6 border-l-2 border-[#8B7355]/30">
                  From intimate anniversaries to grand weddings, our team creates bespoke experiences
                  with customized menus and impeccable service.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <HeartIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Plan Your Event</span>
              </Link>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <AnimateDiv
                animation="slide-up"
                duration={1.0}
                delay={0.3}
                className="relative group"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/private-event.webp"
                    alt="Private Dining at Kallmi Estate"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    quality={90}
                  />
                  {/* Floating Frame Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#8B7355]/20 to-transparent rounded-3xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </AnimateDiv>
            </div>
          </div>
        </AnimateDiv>
      </section>

      {/* Recognition & Certificates Section */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-stone-50/50 to-white">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6 text-center"
          animation="fade"
          duration={1.0}
        >
          <div className="space-y-6 mb-16">
            <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
              Awards & Recognition
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight text-[#8B7355] leading-tight">
              Celebrated
              <span className="block italic">Excellence</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Kallmi i Bukur has been recognized for our commitment to culinary excellence
              and outstanding dining experience.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 flex-wrap">
            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              className="flex flex-col items-center group"
            >
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-105">
                <a
                  href="https://al.sluurpy.com/durres/restaurant/6026481/kallmi-bukur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src="https://foto1.sluurpy.com/bollini_2025/6026481.png"
                    alt="Sluurpy Certificate"
                    width={150}
                    height={150}
                    unoptimized={true}
                    className="rounded-2xl shadow-lg"
                  />
                </a>
              </div>
              <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-4 border border-white/40">
                <p className="text-[#8B7355] font-medium">Sluurpy 2025</p>
                <p className="text-gray-600 text-sm">Certificate of Excellence</p>
              </div>
            </AnimateDiv>

            <AnimateDiv
              animation="slide-up"
              duration={0.8}
              delay={0.2}
              className="flex flex-col items-center group"
            >
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-105">
                <div className="flex justify-center items-center">
                  <a
                    id="b-circledLeaves27"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://restaurantguru.com/Kallmi-Bukur-Durres"
                    className="b-circledLeaves27--light b-circledLeaves27--2025"
                  >
                    <span className="b-circledLeaves27__title">Recommended</span>
                    <span className="b-circledLeaves27__separator"></span>
                    <span className="b-circledLeaves27__name">Kallmi i Bukur</span>
                  </a>
                </div>
              </div>
              <div className="backdrop-blur-sm bg-white/60 rounded-2xl p-4 border border-white/40">
                <p className="text-[#8B7355] font-medium">Restaurant Guru 2025</p>
                <p className="text-gray-600 text-sm">Recommendation</p>
              </div>
            </AnimateDiv>
          </div>

          <AnimateDiv
            animation="fade"
            delay={0.8}
            className="mt-16"
          >
            <div className="backdrop-blur-sm bg-white/60 rounded-3xl p-8 border border-white/40 max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 italic font-light leading-relaxed">
                "We're honored to be recognized for our commitment to authentic Albanian cuisine
                and the unforgettable experiences we create for our guests."
              </p>
              <div className="w-16 h-px bg-[#8B7355] mx-auto mt-6" />
            </div>
          </AnimateDiv>
        </AnimateDiv>
      </section>
    </div>
  )
}
