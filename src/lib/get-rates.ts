import { getSql } from './db'

export async function getSeasonalRates(): Promise<Record<number, number> | undefined> {
  try {
    const sql = getSql()
    const data = await sql`
      select month
      ,      rate
      from   seasonal_rates
    `

    if (data.length === 0) {
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
