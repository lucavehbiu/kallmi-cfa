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

interface BookedDateEntry {
  date: string   // YYYY-MM-DD
  roomId: string // "1" (West) or "2" (East)
}

export async function getBookedDates(startDate: string, endDate: string): Promise<BookedDateEntry[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!calendarId || !serviceAccountEmail || !privateKey) {
    console.warn('Google Calendar env vars not configured, skipping availability check')
    return []
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  })

  const calendar = google.calendar({ version: 'v3', auth })

  const response = await calendar.events.list({
    calendarId,
    timeMin: `${startDate}T00:00:00Z`,
    timeMax: `${endDate}T23:59:59Z`,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 250,
  })

  const events = response.data.items || []
  const entries: BookedDateEntry[] = []

  for (const event of events) {
    const summary = (event.summary || '').toLowerCase()

    // Determine which rooms this event covers
    // A "Both Rooms" booking has BOTH "west" and "east" in the title
    const roomIds: string[] = []
    if (summary.includes('west')) roomIds.push('1')
    if (summary.includes('east')) roomIds.push('2')

    // If no room can be determined, skip this event
    if (roomIds.length === 0) continue

    // Get date range from event
    const eventStart = event.start?.date || event.start?.dateTime?.split('T')[0]
    const eventEnd = event.end?.date || event.end?.dateTime?.split('T')[0]
    if (!eventStart || !eventEnd) continue

    // Generate all dates in the range [start, end) — end date is exclusive for all-day events
    const current = new Date(eventStart + 'T12:00:00Z')
    const end = new Date(eventEnd + 'T12:00:00Z')

    while (current < end) {
      const dateStr = current.toISOString().split('T')[0]
      for (const roomId of roomIds) {
        entries.push({ date: dateStr, roomId })
      }
      current.setUTCDate(current.getUTCDate() + 1)
    }
  }

  return entries
}
