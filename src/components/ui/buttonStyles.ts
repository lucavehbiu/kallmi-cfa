export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'primary-on-dark' | 'ghost-on-dark'
export type ButtonSize = 'sm' | 'md' | 'lg'

// One button system: near-square corners, small tracked capitals, slow colour
// fade on hover (no lift). Gold on photos, ink on light sections, hairline
// outline for secondary actions.
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#1A1814] text-[#F8F5EF] border border-[#1A1814] hover:bg-transparent hover:text-[#1A1814] focus-visible:ring-[#1A1814]/40',
  secondary: 'bg-transparent text-[#1A1814] border border-[#1A1814]/25 hover:border-[#1A1814] focus-visible:ring-[#1A1814]/30',
  ghost: 'bg-transparent text-[#1A1814] border border-transparent hover:border-[#1A1814]/25 focus-visible:ring-[#1A1814]/30',
  outline: 'bg-transparent text-[#1A1814] border border-[#1A1814] hover:bg-[#1A1814] hover:text-[#F8F5EF] focus-visible:ring-[#1A1814]/40',
  'primary-on-dark': 'bg-[#C4A862] text-[#141311] border border-[#C4A862] hover:bg-transparent hover:text-[#C4A862] focus-visible:ring-[#C4A862]/50',
  'ghost-on-dark': 'bg-transparent text-[#F8F5EF] border border-[#F8F5EF]/50 hover:border-[#C4A862] hover:text-[#C4A862] focus-visible:ring-[#F8F5EF]/40',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-5 text-[11px] tracking-[0.18em]',
  md: 'h-12 px-7 text-[12px] tracking-[0.2em]',
  lg: 'h-[54px] px-9 text-[12px] tracking-[0.22em]',
}

/** Shared classes so links (e.g. next/link) can look like buttons without nesting a <button> inside an <a>. */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean; className?: string } = {}) {
  return [
    'inline-flex items-center justify-center rounded-[2px] font-sans font-medium uppercase',
    'transition-colors duration-500 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ')
}
