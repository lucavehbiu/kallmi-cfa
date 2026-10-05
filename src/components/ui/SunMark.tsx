interface SunMarkProps {
  size?: number
  className?: string
}

/** Kallmi solar disc, used as the ornament between divider lines. */
export function SunMark({ size = 20, className = '' }: SunMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/kallmi-sun.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    />
  )
}
