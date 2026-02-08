import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { calculateStayTotal } from '@/lib/pricing'
import { getSeasonalRates } from '@/lib/get-rates'
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
                  <td style="background: linear-gradient(135deg, #8B7355 0%, #6B563F 100%); padding: 48px 40px; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase;">Kallmi Estate</p>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #ffffff; letter-spacing: 1px;">Payment Required</h1>
                    <div style="width: 60px; height: 1px; background-color: #D4AF37; margin: 20px auto 0;"></div>
                  </td>
                </tr>
                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 20px;">
                    <p style="margin: 0 0 16px; font-size: 18px; color: #8B7355;">Dear ${booking.name},</p>
                    <p style="margin: 0; font-size: 15px; color: #666; line-height: 1.7;">Thank you for your booking request at Kallmi Estate! To secure your reservation, we require a <strong style="color: #8B7355;">50% deposit</strong> to be sent via Western Union.</p>
                  </td>
                </tr>
                <!-- Booking Summary -->
                <tr>
                  <td style="padding: 10px 40px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; border: 1px solid #ece6dd;">
                      <tr>
                        <td style="padding: 24px 28px 12px;">
                          <p style="margin: 0 0 16px; font-size: 11px; letter-spacing: 3px; color: #8B7355; text-transform: uppercase; font-weight: bold;">Booking Summary</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 28px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #ece6dd;">
                                <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Room</span><br>
                                <span style="font-size: 15px; color: #333;">${booking.room_name}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #ece6dd;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="50%">
                                      <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Check-in</span><br>
                                      <span style="font-size: 15px; color: #333;">${checkInDate}</span>
                                    </td>
                                    <td width="50%">
                                      <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Check-out</span><br>
                                      <span style="font-size: 15px; color: #333;">${checkOutDate}</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #ece6dd;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="50%">
                                      <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Nights</span><br>
                                      <span style="font-size: 15px; color: #333;">${nights}</span>
                                    </td>
                                    <td width="50%">
                                      <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Total Stay</span><br>
                                      <span style="font-size: 20px; color: #333; font-weight: bold;">&euro;${totalAmount}</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr><td style="padding: 0 0 16px;"></td></tr>
                    </table>
                  </td>
                </tr>
                <!-- Payment Box -->
                <tr>
                  <td style="padding: 0 40px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff8e1; border-radius: 12px; border: 2px solid #D4AF37;">
                      <tr>
                        <td style="padding: 28px;">
                          <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 3px; color: #8B7355; text-transform: uppercase; font-weight: bold;">Deposit Required</p>
                          <p style="margin: 0 0 20px; font-size: 36px; color: #333; font-weight: bold;">&euro;${depositAmount}</p>
                          <p style="margin: 0 0 16px; font-size: 15px; color: #666; line-height: 1.7;">Please send the deposit via <strong style="color: #333;">Western Union</strong> to:</p>
                          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #ece6dd;">
                            <tr>
                              <td style="padding: 20px;">
                                <p style="margin: 0 0 4px; font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Recipient Name</p>
                                <p style="margin: 0 0 16px; font-size: 18px; color: #333; font-weight: bold;">Eldi Vehbiu</p>
                                <p style="margin: 0 0 4px; font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Payment Type</p>
                                <p style="margin: 0 0 16px; font-size: 15px; color: #333;">Cash pickup (physical person)</p>
                                <p style="margin: 0 0 4px; font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Country</p>
                                <p style="margin: 0; font-size: 15px; color: #333;">Albania</p>
                              </td>
                            </tr>
                          </table>
                          <p style="margin: 16px 0 0; font-size: 13px; color: #999; line-height: 1.6;">After sending the payment, please reply to this email with the <strong>MTCN tracking number</strong> so we can confirm receipt.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Contact -->
                <tr>
                  <td style="padding: 0 40px 40px;">
                    <p style="margin: 0 0 8px; font-size: 15px; color: #666; line-height: 1.7;">If you have any questions, please contact us at <a href="mailto:reservations@kallmibukur.al" style="color: #8B7355; text-decoration: none; font-weight: bold;">reservations@kallmibukur.al</a></p>
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

    // Notification to owner
    const ownerHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin: 0; padding: 0; background-color: #f5f0eb; font-family: Georgia, 'Times New Roman', serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f0eb; padding: 40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(139, 115, 85, 0.12);">
              <tr>
                <td style="background: linear-gradient(135deg, #8B7355 0%, #6B563F 100%); padding: 36px 40px; text-align: center;">
                  <p style="margin: 0 0 8px 0; font-size: 13px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase;">Payment Requested</p>
                  <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #ffffff;">${booking.room_name} - ${booking.name}</h1>
                  <div style="width: 60px; height: 1px; background-color: #D4AF37; margin: 16px auto 0;"></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 32px 40px;">
                  <p style="margin: 0 0 16px; font-size: 15px; color: #666;">Payment request sent by <strong>${user.email}</strong>:</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff8e1; border-radius: 12px; border: 1px solid #D4AF37;">
                    <tr><td style="padding: 20px 24px;">
                      <p style="margin: 0 0 4px; font-size: 18px; color: #333;"><strong>${booking.name}</strong></p>
                      <p style="margin: 0 0 2px; font-size: 14px; color: #666;">${booking.email} &middot; ${booking.phone}</p>
                      <p style="margin: 12px 0 0; font-size: 14px; color: #333;">${booking.room_name} &middot; ${nights} nights &middot; ${booking.guests} guests</p>
                      <p style="margin: 4px 0 0; font-size: 14px; color: #333;">${checkInDate} &rarr; ${checkOutDate}</p>
                      <p style="margin: 12px 0 0; font-size: 20px; color: #333;"><strong>Total: &euro;${totalAmount}</strong> &middot; Deposit: <strong>&euro;${depositAmount}</strong></p>
                    </td></tr>
                  </table>
                  <p style="margin: 16px 0 0; font-size: 14px; color: #666;">Guest has been asked to send &euro;${depositAmount} via Western Union to Eldi Vehbiu. Once payment is received, confirm the booking in the admin dashboard.</p>
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
              Subject: `Payment Required - Kallmi Estate - ${booking.room_name}`,
              HTMLPart: guestHtmlContent,
            },
            {
              From: { Email: 'kallmibukur@gmail.com', Name: 'Kallmi Estate Bookings' },
              To: [{ Email: 'reservations@kallmibukur.al', Name: 'Kallmi Estate' }],
              Subject: `Payment Requested - ${booking.name} - €${depositAmount} deposit`,
              HTMLPart: ownerHtmlContent,
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
