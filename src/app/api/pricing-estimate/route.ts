import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { calculateStayTotal } from '@/lib/pricing'
import { getSeasonalRates } from '@/lib/get-rates'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')

  if (!checkIn || !checkOut) {
    return NextResponse.json({ error: 'checkIn and checkOut are required' }, { status: 400 })
  }

  const rates = await getSeasonalRates()
  const result = calculateStayTotal(checkIn, checkOut, rates)

  return NextResponse.json(result)
}
