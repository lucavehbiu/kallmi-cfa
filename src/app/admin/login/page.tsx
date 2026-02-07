'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(searchParams.get('error') === 'unauthorized' ? 'You are not authorized to access the admin area.' : '')
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[4px] text-[#D4AF37] uppercase mb-2">Kallmi Estate</p>
          <h1 className="text-3xl font-light text-[#333] tracking-wide">Admin Dashboard</h1>
          <div className="w-12 h-px bg-[#D4AF37] mx-auto mt-4"></div>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 border border-[#ece6dd]">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="email" className="block text-xs uppercase tracking-[2px] text-[#8B7355] font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#ece6dd] rounded-lg text-[#333] bg-[#faf8f5] focus:outline-none focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition-colors"
              placeholder="admin@kallmibukur.al"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-xs uppercase tracking-[2px] text-[#8B7355] font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#ece6dd] rounded-lg text-[#333] bg-[#faf8f5] focus:outline-none focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition-colors"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#8B7355] to-[#A0845C] text-white rounded-lg text-sm tracking-[1px] uppercase hover:from-[#7A6348] hover:to-[#8B7355] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-[#999]">
          <Link href="/" className="text-[#8B7355] hover:underline">Back to website</Link>
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
