'use client'

import { useEffect, useRef, ReactNode, useCallback, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimationProps {
  children: ReactNode
  className?: string
  animation?: keyof typeof animationVariants
  duration?: number
  delay?: number
  once?: boolean
  threshold?: number
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  'aria-label'?: string
  priority?: boolean // For priority animations
}

interface AnimationVariant {
  opacity: number
  transform?: string
}

const GOLDEN_RATIO = 1.618033988749895
const BASE_DURATION = 0.6

const defaultAnimationStyles = {
  opacity: 0,
  transform: 'none',
  transition: `opacity ${BASE_DURATION}s ease-out, transform ${BASE_DURATION}s cubic-bezier(0.16, 1, 0.3, 1)`,
} as const

const animationVariants = {
  'fade': { opacity: 0 } as AnimationVariant,
  'slide-up': { opacity: 0, transform: 'translateY(20px)' } as AnimationVariant,
  'slide-down': { opacity: 0, transform: 'translateY(-20px)' } as AnimationVariant,
  'slide-left': { opacity: 0, transform: 'translateX(20px)' } as AnimationVariant,
  'slide-right': { opacity: 0, transform: 'translateX(-20px)' } as AnimationVariant,
  'scale': { opacity: 0, transform: 'scale(0.95)' } as AnimationVariant,
  'rotate': { opacity: 0, transform: 'rotate(-5deg)' } as AnimationVariant,
  // New golden ratio based animations
  'scale-golden': { opacity: 0, transform: `scale(${1/GOLDEN_RATIO})` } as AnimationVariant,
  'rotate-golden': { opacity: 0, transform: `rotate(${360/GOLDEN_RATIO}deg)` } as AnimationVariant,
} as const

export const AnimateDiv = ({
  children,
  className = '',
  animation = 'fade',
  duration = BASE_DURATION,
  delay = 0,
  once = true,
  threshold = 0.1,
  priority = false,
  ...props
}: AnimationProps) => {
  const [isClient, setIsClient] = useState(false)
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
  })

  // Memoize styles for performance
  const styles = useMemo(() => {
    if (!isClient) return {}
    const variant = animationVariants[animation]
    return {
      opacity: inView ? 1 : variant.opacity,
      transform: inView ? 'none' : variant.transform,
      transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      willChange: 'opacity, transform',
    }
  }, [animation, duration, delay, inView, isClient])

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient && !priority) {
    return <div className={className} {...props}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`${className} ${priority ? 'contents' : ''}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  )
}

export const AnimateButton = ({
  children,
  className = '',
  onClick,
  'aria-label': ariaLabel,
  ...props
}: AnimationProps) => {
  const handleClick = useCallback(() => {
    onClick?.()
  }, [onClick])

  return (
    <button
      className={`${className} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] motion-safe:transform motion-reduce:transform-none`}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  )
}

export const AnimateLink = ({
  children,
  className = '',
  href = '#',
  target,
  rel,
  'aria-label': ariaLabel,
  ...props
}: AnimationProps) => {
  return (
    <a
      className={`${className} transition-all duration-300 hover:scale-[1.02] motion-safe:transform motion-reduce:transform-none`}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </a>
  )
}

// For backwards compatibility with existing code using AnimatePresence
export const AnimatePresence = ({ children }: { children: ReactNode }) => <>{children}</>