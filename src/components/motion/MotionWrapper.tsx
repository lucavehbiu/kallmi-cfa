'use client'

import { ReactNode } from 'react'

interface AnimationProps {
  children: ReactNode
  className?: string
  animation?: 'fade' | 'slide-up' | 'scale'
  duration?: number
  delay?: number
  [key: string]: any
}

const getAnimationClass = (animation: string = 'fade') => {
  switch (animation) {
    case 'slide-up':
      return 'animate-slide-up'
    case 'scale':
      return 'animate-scale'
    case 'fade':
    default:
      return 'animate-fade'
  }
}

export const AnimateDiv = ({
  children,
  className = '',
  animation = 'fade',
  ...props
}: AnimationProps) => {
  const animationClass = getAnimationClass(animation)

  return (
    <div
      className={`${className} ${animationClass}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const AnimateButton = ({
  children,
  className = '',
  animation = 'fade',
  href,
  ...props
}: AnimationProps & { href?: string }) => {
  const animationClass = getAnimationClass(animation)

  if (href) {
    return (
      <a
        href={href}
        className={`${className} ${animationClass}`}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={`${className} ${animationClass}`}
      {...props}
    >
      {children}
    </button>
  )
}