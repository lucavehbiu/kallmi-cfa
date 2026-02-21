'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { DayPicker, type DateRange } from 'react-day-picker'
import 'react-day-picker/style.css'
import { FadeIn } from './motion/FadeIn'
import { Section, SectionHeader } from './layout/Section'
import { Card, CardBody } from './ui/Card'
import { Button } from './ui/Button'
import { CheckCircleIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Room {
  id: number
  nameKey: string
  descriptionKey: string
  price: number
  size: string
  capacity: number
  amenityKeys: string[]
  images: string[]
  featured?: boolean
}

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

const rooms: Room[] = [
  {
    id: 1,
    nameKey: "roomWestName",
    descriptionKey: "roomWestDescription",
    price: 120,
    size: "30 m²",
    capacity: 2,
    amenityKeys: ["amenityDoubleBed", "amenitySeaView", "amenityPrivateBalcony", "amenityEnsuiteBathroom", "amenityAirConditioning"],
    images: [
      "https://storage.googleapis.com/kallmi/images/stay/room_view.webp",
      "https://storage.googleapis.com/kallmi/images/stay/room_design.webp",
      "https://storage.googleapis.com/kallmi/images/stay/bed.webp",
      "https://storage.googleapis.com/kallmi/images/stay/room_living_room.webp",
      "https://storage.googleapis.com/kallmi/images/stay/more_room_design.webp",
      "https://storage.googleapis.com/kallmi/images/stay/bathrrom.webp",
      "https://storage.googleapis.com/kallmi/images/stay/bathroooom2.webp",
      "https://storage.googleapis.com/kallmi/images/stay/shower.webp",
      "https://storage.googleapis.com/kallmi/images/stay/wardrobe.webp",
      "https://storage.googleapis.com/kallmi/images/stay/entrance.webp"
    ],
    featured: true
  },
  {
    id: 2,
    nameKey: "roomEastName",
    descriptionKey: "roomEastDescription",
    price: 120,
    size: "30 m²",
    capacity: 2,
    amenityKeys: ["amenityDoubleBed", "amenitySeaView", "amenityEnsuiteBathroom", "amenityAirConditioning"],
    images: [
      "https://storage.googleapis.com/kallmi/images/stay/room_view.webp",
      "https://storage.googleapis.com/kallmi/images/stay/room_design.webp",
      "https://storage.googleapis.com/kallmi/images/stay/bed.webp",
      "https://storage.googleapis.com/kallmi/images/stay/room_living_room.webp",
      "https://storage.googleapis.com/kallmi/images/stay/more_room_design.webp",
      "https://storage.googleapis.com/kallmi/images/stay/bathrrom.webp",
      "https://storage.googleapis.com/kallmi/images/stay/bathroooom2.webp",
      "https://storage.googleapis.com/kallmi/images/stay/shower.webp",
      "https://storage.googleapis.com/kallmi/images/stay/wardrobe.webp",
      "https://storage.googleapis.com/kallmi/images/stay/entrance.webp"
    ],
    featured: true
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export default function Accommodations() {
  const t = useTranslations('Accommodations')
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+355',
    phone: '',
    roomId: '' as string,
    guests: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
    ageConfirm: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [priceEstimate, setPriceEstimate] = useState<{
    nights: number
    totalAmount: number
    depositAmount: number
    breakdown: { date: string; rate: number }[]
  } | null>(null)
  const [loadingPrice, setLoadingPrice] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [displayMonth, setDisplayMonth] = useState(new Date())
  const [bookedDates, setBookedDates] = useState<Record<string, string[]>>({})
  const [loadingAvailability, setLoadingAvailability] = useState(false)

  // Fetch availability when month or room changes
  useEffect(() => {
    const monthStr = `${displayMonth.getFullYear()}-${String(displayMonth.getMonth() + 1).padStart(2, '0')}`
    setLoadingAvailability(true)
    fetch(`/api/availability?month=${monthStr}`)
      .then(res => res.ok ? res.json() : {})
      .then(data => setBookedDates(prev => ({ ...prev, ...data })))
      .catch(() => { })
      .finally(() => setLoadingAvailability(false))
  }, [displayMonth])

  // Compute disabled dates and "limited" dates based on room selection and booked data
  const { disabledDates, limitedDates, fullyBookedDates } = useMemo(() => {
    const selectedIds = formData.roomId.split(',').filter(Boolean)
    if (selectedIds.length === 0) return { disabledDates: [], limitedDates: [], fullyBookedDates: [] }

    const disabled: Date[] = []
    const limited: Date[] = []
    const fullyBooked: Date[] = []
    const isBothRooms = selectedIds.length === 2

    for (const [dateStr, roomIds] of Object.entries(bookedDates)) {
      const bothBooked = roomIds.includes('1') && roomIds.includes('2')
      const oneBooked = roomIds.includes('1') || roomIds.includes('2')
      const dateObj = new Date(dateStr + 'T12:00:00')

      if (bothBooked) {
        // Both rooms booked on this date — fully booked, always disabled
        fullyBooked.push(dateObj)
        disabled.push(dateObj)
      } else if (isBothRooms && oneBooked) {
        // User wants both rooms but only one is available — block it
        disabled.push(dateObj)
      } else if (!isBothRooms) {
        if (roomIds.includes(selectedIds[0])) {
          // The specific room they want is booked
          disabled.push(dateObj)
        } else if (oneBooked) {
          // The other room is booked — only 1 room left on this date
          limited.push(dateObj)
        }
      }
    }
    return { disabledDates: disabled, limitedDates: limited, fullyBookedDates: fullyBooked }
  }, [formData.roomId, bookedDates])

  // Sync DayPicker range to form data
  useEffect(() => {
    if (dateRange?.from) {
      const checkIn = dateRange.from.toLocaleDateString('en-CA') // YYYY-MM-DD
      setFormData(prev => ({ ...prev, checkIn }))
    } else {
      setFormData(prev => ({ ...prev, checkIn: '' }))
    }
    if (dateRange?.to) {
      const checkOut = dateRange.to.toLocaleDateString('en-CA')
      setFormData(prev => ({ ...prev, checkOut }))
    } else {
      setFormData(prev => ({ ...prev, checkOut: '' }))
    }
  }, [dateRange])

  const fetchPriceEstimate = useCallback(async (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut || checkIn >= checkOut) {
      setPriceEstimate(null)
      return
    }
    setLoadingPrice(true)
    try {
      const res = await fetch(`/api/pricing-estimate?checkIn=${checkIn}&checkOut=${checkOut}`)
      if (res.ok) {
        const data = await res.json()
        setPriceEstimate(data)
      }
    } catch {
      setPriceEstimate(null)
    } finally {
      setLoadingPrice(false)
    }
  }, [])

  useEffect(() => {
    fetchPriceEstimate(formData.checkIn, formData.checkOut)
  }, [formData.checkIn, formData.checkOut, fetchPriceEstimate])

  // Get tomorrow's date as minimum selectable date
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Determine max guests based on room selection
  const getMaxGuests = () => {
    const selectedIds = formData.roomId.split(',').filter(Boolean)
    if (selectedIds.length === 2) return 4
    return 2
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormErrors(prev => ({ ...prev, [name]: '' }))

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
      return
    }

    // When room changes, reset guests if over new max and clear date range
    if (name === 'roomId') {
      setDateRange(undefined)
      const selectedIds = value.split(',').filter(Boolean)
      const maxGuests = selectedIds.length === 2 ? 4 : 2
      const currentGuests = parseInt(formData.guests) || 0
      if (currentGuests > maxGuests) {
        setFormData(prev => ({ ...prev, [name]: value, guests: '', checkIn: '', checkOut: '' }))
        return
      }
    }

    // When checkIn changes, ensure checkOut is after it
    if (name === 'checkIn' && formData.checkOut && value >= formData.checkOut) {
      setFormData(prev => ({ ...prev, [name]: value, checkOut: '' }))
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(formData.email)) {
      errors.email = t('errorEmail')
    }

    // Phone validation (digits only, 6-15 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length < 6 || phoneDigits.length > 15) {
      errors.phone = t('errorPhone')
    }

    // Date validation - must be in the future (not today)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkIn = new Date(formData.checkIn)
    if (checkIn <= today) {
      errors.checkIn = t('errorCheckIn')
    }

    const checkOut = new Date(formData.checkOut)
    if (checkOut <= checkIn) {
      errors.checkOut = t('errorCheckOut')
    }

    // Age confirmation
    if (!formData.ageConfirm) {
      errors.ageConfirm = t('errorAgeConfirm')
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const selectedIds = formData.roomId.split(',').filter(Boolean)
      const roomNames = selectedIds.map(id => {
        const room = rooms.find(r => r.id.toString() === id)
        return room ? t(room.nameKey) : 'Unknown'
      }).join(' & ')
      const fullPhone = `${formData.countryCode} ${formData.phone}`

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          roomId: formData.roomId,
          roomName: roomNames,
          guests: formData.guests,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          specialRequests: formData.specialRequests
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: data.message || t('bookingSuccess') })
        setPriceEstimate(null)
        setDateRange(undefined)
        setFormData({
          name: '',
          email: '',
          countryCode: '+355',
          phone: '',
          roomId: '',
          guests: '',
          checkIn: '',
          checkOut: '',
          specialRequests: '',
          ageConfirm: false
        })
      } else {
        setSubmitMessage({ type: 'error', text: data.error || t('bookingError') })
      }
    } catch {
      setSubmitMessage({ type: 'error', text: t('bookingGenericError') })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen font-cormorant" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
      {/* Hero Section */}
      <div className="h-[60vh] min-h-[500px] relative overflow-hidden">
        <Image
          src="https://storage.googleapis.com/kallmi/images/stay_snippet.webp"
          alt="Kallmi Estate Accommodations"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
          <FadeIn animation="fade" delay={0.2}>
            <span className="text-overline text-white/80 block mb-4 text-center">
              {t('heroOverline')}
            </span>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.4}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-6 text-center">
              {t('heroTitle')}
            </h1>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.6}>
            <p className="text-lg sm:text-xl font-light opacity-90 max-w-2xl text-center">
              {t('heroSubtitle')}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Introduction Section */}
      <Section background="secondary" spacing="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn animation="slide-up">
            <div className="space-y-6">
              <h2 className="text-heading" style={{ color: 'var(--color-brand-olive)' }}>
                {t('introTitle')}
              </h2>
              <div className="space-y-4 text-body-lg">
                <p>
                  {t('introText1')}
                </p>
                <p>
                  {t('introText2')}
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
                <Image
                  src="https://storage.googleapis.com/kallmi/images/stay/room_view.webp"
                  alt="Room Interior"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={80}
                />
              </div>
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden mt-8">
                <Image
                  src="https://storage.googleapis.com/kallmi/images/stay/room_design.webp"
                  alt="Room with a View"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={80}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Our Rooms Section */}
      <Section background="default" spacing="lg">
        <SectionHeader
          overline={t('roomsOverline')}
          title={t('roomsTitle')}
          subtitle={t('roomsSubtitle')}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {rooms.map((room, index) => (
            <FadeIn
              key={room.id}
              animation="slide-up"
              delay={index * 0.1}
            >
              <Card variant="elevated" hover className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={room.images[0]}
                    alt={t(room.nameKey)}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                  />
                  {room.featured && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm text-white"
                      style={{ backgroundColor: 'var(--color-brand-olive)' }}
                    >
                      {t('featured')}
                    </div>
                  )}
                </div>
                <CardBody className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-2xl font-light"
                      style={{ color: 'var(--color-brand-olive)' }}
                    >
                      {t(room.nameKey)}
                    </h3>
                    <span
                      className="text-lg font-light"
                      style={{ color: 'var(--color-brand-olive)' }}
                    >
                      {t('fromPrice', { price: formatPrice(80) })}
                    </span>
                  </div>

                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {t(room.descriptionKey)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className="text-sm px-2 py-1 rounded"
                      style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-secondary)' }}
                    >
                      {room.size}
                    </span>
                    <span
                      className="text-sm px-2 py-1 rounded"
                      style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-secondary)' }}
                    >
                      {t('sleeps', { capacity: room.capacity })}
                    </span>
                    {room.amenityKeys.slice(0, 2).map((amenityKey, i) => (
                      <span
                        key={i}
                        className="text-sm px-2 py-1 rounded"
                        style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-secondary)' }}
                      >
                        {t(amenityKey)}
                      </span>
                    ))}
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedRoom(room)
                      setCurrentImageIndex(0)
                    }}
                    variant="primary"
                    fullWidth
                  >
                    {t('viewDetailsAndBook')}
                  </Button>
                </CardBody>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Reservation Section */}
      <Section background="secondary" spacing="lg">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            overline={t('reservationsOverline')}
            title={t('reservationsTitle')}
            subtitle={t('reservationsSubtitle')}
            align="center"
          />

          <FadeIn animation="slide-up" delay={0.2}>
            <Card variant="elevated" className="p-8 mt-12 booking-section">
              {submitMessage && (
                <div
                  className="mb-6 p-4 rounded-xl"
                  style={{
                    backgroundColor: submitMessage.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: submitMessage.type === 'success' ? '#15803d' : '#dc2626'
                  }}
                >
                  {submitMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('yourName')}
                    required
                    className="input-field"
                  />
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('emailAddress')}
                      required
                      className={`input-field ${formErrors.email ? 'border-red-400 focus:border-red-400' : ''}`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('phoneNumber')}
                      required
                      className={`input-field flex-1 ${formErrors.phone ? 'border-red-400 focus:border-red-400' : ''}`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <select
                      name="roomId"
                      value={formData.roomId}
                      onChange={handleInputChange}
                      required
                      className="select-field"
                    >
                      <option value="">{t('selectRoom')}</option>
                      {rooms.map(room => (
                        <option key={room.id} value={room.id.toString()}>{t(room.nameKey)}</option>
                      ))}
                      <option value={rooms.map(r => r.id).join(',')}>{t('bothRooms')}</option>
                    </select>
                  </div>
                  <div>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      className="select-field"
                    >
                      <option value="">{t('numberOfGuests')}</option>
                      <option value="1">{t('guest', { count: 1 })}</option>
                      <option value="2">{t('guest', { count: 2 })}</option>
                      {getMaxGuests() >= 3 && <option value="3">{t('guest', { count: 3 })}</option>}
                      {getMaxGuests() >= 4 && <option value="4">{t('guest', { count: 4 })}</option>}
                    </select>
                    {formData.roomId && (
                      <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                        {t('maxGuests', { max: getMaxGuests(), roomType: formData.roomId.includes(',') ? t('maxGuestsBothRooms') : t('maxGuestsOneRoom') })}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {t('selectDates')}
                  </label>
                  {!formData.roomId ? (
                    <div
                      className="p-6 rounded-xl text-center text-sm"
                      style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-tertiary)' }}
                    >
                      {t('selectRoomFirst')}
                    </div>
                  ) : (
                    <div className="kallmi-calendar-wrapper">
                      <DayPicker
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => {
                          setDateRange(range)
                          setFormErrors(prev => ({ ...prev, checkIn: '', checkOut: '' }))
                        }}
                        month={displayMonth}
                        onMonthChange={setDisplayMonth}
                        disabled={[
                          { before: new Date(new Date().setDate(new Date().getDate() + 1)) },
                          ...disabledDates
                        ]}
                        excludeDisabled
                        numberOfMonths={1}
                        showOutsideDays
                        modifiers={{
                          booked: disabledDates,
                          fullyBooked: fullyBookedDates,
                          limited: limitedDates
                        }}
                        modifiersClassNames={{
                          booked: 'kallmi-booked-day',
                          fullyBooked: 'kallmi-fully-booked-day',
                          limited: 'kallmi-limited-day'
                        }}
                      />
                      {loadingAvailability && (
                        <p className="text-xs text-center mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                          {t('loadingAvailability')}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: 'rgba(139, 115, 85, 0.15)' }} />
                          {t('legendSelected')}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-3 h-3 rounded-sm bg-red-100 border border-red-200" />
                          {t('legendBooked')}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d' }} />
                          {t('legendLimited')}
                        </span>
                      </div>
                      {dateRange?.from && (
                        <div className="flex gap-4 mt-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                          <span>
                            <strong>{t('checkInLabel')}</strong>{' '}
                            {dateRange.from.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          {dateRange.to && (
                            <span>
                              <strong>{t('checkOutLabel')}</strong>{' '}
                              {dateRange.to.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {formErrors.checkIn && <p className="text-red-500 text-xs mt-1">{formErrors.checkIn}</p>}
                  {formErrors.checkOut && <p className="text-red-500 text-xs mt-1">{formErrors.checkOut}</p>}
                </div>

                {/* Price Estimate */}
                {loadingPrice && (
                  <div className="p-4 rounded-xl text-center text-sm" style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-secondary)' }}>
                    {t('calculatingPrice')}
                  </div>
                )}
                {priceEstimate && !loadingPrice && (
                  <div className="p-4 rounded-xl space-y-2" style={{ backgroundColor: 'rgba(139, 115, 85, 0.08)' }}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                        {t('nightCount', { count: priceEstimate.nights })}
                      </span>
                      <span className="text-lg font-light" style={{ color: 'var(--color-brand-olive)' }}>
                        {formatPrice(priceEstimate.totalAmount)}
                        {formData.roomId.includes(',') && ` ${t('perRoom')}`}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {priceEstimate.breakdown.map((b, i) => (
                        <span key={i} className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                          {b.date}: {formatPrice(b.rate)}
                        </span>
                      ))}
                    </div>
                    {formData.roomId.includes(',') && (
                      <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        {t('totalBothRooms', { price: formatPrice(priceEstimate.totalAmount * 2) })}
                      </p>
                    )}
                  </div>
                )}

                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder={t('specialRequests')}
                  className="textarea-field"
                />

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="ageConfirm"
                      checked={formData.ageConfirm}
                      onChange={handleInputChange}
                      className="mt-1 rounded border-gray-300 text-[#8B7355] focus:ring-[#8B7355]"
                    />
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {t('ageConfirmText')}
                    </span>
                  </label>
                  {formErrors.ageConfirm && <p className="text-red-500 text-xs mt-1 ml-7">{formErrors.ageConfirm}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  fullWidth
                  size="lg"
                >
                  {isSubmitting ? t('submitting') : t('requestBooking')}
                </Button>
              </form>

              <p className="mt-6 text-center text-caption">
                {t('bookingConfirmation')}
                <br />
                {t('bookingContact')}{' '}
                <span style={{ color: 'var(--color-brand-olive)' }}>reservations@kallmibukur.al</span>
              </p>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Experiences Section */}
      <Section background="default" spacing="lg">
        <SectionHeader
          overline={t('experiencesOverline')}
          title={t('experiencesTitle')}
          subtitle={t('experiencesSubtitle')}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              titleKey: 'oliveOilTasting',
              descriptionKey: 'oliveOilTastingDesc',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )
            },
            {
              titleKey: 'waterActivities',
              descriptionKey: 'waterActivitiesDesc',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17c3-4 6-6 9-6s6 2 9 6M5 17h14M12 11V3M9 5l3-2 3 2" />
                </svg>
              )
            },
            {
              titleKey: 'localExcursions',
              descriptionKey: 'localExcursionsDesc',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              )
            }
          ].map((experience, index) => (
            <FadeIn key={index} animation="slide-up" delay={index * 0.1}>
              <Card variant="subtle" className="text-center p-8">
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(139, 115, 85, 0.1)', color: 'var(--color-brand-olive)' }}
                >
                  {experience.icon}
                </div>
                <h3
                  className="text-xl font-light mb-4"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  {t(experience.titleKey)}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {t(experience.descriptionKey)}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn animation="fade" delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button variant="primary">
                {t('inquireAboutActivities')}
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[50vh] min-h-[300px]">
              <Image
                src={selectedRoom.images[currentImageIndex]}
                alt={t(selectedRoom.nameKey)}
                className="object-cover"
                fill
                sizes="800px"
                quality={85}
              />
              <button
                onClick={() => setSelectedRoom(null)}
                className="absolute top-4 right-4 p-2 rounded-full transition-colors"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {selectedRoom.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : selectedRoom.images.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev < selectedRoom.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
                    <span className="text-white text-sm font-sans drop-shadow-lg">
                      {currentImageIndex + 1} / {selectedRoom.images.length}
                    </span>
                    <div className="flex justify-center gap-1.5">
                      {selectedRoom.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3
                  className="text-3xl font-light"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  {t(selectedRoom.nameKey)}
                </h3>
                <span
                  className="text-lg font-light"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  {t('fromPrice', { price: formatPrice(80) })}
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                {t('priceVariesBySeason')}
              </p>

              <div className="flex flex-wrap gap-3">
                <span
                  className="text-sm px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-secondary)' }}
                >
                  {selectedRoom.size}
                </span>
                <span
                  className="text-sm px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-secondary)' }}
                >
                  {t('sleeps', { capacity: selectedRoom.capacity })}
                </span>
              </div>

              <p style={{ color: 'var(--color-text-secondary)' }}>
                {t(selectedRoom.descriptionKey)}
              </p>

              <div>
                <h4
                  className="text-xl font-light mb-3"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  {t('amenities')}
                </h4>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedRoom.amenityKeys.map((amenityKey, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircleIcon
                        className="h-5 w-5 flex-shrink-0"
                        style={{ color: 'var(--color-brand-olive)' }}
                      />
                      <span style={{ color: 'var(--color-text-primary)' }}>{t(amenityKey)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => {
                  setSelectedRoom(null)
                  document.querySelector('.booking-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {t('bookThisRoom')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
