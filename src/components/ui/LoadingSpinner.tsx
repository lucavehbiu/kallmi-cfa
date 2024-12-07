interface LoadingSpinnerProps {
  variant?: 'full' | 'header'
}

export function LoadingSpinner({ variant = 'full' }: LoadingSpinnerProps) {
  if (variant === 'header') {
    return <div className="h-20 bg-stone-900 animate-pulse" />
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
      <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
        KALLMI ESTATE
      </div>
    </div>
  )
}