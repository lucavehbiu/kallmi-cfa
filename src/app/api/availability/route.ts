import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getBookedDates } from '@/lib/google-calendar'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month') // format: YYYY-MM

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return NextResponse.json(
        { error: 'Invalid month parameter. Use YYYY-MM format.' },
        { status: 400 }
      )
    }

    // Calculate date range: the full month plus 7 days buffer on each side
    // Buffer handles multi-night stays that start before or end after the month
    const [year, monthNum] = month.split('-').map(Number)
    const startDate = new Date(Date.UTC(year, monthNum - 1, 1))
    startDate.setUTCDate(startDate.getUTCDate() - 7)
    const endDate = new Date(Date.UTC(year, monthNum, 0)) // last day of month
    endDate.setUTCDate(endDate.getUTCDate() + 7)

    const startStr = startDate.toISOString().split('T')[0]
    const endStr = endDate.toISOString().split('T')[0]

    const bookedEntries = await getBookedDates(startStr, endStr)

    // Build a map: date -> array of booked room IDs
    const dateMap: Record<string, string[]> = {}
    for (const entry of bookedEntries) {
      if (!dateMap[entry.date]) {
        dateMap[entry.date] = []
      }
      if (!dateMap[entry.date].includes(entry.roomId)) {
        dateMap[entry.date].push(entry.roomId)
      }
    }

    return NextResponse.json(dateMap)
  } catch (error) {
    console.error('Availability check error:', error)
    // Graceful degradation: return empty map so no dates are blocked
    return NextResponse.json({})
  }
}
