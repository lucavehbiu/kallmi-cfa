'use client'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md
        transition-colors duration-300
        ${variant === 'primary' ? 'bg-[#8B7355] hover:bg-[#6B563F] text-white' : 'bg-white/10 hover:bg-white/20 text-white'}
        ${size === 'sm' ? 'px-4 py-2 text-sm' : size === 'md' ? 'px-6 py-3' : 'px-8 py-4 text-lg'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
} 