import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Mailjet from 'node-mailjet'

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
    const guestHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8B7355; color: white; padding: 30px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .booking-details { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-label { font-weight: bold; color: #8B7355; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmation</h1>
            <p>Kallmi Estate</p>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for choosing Kallmi Estate! We're delighted to confirm your booking.</p>

            <div class="booking-details">
              <h2 style="color: #8B7355; margin-top: 0;">Booking Details</h2>
              <div class="detail-row">
                <span class="detail-label">Guest Name:</span>
                <span>${name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span>${email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span>${phone}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Room:</span>
                <span>${roomName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Number of Guests:</span>
                <span>${guests}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Check-in:</span>
                <span>${checkInDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Check-out:</span>
                <span>${checkOutDate}</span>
              </div>
              ${specialRequests ? `
              <div class="detail-row">
                <span class="detail-label">Special Requests:</span>
                <span>${specialRequests}</span>
              </div>
              ` : ''}
            </div>

            <p>We will be in touch shortly to confirm your reservation and provide additional details about your stay.</p>
            <p>If you have any questions in the meantime, please don't hesitate to contact us at stay@kallmiestate.com</p>
            <p>We look forward to welcoming you to Kallmi Estate!</p>
            <p style="margin-top: 30px;">Warm regards,<br>The Kallmi Estate Team</p>
          </div>
          <div class="footer">
            <p>Kallmi Estate | Albanian Riviera</p>
            <p>stay@kallmiestate.com | www.kallmiestate.com</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Email content for the owner
    const ownerHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #8B7355; color: white; padding: 20px; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .booking-details { background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
          .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #8B7355; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Booking Request - Kallmi Estate</h2>
          </div>
          <div class="content">
            <p><strong>A new booking request has been received:</strong></p>

            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Guest Name:</span> ${name}
              </div>
              <div class="detail-row">
                <span class="label">Email:</span> ${email}
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span> ${phone}
              </div>
              <div class="detail-row">
                <span class="label">Room:</span> ${roomName}
              </div>
              <div class="detail-row">
                <span class="label">Number of Guests:</span> ${guests}
              </div>
              <div class="detail-row">
                <span class="label">Check-in:</span> ${checkInDate}
              </div>
              <div class="detail-row">
                <span class="label">Check-out:</span> ${checkOutDate}
              </div>
              ${specialRequests ? `
              <div class="detail-row">
                <span class="label">Special Requests:</span> ${specialRequests}
              </div>
              ` : ''}
            </div>

            <p style="margin-top: 20px;"><em>Please follow up with the guest to confirm their reservation.</em></p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send emails using Mailjet v3.1
    const mailjetData = {
      Messages: [
        {
          From: {
            Email: "kallmibukur@gmail.com",
            Name: "Kallmi Estate"
          },
          To: [
            {
              Email: email,
              Name: name
            }
          ],
          Subject: "Booking Confirmation - Kallmi Estate",
          HTMLPart: guestHtmlContent
        },
        {
          From: {
            Email: "kallmibukur@gmail.com",
            Name: "Kallmi Estate Bookings"
          },
          To: [
            {
              Email: "kallmibukur@gmail.com",
              Name: "Kallmi Estate"
            }
          ],
          Subject: `New Booking Request - ${name} - ${roomName}`,
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
