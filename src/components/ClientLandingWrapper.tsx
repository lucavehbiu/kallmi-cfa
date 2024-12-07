'use client'

import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const LandingPage = dynamic(
  () => import('./LandingPage').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <LoadingSpinner variant="full" />
  }
)

export default function ClientLandingWrapper() {
  return <LandingPage />
}
