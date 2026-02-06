'use client'

import { ReactNode } from 'react'

type ContainerWidth = 'sm' | 'md' | 'lg' | 'full'

interface ContainerProps {
  children: ReactNode
  width?: ContainerWidth
  className?: string
  as?: 'div' | 'main' | 'article' | 'section'
}

const widthClasses: Record<ContainerWidth, string> = {
  sm: 'max-w-5xl',
  md: 'max-w-7xl',
  lg: 'max-w-screen-2xl',
  full: 'w-full',
}

export function Container({
  children,
  width = 'md',
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={`${widthClasses[width]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  )
}
