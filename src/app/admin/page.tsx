import { createSupabaseServerClient } from '@/lib/supabase-server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  // Auth check via cookie-based client
  const authClient = await createSupabaseServerClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) redirect('/admin/login')

  // Data fetch via service role client (bypasses RLS)
  const admin = getSupabaseAdmin()
  const [bookingsResult, reservationsResult] = await Promise.all([
    admin
      .from('stay_bookings')
      .select('*')
      .order('created_at', { ascending: false }),
    admin
      .from('restaurant_reservations')
      .select('*')
      .order('created_at', { ascending: false }),
  ])

  return (
    <AdminDashboardClient
      bookings={bookingsResult.data || []}
      reservations={reservationsResult.data || []}
      userEmail={user.email || ''}
    />
  )
}
