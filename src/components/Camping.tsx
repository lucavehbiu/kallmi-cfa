'use client'

import { useState, ReactNode } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
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
  nameKey: string
  descriptionKey: string
  price: number
  capacity: number
  amenityKeys: string[]
  images: string[]
  featured?: boolean
}

const campsiteData: CampSite[] = [
  {
    id: 1,
    nameKey: "site1Name",
    descriptionKey: "site1Description",
    price: 35,
    capacity: 4,
    amenityKeys: ["amenityFirePit", "amenityPicnicTable", "amenitySharedBathrooms", "amenityDrinkingWater", "amenityBBQ", "amenityWifi"],
    images: ["https://storage.googleapis.com/kallmi/images/room-olive-1.webp", "https://storage.googleapis.com/kallmi/images/room-olive-2.webp"],
    featured: true
  },
  {
    id: 2,
    nameKey: "site2Name",
    descriptionKey: "site2Description",
    price: 45,
    capacity: 4,
    amenityKeys: ["amenityPrivateBeach", "amenityFirePit", "amenityPicnicTable", "amenitySharedBathrooms", "amenityDrinkingWater", "amenityHammock"],
    images: ["https://storage.googleapis.com/kallmi/images/room-garden-1.webp", "https://storage.googleapis.com/kallmi/images/room-garden-2.webp"],
    featured: true
  },
  {
    id: 3,
    nameKey: "site3Name",
    descriptionKey: "site3Description",
    price: 30,
    capacity: 6,
    amenityKeys: ["amenityFirePit", "amenityPicnicTable", "amenitySharedBathrooms", "amenityDrinkingWater", "amenityExtraShade", "amenityWildlife"],
    images: ["https://storage.googleapis.com/kallmi/images/room-family-1.webp", "https://storage.googleapis.com/kallmi/images/room-family-2.webp"]
  },
  {
    id: 4,
    nameKey: "site4Name",
    descriptionKey: "site4Description",
    price: 75,
    capacity: 2,
    amenityKeys: ["amenityRealBed", "amenityLinens", "amenitySolarLighting", "amenityPrivateBathroom", "amenityOutdoorLounge", "amenityBreakfast"],
    images: ["https://storage.googleapis.com/kallmi/images/room-heritage-1.webp", "https://storage.googleapis.com/kallmi/images/room-heritage-2.webp"],
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
  const t = useTranslations('CampingPage')
  const [selectedSite, setSelectedSite] = useState<CampSite | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 font-cormorant relative overflow-hidden">

      {/* Hero Section - matching restaurant style */}
      <section className="relative min-h-[70vh] lg:min-h-[60vh] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="https://storage.googleapis.com/kallmi/images/stay_snippet.webp"
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
                {t('heroBadge')}
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.3}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide">
                {t('heroTitle')}
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic text-[#D4AF37] mt-2">
                  {t('heroTitleAccent')}
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
                {t('heroSubtitle')} <span className="text-[#D4AF37]">{t('heroSubtitleAccent')}</span>
              </p>
            </AnimateDiv>

            {/* Info Cards */}
            <AnimateDiv animation="slide-up" duration={1.0} delay={0.8}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: HomeIcon, text: t('heroCard1') },
                  { icon: SunIcon, text: t('heroCard2') },
                  { icon: MoonIcon, text: t('heroCard3') },
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
                    {t('introOverline')}
                  </span>
                  <div className="w-16 h-px bg-[#8B7355] mt-2" />
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight text-[#8B7355] leading-tight">
                  {t('introTitle')}
                  <span className="block italic mt-1 sm:mt-2">{t('introTitleAccent')}</span>
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-light">
                <p className="relative pl-4 sm:pl-6 border-l-2 border-[#8B7355]/30">
                  {t('introText1')}
                </p>
                <p className="relative pl-4 sm:pl-6 border-l-2 border-[#8B7355]/30">
                  {t('introText2')}
                </p>
                <p className="relative pl-4 sm:pl-6 border-l-2 border-[#8B7355]/30">
                  {t('introText3')}
                </p>
              </div>

              {/* Experience Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8">
                {[
                  { number: t('statNumber1'), label: t('statLabel1') },
                  { number: t('statNumber2'), label: t('statLabel2') },
                  { number: t('statNumber3'), label: t('statLabel3') }
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
                      src="https://storage.googleapis.com/kallmi/images/room-interior.webp"
                      alt="Camping Under Olive Trees"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      quality={85}
                    />
                  </div>
                  <div className="aspect-[3/4] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl mt-4 sm:mt-8 group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src="https://storage.googleapis.com/kallmi/images/room-view.webp"
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
                {t('campsitesOverline')}
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mt-4 mb-6 leading-tight">
                {t('campsitesTitle')}
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                {t('campsitesSubtitle')}
              </p>
            </AnimateDiv>
          </div>

          {/* Campsites Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {campsiteData.map((site, index) => (
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
                        <span>{t('featured')}</span>
                      </div>
                    </div>
                  )}

                  {/* Site Image */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-stone-50 to-stone-100">
                    <Image
                      src={site.images[0]}
                      alt={t(site.nameKey)}
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
                        {t(site.nameKey)}
                      </h3>
                      <span className="text-xl lg:text-2xl font-light text-[#8B7355] whitespace-nowrap ml-4">
                        €{formatPrice(site.price)} {t('perNight')}
                      </span>
                    </div>

                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed font-light">
                      {t(site.descriptionKey)}
                    </p>

                    {/* Capacity & Amenities Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-[#8B7355]/10 text-[#8B7355] px-3 py-1 rounded-full font-medium">
                        {t('upToPeople', { capacity: site.capacity })}
                      </span>
                      {site.amenityKeys.slice(0, 2).map((amenityKey, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          {t(amenityKey)}
                        </span>
                      ))}
                      {site.amenityKeys.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          {t('moreAmenities', { count: site.amenityKeys.length - 2 })}
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
                      {t('viewDetails')}
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
        <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/kallmi/images/pattern.webp')] opacity-5"></div>
        <AnimateDiv
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10"
          animation="fade"
          duration={1.0}
        >
          <div className="space-y-6 mb-12">
            <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
              {t('bookingOverline')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extralight text-[#8B7355] leading-tight">
              {t('bookingTitle')}
              <span className="block italic">{t('bookingTitleAccent')}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
              {t('bookingSubtitle')}
            </p>
          </div>

          <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder={t('formName')}
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  placeholder={t('formEmail')}
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative group">
                <select className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light">
                  <option value="">{t('formCampsiteType')}</option>
                  {campsiteData.map(site => (
                    <option key={site.id} value={site.id}>{t(site.nameKey)}</option>
                  ))}
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              <div className="relative group">
                <select className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light">
                  <option value="">{t('formCampers')}</option>
                  <option value="1">{t('formCampers1')}</option>
                  <option value="2">{t('formCampers2')}</option>
                  <option value="3">{t('formCampers3')}</option>
                  <option value="4">{t('formCampers4')}</option>
                  <option value="5+">{t('formCampers5')}</option>
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative group">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">{t('formCheckin')}</label>
                <input
                  type="date"
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
              <div className="relative group">
                <label className="block text-gray-700 text-sm font-medium mb-2 text-left">{t('formCheckout')}</label>
                <input
                  type="date"
                  className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 font-light"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </div>

            <div className="mb-8 relative group">
              <textarea
                placeholder={t('formSpecialRequests')}
                className="w-full px-6 py-4 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:border-[#8B7355] focus:bg-white/80 transition-all duration-300 h-32 resize-none font-light"
              ></textarea>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/10 to-[#D4AF37]/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </div>

            <button className="w-full px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-lg">
              {t('formSubmit')}
            </button>
          </div>

          <p className="mt-8 text-gray-500 font-light">
            {t('bookingContact')}{' '}
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
                {t('activitiesOverline')}
              </span>
              <h2 className="text-3xl sm:text-6xl font-extralight text-[#8B7355] mt-4 mb-6 leading-tight">
                {t('activitiesTitle')}
              </h2>
              <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                {t('activitiesSubtitle')}
              </p>
            </AnimateDiv>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: MapPinIcon,
                title: t('activity1Title'),
                description: t('activity1Description'),
                delay: 0.1
              },
              {
                icon: SunIcon,
                title: t('activity2Title'),
                description: t('activity2Description'),
                delay: 0.2
              },
              {
                icon: MoonIcon,
                title: t('activity3Title'),
                description: t('activity3Description'),
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
              <span>{t('planAdventure')}</span>
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
                alt={t(selectedSite.nameKey)}
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
                <h3 className="text-2xl lg:text-3xl font-light text-[#8B7355]">{t(selectedSite.nameKey)}</h3>
                <span className="text-2xl lg:text-3xl font-light text-[#8B7355]">€{formatPrice(selectedSite.price)} {t('perNight')}</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-sm bg-[#8B7355]/10 text-[#8B7355] px-4 py-2 rounded-full font-medium">
                  {t('upToPeople', { capacity: selectedSite.capacity })}
                </span>
                {selectedSite.featured && (
                  <span className="text-sm bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white px-4 py-2 rounded-full font-medium">
                    {t('modalFeaturedSite')}
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-8 text-lg leading-relaxed font-light">{t(selectedSite.descriptionKey)}</p>

              <div className="mb-8">
                <h4 className="text-xl text-[#8B7355] mb-4 font-light">{t('modalAmenities')}</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedSite.amenityKeys.map((amenityKey, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-[#8B7355]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#8B7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-light">{t(amenityKey)}</span>
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
                {t('modalBook')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
