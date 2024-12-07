'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-stone-900 text-stone-100">
      <h2 className="font-cormorant text-4xl mb-4">Something went wrong</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-stone-800 hover:bg-stone-700 transition-colors rounded-md"
      >
        Try again
      </button>
    </div>
  )
}