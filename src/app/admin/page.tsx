import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import { calculateStayTotal } from '@/lib/pricing'
import { getSeasonalRates } from '@/lib/get-rates'
import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // Auth check via cookie-based client
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) redirect('/admin/login')

  // Data fetch via service role client (bypasses RLS)
  const admin = getSupabaseAdmin()
  const [bookingsResult, reservationsResult, rates] = await Promise.all([
    admin
      .from('stay_bookings')
      .select('*')
      .order('created_at', { ascending: false }),
    admin
      .from('restaurant_reservations')
      .select('*')
      .order('created_at', { ascending: false }),
    getSeasonalRates(),
  ])

  // Compute pricing for each stay booking from its dates using the same
  // seasonal-rate logic used by the payment-request email.
  const bookings = (bookingsResult.data || []).map((b) => {
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
      bookings={bookings}
      reservations={reservationsResult.data || []}
      userEmail={user.email || ''}
    />
  )
}
