'use client'

import { ReactNode, forwardRef } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'primary-on-dark' | 'ghost-on-dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  disabled?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-olive text-white hover:bg-brand-olive-dark focus:ring-brand-olive/50',
  secondary: 'bg-surface-secondary text-text-primary border border-border-light hover:bg-surface-tertiary focus:ring-brand-olive/30',
  ghost: 'bg-transparent text-text-primary hover:bg-surface-secondary focus:ring-brand-olive/30',
  outline: 'bg-transparent text-brand-olive border border-brand-olive hover:bg-brand-olive hover:text-white focus:ring-brand-olive/50',
  'primary-on-dark': 'bg-white text-surface-inverse hover:bg-surface-secondary focus:ring-white/50',
  'ghost-on-dark': 'bg-transparent text-white border border-white/30 hover:bg-white/10 focus:ring-white/30',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    fullWidth = false,
    ...props
  },
  ref
) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium
    transition-all duration-300 ease-out
    hover:-translate-y-0.5 active:translate-y-0
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
  `

  const widthClass = fullWidth ? 'w-full' : ''
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`.trim()

  return (
    <button
      ref={ref}
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})
