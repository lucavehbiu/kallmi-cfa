import { google } from 'googleapis'

interface BookingData {
  name: string
  email: string
  phone: string
  room_name: string
  check_in: string
  check_out: string
  guests: string | number
  special_requests?: string
}

function toDateString(dateValue: string): string {
  // Extract YYYY-MM-DD from any format (ISO timestamp, date string, etc.)
  // Avoid new Date() to prevent timezone shifts
  const match = dateValue.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (match) return match[0]
  // Fallback: parse and use UTC components
  const d = new Date(dateValue)
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export async function createBookingCalendarEvent(booking: BookingData) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!calendarId || !serviceAccountEmail || !privateKey) {
    console.warn('Google Calendar env vars not configured, skipping calendar event creation')
    return null
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  const calendar = google.calendar({ version: 'v3', auth })

  const checkIn = toDateString(booking.check_in)
  const checkOut = toDateString(booking.check_out)

  const descriptionParts = [
    `Guest: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Guests: ${booking.guests}`,
  ]
  if (booking.special_requests) {
    descriptionParts.push('')
    descriptionParts.push(`Note: ${booking.special_requests}`)
  }
  const description = descriptionParts.join('\n')

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `🏠 ${booking.room_name} - ${booking.name}`,
      description,
      start: {
        date: checkIn,
      },
      end: {
        date: checkOut,
      },
      colorId: '10', // Green (basil)
    },
  })

  return event.data
}
