'use client'

import { useState } from 'react'
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
  const [confirmingId, setConfirmingId] = useState<number | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  async function confirmBooking(id: number) {
    setConfirmingId(id)
    try {
      const res = await fetch('/api/admin/confirm-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Failed to confirm booking')
      } else {
        alert('Booking confirmed! Confirmation emails sent.')
        router.refresh()
      }
    } catch {
      alert('Network error')
    } finally {
      setConfirmingId(null)
    }
  }

  async function confirmReservation(id: number) {
    setConfirmingId(id)
    try {
      const res = await fetch('/api/admin/confirm-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Failed to confirm reservation')
      } else {
        alert('Reservation confirmed! Confirmation emails sent.')
        router.refresh()
      }
    } catch {
      alert('Network error')
    } finally {
      setConfirmingId(null)
    }
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending')
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Pending Bookings" value={pendingBookings.length} color="amber" />
        <StatCard label="Confirmed Bookings" value={confirmedBookings.length} color="green" />
        <StatCard label="Pending Reservations" value={pendingReservations.length} color="amber" />
        <StatCard label="Confirmed Reservations" value={confirmedReservations.length} color="green" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 border border-[#ece6dd] w-fit">
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

      {/* Content */}
      {activeTab === 'bookings' ? (
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <EmptyState text="No stay bookings yet." />
          ) : (
            bookings.map(booking => (
              <div
                key={booking.id}
                className={`bg-white rounded-xl border p-5 ${
                  booking.status === 'pending' ? 'border-amber-200' : 'border-[#ece6dd]'
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
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => confirmBooking(booking.id)}
                      disabled={confirmingId === booking.id}
                      className="shrink-0 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg text-sm tracking-wide hover:from-emerald-700 hover:to-emerald-600 transition-all disabled:opacity-50"
                    >
                      {confirmingId === booking.id ? 'Confirming...' : 'Confirm'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {reservations.length === 0 ? (
            <EmptyState text="No restaurant reservations yet." />
          ) : (
            reservations.map(reservation => (
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
                      disabled={confirmingId === reservation.id}
                      className="shrink-0 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg text-sm tracking-wide hover:from-emerald-700 hover:to-emerald-600 transition-all disabled:opacity-50"
                    >
                      {confirmingId === reservation.id ? 'Confirming...' : 'Confirm'}
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
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
      Pending
    </span>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: 'amber' | 'green' }) {
  return (
    <div className="bg-white rounded-xl border border-[#ece6dd] p-4">
      <p className="text-xs uppercase tracking-wider text-[#8B7355] mb-1">{label}</p>
      <p className={`text-2xl font-light ${color === 'amber' ? 'text-amber-600' : 'text-emerald-600'}`}>
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
