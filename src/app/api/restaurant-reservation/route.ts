import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Mailjet from 'node-mailjet'
import { supabase } from '@/lib/supabase'
import { renderEmail } from '@/lib/email-template'

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_API_SECRET || ''
)

interface ReservationData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  specialRequests?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ReservationData = await request.json()
    const { name, email, phone, date, time, guests, specialRequests } = body

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !guests) {
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

    // Insert into Supabase (graceful degradation - don't block email if this fails)
    try {
      const { error: dbError } = await supabase
        .from('restaurant_reservations')
        .insert({
          name,
          email,
          phone,
          reservation_date: date,
          reservation_time: time,
          guests: parseInt(guests) || 1,
          special_requests: specialRequests || null,
          status: 'pending',
        })

      if (dbError) {
        console.error('Supabase insert error (restaurant_reservations):', dbError)
      }
    } catch (dbErr) {
      console.error('Supabase connection error (restaurant_reservations):', dbErr)
    }

    // Format date for display
    const reservationDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Format time for display (convert 24h to 12h)
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    const displayTime = `${displayHour}:${minutes} ${ampm}`

    // Email content for the guest
    const guestDetailRows = [
      { label: 'Date', value: reservationDate },
      { label: 'Time', value: displayTime },
      { label: 'Guests', value: guests },
      { label: 'Phone', value: phone },
    ]
    if (specialRequests) {
      guestDetailRows.push({ label: 'Special Requests', value: specialRequests })
    }

    const { html: guestHtmlContent, text: guestTextContent } = renderEmail({
      preheader: `Your table request for ${reservationDate} at ${displayTime} has been received.`,
      eyebrow: 'Kallmi Restaurant',
      title: 'Reservation Request Received',
      greeting: `Dear ${name},`,
      intro:
        "Thank you for choosing Kallmi Restaurant. We have received your reservation request and our team will review it shortly. Please await confirmation — we'll get back to you within 24 hours.",
      details: { heading: 'Your Reservation Details', rows: guestDetailRows },
      outro: 'We look forward to welcoming you.',
      signature: 'The Kallmi Restaurant Team',
      footerWordmark: 'KALLMI RESTAURANT',
      showTrustLine: true,
    })

    // Email content for the owner
    const ownerDetailRows = [
      { label: 'Guest', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone },
      { label: 'Date', value: reservationDate },
      { label: 'Time', value: displayTime },
      { label: 'Guests', value: guests },
    ]
    if (specialRequests) {
      ownerDetailRows.push({ label: 'Special Requests', value: specialRequests })
    }

    const { html: ownerHtmlContent, text: ownerTextContent } = renderEmail({
      preheader: `New reservation: ${name} — ${reservationDate} at ${displayTime}.`,
      eyebrow: 'New Restaurant Reservation',
      title: `${reservationDate} at ${displayTime}`,
      intro: `New reservation request from ${name}.`,
      details: { heading: 'Reservation Details', rows: ownerDetailRows },
      cta: {
        label: 'Reply to Guest',
        href: `mailto:${email}?subject=Reservation Confirmation - Kallmi Restaurant - ${reservationDate}`,
      },
      footerWordmark: 'KALLMI RESTAURANT',
    })

    // Send emails using Mailjet v3.1
    const mailjetData = {
      Messages: [
        {
          From: {
            Email: "reservations@kallmibukur.al",
            Name: "Kallmi Restaurant"
          },
          To: [
            {
              Email: email,
              Name: name
            }
          ],
          Subject: "Reservation Request - Kallmi Restaurant",
          HTMLPart: guestHtmlContent,
          TextPart: guestTextContent
        },
        {
          From: {
            Email: "reservations@kallmibukur.al",
            Name: "Kallmi Restaurant Reservations"
          },
          To: [
            {
              Email: "reservations@kallmibukur.al",
              Name: "Kallmi Restaurant"
            }
          ],
          Subject: `New Restaurant Reservation - ${name} - ${reservationDate} ${displayTime}`,
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
          message: 'Reservation request sent successfully! Check your email for confirmation.'
        },
        { status: 200 }
      )
    } else {
      console.error('Mailjet API error:', result.response)
      return NextResponse.json(
        { error: 'Failed to send reservation confirmation' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Restaurant reservation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
