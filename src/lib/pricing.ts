// Default seasonal rates (fallback if Supabase table is empty)
export const DEFAULT_RATES: Record<number, number> = {
  1: 80,    // January
  2: 80,    // February
  3: 90,    // March
  4: 100,   // April
  5: 105,   // May
  6: 115,   // June
  7: 125,   // July
  8: 135,   // August
  9: 115,   // September
  10: 100,  // October
  11: 80,   // November
  12: 80,   // December
}

const DEPOSIT_PERCENT = 50

export function getNightlyRate(date: Date, rates?: Record<number, number>): number {
  const month = date.getMonth() + 1 // getMonth() is 0-based
  const rateMap = rates || DEFAULT_RATES
  return rateMap[month] || 100
}

export function calculateStayTotal(
  checkIn: string,
  checkOut: string,
  rates?: Record<number, number>
): {
  nights: number
  totalAmount: number
  depositAmount: number
  breakdown: { date: string; rate: number }[]
} {
  const startDate = new Date(checkIn)
  const endDate = new Date(checkOut)
  const breakdown: { date: string; rate: number }[] = []

  let totalAmount = 0
  const current = new Date(startDate)

  while (current < endDate) {
    const rate = getNightlyRate(current, rates)
    breakdown.push({
      date: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate,
    })
    totalAmount += rate
    current.setDate(current.getDate() + 1)
  }

  return {
    nights: breakdown.length,
    totalAmount,
    depositAmount: Math.ceil(totalAmount * DEPOSIT_PERCENT / 100),
    breakdown,
  }
}
