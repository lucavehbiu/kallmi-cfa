import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Kallmi Estate',
  robots: { index: false, follow: false },
}

// Clerk is scoped to the admin area only; the public site never loads it.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // /admin lives outside the [locale] segment, so this layout owns <html> and <body>.
  return (
    <html lang="en">
      <body>
        <ClerkProvider signInUrl="/admin/login" signInFallbackRedirectUrl="/admin">
          <div className="min-h-screen bg-[#faf8f5]">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  )
}
