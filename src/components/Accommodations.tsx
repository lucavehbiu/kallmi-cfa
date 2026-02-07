'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from './motion/FadeIn'
import { Section, SectionHeader } from './layout/Section'
import { Card, CardBody } from './ui/Card'
import { Button } from './ui/Button'
import { CheckCircleIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

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
    name: "West Room - Sea View",
    description: "Beautiful room on the west side of the estate with stunning views of the Adriatic Sea. Features a comfortable bed, ensuite bathroom, and private balcony.",
    price: 120,
    size: "30 m²",
    capacity: 2,
    amenities: ["Double bed", "Sea view", "Private balcony", "Ensuite bathroom", "Air conditioning", "Free WiFi", "Daily housekeeping"],
    images: ["/images/room-olive-1.webp", "/images/room-olive-2.webp", "/images/room-olive-3.webp"],
    featured: true
  },
  {
    id: 2,
    name: "East Room - Sea View",
    description: "Charming room on the east side of the estate with panoramic sea views. Features a comfortable bed, ensuite bathroom, and morning sunshine.",
    price: 120,
    size: "30 m²",
    capacity: 2,
    amenities: ["Double bed", "Sea view", "Ensuite bathroom", "Air conditioning", "Free WiFi", "Daily housekeeping"],
    images: ["/images/room-garden-1.webp", "/images/room-garden-2.webp"],
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

    // When room changes, reset guests if over new max
    if (name === 'roomId') {
      const selectedIds = value.split(',').filter(Boolean)
      const maxGuests = selectedIds.length === 2 ? 4 : 2
      const currentGuests = parseInt(formData.guests) || 0
      if (currentGuests > maxGuests) {
        setFormData(prev => ({ ...prev, [name]: value, guests: '' }))
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
      errors.email = 'Please enter a valid email address'
    }

    // Phone validation (digits only, 6-15 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length < 6 || phoneDigits.length > 15) {
      errors.phone = 'Please enter a valid phone number'
    }

    // Date validation - must be in the future (not today)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkIn = new Date(formData.checkIn)
    if (checkIn <= today) {
      errors.checkIn = 'Check-in must be a future date'
    }

    const checkOut = new Date(formData.checkOut)
    if (checkOut <= checkIn) {
      errors.checkOut = 'Check-out must be after check-in'
    }

    // Age confirmation
    if (!formData.ageConfirm) {
      errors.ageConfirm = 'You must confirm all guests are 13 or older'
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
      const roomNames = selectedIds.map(id => rooms.find(r => r.id.toString() === id)?.name || 'Unknown').join(' & ')
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
        setSubmitMessage({ type: 'success', text: data.message || 'Booking request submitted! Please await confirmation — our team will get back to you shortly.' })
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
        setSubmitMessage({ type: 'error', text: data.error || 'Failed to submit booking request' })
      }
    } catch {
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen font-cormorant" style={{ backgroundColor: 'var(--color-surface-primary)' }}>
      {/* Hero Section */}
      <div className="h-[60vh] min-h-[500px] relative overflow-hidden">
        <Image
          src="/images/stay_snippet.webp"
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
              Boutique Hospitality
            </span>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.4}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-6 text-center">
              Stay With Us
            </h1>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.6}>
            <p className="text-lg sm:text-xl font-light opacity-90 max-w-2xl text-center">
              Experience authentic Albanian hospitality in our boutique accommodations
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
                Your Home in Albania
              </h2>
              <div className="space-y-4 text-body-lg">
                <p>
                  At Kallmi Estate, we invite you to experience the genuine warmth of Albanian
                  hospitality in our thoughtfully designed accommodations. Each room is a perfect
                  blend of traditional elements and modern comforts.
                </p>
                <p>
                  Nestled among centuries-old olive trees with breathtaking views of the Adriatic Sea,
                  our accommodations offer a peaceful retreat from the bustle of everyday life.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn animation="slide-up" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
                <Image
                  src="/images/room-interior.webp"
                  alt="Room Interior"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={80}
                />
              </div>
              <div className="aspect-[3/4] relative rounded-xl overflow-hidden mt-8">
                <Image
                  src="/images/room-view.webp"
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
          overline="Accommodations"
          title="Our Rooms"
          subtitle="Choose from our selection of comfortable rooms and suites"
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
                    alt={room.name}
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
                      Featured
                    </div>
                  )}
                </div>
                <CardBody className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-2xl font-light"
                      style={{ color: 'var(--color-brand-olive)' }}
                    >
                      {room.name}
                    </h3>
                    <span
                      className="text-xl font-light"
                      style={{ color: 'var(--color-brand-olive)' }}
                    >
                      {formatPrice(room.price)} / night
                    </span>
                  </div>

                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {room.description}
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
                      Sleeps {room.capacity}
                    </span>
                    {room.amenities.slice(0, 2).map((amenity, i) => (
                      <span
                        key={i}
                        className="text-sm px-2 py-1 rounded"
                        style={{ backgroundColor: 'var(--color-surface-tertiary)', color: 'var(--color-text-secondary)' }}
                      >
                        {amenity}
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
                    View Details & Book
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
            overline="Reservations"
            title="Book Your Stay"
            subtitle="Experience the serenity of Kallmi Estate. Reserve your accommodation and create lasting memories with us."
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
                    placeholder="Your Name"
                    required
                    className="input-field"
                  />
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
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
                      placeholder="Phone Number"
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
                      <option value="">Select Room</option>
                      {rooms.map(room => (
                        <option key={room.id} value={room.id.toString()}>{room.name}</option>
                      ))}
                      <option value={rooms.map(r => r.id).join(',')}>Both Rooms</option>
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
                      <option value="">Number of Guests</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      {getMaxGuests() >= 3 && <option value="3">3 Guests</option>}
                      {getMaxGuests() >= 4 && <option value="4">4 Guests</option>}
                    </select>
                    {formData.roomId && (
                      <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
                        Max {getMaxGuests()} guests for {formData.roomId.includes(',') ? 'both rooms' : 'one room'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      required
                      className={`input-field ${formErrors.checkIn ? 'border-red-400 focus:border-red-400' : ''}`}
                    />
                    {formErrors.checkIn && <p className="text-red-500 text-xs mt-1">{formErrors.checkIn}</p>}
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      min={formData.checkIn || getMinDate()}
                      required
                      className={`input-field ${formErrors.checkOut ? 'border-red-400 focus:border-red-400' : ''}`}
                    />
                    {formErrors.checkOut && <p className="text-red-500 text-xs mt-1">{formErrors.checkOut}</p>}
                  </div>
                </div>

                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Special Requests"
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
                      I confirm that all guests are <strong>13 years of age or older</strong>. Kallmi Estate does not accommodate children under 13.
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
                  {isSubmitting ? 'Submitting...' : 'Request Booking'}
                </Button>
              </form>

              <p className="mt-6 text-center text-caption">
                Please await confirmation for your booking — our team will get back to you shortly.
                <br />
                For special arrangements, contact us at{' '}
                <span style={{ color: 'var(--color-brand-olive)' }}>reservations@kallmibukur.al</span>
              </p>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Experiences Section */}
      <Section background="default" spacing="lg">
        <SectionHeader
          overline="Experiences"
          title="Guest Activities"
          subtitle="Make the most of your stay with our curated experiences"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: 'Olive Oil Tasting',
              description: 'Join our experts for a guided tasting of our estate-produced olive oils.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )
            },
            {
              title: 'Cooking Workshops',
              description: 'Learn the secrets of traditional Albanian cuisine in our hands-on cooking classes.',
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            {
              title: 'Local Excursions',
              description: 'Explore the stunning Albanian coastline and historic sites with our guided tours.',
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
                  {experience.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  {experience.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn animation="fade" delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button variant="primary">
                Inquire About Activities
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
            <div className="relative h-80">
              <Image
                src={selectedRoom.images[currentImageIndex]}
                alt={selectedRoom.name}
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

            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3
                  className="text-3xl font-light"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  {selectedRoom.name}
                </h3>
                <span
                  className="text-2xl font-light"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  {formatPrice(selectedRoom.price)} / night
                </span>
              </div>

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
                  Sleeps {selectedRoom.capacity}
                </span>
              </div>

              <p style={{ color: 'var(--color-text-secondary)' }}>
                {selectedRoom.description}
              </p>

              <div>
                <h4
                  className="text-xl font-light mb-3"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  Amenities
                </h4>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircleIcon
                        className="h-5 w-5 flex-shrink-0"
                        style={{ color: 'var(--color-brand-olive)' }}
                      />
                      <span style={{ color: 'var(--color-text-primary)' }}>{amenity}</span>
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
                Book This Room
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
