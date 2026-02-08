'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string
  id?: string
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = 'https://storage.googleapis.com/kallmi/images/placeholders/fallback.webp',
  id,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setError(false)
    setLoading(true)
  }, [src])

  const handleError = () => {
    setError(true)
    setImgSrc(fallbackSrc)
    console.error(`Failed to load image: ${src}`)
  }

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  return (
    <>
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`
          ${props.className || ''}
          ${loading ? 'animate-pulse bg-gray-200' : ''}
          ${error ? 'opacity-50' : ''}
        `}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="w-8 h-8 border-4 border-[#8B7355] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  )
}