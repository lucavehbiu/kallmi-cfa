import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { calculateStayTotal } from '@/lib/pricing'
import { getSeasonalRates } from '@/lib/get-rates'
import { renderEmail } from '@/lib/email-template'
import Mailjet from 'node-mailjet'

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_API_SECRET || ''
)

export async function POST(request: Request) {
  try {
    // Verify auth
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

    const admin = getSupabaseAdmin()
    const { data, error: fetchError } = await admin
      .from('stay_bookings')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !data) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const booking: Record<string, string> = data as Record<string, string>

    if (booking.status !== 'pending') {
      return NextResponse.json({ error: 'Booking is not in pending status' }, { status: 400 })
    }

    // Fetch seasonal rates from Supabase (falls back to hardcoded defaults)
    const rates = await getSeasonalRates()
    const { nights, totalAmount, depositAmount } = calculateStayTotal(booking.check_in, booking.check_out, rates)

    // Update status to awaiting_payment
    const { error: updateError } = await admin
      .from('stay_bookings')
      .update({ status: 'awaiting_payment' })
      .eq('id', id)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
    }

    // Format dates
    const checkInDate = new Date(booking.check_in).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
    const checkOutDate = new Date(booking.check_out).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    // Payment request email to guest
    const { html: guestHtmlContent, text: guestTextContent } = renderEmail({
      preheader: `A €${depositAmount} deposit is required to secure your stay at ${booking.room_name}.`,
      eyebrow: 'Kallmi Estate',
      title: 'Deposit Requested',
      greeting: `Dear ${booking.name},`,
      introHtml:
        'Thank you for your booking request at Kallmi Estate. To secure your reservation, we kindly ask for a <strong>50% deposit</strong>, sent via Western Union using the details below.',
      details: {
        heading: 'Booking Summary',
        rows: [
          { label: 'Room', value: booking.room_name },
          { label: 'Check-in', value: checkInDate },
          { label: 'Check-out', value: checkOutDate },
          { label: 'Nights', value: String(nights) },
          { label: 'Total Stay', value: `€${totalAmount}` },
        ],
      },
      highlight: { label: 'Deposit Required', value: `€${depositAmount}` },
      outroHtml:
        'Please send the deposit via <strong>Western Union</strong> to:' +
        '<br><br>' +
        '<strong>Recipient Name:</strong> Eldi Vehbiu' +
        '<br><strong>Payment Type:</strong> Cash pickup (physical person)' +
        '<br><strong>Country:</strong> Albania' +
        '<br><br>' +
        'After sending the payment, please reply to this email with the <strong>MTCN tracking number</strong> so we can confirm receipt.',
      signature: 'The Kallmi Estate Team',
      footerWordmark: 'KALLMI ESTATE',
      showTrustLine: true,
    })

    // Notification to owner
    const { html: ownerHtmlContent, text: ownerTextContent } = renderEmail({
      preheader: `Payment requested: ${booking.name} — €${depositAmount} deposit.`,
      eyebrow: 'Payment Requested',
      title: `${booking.room_name}`,
      intro: `Payment request sent by ${user.email}.`,
      details: {
        heading: 'Booking Details',
        rows: [
          { label: 'Guest', value: booking.name },
          { label: 'Email', value: booking.email },
          { label: 'Phone', value: booking.phone },
          { label: 'Room', value: booking.room_name },
          { label: 'Check-in', value: checkInDate },
          { label: 'Check-out', value: checkOutDate },
          { label: 'Nights', value: String(nights) },
          { label: 'Guests', value: String(booking.guests) },
          { label: 'Total', value: `€${totalAmount}` },
          { label: 'Deposit', value: `€${depositAmount}` },
        ],
      },
      highlight: { label: 'Deposit Requested', value: `€${depositAmount}` },
      outro: `Guest has been asked to send €${depositAmount} via Western Union to Eldi Vehbiu. Once payment is received, confirm the booking in the admin dashboard.`,
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
              Subject: `Payment Required - Kallmi Estate - ${booking.room_name}`,
              HTMLPart: guestHtmlContent,
              TextPart: guestTextContent,
            },
            {
              From: { Email: 'reservations@kallmibukur.al', Name: 'Kallmi Estate Bookings' },
              To: [{ Email: 'reservations@kallmibukur.al', Name: 'Kallmi Estate' }],
              Subject: `Payment Requested - ${booking.name} - €${depositAmount} deposit`,
              HTMLPart: ownerHtmlContent,
              TextPart: ownerTextContent,
            },
          ],
        })
    } catch (emailErr) {
      console.error('Payment request email failed:', emailErr)
    }

    return NextResponse.json({
      success: true,
      message: `Payment request sent. Deposit: €${depositAmount} (${nights} nights, total €${totalAmount})`,
    })
  } catch (error) {
    console.error('Request payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
