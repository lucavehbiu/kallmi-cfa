'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { AnimateDiv } from './motion/MotionWrapper'
import { useCart } from '@/context/CartContext'
import {
  FunnelIcon,
  XMarkIcon,
  ShoppingCartIcon,
  HeartIcon,
  SparklesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

interface Product {
  id: number
  name: string
  year: number
  size: string
  price: number
  image: string
  inStock?: boolean
  description?: string
  featured?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Estate Reserve",
    year: 2024,
    size: "500ml",
    price: 8,
    image: "/images/product.webp",
    inStock: false,
    description: "Our flagship blend from century-old olive trees",
    featured: true
  },
  {
    id: 2,
    name: "Limited Harvest",
    year: 2024,
    size: "750ml",
    price: 12,
    image: "/images/product.webp",
    inStock: true,
    description: "Small-batch artisanal pressing from select groves"
  },
  {
    id: 3,
    name: "Premium Selection",
    year: 2024,
    size: "1000ml",
    price: 16,
    image: "/images/product.webp",
    inStock: false,
    description: "Our finest extra virgin olive oil for connoisseurs"
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
  const [addedToCart, setAddedToCart] = useState<number | null>(null)
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
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 font-cormorant relative overflow-hidden">

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#8B7355]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse delay-2000" />
      </div>

      {/* Immersive Hero Section */}
      <div className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 scale-110">
          <Image
            src="/images/hand-harvested.webp"
            alt="Artisanal Olive Oil Collection"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Sophisticated Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/30 via-transparent to-[#D4AF37]/20" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 sm:px-6">
          <div className="max-w-4xl space-y-6 sm:space-y-8">

            {/* Floating Badge */}
            <AnimateDiv
              animation="fade"
              duration={1.0}
              delay={0.3}
              className="inline-block"
            >
              <div className="backdrop-blur-md bg-white/10 rounded-full px-6 py-3 border border-white/20 mb-4">
                <span className="text-sm sm:text-base font-medium tracking-widest uppercase text-white/90">
                  Liquid Gold Collection
                </span>
              </div>
            </AnimateDiv>

            {/* Main Title */}
            <AnimateDiv
              animation="slide-up"
              duration={1.2}
              delay={0.6}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-wide leading-tight">
                <span className="block">Artisanal</span>
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic font-light text-[#D4AF37] mt-2">
                  Excellence
                </span>
              </h1>
            </AnimateDiv>

            {/* Elegant Divider */}
            <AnimateDiv
              animation="fade"
              duration={0.8}
              delay={1.0}
              className="flex items-center justify-center space-x-4"
            >
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <SparklesIcon className="w-5 h-5 text-[#D4AF37]" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </AnimateDiv>

            {/* Subtitle */}
            <AnimateDiv
              animation="slide-up"
              duration={1.0}
              delay={1.2}
            >
              <p className="text-lg sm:text-2xl font-light opacity-95 leading-relaxed max-w-3xl mx-auto">
                Discover our curated collection of premium extra virgin olive oils,
                each bottle telling the story of our <span className="text-[#D4AF37]">ancient heritage</span>
              </p>
            </AnimateDiv>
          </div>
        </div>

        {/* Scroll Indicator */}
        <AnimateDiv
          animation="fade"
          duration={1.0}
          delay={1.8}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 text-white/70">
            <span className="text-xs sm:text-sm font-light tracking-widest uppercase">
              Explore Collection
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </AnimateDiv>
      </div>

      {/* Enhanced Filter Toggle - Mobile */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden fixed bottom-6 right-6 z-50 group"
      >
        <div className="bg-gradient-to-r from-[#8B7355] to-[#A0845C] text-white p-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:scale-110">
          {showFilters ? (
            <XMarkIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <FunnelIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          )}
        </div>
        <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      </button>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

        {/* Collection Stats */}
        <AnimateDiv
          animation="fade"
          duration={1.0}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            {[
              { number: '3', label: 'Premium Oils' },
              { number: '2024', label: 'Fresh Harvest' },
              { number: '100%', label: 'Extra Virgin' }
            ].map((stat, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/60 rounded-2xl p-4 sm:p-6 border border-white/40">
                <div className="text-2xl sm:text-3xl font-light text-[#8B7355]">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimateDiv>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Enhanced Filter Sidebar */}
          <aside className={`
            lg:w-80 flex-shrink-0 transition-all duration-500
            ${showFilters
              ? 'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:relative lg:bg-transparent lg:backdrop-blur-none'
              : 'hidden lg:block'
            }
          `}>
            <div className={`
              ${showFilters ? 'absolute right-0 top-0 h-full w-80 max-w-[90vw]' : ''}
              bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 lg:p-8
            `}>

              {/* Filter Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-light text-[#8B7355] flex items-center space-x-2">
                  <FunnelIcon className="w-6 h-6" />
                  <span>Refine Selection</span>
                </h3>
                {showFilters && (
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Harvest Year Filter */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center space-x-2">
                  <SparklesIcon className="w-5 h-5 text-[#D4AF37]" />
                  <span>Harvest Year</span>
                </h4>
                <div className="space-y-3">
                  {filterOptions.years.map(year => (
                    <label key={year} className="flex items-center space-x-3 group cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={filters.years.includes(year)}
                          onChange={() => handleFilterChange('years', year)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                          ${filters.years.includes(year)
                            ? 'bg-[#8B7355] border-[#8B7355]'
                            : 'border-gray-300 group-hover:border-[#8B7355]'
                          }`}>
                          {filters.years.includes(year) && (
                            <CheckCircleIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700 group-hover:text-[#8B7355] transition-colors duration-200">
                        {year}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bottle Size Filter */}
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4 flex items-center space-x-2">
                  <HeartIcon className="w-5 h-5 text-[#D4AF37]" />
                  <span>Bottle Size</span>
                </h4>
                <div className="space-y-3">
                  {filterOptions.sizes.map(size => (
                    <label key={size} className="flex items-center space-x-3 group cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={filters.sizes.includes(size)}
                          onChange={() => handleFilterChange('sizes', size)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                          ${filters.sizes.includes(size)
                            ? 'bg-[#8B7355] border-[#8B7355]'
                            : 'border-gray-300 group-hover:border-[#8B7355]'
                          }`}>
                          {filters.sizes.includes(size) && (
                            <CheckCircleIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700 group-hover:text-[#8B7355] transition-colors duration-200">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Enhanced Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <AnimateDiv
                  key={product.id}
                  animation="slide-up"
                  duration={0.8}
                  delay={index * 0.2}
                  className="group"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/30 hover:border-[#8B7355]/30">

                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <SparklesIcon className="w-3 h-3" />
                          <span>Featured</span>
                        </div>
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="relative aspect-[3/4] p-8 bg-gradient-to-br from-stone-50 to-stone-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={90}
                      />

                      {/* Floating Glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#8B7355]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Product Info */}
                    <div className="p-6 lg:p-8 space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-xl lg:text-2xl font-light text-[#8B7355] group-hover:text-[#A0845C] transition-colors duration-300">
                          {product.name}
                        </h2>
                        <p className="text-sm text-gray-600 font-light">
                          {product.year} Harvest • {product.size}
                        </p>
                        {product.description && (
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-2xl lg:text-3xl font-light text-[#8B7355]">
                          {formatPrice(product.price)}
                        </span>

                        {product.inStock ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={addedToCart === product.id}
                            className="group/btn relative px-6 py-3 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50"
                          >
                            {addedToCart === product.id ? (
                              <span className="flex items-center space-x-2">
                                <CheckCircleIcon className="w-5 h-5" />
                                <span>Added!</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-2">
                                <ShoppingCartIcon className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                                <span>Add to Cart</span>
                              </span>
                            )}
                          </button>
                        ) : (
                          <div className="px-6 py-3 bg-gray-100 text-gray-500 rounded-2xl font-medium cursor-not-allowed">
                            <span className="flex items-center space-x-2">
                              <HeartIcon className="w-5 h-5" />
                              <span>Coming Soon</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimateDiv>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <AnimateDiv
                animation="fade"
                duration={0.8}
                className="text-center py-16"
              >
                <div className="backdrop-blur-sm bg-white/60 rounded-3xl p-12 border border-white/40 max-w-md mx-auto">
                  <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-light text-gray-600 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more options</p>
                </div>
              </AnimateDiv>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}