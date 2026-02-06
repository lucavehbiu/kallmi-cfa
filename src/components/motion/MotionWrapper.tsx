'use client'

import { ReactNode } from 'react'
import { FadeIn } from './FadeIn'

interface AnimationProps {
  children: ReactNode
  className?: string
  animation?: 'fade' | 'slide-up' | 'scale'
  duration?: number
  delay?: number
  [key: string]: unknown
}

// Backwards-compatible AnimateDiv that uses the new FadeIn component
export const AnimateDiv = ({
  children,
  className = '',
  animation = 'fade',
  duration = 0.5,
  delay = 0,
  ...props
}: AnimationProps) => {
  // Map old animation names to new ones
  const animationType = animation === 'slide-up' ? 'slide-up' : animation === 'scale' ? 'scale' : 'fade'

  return (
    <FadeIn
      animation={animationType}
      duration={duration}
      delay={delay}
      className={className}
      once={true}
    >
      {children}
    </FadeIn>
  )
}

export const AnimateButton = ({
  children,
  className = '',
  animation = 'fade',
  duration = 0.5,
  delay = 0,
  href,
  ...props
}: AnimationProps & { href?: string }) => {
  const animationType = animation === 'slide-up' ? 'slide-up' : animation === 'scale' ? 'scale' : 'fade'

  return (
    <FadeIn
      animation={animationType}
      duration={duration}
      delay={delay}
      className={className}
      once={true}
    >
      {children}
    </FadeIn>
  )
}
