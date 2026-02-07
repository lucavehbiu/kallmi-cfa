import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
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
    const { data: booking, error: fetchError } = await admin
      .from('stay_bookings')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !booking) {
      console.error('Fetch booking error:', fetchError)
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    if (booking.status === 'confirmed') {
      return NextResponse.json({ error: 'Already confirmed' }, { status: 400 })
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
    const guestHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f0eb; font-family: Georgia, 'Times New Roman', serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0eb; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(139, 115, 85, 0.12);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%); padding: 48px 40px; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase;">Kallmi Estate</p>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #ffffff; letter-spacing: 1px;">Booking Confirmed!</h1>
                    <div style="width: 60px; height: 1px; background-color: #D4AF37; margin: 20px auto 0;"></div>
                  </td>
                </tr>
                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 20px;">
                    <p style="margin: 0 0 16px; font-size: 18px; color: #2d6a4f;">Dear ${booking.name},</p>
                    <p style="margin: 0; font-size: 15px; color: #666; line-height: 1.7;">Great news! Your booking at Kallmi Estate has been <strong style="color: #2d6a4f;">confirmed</strong>. We are looking forward to welcoming you.</p>
                  </td>
                </tr>
                <!-- Booking Details -->
                <tr>
                  <td style="padding: 10px 40px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
                      <tr>
                        <td style="padding: 24px 28px 12px;">
                          <p style="margin: 0 0 16px; font-size: 11px; letter-spacing: 3px; color: #2d6a4f; text-transform: uppercase; font-weight: bold;">Your Confirmed Booking</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 28px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #dcfce7;">
                                <span style="font-size: 12px; color: #2d6a4f; text-transform: uppercase; letter-spacing: 1px;">Room</span><br>
                                <span style="font-size: 16px; color: #333; margin-top: 4px; display: inline-block;">${booking.room_name}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #dcfce7;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="50%" style="vertical-align: top;">
                                      <span style="font-size: 12px; color: #2d6a4f; text-transform: uppercase; letter-spacing: 1px;">Check-in</span><br>
                                      <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${checkInDate}</span>
                                    </td>
                                    <td width="50%" style="vertical-align: top;">
                                      <span style="font-size: 12px; color: #2d6a4f; text-transform: uppercase; letter-spacing: 1px;">Check-out</span><br>
                                      <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${checkOutDate}</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0;">
                                <span style="font-size: 12px; color: #2d6a4f; text-transform: uppercase; letter-spacing: 1px;">Guests</span><br>
                                <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${booking.guests}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr><td style="padding: 0 0 16px;"></td></tr>
                    </table>
                  </td>
                </tr>
                <!-- Contact Info -->
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <p style="margin: 0 0 8px; font-size: 15px; color: #666; line-height: 1.7;">If you have any questions before your stay, please contact us at <a href="mailto:reservations@kallmibukur.al" style="color: #8B7355; text-decoration: none; font-weight: bold;">reservations@kallmibukur.al</a></p>
                    <p style="margin: 24px 0 0; font-size: 15px; color: #666;">We look forward to welcoming you!</p>
                    <p style="margin: 24px 0 0; font-size: 15px; color: #333;">Warm regards,<br><strong style="color: #8B7355;">The Kallmi Estate Team</strong></p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #faf8f5; padding: 24px 40px; text-align: center; border-top: 1px solid #ece6dd;">
                    <p style="margin: 0 0 4px; font-size: 13px; color: #8B7355; font-weight: bold; letter-spacing: 2px;">KALLMI ESTATE</p>
                    <p style="margin: 0; font-size: 12px; color: #999;">Rruga Currila, Durres, Albania</p>
                    <p style="margin: 8px 0 0; font-size: 12px; color: #999;">
                      <a href="https://www.kallmibukur.al" style="color: #8B7355; text-decoration: none;">www.kallmibukur.al</a>
                      &nbsp;&middot;&nbsp;
                      <a href="mailto:reservations@kallmibukur.al" style="color: #8B7355; text-decoration: none;">reservations@kallmibukur.al</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    // Notification email to owner
    const ownerHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; background-color: #f5f0eb; font-family: Georgia, 'Times New Roman', serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0eb; padding: 40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(139, 115, 85, 0.12);">
              <tr>
                <td style="background: linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%); padding: 36px 40px; text-align: center;">
                  <p style="margin: 0 0 8px 0; font-size: 13px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase;">Booking Confirmed</p>
                  <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #ffffff;">${booking.room_name} - ${booking.name}</h1>
                  <div style="width: 60px; height: 1px; background-color: #D4AF37; margin: 16px auto 0;"></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 32px 40px;">
                  <p style="margin: 0 0 16px; font-size: 15px; color: #666;">The following booking has been confirmed by <strong>${user.email}</strong>:</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
                    <tr><td style="padding: 20px 24px;">
                      <p style="margin: 0 0 4px; font-size: 18px; color: #333;"><strong>${booking.name}</strong></p>
                      <p style="margin: 0 0 2px; font-size: 14px; color: #666;">${booking.email} &middot; ${booking.phone}</p>
                      <p style="margin: 12px 0 0; font-size: 14px; color: #333;">${booking.room_name} &middot; ${booking.guests} guests</p>
                      <p style="margin: 4px 0 0; font-size: 14px; color: #333;">${checkInDate} &rarr; ${checkOutDate}</p>
                      ${booking.special_requests ? `<p style="margin: 8px 0 0; font-size: 13px; color: #666; font-style: italic;">"${booking.special_requests}"</p>` : ''}
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background-color: #faf8f5; padding: 20px 40px; text-align: center; border-top: 1px solid #ece6dd;">
                  <p style="margin: 0; font-size: 12px; color: #999;">Kallmi Estate Booking System</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `

    try {
      await mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: { Email: 'kallmibukur@gmail.com', Name: 'Kallmi Estate' },
              To: [{ Email: booking.email, Name: booking.name }],
              Subject: `Booking Confirmed - Kallmi Estate - ${booking.room_name}`,
              HTMLPart: guestHtmlContent,
            },
            {
              From: { Email: 'kallmibukur@gmail.com', Name: 'Kallmi Estate Bookings' },
              To: [{ Email: 'reservations@kallmibukur.al', Name: 'Kallmi Estate' }],
              Subject: `Booking Confirmed - ${booking.name} - ${booking.room_name}`,
              HTMLPart: ownerHtmlContent,
            },
          ],
        })
    } catch (emailErr) {
      console.error('Confirmation email failed:', emailErr)
    }

    return NextResponse.json({ success: true, message: 'Booking confirmed and emails sent' })
  } catch (error) {
    console.error('Confirm booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
