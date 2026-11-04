import { auth, currentUser } from '@clerk/nextjs/server'
import { SignIn, SignOutButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminLoginPage() {
  const { userId } = await auth()

  // Signed in: send admins straight to the dashboard; anyone else gets the
  // unauthorized message (rendering <SignIn/> here would bounce them in a loop).
  let unauthorizedEmail: string | null = null
  if (userId) {
    const user = await currentUser()
    const userEmail = user?.primaryEmailAddress?.emailAddress || ''
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
    if (userEmail && adminEmails.includes(userEmail.toLowerCase())) {
      redirect('/admin')
    }
    unauthorizedEmail = userEmail
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[4px] text-[#C4A862] uppercase mb-2">Kallmi Estate</p>
          <h1 className="text-3xl font-light text-[#333] tracking-wide">Admin Dashboard</h1>
          <div className="w-12 h-px bg-[#C4A862] mx-auto mt-4"></div>
        </div>

        {userId ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#ece6dd]">
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              You are not authorized to access the admin area
              {unauthorizedEmail ? ` (${unauthorizedEmail})` : ''}.
            </div>
            <SignOutButton redirectUrl="/admin/login">
              <button className="w-full py-3 bg-gradient-to-r from-[#8B7355] to-[#A0845C] text-white rounded-lg text-sm tracking-[1px] uppercase hover:from-[#7A6348] hover:to-[#8B7355] transition-all">
                Sign in with another account
              </button>
            </SignOutButton>
          </div>
        ) : (
          <div className="flex justify-center">
            <SignIn path="/admin/login" routing="path" fallbackRedirectUrl="/admin" withSignUp={false} />
          </div>
        )}

        <p className="text-center mt-6 text-xs text-[#999]">
          <Link href="/" className="text-[#8B7355] hover:underline">Back to website</Link>
        </p>
      </div>
    </div>
  )
}
