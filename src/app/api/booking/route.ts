import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Mailjet from 'node-mailjet'
import { supabase } from '@/lib/supabase'
import { getBookedDates } from '@/lib/google-calendar'
import { renderEmail } from '@/lib/email-template'

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_API_SECRET || ''
)

interface BookingData {
  name: string
  email: string
  phone: string
  roomId: string
  roomName: string
  guests: string
  checkIn: string
  checkOut: string
  specialRequests?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingData = await request.json()
    const { name, email, phone, roomId, roomName, guests, checkIn, checkOut, specialRequests } = body

    // Validate required fields
    if (!name || !email || !phone || !roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check availability against Google Calendar
    try {
      const bookedEntries = await getBookedDates(checkIn, checkOut)
      const selectedIds = roomId.split(',').filter(Boolean)
      const isBothRooms = selectedIds.length === 2

      // Build a date->roomIds map from booked entries
      const dateMap: Record<string, string[]> = {}
      for (const entry of bookedEntries) {
        if (!dateMap[entry.date]) dateMap[entry.date] = []
        if (!dateMap[entry.date].includes(entry.roomId)) dateMap[entry.date].push(entry.roomId)
      }

      // Check each date in the requested range
      const current = new Date(checkIn + 'T12:00:00Z')
      const end = new Date(checkOut + 'T12:00:00Z')
      while (current < end) {
        const dateStr = current.toISOString().split('T')[0]
        const bookedRooms = dateMap[dateStr] || []

        if (isBothRooms) {
          if (bookedRooms.includes('1') && bookedRooms.includes('2')) {
            return NextResponse.json(
              { error: `Both rooms are already booked on ${dateStr}. Please choose different dates.` },
              { status: 409 }
            )
          }
        } else {
          if (bookedRooms.includes(selectedIds[0])) {
            return NextResponse.json(
              { error: `This room is already booked on ${dateStr}. Please choose different dates.` },
              { status: 409 }
            )
          }
        }
        current.setUTCDate(current.getUTCDate() + 1)
      }
    } catch (availErr) {
      // Don't block the booking if availability check fails (graceful degradation)
      console.error('Availability check failed (proceeding with booking):', availErr)
    }

    // Insert into Supabase (graceful degradation - don't block email if this fails)
    try {
      const { error: dbError } = await supabase
        .from('stay_bookings')
        .insert({
          name,
          email,
          phone,
          room_id: roomId,
          room_name: roomName,
          guests: parseInt(guests) || 1,
          check_in: checkIn,
          check_out: checkOut,
          special_requests: specialRequests || null,
          status: 'pending',
        })

      if (dbError) {
        console.error('Supabase insert error (stay_bookings):', dbError)
      }
    } catch (dbErr) {
      console.error('Supabase connection error (stay_bookings):', dbErr)
    }

    // Format dates for display
    const checkInDate = new Date(checkIn).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const checkOutDate = new Date(checkOut).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Email content for the guest
    const guestDetailRows = [
      { label: 'Room', value: roomName },
      { label: 'Check-in', value: checkInDate },
      { label: 'Check-out', value: checkOutDate },
      { label: 'Guests', value: guests },
      { label: 'Phone', value: phone },
    ]
    if (specialRequests) {
      guestDetailRows.push({ label: 'Special Requests', value: specialRequests })
    }

    const { html: guestHtmlContent, text: guestTextContent } = renderEmail({
      preheader: `Your stay request for ${roomName} (${checkInDate} – ${checkOutDate}) has been received.`,
      eyebrow: 'Kallmi Estate',
      title: 'Booking Request Received',
      greeting: `Dear ${name},`,
      intro:
        "Thank you for choosing Kallmi Estate. We have received your booking request and our team will review it shortly. Please await confirmation — we'll get back to you within 24 hours.",
      details: { heading: 'Your Booking Details', rows: guestDetailRows },
      outro: 'We look forward to welcoming you.',
      signature: 'The Kallmi Estate Team',
      footerWordmark: 'KALLMI ESTATE',
      showTrustLine: true,
    })

    // Email content for the owner
    const ownerDetailRows = [
      { label: 'Guest', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Room', value: roomName },
      { label: 'Check-in', value: checkInDate },
      { label: 'Check-out', value: checkOutDate },
      { label: 'Guests', value: guests },
    ]
    if (specialRequests) {
      ownerDetailRows.push({ label: 'Special Requests', value: specialRequests })
    }

    const { html: ownerHtmlContent, text: ownerTextContent } = renderEmail({
      preheader: `New booking: ${name} — ${roomName}.`,
      eyebrow: 'New Booking',
      title: roomName,
      intro: `New booking request from ${name}.`,
      details: { heading: 'Stay Details', rows: ownerDetailRows },
      cta: {
        label: 'Reply to Guest',
        href: `mailto:${email}?subject=Booking Confirmation - Kallmi Estate - ${roomName}`,
      },
      footerWordmark: 'KALLMI ESTATE',
    })

    // Send emails using Mailjet v3.1
    const mailjetData = {
      Messages: [
        {
          From: {
            Email: "reservations@kallmibukur.al",
            Name: "Kallmi Estate"
          },
          To: [
            {
              Email: email,
              Name: name
            }
          ],
          Subject: "Booking Confirmation - Kallmi Estate",
          HTMLPart: guestHtmlContent,
          TextPart: guestTextContent
        },
        {
          From: {
            Email: "reservations@kallmibukur.al",
            Name: "Kallmi Estate Bookings"
          },
          To: [
            {
              Email: "reservations@kallmibukur.al",
              Name: "Kallmi Estate"
            }
          ],
          Subject: `New Booking Request - ${name} - ${roomName}`,
          HTMLPart: ownerHtmlContent,
          TextPart: ownerTextContent
        }
      ]
    }

    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request(mailjetData)

    if (result.response.status === 200) {
      return NextResponse.json(
        {
          success: true,
          message: 'Booking request sent successfully! Check your email for confirmation.'
        },
        { status: 200 }
      )
    } else {
      console.error('Mailjet API error:', result.response)
      return NextResponse.json(
        { error: 'Failed to send booking confirmation' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
