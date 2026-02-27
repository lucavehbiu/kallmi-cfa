import { NextResponse } from 'next/server'
import { getSeasonalRates } from '@/lib/get-rates'
import { DEFAULT_RATES } from '@/lib/pricing'

export async function GET() {
    const seasonalRates = await getSeasonalRates()
    const rates = { ...DEFAULT_RATES, ...(seasonalRates || {}) }
    return NextResponse.json(rates)
}
