'use client'

import { ReactNode, forwardRef } from 'react'
import { buttonClasses, type ButtonVariant, type ButtonSize } from './buttonStyles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  disabled?: boolean
  fullWidth?: boolean
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
  const combinedClasses = buttonClasses({ variant, size, fullWidth, className })

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
