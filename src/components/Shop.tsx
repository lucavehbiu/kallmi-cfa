'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimateDiv } from './motion/MotionWrapper'
import { useCart } from '@/context/CartContext'

interface Product {
  id: number
  name: string
  year: number
  size: string
  price: number
  image: string
  inStock?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Estate Reserve Olive Oil",
    year: 2024,
    size: "500ml",
    price: 8,
    image: "/images/product.webp",
    inStock: false
  },
  {
    id: 2,
    name: "Limited Harvest",
    year: 2024,
    size: "750ml",
    price: 12,
    image: "/images/product.webp",
    inStock: true
  },
  {
    id: 3,
    name: "Premium Selection",
    year: 2024,
    size: "1000ml",
    price: 16,
    image: "/images/product.webp",
    inStock: false
  }
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

export default function Shop() {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product)
    addToCart(product)
  }

  return (
    <div className="min-h-screen bg-stone-50 font-cormorant relative">
      {/* Hero Section */}
      <div className="h-[40vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/images/hand-harvested.webp"
          alt="Olive Oil Bottles"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-5xl text-white font-light tracking-wider z-20">
          Our Collection
        </h1>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <AnimateDiv
              key={product.id}
              animation="slide-up"
              duration={0.5}
              className="group"
            >
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[2/3] mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                  />
                </div>
                <h2 className="text-2xl text-[#8B7355] mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">
                  {product.year} Harvest • {product.size}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-[#8B7355]">{formatPrice(product.price)}</span>
                  {product.inStock ? (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-6 py-2 bg-[#8B7355] text-white rounded hover:bg-[#6B563F] transition-colors"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <span className="px-6 py-2 bg-gray-200 text-gray-500 rounded cursor-not-allowed">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </AnimateDiv>
          ))}
        </div>
      </div>
    </div>
  )
}