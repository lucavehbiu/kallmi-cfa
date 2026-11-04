import { expandToDates, type BookedDateEntry } from './google-calendar'

/**
 * Booking.com → site. One iCal export feed per room, configured in the
 * extranet under Rates & availability → Sync calendars.
 *
 *   BOOKING_ICAL_URL_WEST  → room "1"
 *   BOOKING_ICAL_URL_EAST  → room "2"
 *
 * Feeds are fetched at most once per CACHE_TTL_MS per room (in-memory).
 */

const CACHE_TTL_MS = 15 * 60 * 1000

const ROOM_FEEDS: { roomId: string; envVar: string }[] = [
  { roomId: '1', envVar: 'BOOKING_ICAL_URL_WEST' },
  { roomId: '2', envVar: 'BOOKING_ICAL_URL_EAST' },
]

interface Range {
  start: string // YYYY-MM-DD inclusive
  end: string   // YYYY-MM-DD exclusive
}

const cache = new Map<string, { fetchedAt: number; ranges: Range[] }>()

function icalDate(block: string, field: string): string | null {
  // DTSTART;VALUE=DATE:20260215 | DTSTART:20260215T140000Z | DTSTART;TZID=...:20260215T140000
  const m = block.match(new RegExp(`${field}(?:;[^:\\r\\n]*)?:(\\d{4})(\\d{2})(\\d{2})`))
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null
}

export function parseICalRanges(text: string): Range[] {
  const ranges: Range[] = []
  const blocks = text.split('BEGIN:VEVENT').slice(1)
  for (const raw of blocks) {
    const block = raw.split('END:VEVENT')[0]
    const start = icalDate(block, 'DTSTART')
    const end = icalDate(block, 'DTEND') || start
    if (start && end) ranges.push({ start, end: end > start ? end : nextDay(start) })
  }
  return ranges
}

function nextDay(date: string): string {
  const d = new Date(date + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().split('T')[0]
}

async function fetchRoomRanges(roomId: string, url: string): Promise<Range[]> {
  const hit = cache.get(roomId)
  if (hit && Date.now() - hit.fetchedAt < CACHE_TTL_MS) return hit.ranges

  const res = await fetch(url, { headers: { 'User-Agent': 'KallmiEstate/1.0' }, cache: 'no-store' })
  if (!res.ok) throw new Error(`Booking.com iCal fetch failed for room ${roomId}: ${res.status}`)
  const ranges = parseICalRanges(await res.text())
  cache.set(roomId, { fetchedAt: Date.now(), ranges })
  return ranges
}

/** Dates blocked by Booking.com reservations, per room. Never throws: a failed feed logs and yields nothing. */
export async function getBookingComBookedDates(startDate: string, endDate: string): Promise<BookedDateEntry[]> {
  const perRoom = await Promise.all(
    ROOM_FEEDS.map(async ({ roomId, envVar }) => {
      const url = process.env[envVar]
      if (!url) return []
      try {
        const ranges = await fetchRoomRanges(roomId, url)
        return ranges
          .filter((r) => r.end > startDate && r.start <= endDate)
          .map((r) => ({ ...r, roomIds: [roomId] }))
      } catch (err) {
        console.error(err)
        const stale = cache.get(roomId)
        return stale ? stale.ranges.map((r) => ({ ...r, roomIds: [roomId] })) : []
      }
    })
  )
  return expandToDates(perRoom.flat())
}
