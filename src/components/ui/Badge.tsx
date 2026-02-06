'use client'

import { ReactNode } from 'react'

type BadgeVariant = 'primary' | 'gold' | 'neutral' | 'outline'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-brand-olive/10 text-brand-olive',
  gold: 'bg-brand-gold/10 text-brand-gold-dark',
  neutral: 'bg-surface-tertiary text-text-secondary',
  outline: 'bg-transparent border border-brand-olive text-brand-olive',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  )
}
