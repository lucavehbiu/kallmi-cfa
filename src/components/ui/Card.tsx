'use client'

import { ReactNode } from 'react'

type CardVariant = 'default' | 'elevated' | 'outlined' | 'subtle' | 'on-dark'

interface CardProps {
  children: ReactNode
  variant?: CardVariant
  hover?: boolean
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: 'div' | 'article' | 'section'
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-surface-secondary border border-border-light',
  elevated: 'bg-white shadow-card border border-transparent',
  outlined: 'bg-transparent border border-border',
  subtle: 'bg-surface-primary border border-border-light',
  'on-dark': 'bg-surface-inverse-soft border border-white/10',
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  variant = 'default',
  hover = false,
  className = '',
  padding = 'md',
  as: Component = 'div',
}: CardProps) {
  const baseClasses = 'rounded-2xl transition-all duration-300'
  const hoverClasses = hover ? 'hover:-translate-y-1 hover:shadow-card-hover' : ''

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
    >
      {children}
    </Component>
  )
}

// Card Header component
interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

// Card Body component
interface CardBodyProps {
  children: ReactNode
  className?: string
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Card Footer component
interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-border-light ${className}`}>
      {children}
    </div>
  )
}
