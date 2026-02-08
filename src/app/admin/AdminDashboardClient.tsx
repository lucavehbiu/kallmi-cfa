'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

interface Booking {
  id: number
  name: string
  email: string
  phone: string
  room_id: string
  room_name: string
  guests: number
  check_in: string
  check_out: string
  special_requests: string | null
  status: string
  created_at: string
}

interface Reservation {
  id: number
  name: string
  email: string
  phone: string
  reservation_date: string
  reservation_time: string
  guests: number
  special_requests: string | null
  status: string
  created_at: string
}

type ToastType = 'success' | 'error'

export default function AdminDashboardClient({
  bookings,
  reservations,
  userEmail,
}: {
  bookings: Booking[]
  reservations: Reservation[]
  userEmail: string
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'bookings' | 'reservations'>('bookings')
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const [bookingFilter, setBookingFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming')
  const [reservationFilter, setReservationFilter] = useState<'upcoming' | 'past' | 'all'>('upcoming')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  async function requestPayment(id: number) {
    setLoadingId(id)
    setLoadingAction('requesting')
    try {
      const res = await fetch('/api/admin/request-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) {
        showToast(data.error || 'Failed to request payment', 'error')
      } else {
        showToast(data.message || 'Payment request sent!', 'success')
        router.refresh()
      }
    } catch {
      showToast('Network error', 'error')
    } finally {
      setLoadingId(null)
      setLoadingAction(null)
    }
  }

  async function confirmBooking(id: number) {
    setLoadingId(id)
    setLoadingAction('confirming')
    try {
      const res = await fetch('/api/admin/confirm-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) {
        showToast(data.error || 'Failed to confirm booking', 'error')
      } else {
        showToast('Booking confirmed! Guest has been notified.', 'success')
        router.refresh()
      }
    } catch {
      showToast('Network error', 'error')
    } finally {
      setLoadingId(null)
      setLoadingAction(null)
    }
  }

  async function confirmReservation(id: number) {
    setLoadingId(id)
    setLoadingAction('confirming')
    try {
      const res = await fetch('/api/admin/confirm-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) {
        showToast(data.error || 'Failed to confirm reservation', 'error')
      } else {
        showToast('Reservation confirmed! Guest has been notified.', 'success')
        router.refresh()
      }
    } catch {
      showToast('Network error', 'error')
    } finally {
      setLoadingId(null)
      setLoadingAction(null)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === 'upcoming') return b.check_in >= today
    if (bookingFilter === 'past') return b.check_out < today
    return true
  })

  const filteredReservations = reservations.filter(r => {
    if (reservationFilter === 'upcoming') return r.reservation_date >= today
    if (reservationFilter === 'past') return r.reservation_date < today
    return true
  })

  // Stats (always from full list)
  const pendingBookings = bookings.filter(b => b.status === 'pending')
  const awaitingPaymentBookings = bookings.filter(b => b.status === 'awaiting_payment')
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')
  const pendingReservations = reservations.filter(r => r.status === 'pending')
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed')

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    })
  }

  function formatTime(timeStr: string) {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  function isLoading(id: number, action: string) {
    return loadingId === id && loadingAction === action
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all animate-fade-in ${
          toast.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            <span>{toast.type === 'success' ? '\u2713' : '\u2717'}</span>
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-3 opacity-50 hover:opacity-100">\u00d7</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs tracking-[4px] text-[#D4AF37] uppercase mb-1">Kallmi Estate</p>
          <h1 className="text-2xl font-light text-[#333] tracking-wide">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#8B7355]">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-[#999] hover:text-[#8B7355] transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard label="Pending Bookings" value={pendingBookings.length} color="amber" />
        <StatCard label="Awaiting Payment" value={awaitingPaymentBookings.length} color="orange" />
        <StatCard label="Confirmed Bookings" value={confirmedBookings.length} color="green" />
        <StatCard label="Pending Reservations" value={pendingReservations.length} color="amber" />
        <StatCard label="Confirmed Reservations" value={confirmedReservations.length} color="green" />
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex gap-1 bg-white rounded-lg p-1 border border-[#ece6dd] w-fit">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2 rounded-md text-sm tracking-wide transition-all ${
              activeTab === 'bookings'
                ? 'bg-[#8B7355] text-white'
                : 'text-[#8B7355] hover:bg-[#faf8f5]'
            }`}
          >
            Stay Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-5 py-2 rounded-md text-sm tracking-wide transition-all ${
              activeTab === 'reservations'
                ? 'bg-[#8B7355] text-white'
                : 'text-[#8B7355] hover:bg-[#faf8f5]'
            }`}
          >
            Restaurant ({reservations.length})
          </button>
        </div>

        {/* Time Filter */}
        <div className="flex gap-1 bg-white rounded-lg p-1 border border-[#ece6dd] w-fit">
          {(['upcoming', 'past', 'all'] as const).map(f => {
            const currentFilter = activeTab === 'bookings' ? bookingFilter : reservationFilter
            const setFilter = activeTab === 'bookings' ? setBookingFilter : setReservationFilter
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-xs tracking-wide transition-all capitalize ${
                  currentFilter === f
                    ? 'bg-[#faf8f5] text-[#8B7355] font-medium border border-[#ece6dd]'
                    : 'text-[#999] hover:text-[#8B7355]'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'bookings' ? (
        <div className="space-y-3">
          {filteredBookings.length === 0 ? (
            <EmptyState text={`No ${bookingFilter} stay bookings.`} />
          ) : (
            filteredBookings.map(booking => (
              <div
                key={booking.id}
                className={`bg-white rounded-xl border p-5 ${
                  booking.status === 'pending'
                    ? 'border-amber-200'
                    : booking.status === 'awaiting_payment'
                    ? 'border-orange-200'
                    : 'border-[#ece6dd]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-[#333]">{booking.name}</h3>
                      <StatusBadge status={booking.status} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-[#666]">
                      <div>
                        <span className="text-[#8B7355] text-xs uppercase tracking-wider">Room</span>
                        <p>{booking.room_name}</p>
                      </div>
                      <div>
                        <span className="text-[#8B7355] text-xs uppercase tracking-wider">Check-in</span>
                        <p>{formatDate(booking.check_in)}</p>
                      </div>
                      <div>
                        <span className="text-[#8B7355] text-xs uppercase tracking-wider">Check-out</span>
                        <p>{formatDate(booking.check_out)}</p>
                      </div>
                      <div>
                        <span className="text-[#8B7355] text-xs uppercase tracking-wider">Guests</span>
                        <p>{booking.guests}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-[#666]">
                      <span>{booking.email}</span>
                      <span>{booking.phone}</span>
                    </div>
                    {booking.special_requests && (
                      <p className="mt-2 text-sm text-[#666] italic">
                        &ldquo;{booking.special_requests}&rdquo;
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[#bbb]">
                      Submitted {formatDate(booking.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => requestPayment(booking.id)}
                        disabled={isLoading(booking.id, 'requesting')}
                        className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-lg text-sm tracking-wide hover:from-amber-600 hover:to-amber-500 transition-all disabled:opacity-50"
                      >
                        {isLoading(booking.id, 'requesting') ? 'Sending...' : 'Request Payment'}
                      </button>
                    )}
                    {booking.status === 'awaiting_payment' && (
                      <button
                        onClick={() => confirmBooking(booking.id)}
                        disabled={isLoading(booking.id, 'confirming')}
                        className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg text-sm tracking-wide hover:from-emerald-700 hover:to-emerald-600 transition-all disabled:opacity-50"
                      >
                        {isLoading(booking.id, 'confirming') ? 'Confirming...' : 'Confirm (Payment Received)'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReservations.length === 0 ? (
            <EmptyState text={`No ${reservationFilter} restaurant reservations.`} />
          ) : (
            filteredReservations.map(reservation => (
              <div
                key={reservation.id}
                className={`bg-white rounded-xl border p-5 ${
                  reservation.status === 'pending' ? 'border-amber-200' : 'border-[#ece6dd]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-[#333]">{reservation.name}</h3>
                      <StatusBadge status={reservation.status} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-[#666]">
                      <div>
                        <span className="text-[#8B7355] text-xs uppercase tracking-wider">Date</span>
                        <p>{formatDate(reservation.reservation_date)}</p>
                      </div>
                      <div>
                        <span className="text-[#8B7355] text-xs uppercase tracking-wider">Time</span>
                        <p>{formatTime(reservation.reservation_time)}</p>
                      </div>
                      <div>
                        <span className="text-[#8B7355] text-xs uppercase tracking-wider">Guests</span>
                        <p>{reservation.guests}</p>
                      </div>
                      <div>
                        <span className="text-[#8B7355] text-xs uppercase tracking-wider">Phone</span>
                        <p>{reservation.phone}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-[#666]">
                      <span>{reservation.email}</span>
                    </div>
                    {reservation.special_requests && (
                      <p className="mt-2 text-sm text-[#666] italic">
                        &ldquo;{reservation.special_requests}&rdquo;
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[#bbb]">
                      Submitted {formatDate(reservation.created_at)}
                    </p>
                  </div>
                  {reservation.status === 'pending' && (
                    <button
                      onClick={() => confirmReservation(reservation.id)}
                      disabled={isLoading(reservation.id, 'confirming')}
                      className="shrink-0 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg text-sm tracking-wide hover:from-emerald-700 hover:to-emerald-600 transition-all disabled:opacity-50"
                    >
                      {isLoading(reservation.id, 'confirming') ? 'Confirming...' : 'Confirm'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'confirmed') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        Confirmed
      </span>
    )
  }
  if (status === 'awaiting_payment') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
        Awaiting Payment
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
      Pending
    </span>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: 'amber' | 'green' | 'orange' }) {
  const colorClass = color === 'amber' ? 'text-amber-600' : color === 'orange' ? 'text-orange-600' : 'text-emerald-600'
  return (
    <div className="bg-white rounded-xl border border-[#ece6dd] p-4">
      <p className="text-xs uppercase tracking-wider text-[#8B7355] mb-1">{label}</p>
      <p className={`text-2xl font-light ${colorClass}`}>
        {value}
      </p>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="bg-white rounded-xl border border-[#ece6dd] p-12 text-center">
      <p className="text-[#999] text-sm">{text}</p>
    </div>
  )
}
