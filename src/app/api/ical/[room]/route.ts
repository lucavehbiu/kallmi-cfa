import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { listRoomEvents } from '@/lib/google-calendar'

/**
 * Site → Booking.com. Per-room iCal export of direct bookings, built from the
 * Google Calendar. Booking.com imports these URLs under Sync calendars:
 *
 *   /api/ical/west?token=ICAL_FEED_TOKEN
 *   /api/ical/east?token=ICAL_FEED_TOKEN
 */

const ROOMS: Record<string, { id: string; name: string }> = {
  west: { id: '1', name: 'West Room' },
  east: { id: '2', name: 'East Room' },
}

function icsDate(date: string): string {
  return date.replace(/-/g, '')
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ room: string }> }) {
  const { room } = await params
  const target = ROOMS[room]
  if (!target) return NextResponse.json({ error: 'Unknown room' }, { status: 404 })

  const token = process.env.ICAL_FEED_TOKEN
  if (!token || request.nextUrl.searchParams.get('token') !== token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const today = new Date()
  const from = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1))
  const to = new Date(Date.UTC(today.getUTCFullYear() + 2, today.getUTCMonth(), 1))
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  let events
  try {
    events = await listRoomEvents(fmt(from), fmt(to))
  } catch (err) {
    console.error('iCal export failed:', err)
    return NextResponse.json({ error: 'Calendar unavailable' }, { status: 503 })
  }

  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kallmi Estate//Direct bookings//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Kallmi Estate ${target.name}`,
  ]
  for (const ev of events) {
    if (!ev.roomIds.includes(target.id)) continue
    lines.push(
      'BEGIN:VEVENT',
      `UID:${ev.id}-${room}@kallmibukur.al`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(ev.start)}`,
      `DTEND;VALUE=DATE:${icsDate(ev.end)}`,
      `SUMMARY:${escapeText('Booked - Kallmi Estate website')}`,
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')

  return new NextResponse(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="kallmi-${room}.ics"`,
      'Cache-Control': 'private, max-age=300',
    },
  })
}
