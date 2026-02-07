import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Mailjet from 'node-mailjet'

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
                    <p style="margin: 0 0 8px 0; font-size: 13px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase;">Kallmi Restaurant</p>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 300; color: #ffffff; letter-spacing: 1px;">Reservation Request Received</h1>
                    <div style="width: 60px; height: 1px; background-color: #D4AF37; margin: 20px auto 0;"></div>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td style="padding: 40px 40px 20px;">
                    <p style="margin: 0 0 16px; font-size: 18px; color: #8B7355;">Dear ${name},</p>
                    <p style="margin: 0; font-size: 15px; color: #666; line-height: 1.7;">Thank you for choosing Kallmi Restaurant. We have received your reservation request and our team will review it shortly. Please await confirmation — we'll get back to you within 24 hours.</p>
                  </td>
                </tr>

                <!-- Reservation Details -->
                <tr>
                  <td style="padding: 10px 40px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; border: 1px solid #ece6dd;">
                      <tr>
                        <td style="padding: 24px 28px 12px;">
                          <p style="margin: 0 0 16px; font-size: 11px; letter-spacing: 3px; color: #8B7355; text-transform: uppercase; font-weight: bold;">Your Reservation Details</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 28px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #ece6dd;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="50%" style="vertical-align: top;">
                                      <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Date</span><br>
                                      <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${reservationDate}</span>
                                    </td>
                                    <td width="50%" style="vertical-align: top;">
                                      <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Time</span><br>
                                      <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${displayTime}</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #ece6dd;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="50%" style="vertical-align: top;">
                                      <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Guests</span><br>
                                      <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${guests}</span>
                                    </td>
                                    <td width="50%" style="vertical-align: top;">
                                      <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Phone</span><br>
                                      <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block;">${phone}</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            ${specialRequests ? `
                            <tr>
                              <td style="padding: 12px 0;">
                                <span style="font-size: 12px; color: #8B7355; text-transform: uppercase; letter-spacing: 1px;">Special Requests</span><br>
                                <span style="font-size: 15px; color: #333; margin-top: 4px; display: inline-block; font-style: italic;">${specialRequests}</span>
                              </td>
                            </tr>
                            ` : ''}
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
                    <p style="margin: 0; font-size: 12px; color: #999;">Rruga Currila, Durrës, Albania</p>
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

    // Email content for the owner
    const ownerHtmlContent = `
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
                  <td style="background: linear-gradient(135deg, #8B7355 0%, #6B563F 100%); padding: 36px 40px; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; letter-spacing: 4px; color: #D4AF37; text-transform: uppercase;">New Restaurant Reservation</p>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 300; color: #ffffff;">${reservationDate} at ${displayTime}</h1>
                    <div style="width: 60px; height: 1px; background-color: #D4AF37; margin: 16px auto 0;"></div>
                  </td>
                </tr>

                <!-- Guest Info -->
                <tr>
                  <td style="padding: 32px 40px 16px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; border: 1px solid #ece6dd;">
                      <tr>
                        <td style="padding: 20px 24px 8px;">
                          <p style="margin: 0; font-size: 11px; letter-spacing: 3px; color: #8B7355; text-transform: uppercase; font-weight: bold;">Guest Information</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 24px 20px;">
                          <p style="margin: 0 0 4px; font-size: 20px; color: #333;">${name}</p>
                          <p style="margin: 0 0 2px; font-size: 14px; color: #666;">
                            <a href="mailto:${email}" style="color: #8B7355; text-decoration: none;">${email}</a>
                          </p>
                          <p style="margin: 0; font-size: 14px; color: #666;">
                            <a href="tel:${phone}" style="color: #8B7355; text-decoration: none;">${phone}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Reservation Details -->
                <tr>
                  <td style="padding: 8px 40px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #faf8f5; border-radius: 12px; border: 1px solid #ece6dd;">
                      <tr>
                        <td style="padding: 20px 24px 8px;">
                          <p style="margin: 0; font-size: 11px; letter-spacing: 3px; color: #8B7355; text-transform: uppercase; font-weight: bold;">Reservation Details</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="33%" style="padding: 8px 0; vertical-align: top;">
                                <span style="font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Date</span><br>
                                <span style="font-size: 15px; color: #333;">${reservationDate}</span>
                              </td>
                              <td width="33%" style="padding: 8px 0; vertical-align: top;">
                                <span style="font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Time</span><br>
                                <span style="font-size: 15px; color: #333;">${displayTime}</span>
                              </td>
                              <td width="33%" style="padding: 8px 0; vertical-align: top;">
                                <span style="font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Guests</span><br>
                                <span style="font-size: 15px; color: #333;">${guests}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${specialRequests ? `
                      <tr>
                        <td style="padding: 4px 24px 20px;">
                          <span style="font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Special Requests</span><br>
                          <span style="font-size: 14px; color: #333; font-style: italic; line-height: 1.6; display: inline-block; margin-top: 4px;">${specialRequests}</span>
                        </td>
                      </tr>
                      ` : '<tr><td style="padding: 0 0 12px;"></td></tr>'}
                    </table>
                  </td>
                </tr>

                <!-- Action -->
                <tr>
                  <td style="padding: 0 40px 32px; text-align: center;">
                    <a href="mailto:${email}?subject=Reservation Confirmation - Kallmi Restaurant - ${reservationDate}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #8B7355 0%, #A0845C 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; letter-spacing: 1px;">Reply to Guest</a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #faf8f5; padding: 20px 40px; text-align: center; border-top: 1px solid #ece6dd;">
                    <p style="margin: 0; font-size: 12px; color: #999;">Kallmi Restaurant Reservation System</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    // Send emails using Mailjet v3.1
    const mailjetData = {
      Messages: [
        {
          From: {
            Email: "kallmibukur@gmail.com",
            Name: "Kallmi Restaurant"
          },
          To: [
            {
              Email: email,
              Name: name
            }
          ],
          Subject: "Reservation Request - Kallmi Restaurant",
          HTMLPart: guestHtmlContent
        },
        {
          From: {
            Email: "kallmibukur@gmail.com",
            Name: "Kallmi Restaurant Reservations"
          },
          To: [
            {
              Email: "reservations@kallmibukur.al",
              Name: "Kallmi Restaurant"
            }
          ],
          Subject: `New Restaurant Reservation - ${name} - ${reservationDate} ${displayTime}`,
          HTMLPart: ownerHtmlContent
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
