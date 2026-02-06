'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'scale'

interface FadeInProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  className?: string
}

const animationStyles: Record<AnimationType, { initial: React.CSSProperties; animate: React.CSSProperties }> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  'slide-up': {
    initial: { opacity: 0, transform: 'translateY(24px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
  },
  'slide-down': {
    initial: { opacity: 0, transform: 'translateY(-24px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
  },
  scale: {
    initial: { opacity: 0, transform: 'scale(0.96)' },
    animate: { opacity: 1, transform: 'scale(1)' },
  },
}

export function FadeIn({
  children,
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  className = '',
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [once, threshold])

  const styles = animationStyles[animation]

  const componentStyle: React.CSSProperties = {
    ...styles.initial,
    ...(isVisible ? styles.animate : {}),
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
    willChange: 'opacity, transform',
  }

  return (
    <div ref={ref} className={className} style={componentStyle}>
      {children}
    </div>
  )
}

// Staggered children animation wrapper
interface StaggerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function Stagger({ children, staggerDelay = 0.1, className = '' }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        '--stagger-delay': `${staggerDelay}s`,
      } as React.CSSProperties}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.5s ease-out ${index * staggerDelay}s, transform 0.5s ease-out ${index * staggerDelay}s`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
