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

  const description = [
    `Guest: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Guests: ${booking.guests}`,
    booking.special_requests ? `\nSpecial Requests: ${booking.special_requests}` : '',
  ].filter(Boolean).join('\n')

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `🏠 ${booking.room_name} - ${booking.name}`,
      description,
      start: {
        date: booking.check_in,
      },
      end: {
        date: booking.check_out,
      },
      colorId: '10', // Green (basil)
    },
  })

  return event.data
}
