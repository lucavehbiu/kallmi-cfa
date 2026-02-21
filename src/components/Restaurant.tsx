'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import Script from 'next/script'
import { useTranslations } from 'next-intl'
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

const COUNTRY_CODES = [
  { code: '+355', country: 'AL', label: 'Albania (+355)' },
  { code: '+1', country: 'US', label: 'US (+1)' },
  { code: '+44', country: 'GB', label: 'UK (+44)' },
  { code: '+49', country: 'DE', label: 'Germany (+49)' },
  { code: '+39', country: 'IT', label: 'Italy (+39)' },
  { code: '+33', country: 'FR', label: 'France (+33)' },
  { code: '+34', country: 'ES', label: 'Spain (+34)' },
  { code: '+41', country: 'CH', label: 'Switzerland (+41)' },
  { code: '+43', country: 'AT', label: 'Austria (+43)' },
  { code: '+30', country: 'GR', label: 'Greece (+30)' },
  { code: '+381', country: 'RS', label: 'Serbia (+381)' },
  { code: '+383', country: 'XK', label: 'Kosovo (+383)' },
  { code: '+389', country: 'MK', label: 'N. Macedonia (+389)' },
  { code: '+382', country: 'ME', label: 'Montenegro (+382)' },
  { code: '+385', country: 'HR', label: 'Croatia (+385)' },
  { code: '+386', country: 'SI', label: 'Slovenia (+386)' },
  { code: '+31', country: 'NL', label: 'Netherlands (+31)' },
  { code: '+32', country: 'BE', label: 'Belgium (+32)' },
  { code: '+46', country: 'SE', label: 'Sweden (+46)' },
  { code: '+47', country: 'NO', label: 'Norway (+47)' },
  { code: '+48', country: 'PL', label: 'Poland (+48)' },
  { code: '+90', country: 'TR', label: 'Turkey (+90)' },
  { code: '+61', country: 'AU', label: 'Australia (+61)' },
  { code: '+86', country: 'CN', label: 'China (+86)' },
  { code: '+81', country: 'JP', label: 'Japan (+81)' },
  { code: '+971', country: 'AE', label: 'UAE (+971)' },
]

interface MenuItem {
  id: number
  nameKey: string
  descKey: string
  price: number
  category: 'featured' | 'salads' | 'fish' | 'farmed-fish' | 'drinks'
  image: string
  seasonal?: boolean
  featured?: boolean
  unitKey?: string
}

const formatPrice = (price: number, unit?: string) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(price)
  return `${formatted}L${unit ? ` ${unit}` : ''}`
}

export default function Restaurant() {
  const t = useTranslations('Restaurant')
  const [activeCategory, setActiveCategory] = useState<'featured' | 'salads' | 'fish' | 'farmed-fish' | 'drinks'>('featured')
  const [showDrinks, setShowDrinks] = useState(false)

  const menu: MenuItem[] = [
    // Featured Items
    {
      id: 1,
      nameKey: "menuSeaBass",
      descKey: "menuSeaBassDesc",
      price: 4800,
      category: "featured",
      image: "https://storage.googleapis.com/kallmi/images/food/grilled-sea-bass.webp",
      featured: true,
      unitKey: "perKG"
    },
    {
      id: 2,
      nameKey: "menuColdOctopusSalad",
      descKey: "menuColdOctopusSaladDesc",
      price: 1700,
      category: "featured",
      image: "https://storage.googleapis.com/kallmi/images/food/seafood-platter.webp",
      featured: true
    },
    {
      id: 3,
      nameKey: "menuGrilledVegetables",
      descKey: "menuGrilledVegetablesDesc",
      price: 600,
      category: "featured",
      image: "https://storage.googleapis.com/kallmi/images/food/grilled-vegetables.webp",
      featured: true
    },

    // Salads
    {
      id: 4,
      nameKey: "menuGreekSalad",
      descKey: "menuGreekSaladDesc",
      price: 600,
      category: "salads",
      image: "https://storage.googleapis.com/kallmi/images/food/greek-salad.webp"
    },
    {
      id: 5,
      nameKey: "menuGreenSalad",
      descKey: "menuGreenSaladDesc",
      price: 600,
      category: "salads",
      image: "https://storage.googleapis.com/kallmi/images/food/maroulosalata.webp"
    },
    {
      id: 6,
      nameKey: "menuRucolaSalad",
      descKey: "menuRucolaSaladDesc",
      price: 600,
      category: "salads",
      image: "https://storage.googleapis.com/kallmi/images/food/arugula-quinoa.webp"
    },
    {
      id: 7,
      nameKey: "menuColdOctopusSaladAlt",
      descKey: "menuColdOctopusSaladAltDesc",
      price: 1700,
      category: "salads",
      image: "https://storage.googleapis.com/kallmi/images/food/seafood-platter.webp",
      seasonal: true
    },
    {
      id: 8,
      nameKey: "menuGrilledPotatoes",
      descKey: "menuGrilledPotatoesDesc",
      price: 600,
      category: "salads",
      image: "https://storage.googleapis.com/kallmi/images/food/baked-potatoes.webp"
    },
    {
      id: 9,
      nameKey: "menuGrilledVegetablesAlt",
      descKey: "menuGrilledVegetablesAltDesc",
      price: 600,
      category: "salads",
      image: "https://storage.googleapis.com/kallmi/images/food/grilled-vegetables.webp"
    },
    {
      id: 10,
      nameKey: "menuBruschetta",
      descKey: "menuBruschettaDesc",
      price: 300,
      category: "salads",
      image: "https://storage.googleapis.com/kallmi/images/food/bruschetta.webp"
    },

    // Fresh Fish
    {
      id: 11,
      nameKey: "menuSeaBassFish",
      descKey: "menuSeaBassFishDesc",
      price: 4800,
      category: "fish",
      image: "https://storage.googleapis.com/kallmi/images/food/grilled-sea-bass.webp",
      unitKey: "perKg"
    },
    {
      id: 12,
      nameKey: "menuKoce",
      descKey: "menuKoceDesc",
      price: 6500,
      category: "fish",
      image: "https://storage.googleapis.com/kallmi/images/food/koce-fish.webp",
      unitKey: "perKg"
    },
    {
      id: 13,
      nameKey: "menuShrimps",
      descKey: "menuShrimpsDesc",
      price: 1200,
      category: "fish",
      image: "https://storage.googleapis.com/kallmi/images/food/grilled-shrimp.webp"
    },
    {
      id: 14,
      nameKey: "menuOctopus",
      descKey: "menuOctopusDesc",
      price: 1300,
      category: "fish",
      image: "https://storage.googleapis.com/kallmi/images/food/octopus.webp"
    },
    {
      id: 15,
      nameKey: "menuMullet",
      descKey: "menuMulletDesc",
      price: 1300,
      category: "fish",
      image: "https://storage.googleapis.com/kallmi/images/food/grilled-mullets.webp"
    },
    {
      id: 16,
      nameKey: "menuCalamari",
      descKey: "menuCalamariDesc",
      price: 1300,
      category: "fish",
      image: "https://storage.googleapis.com/kallmi/images/food/mixed-grill.webp"
    },
    {
      id: 17,
      nameKey: "menuCuttlefish",
      descKey: "menuCuttlefishDesc",
      price: 1300,
      category: "fish",
      image: "https://storage.googleapis.com/kallmi/images/food/cuttlefish.webp"
    },

    // Farmed Fish
    {
      id: 18,
      nameKey: "menuFarmedSeaBass",
      descKey: "menuFarmedSeaBassDesc",
      price: 1200,
      category: "farmed-fish",
      image: "https://storage.googleapis.com/kallmi/images/food/grilled-sea-bass.webp"
    },
    {
      id: 19,
      nameKey: "menuFarmedKoce",
      descKey: "menuFarmedKoceDesc",
      price: 1200,
      category: "farmed-fish",
      image: "https://storage.googleapis.com/kallmi/images/food/koce-fish.webp"
    }
  ]

  const drinkNameMap: Record<string, string> = {
    "Water": "drinkWater",
    "Large Water": "drinkLargeWater",
    "Coffee": "drinkCoffee",
    "Cappuccino": "drinkCappuccino",
    "Macchiato": "drinkMacchiato"
  }

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

  const drinkCategoryLabels: Record<string, string> = {
    beer: t('drinkCatBeers'),
    cocktail: t('drinkCatCocktails'),
    soft: t('drinkCatSoftDrinks'),
    coffee: t('drinkCatCoffees')
  }

  // Reservation form state
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    countryCode: '+355',
    phone: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: ''
  })
  const [reservationStatus, setReservationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [reservationMessage, setReservationMessage] = useState('')
  const [reservationErrors, setReservationErrors] = useState<Record<string, string>>({})

  // Get tomorrow's date as minimum selectable date
  const getMinReservationDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const handleReservationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setReservationErrors(prev => ({ ...prev, [e.target.name]: '' }))
    setReservationForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validateReservation = (): boolean => {
    const errors: Record<string, string> = {}

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(reservationForm.email)) {
      errors.email = t('validationEmail')
    }

    // Phone validation (digits only, 6-15 digits)
    const phoneDigits = reservationForm.phone.replace(/\D/g, '')
    if (phoneDigits.length < 6 || phoneDigits.length > 15) {
      errors.phone = t('validationPhone')
    }

    // Date must be in the future (not today)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const reservationDate = new Date(reservationForm.date)
    if (reservationDate <= today) {
      errors.date = t('validationDate')
    }

    setReservationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateReservation()) return

    setReservationStatus('loading')
    setReservationMessage('')

    try {
      const fullPhone = `${reservationForm.countryCode} ${reservationForm.phone}`

      const response = await fetch('/api/restaurant-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reservationForm.name,
          email: reservationForm.email,
          phone: fullPhone,
          date: reservationForm.date,
          time: reservationForm.time,
          guests: reservationForm.guests,
          specialRequests: reservationForm.specialRequests
        })
      })

      const data = await response.json()

      if (response.ok) {
        setReservationStatus('success')
        setReservationMessage(data.message || t('reservationSuccessDefault'))
        setReservationForm({ name: '', email: '', countryCode: '+355', phone: '', date: '', time: '', guests: '', specialRequests: '' })
      } else {
        setReservationStatus('error')
        setReservationMessage(data.error || t('reservationErrorDefault'))
      }
    } catch {
      setReservationStatus('error')
      setReservationMessage(t('reservationErrorNetwork'))
    }
  }

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
            src="https://storage.googleapis.com/kallmi/images/restaurant_snippet.webp"
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
                {t('heroBadge')}
              </Badge>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.3}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide">
                {t('heroTitle')}
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic text-brand-gold mt-2">
                  {t('heroTitleAccent')}
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
                {t('heroDescription')}
              </p>
            </FadeIn>

            {/* Info Cards */}
            <FadeIn animation="slide-up" delay={0.8}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: ClockIcon, text: t('infoHours') },
                  { icon: MapPinIcon, text: t('infoLocation') },
                  { icon: SparklesIcon, text: t('infoFresh') },
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
              <span className="text-overline">{t('introOverline')}</span>
              <div className="divider-accent mt-3" />
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.1}>
              <h2 className="text-heading text-brand-olive">
                {t('introTitle')}
                <span className="block italic mt-1">{t('introTitleAccent')}</span>
              </h2>
            </FadeIn>

            <FadeIn animation="fade" delay={0.2}>
              <div className="space-y-4 text-body-lg">
                <p className="pl-6 border-l-2 border-brand-olive/30">
                  {t('introText1')}
                </p>
                <p className="pl-6 border-l-2 border-brand-olive/30">
                  {t('introText2')}
                </p>
              </div>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.3}>
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { number: '15+', label: t('statDishes') },
                  { number: '4.8\u2605', label: t('statRating') },
                  { number: 'Daily', label: t('statCatch') }
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
                    src="https://storage.googleapis.com/kallmi/images/food/restaurant-interior.webp"
                    alt="Our Executive Chef"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={85}
                  />
                </div>
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-lg mt-8">
                  <Image
                    src="https://storage.googleapis.com/kallmi/images/interior.webp"
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
            overline={t('menuOverline')}
            title={<h2 className="text-display text-brand-olive">{t('menuTitle')}</h2>}
            subtitle={t('menuSubtitle')}
            align="center"
          />
        </FadeIn>

        {/* Category Tabs */}
        <FadeIn animation="slide-up" delay={0.1}>
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className="flex gap-2 p-1 bg-surface-secondary rounded-xl border border-border-light">
              {[
                { key: 'featured', label: t('catFeatured'), icon: SparklesIcon },
                { key: 'salads', label: t('catSalads'), icon: HeartIcon },
                { key: 'fish', label: t('catFish'), icon: StarIcon },
                { key: 'farmed-fish', label: t('catFarmedFish'), icon: StarIcon }
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
                      {t('seasonal')}
                    </Badge>
                  </div>
                )}

                <div className="relative aspect-[4/3] bg-surface-tertiary">
                  <Image
                    src={item.image}
                    alt={t(item.nameKey)}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-light text-brand-olive group-hover:text-brand-olive-dark transition-colors">
                      {t(item.nameKey)}
                    </h3>
                    <span className="text-xl font-light text-brand-olive whitespace-nowrap ml-4">
                      {formatPrice(item.price, item.unitKey ? t(item.unitKey) : undefined)}
                    </span>
                  </div>
                  <p className="text-body">{t(item.descKey)}</p>
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
              {showDrinks ? t('drinksToggleHide') : t('drinksToggleShow')}
            </Button>
          </div>
        </FadeIn>

        {/* Drinks Menu */}
        {showDrinks && (
          <FadeIn animation="slide-up">
            <Card variant="elevated" padding="lg" className="mt-8">
              <h3 className="text-heading text-brand-olive mb-8 text-center">{t('beveragesTitle')}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {['beer', 'cocktail', 'soft', 'coffee'].map((category) => (
                  <div key={category}>
                    <h4 className="text-lg font-medium text-brand-olive capitalize border-b border-border-light pb-2 mb-4">
                      {drinkCategoryLabels[category]}
                    </h4>
                    <div className="space-y-2">
                      {drinks
                        .filter(drink => drink.category === category)
                        .map((drink, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-text-secondary">
                              {drinkNameMap[drink.name] ? t(drinkNameMap[drink.name]) : drink.name}
                            </span>
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
            overline={t('reservationOverline')}
            title={
              <h2 className="text-display text-brand-olive">
                {t('reservationTitle')}
                <span className="block italic">{t('reservationTitleAccent')}</span>
              </h2>
            }
            subtitle={t('reservationSubtitle')}
            align="center"
          />
        </FadeIn>

        <FadeIn animation="slide-up" delay={0.2}>
          <Card variant="elevated" padding="lg" className="max-w-3xl mx-auto">
            {reservationStatus === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <HeartIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-light text-brand-olive">{t('reservationThankYou')}</h3>
                <p className="text-body max-w-md mx-auto">{reservationMessage}</p>
                <Button
                  variant="outline"
                  onClick={() => setReservationStatus('idle')}
                  className="mt-4"
                >
                  {t('reservationMakeAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    value={reservationForm.name}
                    onChange={handleReservationChange}
                    placeholder={t('reservationNamePlaceholder')}
                    className="input-field"
                    required
                  />
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={reservationForm.email}
                      onChange={handleReservationChange}
                      placeholder={t('reservationEmailPlaceholder')}
                      className={`input-field ${reservationErrors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                      required
                    />
                    {reservationErrors.email && <p className="text-red-500 text-xs mt-1">{reservationErrors.email}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={reservationForm.countryCode}
                      onChange={handleReservationChange}
                      className="select-field"
                      style={{ width: '160px', minWidth: '160px', backgroundPosition: 'right 0.5rem center' }}
                    >
                      {COUNTRY_CODES.map(cc => (
                        <option key={cc.code} value={cc.code}>{cc.label}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={reservationForm.phone}
                      onChange={handleReservationChange}
                      placeholder={t('reservationPhonePlaceholder')}
                      required
                      className={`input-field flex-1 ${reservationErrors.phone ? 'border-red-400 focus:border-red-400' : ''}`}
                    />
                  </div>
                  {reservationErrors.phone && <p className="text-red-500 text-xs mt-1">{reservationErrors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="date"
                      name="date"
                      value={reservationForm.date}
                      onChange={handleReservationChange}
                      min={getMinReservationDate()}
                      className={`input-field ${reservationErrors.date ? 'border-red-400 focus:border-red-400' : ''}`}
                      required
                    />
                    {reservationErrors.date && <p className="text-red-500 text-xs mt-1">{reservationErrors.date}</p>}
                  </div>
                  <select
                    name="time"
                    value={reservationForm.time}
                    onChange={handleReservationChange}
                    className="select-field"
                    required
                  >
                    <option value="">{t('reservationSelectTime')}</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                  </select>
                  <select
                    name="guests"
                    value={reservationForm.guests}
                    onChange={handleReservationChange}
                    className="select-field"
                    required
                  >
                    <option value="">{t('reservationGuests')}</option>
                    <option value="1">{t('reservationGuest1')}</option>
                    <option value="2">{t('reservationGuest2')}</option>
                    <option value="3">{t('reservationGuest3')}</option>
                    <option value="4">{t('reservationGuest4')}</option>
                    <option value="5">{t('reservationGuest5')}</option>
                    <option value="6">{t('reservationGuest6')}</option>
                    <option value="7">{t('reservationGuest7')}</option>
                    <option value="8">{t('reservationGuest8')}</option>
                  </select>
                </div>

                <textarea
                  name="specialRequests"
                  value={reservationForm.specialRequests}
                  onChange={handleReservationChange}
                  placeholder={t('reservationSpecialRequests')}
                  className="textarea-field mb-4"
                />

                {reservationStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
                    {reservationMessage}
                  </div>
                )}

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  type="submit"
                  disabled={reservationStatus === 'loading'}
                >
                  {reservationStatus === 'loading' ? t('reservationSending') : t('reservationSubmit')}
                </Button>

                <p className="text-center text-caption mt-3">
                  {t('reservationDisclaimer')}
                </p>
              </form>
            )}
          </Card>
        </FadeIn>

        <FadeIn animation="fade" delay={0.4}>
          <p className="text-center text-text-tertiary mt-6">
            {t('reservationLargeGroup')}{' '}
            <a href="tel:+355682450851" className="link">+355 68 24 50 851</a>
          </p>
        </FadeIn>
      </Section>

      {/* Private Events Section */}
      <Section spacing="lg" background="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <FadeIn animation="slide-up">
              <span className="text-overline">{t('eventsOverline')}</span>
              <div className="divider-accent mt-3" />
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.1}>
              <h2 className="text-heading text-brand-olive">
                {t('eventsTitle')}
                <span className="block italic">{t('eventsTitleAccent')}</span>
              </h2>
            </FadeIn>

            <FadeIn animation="fade" delay={0.2}>
              <div className="space-y-4 text-body-lg">
                <p className="pl-6 border-l-2 border-brand-olive/30">
                  {t('eventsText1')}
                </p>
                <p className="pl-6 border-l-2 border-brand-olive/30">
                  {t('eventsText2')}
                </p>
              </div>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.3}>
              <Link href="/contact">
                <Button variant="primary" className="mt-4">
                  <HeartIcon className="w-5 h-5 mr-2" />
                  {t('eventsCta')}
                </Button>
              </Link>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <FadeIn animation="slide-up" delay={0.2}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://storage.googleapis.com/kallmi/images/private-event.webp"
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
            overline={t('awardsOverline')}
            title={<h2 className="text-display text-brand-olive">{t('awardsTitle')}</h2>}
            subtitle={t('awardsSubtitle')}
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
                  src="https://storage.googleapis.com/kallmi/images/food/sluurpy-badge.webp"
                  alt="Sluurpy Certificate"
                  width={150}
                  height={150}
                  unoptimized={true}
                  className="rounded-2xl shadow-lg"
                />
              </a>
              <Card variant="subtle" padding="sm" className="mt-4 text-center">
                <p className="text-brand-olive font-medium">{t('awardsSluurpy')}</p>
                <p className="text-caption">{t('awardsSluurpyLabel')}</p>
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
                <p className="text-brand-olive font-medium">{t('awardsGuru')}</p>
                <p className="text-caption">{t('awardsGuruLabel')}</p>
              </Card>
            </div>
          </FadeIn>
        </div>

        <FadeIn animation="fade" delay={0.4}>
          <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto mt-12 text-center">
            <p className="text-xl text-text-secondary italic font-light leading-relaxed">
              &ldquo;{t('awardsQuote')}&rdquo;
            </p>
            <div className="divider-accent mx-auto mt-6" />
          </Card>
        </FadeIn>
      </Section>
    </div>
  )
}
