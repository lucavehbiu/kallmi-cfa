import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { LoadingSpinner } from '@/components/ui'

console.log('Loading page.tsx module')

const Header = dynamic(
  () => {
    console.log('Loading Header dynamically')
    return import('@/components/Header')
  },
  {
    loading: () => <LoadingSpinner variant="header" />,
  }
)

const Footer = dynamic(
  () => {
    console.log('Loading Footer dynamically')
    return import('@/components/Footer')
  },
  {
    loading: () => <LoadingSpinner variant="header" />,
  }
)

const LandingPage = dynamic(
  () => {
    console.log('Loading LandingPage dynamically')
    return import('@/components/LandingPage')
  },
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
)

export default function HomePage() {
  console.log('Rendering HomePage component')
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  )
}