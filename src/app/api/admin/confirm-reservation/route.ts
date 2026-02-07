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
      return NextResponse.json({ error: 'Reservation ID required' }, { status: 400 })
    }

    // Use service role client for DB operations (bypasses RLS)
    const admin = getSupabaseAdmin()
    const { data: reservation, error: fetchError } = await admin
      .from('restaurant_reservations')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !reservation) {
      console.error('Fetch reservation error:', fetchError)
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 })
    }

    if (reservation.status === 'confirmed') {
      return NextResponse.json({ error: 'Already confirmed' }, { status: 400 })
    }

    // Update status
    const { error: updateError } = await admin
      .from('restaurant_reservations')
      .update({ status: 'confirmed' })
      .eq('id', id)

    if (updateError) {
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
                    <p style="margin: 0 0 8px 0; font-size: 13px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase;">Kallmi Restaurant</p>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #ffffff; letter-spacing: 1px;">Reservation Confirmed!</h1>
                    <div style="width: 60px; height: 1px; background-color: #D4AF37; margin: 20px auto 0;"></div>
                  </td>
                </tr>
                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 20px;">
                    <p style="margin: 0 0 16px; font-size: 18px; color: #2d6a4f;">Dear ${reservation.name},</p>
                    <p style="margin: 0; font-size: 15px; color: #666; line-height: 1.7;">Great news! Your reservation at Kallmi Restaurant has been <strong style="color: #2d6a4f;">confirmed</strong>. We are looking forward to welcoming you.</p>
                  </td>
                </tr>
                <!-- Reservation Details -->
                <tr>
                  <td style="padding: 10px 40px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
                      <tr>
                        <td style="padding: 24px 28px 12px;">
                          <p style="margin: 0 0 16px; font-size: 11px; letter-spacing: 3px; color: #2d6a4f; text-transform: uppercase; font-weight: bold;">Your Confirmed Reservation</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 28px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #dcfce7;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="50%" style="vertical-align: top;">
                                      <span style="font-size: 12px; color: #2d6a4f; text-transform: uppercase; letter-spacing: 1px;">Date</span><br>
                                      <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${reservationDate}</span>
                                    </td>
                                    <td width="50%" style="vertical-align: top;">
                                      <span style="font-size: 12px; color: #2d6a4f; text-transform: uppercase; letter-spacing: 1px;">Time</span><br>
                                      <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${displayTime}</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0;">
                                <span style="font-size: 12px; color: #2d6a4f; text-transform: uppercase; letter-spacing: 1px;">Guests</span><br>
                                <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${reservation.guests}</span>
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
                    <p style="margin: 0 0 8px; font-size: 15px; color: #666; line-height: 1.7;">If you have any questions, please contact us at <a href="mailto:reservations@kallmibukur.al" style="color: #8B7355; text-decoration: none; font-weight: bold;">reservations@kallmibukur.al</a> or call <a href="tel:+355682450851" style="color: #8B7355; text-decoration: none; font-weight: bold;">+355 68 24 50 851</a></p>
                    <p style="margin: 24px 0 0; font-size: 15px; color: #666;">We look forward to welcoming you!</p>
                    <p style="margin: 24px 0 0; font-size: 15px; color: #333;">Warm regards,<br><strong style="color: #8B7355;">The Kallmi Restaurant Team</strong></p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #faf8f5; padding: 24px 40px; text-align: center; border-top: 1px solid #ece6dd;">
                    <p style="margin: 0 0 4px; font-size: 13px; color: #8B7355; font-weight: bold; letter-spacing: 2px;">KALLMI RESTAURANT</p>
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
                  <p style="margin: 0 0 8px 0; font-size: 13px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase;">Reservation Confirmed</p>
                  <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #ffffff;">${reservationDate} at ${displayTime} - ${reservation.name}</h1>
                  <div style="width: 60px; height: 1px; background-color: #D4AF37; margin: 16px auto 0;"></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 32px 40px;">
                  <p style="margin: 0 0 16px; font-size: 15px; color: #666;">The following reservation has been confirmed by <strong>${user.email}</strong>:</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
                    <tr><td style="padding: 20px 24px;">
                      <p style="margin: 0 0 4px; font-size: 18px; color: #333;"><strong>${reservation.name}</strong></p>
                      <p style="margin: 0 0 2px; font-size: 14px; color: #666;">${reservation.email} &middot; ${reservation.phone}</p>
                      <p style="margin: 12px 0 0; font-size: 14px; color: #333;">${reservationDate} at ${displayTime} &middot; ${reservation.guests} guests</p>
                      ${reservation.special_requests ? `<p style="margin: 8px 0 0; font-size: 13px; color: #666; font-style: italic;">"${reservation.special_requests}"</p>` : ''}
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background-color: #faf8f5; padding: 20px 40px; text-align: center; border-top: 1px solid #ece6dd;">
                  <p style="margin: 0; font-size: 12px; color: #999;">Kallmi Restaurant Reservation System</p>
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
              From: { Email: 'kallmibukur@gmail.com', Name: 'Kallmi Restaurant' },
              To: [{ Email: reservation.email, Name: reservation.name }],
              Subject: `Reservation Confirmed - Kallmi Restaurant - ${reservationDate}`,
              HTMLPart: guestHtmlContent,
            },
            {
              From: { Email: 'kallmibukur@gmail.com', Name: 'Kallmi Restaurant Reservations' },
              To: [{ Email: 'reservations@kallmibukur.al', Name: 'Kallmi Restaurant' }],
              Subject: `Reservation Confirmed - ${reservation.name} - ${reservationDate} ${displayTime}`,
              HTMLPart: ownerHtmlContent,
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
