import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { getSql } from '@/lib/db'
import { renderEmail } from '@/lib/email-template'
import Mailjet from 'node-mailjet'

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_API_SECRET || ''
)

export async function POST(request: Request) {
  try {
    // Verify auth via Clerk
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await currentUser()
    const userEmail = user?.primaryEmailAddress?.emailAddress || ''
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
    if (!userEmail || !adminEmails.includes(userEmail.toLowerCase())) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Reservation ID required' }, { status: 400 })
    }

    const sql = getSql()
    const [data] = await sql`select * from restaurant_reservations where id = ${id}`.catch((fetchError) => {
      console.error('Fetch reservation error:', fetchError)
      return []
    })

    if (!data) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
    }

    const reservation: Record<string, string> = data as Record<string, string>

    if (reservation.status === 'confirmed') {
      return NextResponse.json({ error: 'Already confirmed' }, { status: 400 })
    }

    // Update status
    try {
      await sql`update restaurant_reservations set status = 'confirmed' where id = ${id}`
    } catch (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 })
    }

    // Format date for email
    const reservationDate = new Date(reservation.reservation_date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    // Format time
    const [hours, minutes] = reservation.reservation_time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    const displayTime = `${displayHour}:${minutes} ${ampm}`

    // Confirmation email to guest
    const guestDetailRows = [
      { label: 'Date', value: reservationDate },
      { label: 'Time', value: displayTime },
      { label: 'Guests', value: String(reservation.guests) },
    ]

    const { html: guestHtmlContent, text: guestTextContent } = renderEmail({
      preheader: `Your reservation for ${reservationDate} at ${displayTime} is confirmed.`,
      eyebrow: 'Kallmi Restaurant',
      title: 'Reservation Confirmed',
      greeting: `Dear ${reservation.name},`,
      introHtml:
        'Great news — your reservation at Kallmi Restaurant has been <strong>confirmed</strong>. We are looking forward to welcoming you.',
      details: { heading: 'Your Confirmed Reservation', rows: guestDetailRows },
      outro: 'We look forward to welcoming you.',
      signature: 'The Kallmi Restaurant Team',
      footerWordmark: 'KALLMI RESTAURANT',
      showTrustLine: true,
    })

    // Notification email to owner
    const ownerDetailRows = [
      { label: 'Guest', value: reservation.name },
      { label: 'Email', value: reservation.email },
      { label: 'Phone', value: reservation.phone },
      { label: 'Date', value: reservationDate },
      { label: 'Time', value: displayTime },
      { label: 'Guests', value: String(reservation.guests) },
    ]
    if (reservation.special_requests) {
      ownerDetailRows.push({ label: 'Special Requests', value: reservation.special_requests })
    }

    const { html: ownerHtmlContent, text: ownerTextContent } = renderEmail({
      preheader: `Confirmed: ${reservation.name} — ${reservationDate} at ${displayTime}.`,
      eyebrow: 'Reservation Confirmed',
      title: `${reservationDate} at ${displayTime}`,
      intro: `This reservation has been confirmed by ${userEmail}.`,
      details: { heading: 'Reservation Details', rows: ownerDetailRows },
      footerWordmark: 'KALLMI RESTAURANT',
    })

    try {
      await mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: { Email: 'reservations@kallmibukur.al', Name: 'Kallmi Restaurant' },
              To: [{ Email: reservation.email, Name: reservation.name }],
              Subject: `Reservation Confirmed - Kallmi Restaurant - ${reservationDate}`,
              HTMLPart: guestHtmlContent,
              TextPart: guestTextContent,
            },
            {
              From: { Email: 'reservations@kallmibukur.al', Name: 'Kallmi Restaurant Reservations' },
              To: [{ Email: 'reservations@kallmibukur.al', Name: 'Kallmi Restaurant' }],
              Subject: `Reservation Confirmed - ${reservation.name} - ${reservationDate} ${displayTime}`,
              HTMLPart: ownerHtmlContent,
              TextPart: ownerTextContent,
            },
          ],
        })
    } catch (emailErr) {
      console.error('Confirmation email failed:', emailErr)
    }

    return NextResponse.json({ success: true, message: 'Reservation confirmed and emails sent' })
  } catch (error) {
    console.error('Confirm reservation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
