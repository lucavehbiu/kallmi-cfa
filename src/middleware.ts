import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl

  // /api/admin/* only needs the Clerk context; each route does its own
  // 401 (no session) / 403 (not in ADMIN_EMAILS) checks.
  // Skip i18n for API routes and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if this is an admin route (with or without locale prefix)
  const isAdminRoute = pathname.startsWith('/admin') ||
    routing.locales.some(locale => pathname.startsWith(`/${locale}/admin`))

  if (isAdminRoute) {
    // Strip locale prefix for admin route checking
    let adminPath = pathname
    for (const locale of routing.locales) {
      if (pathname.startsWith(`/${locale}/admin`)) {
        adminPath = pathname.replace(`/${locale}`, '')
        break
      }
    }

    // The sign-in page (and Clerk's sub-steps under it) stays public.
    // The ADMIN_EMAILS allowlist is enforced in the admin page and API routes,
    // since the email is not in the session token.
    const isLoginPage = adminPath === '/admin/login' || adminPath.startsWith('/admin/login/')
    if (!isLoginPage) {
      await auth.protect({ unauthenticatedUrl: new URL('/admin/login', request.url).toString() })
    }

    return NextResponse.next()
  }

  // For all non-admin routes, use next-intl middleware
  return intlMiddleware(request)
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/admin/:path*', '/api/admin/:path*'],
}
