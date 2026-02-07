import { createSupabaseServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [bookingsResult, reservationsResult] = await Promise.all([
    supabase
      .from('stay_bookings')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
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
