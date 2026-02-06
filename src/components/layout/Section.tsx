'use client'

import { ReactNode } from 'react'

type SectionBackground = 'default' | 'secondary' | 'tertiary' | 'inverse'
type SectionSpacing = 'sm' | 'md' | 'lg'
type ContainerWidth = 'sm' | 'md' | 'lg' | 'full'

interface SectionProps {
  children: ReactNode
  id?: string
  background?: SectionBackground
  spacing?: SectionSpacing
  containerWidth?: ContainerWidth
  className?: string
  containerClassName?: string
  as?: 'section' | 'div' | 'article'
}

const backgroundClasses: Record<SectionBackground, string> = {
  default: 'bg-surface-primary',
  secondary: 'bg-surface-secondary',
  tertiary: 'bg-surface-tertiary',
  inverse: 'bg-surface-inverse text-text-on-dark',
}

const spacingClasses: Record<SectionSpacing, string> = {
  sm: 'py-12 sm:py-16 lg:py-20',
  md: 'py-16 sm:py-20 lg:py-24',
  lg: 'py-20 sm:py-28 lg:py-32',
}

const containerWidthClasses: Record<ContainerWidth, string> = {
  sm: 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
  md: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  lg: 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
  full: 'w-full px-4 sm:px-6 lg:px-8',
}

export function Section({
  children,
  id,
  background = 'default',
  spacing = 'md',
  containerWidth = 'md',
  className = '',
  containerClassName = '',
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component
      id={id}
      className={`relative ${backgroundClasses[background]} ${spacingClasses[spacing]} ${className}`}
    >
      <div className={`${containerWidthClasses[containerWidth]} ${containerClassName}`}>
        {children}
      </div>
    </Component>
  )
}

// Section Header component for consistent section titles
interface SectionHeaderProps {
  overline?: string
  title: string | ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  overline,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={`mb-12 sm:mb-16 ${alignClasses} ${className}`}>
      {overline && (
        <span className="text-overline block mb-4">{overline}</span>
      )}
      {typeof title === 'string' ? (
        <h2 className="text-heading text-brand-olive">{title}</h2>
      ) : (
        title
      )}
      {subtitle && (
        <p className="text-subheading mt-4 max-w-3xl">{subtitle}</p>
      )}
      {align === 'center' && <div className="divider-accent mx-auto mt-6" />}
      {align === 'left' && <div className="divider-accent mt-6" />}
    </div>
  )
}
