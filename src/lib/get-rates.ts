import { getSupabaseAdmin } from './supabase-admin'

export async function getSeasonalRates(): Promise<Record<number, number> | undefined> {
  try {
    const admin = getSupabaseAdmin()
    const { data, error } = await admin
      .from('seasonal_rates')
      .select('month, rate')

    if (error || !data || data.length === 0) {
      return undefined // will use default hardcoded rates
    }

    const rates: Record<number, number> = {}
    for (const row of data) {
      rates[row.month] = row.rate
    }
    return rates
  } catch {
    return undefined
  }
}
