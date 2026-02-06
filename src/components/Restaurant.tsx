'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { FadeIn } from './motion/FadeIn'
import { Section, SectionHeader } from './layout/Section'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
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
  { name: "Korca", price: 250, category: "beer" },
  { name: "Corona", price: 500, category: "beer" },
  { name: "Heineken", price: 300, category: "beer" },
  { name: "Paulaner", price: 500, category: "beer" },
  { name: "Mojito", price: 700, category: "cocktail" },
  { name: "Cuba Libre", price: 700, category: "cocktail" },
  { name: "Hugo", price: 700, category: "cocktail" },
  { name: "Aperol Spritz", price: 700, category: "cocktail" },
  { name: "Caipirinha", price: 700, category: "cocktail" },
  { name: "Vodka Sour", price: 700, category: "cocktail" },
  { name: "Cola", price: 250, category: "soft" },
  { name: "Fanta", price: 250, category: "soft" },
  { name: "Schweppes", price: 150, category: "soft" },
  { name: "Water", price: 100, category: "soft" },
  { name: "Large Water", price: 250, category: "soft" },
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link')
      link.href = 'https://awards.infcdn.net/2024/badge-circledLeaves27.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-surface-primary font-cormorant">

      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[60vh] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/restaurant_snippet.webp"
            alt="Kallmi Estate Restaurant - Adriatic Dining Experience"
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
            <FadeIn animation="fade" delay={0.2}>
              <Badge variant="neutral" className="bg-white/10 text-white border border-white/20">
                Mediterranean Cuisine
              </Badge>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.3}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide">
                Kallmi
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic text-brand-gold mt-2">
                  Restaurant
                </span>
              </h1>
            </FadeIn>

            <FadeIn animation="fade" delay={0.5}>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-px bg-white/40" />
                <HeartIcon className="w-5 h-5 text-brand-gold" />
                <div className="w-16 h-px bg-white/40" />
              </div>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.6}>
              <p className="text-lg sm:text-xl lg:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                Where <span className="text-brand-gold">authentic Albanian cuisine</span> meets
                contemporary elegance, overlooking the sparkling Adriatic Sea
              </p>
            </FadeIn>

            {/* Info Cards */}
            <FadeIn animation="slide-up" delay={0.8}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: ClockIcon, text: "13:00 - 16:00" },
                  { icon: MapPinIcon, text: "Seaside Terrace" },
                  { icon: SparklesIcon, text: "Daily Fresh Seafood" },
                ].map((item, index) => (
                  <Card key={index} variant="on-dark" padding="sm" className="min-w-[120px] text-center">
                    <item.icon className="w-5 h-5 text-brand-gold mx-auto mb-1" />
                    <p className="text-white/90 text-sm">{item.text}</p>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <Section spacing="lg" background="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <FadeIn animation="slide-up">
              <span className="text-overline">Culinary Heritage</span>
              <div className="divider-accent mt-3" />
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.1}>
              <h2 className="text-heading text-brand-olive">
                A Journey Through
                <span className="block italic mt-1">Albanian Flavors</span>
              </h2>
            </FadeIn>

            <FadeIn animation="fade" delay={0.2}>
              <div className="space-y-4 text-body-lg">
                <p className="pl-6 border-l-2 border-brand-olive/30">
                  Every dish tells a story of our land, featuring the freshest catch from the Adriatic
                  and ingredients from our own gardens, all enhanced by our estate's liquid gold.
                </p>
                <p className="pl-6 border-l-2 border-brand-olive/30">
                  Dine with panoramic views of olive groves and the sparkling sea as your backdrop,
                  creating memories that last a lifetime.
                </p>
              </div>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.3}>
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { number: '15+', label: 'Fresh Dishes' },
                  { number: '4.8★', label: 'Guest Rating' },
                  { number: 'Daily', label: 'Fresh Catch' }
                ].map((stat, index) => (
                  <Card key={index} variant="subtle" padding="sm" className="text-center">
                    <div className="text-2xl font-light text-brand-olive">{stat.number}</div>
                    <div className="text-caption mt-1">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <FadeIn animation="slide-up" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="https://storage.googleapis.com/oda-images/IMG_0655.jpg"
                    alt="Our Executive Chef"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={85}
                  />
                </div>
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="/images/interior.webp"
                    alt="Restaurant Interior"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={85}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Menu Section */}
      <Section spacing="lg" background="secondary">
        <FadeIn animation="fade">
          <SectionHeader
            overline="Fresh Daily Selection"
            title={<h2 className="text-display text-brand-olive">Our Menu</h2>}
            subtitle="Discover our carefully curated selection of fresh Adriatic seafood, vibrant salads, and traditional Albanian specialties"
            align="center"
          />
        </FadeIn>

        {/* Category Tabs */}
        <FadeIn animation="slide-up" delay={0.1}>
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className="flex gap-2 p-1 bg-surface-secondary rounded-xl border border-border-light">
              {[
                { key: 'featured', label: 'Featured', icon: SparklesIcon },
                { key: 'salads', label: 'Salads', icon: HeartIcon },
                { key: 'fish', label: 'Fresh Fish', icon: StarIcon },
                { key: 'farmed-fish', label: 'Farmed Fish', icon: StarIcon }
              ].map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key as typeof activeCategory)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm transition-all duration-200 rounded-lg font-medium whitespace-nowrap ${
                    activeCategory === category.key
                      ? 'bg-brand-olive text-white'
                      : 'text-text-secondary hover:bg-surface-tertiary'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {filteredMenu.map((item, index) => (
            <FadeIn key={item.id} animation="slide-up" delay={index * 0.05}>
              <Card variant="elevated" hover padding="none" className="group overflow-hidden">
                {item.seasonal && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="gold">
                      <SparklesIcon className="w-3 h-3 mr-1" />
                      Seasonal
                    </Badge>
                  </div>
                )}

                <div className="relative aspect-[4/3] bg-surface-tertiary">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-light text-brand-olive group-hover:text-brand-olive-dark transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-xl font-light text-brand-olive whitespace-nowrap ml-4">
                      {formatPrice(item.price, item.unit)}
                    </span>
                  </div>
                  <p className="text-body">{item.description}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Drinks Toggle */}
        <FadeIn animation="fade" delay={0.2}>
          <div className="text-center">
            <Button
              onClick={() => setShowDrinks(!showDrinks)}
              variant="outline"
              className="group"
            >
              <HeartIcon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              {showDrinks ? 'Hide' : 'View'} Drinks Menu
            </Button>
          </div>
        </FadeIn>

        {/* Drinks Menu */}
        {showDrinks && (
          <FadeIn animation="slide-up">
            <Card variant="elevated" padding="lg" className="mt-8">
              <h3 className="text-heading text-brand-olive mb-8 text-center">Beverages</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {['beer', 'cocktail', 'soft', 'coffee'].map((category) => (
                  <div key={category}>
                    <h4 className="text-lg font-medium text-brand-olive capitalize border-b border-border-light pb-2 mb-4">
                      {category === 'soft' ? 'Soft Drinks' : category}s
                    </h4>
                    <div className="space-y-2">
                      {drinks
                        .filter(drink => drink.category === category)
                        .map((drink, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-text-secondary">{drink.name}</span>
                            <span className="text-brand-olive font-medium">{formatPrice(drink.price)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        )}
      </Section>

      {/* Reservation Section */}
      <Section spacing="lg" background="default">
        <FadeIn animation="fade">
          <SectionHeader
            overline="Reserve Your Table"
            title={
              <h2 className="text-display text-brand-olive">
                Join Us for an
                <span className="block italic">Unforgettable Experience</span>
              </h2>
            }
            subtitle="Secure your table overlooking the Adriatic Sea and let us create a memorable dining experience for you and your loved ones."
            align="center"
          />
        </FadeIn>

        <FadeIn animation="slide-up" delay={0.2}>
          <Card variant="elevated" padding="lg" className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <input
                type="date"
                className="input-field"
              />
              <select className="select-field">
                <option value="">Select Time</option>
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="13:30">1:30 PM</option>
              </select>
              <select className="select-field">
                <option value="">Guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5+ Guests</option>
              </select>
            </div>

            <textarea
              placeholder="Special Requests or Dietary Requirements"
              className="textarea-field mb-6"
            />

            <Button variant="primary" fullWidth size="lg">
              Request Reservation
            </Button>
          </Card>
        </FadeIn>

        <FadeIn animation="fade" delay={0.4}>
          <p className="text-center text-text-tertiary mt-6">
            For large groups or special events, please contact us at{' '}
            <a href="tel:+355682450851" className="link">+355 68 24 50 851</a>
          </p>
        </FadeIn>
      </Section>

      {/* Private Events Section */}
      <Section spacing="lg" background="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <FadeIn animation="slide-up">
              <span className="text-overline">Special Occasions</span>
              <div className="divider-accent mt-3" />
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.1}>
              <h2 className="text-heading text-brand-olive">
                Private Events &
                <span className="block italic">Celebrations</span>
              </h2>
            </FadeIn>

            <FadeIn animation="fade" delay={0.2}>
              <div className="space-y-4 text-body-lg">
                <p className="pl-6 border-l-2 border-brand-olive/30">
                  Celebrate life's most precious moments in the stunning setting of Kallmi Estate,
                  where every detail is crafted to perfection.
                </p>
                <p className="pl-6 border-l-2 border-brand-olive/30">
                  From intimate anniversaries to grand weddings, our team creates bespoke experiences
                  with customized menus and impeccable service.
                </p>
              </div>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.3}>
              <Link href="/contact">
                <Button variant="primary" className="mt-4">
                  <HeartIcon className="w-5 h-5 mr-2" />
                  Plan Your Event
                </Button>
              </Link>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <FadeIn animation="slide-up" delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/private-event.webp"
                  alt="Private Dining at Kallmi Estate"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Awards Section */}
      <Section spacing="lg" background="default">
        <FadeIn animation="fade">
          <SectionHeader
            overline="Awards & Recognition"
            title={<h2 className="text-display text-brand-olive">Celebrated Excellence</h2>}
            subtitle="Kallmi i Bukur has been recognized for our commitment to culinary excellence and outstanding dining experience."
            align="center"
          />
        </FadeIn>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <FadeIn animation="slide-up" delay={0.1}>
            <div className="flex flex-col items-center group">
              <a
                href="https://al.sluurpy.com/durres/restaurant/6026481/kallmi-bukur"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform duration-300 group-hover:-translate-y-1"
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
              <Card variant="subtle" padding="sm" className="mt-4 text-center">
                <p className="text-brand-olive font-medium">Sluurpy 2025</p>
                <p className="text-caption">Certificate of Excellence</p>
              </Card>
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.2}>
            <div className="flex flex-col items-center group">
              <a
                id="b-circledLeaves27"
                target="_blank"
                rel="noopener noreferrer"
                href="https://restaurantguru.com/Kallmi-Bukur-Durres"
                className="b-circledLeaves27--light b-circledLeaves27--2025 transition-transform duration-300 group-hover:-translate-y-1"
              >
                <span className="b-circledLeaves27__title">Recommended</span>
                <span className="b-circledLeaves27__separator"></span>
                <span className="b-circledLeaves27__name">Kallmi i Bukur</span>
              </a>
              <Card variant="subtle" padding="sm" className="mt-4 text-center">
                <p className="text-brand-olive font-medium">Restaurant Guru 2025</p>
                <p className="text-caption">Recommendation</p>
              </Card>
            </div>
          </FadeIn>
        </div>

        <FadeIn animation="fade" delay={0.4}>
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto mt-12 text-center">
            <p className="text-xl text-text-secondary italic font-light leading-relaxed">
              "We're honored to be recognized for our commitment to authentic Albanian cuisine
              and the unforgettable experiences we create for our guests."
            </p>
            <div className="divider-accent mx-auto mt-6" />
          </Card>
        </FadeIn>
      </Section>
    </div>
  )
}
