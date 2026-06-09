import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { createBookingCalendarEvent } from '@/lib/google-calendar'
import { renderEmail } from '@/lib/email-template'
import Mailjet from 'node-mailjet'

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_API_SECRET || ''
)

export async function POST(request: Request) {
  try {
    // Verify auth via cookie-based client
    const authClient = await createSupabaseServerClient()
    const { data: { user } } = await authClient.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
    if (!adminEmails.includes(user.email?.toLowerCase() || '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
    }

    // Use service role client for DB operations (bypasses RLS)
    const admin = getSupabaseAdmin()
    const { data, error: fetchError } = await admin
      .from('stay_bookings')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !data) {
      console.error('Fetch booking error:', fetchError)
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const booking: Record<string, string> = data as Record<string, string>

    if (booking.status === 'confirmed') {
      return NextResponse.json({ error: 'Already confirmed' }, { status: 400 })
    }

    if (booking.status !== 'awaiting_payment') {
      return NextResponse.json({ error: 'Booking must be in awaiting_payment status. Request payment first.' }, { status: 400 })
    }

    // Update status
    const { error: updateError } = await admin
      .from('stay_bookings')
      .update({ status: 'confirmed' })
      .eq('id', id)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
    }

    // Format dates for email
    const checkInDate = new Date(booking.check_in).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
    const checkOutDate = new Date(booking.check_out).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    // Confirmation email to guest
    const guestDetailRows = [
      { label: 'Room', value: booking.room_name },
      { label: 'Check-in', value: checkInDate },
      { label: 'Check-out', value: checkOutDate },
      { label: 'Guests', value: String(booking.guests) },
    ]

    const { html: guestHtmlContent, text: guestTextContent } = renderEmail({
      preheader: `Your stay at ${booking.room_name} (${checkInDate} – ${checkOutDate}) is confirmed.`,
      eyebrow: 'Kallmi Estate',
      title: 'Booking Confirmed',
      greeting: `Dear ${booking.name},`,
      introHtml:
        'Great news — your booking at Kallmi Estate has been <strong>confirmed</strong>. We are looking forward to welcoming you.',
      details: { heading: 'Your Confirmed Booking', rows: guestDetailRows },
      outro:
        'If you have any questions before your stay, simply reply to this email.',
      signature: 'The Kallmi Estate Team',
      footerWordmark: 'KALLMI ESTATE',
      showTrustLine: true,
    })

    // Notification email to owner
    const ownerDetailRows = [
      { label: 'Guest', value: booking.name },
      { label: 'Email', value: booking.email },
      { label: 'Phone', value: booking.phone },
      { label: 'Room', value: booking.room_name },
      { label: 'Check-in', value: checkInDate },
      { label: 'Check-out', value: checkOutDate },
      { label: 'Guests', value: String(booking.guests) },
    ]
    if (booking.special_requests) {
      ownerDetailRows.push({ label: 'Special Requests', value: booking.special_requests })
    }

    const { html: ownerHtmlContent, text: ownerTextContent } = renderEmail({
      preheader: `Confirmed: ${booking.name} — ${booking.room_name}.`,
      eyebrow: 'Booking Confirmed',
      title: `${booking.room_name}`,
      intro: `This booking has been confirmed by ${user.email}.`,
      details: { heading: 'Booking Details', rows: ownerDetailRows },
      footerWordmark: 'KALLMI ESTATE',
    })

    try {
      await mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: { Email: 'reservations@kallmibukur.al', Name: 'Kallmi Estate' },
              To: [{ Email: booking.email, Name: booking.name }],
              Subject: `Booking Confirmed - Kallmi Estate - ${booking.room_name}`,
              HTMLPart: guestHtmlContent,
              TextPart: guestTextContent,
            },
            {
              From: { Email: 'reservations@kallmibukur.al', Name: 'Kallmi Estate Bookings' },
              To: [{ Email: 'reservations@kallmibukur.al', Name: 'Kallmi Estate' }],
              Subject: `Booking Confirmed - ${booking.name} - ${booking.room_name}`,
              HTMLPart: ownerHtmlContent,
              TextPart: ownerTextContent,
            },
          ],
        })
    } catch (emailErr) {
      console.error('Confirmation email failed:', emailErr)
    }

    // Create Google Calendar event for the confirmed booking
    try {
      const calendarEvent = await createBookingCalendarEvent(booking as unknown as Parameters<typeof createBookingCalendarEvent>[0])
      if (calendarEvent) {
        console.log('Google Calendar event created:', calendarEvent.id)
      } else {
        console.warn('Google Calendar event not created (env vars missing or returned null)')
      }
    } catch (calendarErr) {
      console.error('Google Calendar event creation failed:', calendarErr instanceof Error ? calendarErr.message : calendarErr)
    }

    return NextResponse.json({ success: true, message: 'Booking confirmed and emails sent' })
  } catch (error) {
    console.error('Confirm booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
