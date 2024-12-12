'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { AnimateDiv } from './motion/MotionWrapper'
import { useCart } from '@/context/CartContext'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'

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
    name: "Estate Reserve",
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
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    years: [] as number[],
    sizes: [] as string[]
  })

  const filterOptions = useMemo(() => ({
    years: [...new Set(products.map(p => p.year))].sort((a, b) => b - a),
    sizes: [...new Set(products.map(p => p.size))].sort()
  }), [])

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const yearMatch = filters.years.length === 0 || filters.years.includes(product.year)
      const sizeMatch = filters.sizes.length === 0 || filters.sizes.includes(product.size)
      return yearMatch && sizeMatch
    })
  }, [filters])

  const handleFilterChange = (type: 'years' | 'sizes', value: number | string) => {
    setFilters(prev => {
      const currentValues = prev[type]
      const newValues = currentValues.includes(value as never)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      return { ...prev, [type]: newValues }
    })
  }

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

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#8B7355] text-white p-4 rounded-full shadow-lg"
      >
        {showFilters ? <XMarkIcon className="w-6 h-6" /> : <FunnelIcon className="w-6 h-6" />}
      </button>

      {/* Main Content with Filters */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className={`
            md:w-64 flex-shrink-0
            ${showFilters ? 'fixed inset-0 z-40 bg-white md:relative md:bg-transparent' : 'hidden md:block'}
          `}>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="mb-8">
                <h3 className="text-xl text-[#8B7355] mb-4">Harvest Year</h3>
                {filterOptions.years.map(year => (
                  <label key={year} className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={filters.years.includes(year)}
                      onChange={() => handleFilterChange('years', year)}
                      className="form-checkbox h-5 w-5 text-[#8B7355]"
                    />
                    <span className="text-gray-700">{year}</span>
                  </label>
                ))}
              </div>

              <div>
                <h3 className="text-xl text-[#8B7355] mb-4">Bottle Size</h3>
                {filterOptions.sizes.map(size => (
                  <label key={size} className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={filters.sizes.includes(size)}
                      onChange={() => handleFilterChange('sizes', size)}
                      className="form-checkbox h-5 w-5 text-[#8B7355]"
                    />
                    <span className="text-gray-700">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
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
      </div>
    </div>
  )
}