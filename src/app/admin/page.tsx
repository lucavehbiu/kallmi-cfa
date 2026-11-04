import { auth, currentUser } from '@clerk/nextjs/server'
import { getSql } from '@/lib/db'
import { redirect } from 'next/navigation'
import { calculateStayTotal } from '@/lib/pricing'
import { getSeasonalRates } from '@/lib/get-rates'
import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // Auth check via Clerk session + ADMIN_EMAILS allowlist
  const { userId } = await auth()
  if (!userId) redirect('/admin/login')

  const user = await currentUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress || ''
  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
  if (!userEmail || !adminEmails.includes(userEmail.toLowerCase())) {
    redirect('/admin/login?error=unauthorized')
  }

  const sql = getSql()
  const logError = (table: string) => (error: unknown) => {
    console.error(`Fetch ${table} error:`, error)
    return []
  }
  const [bookingRows, reservationRows, rates] = await Promise.all([
    sql`select * from stay_bookings order by created_at desc`.catch(logError('stay_bookings')),
    sql`select * from restaurant_reservations order by created_at desc`.catch(logError('restaurant_reservations')),
    getSeasonalRates(),
  ])

  // Compute pricing for each stay booking from its dates using the same
  // seasonal-rate logic used by the payment-request email.
  const bookings = bookingRows.map((b) => {
    const row = b as { check_in: string; check_out: string }
    const { nights, totalAmount, depositAmount } = calculateStayTotal(
      row.check_in,
      row.check_out,
      rates
    )
    return { ...b, nights, total_amount: totalAmount, deposit_amount: depositAmount }
  })

  return (
    <AdminDashboardClient
      bookings={bookings as Parameters<typeof AdminDashboardClient>[0]['bookings']}
      reservations={reservationRows as Parameters<typeof AdminDashboardClient>[0]['reservations']}
      userEmail={userEmail}
    />
  )
}
