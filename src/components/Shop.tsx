'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { FadeIn } from './motion/FadeIn'
import { useCart } from '@/context/CartContext'
import { Section, SectionHeader } from './layout/Section'
import { Card, CardBody } from './ui/Card'
import { Button } from './ui/Button'
import {
  FunnelIcon,
  XMarkIcon,
  ShoppingCartIcon,
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
    addToCart(product)
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-primary)] font-cormorant">

      {/* Hero Section - Clean, Product-Focused */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {/* Background */}
        <Image
          src="/images/hand-harvested.webp"
          alt="Artisanal Olive Oil Collection"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          quality={90}
        />

        {/* Single Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl">
            <FadeIn animation="fade" delay={0.2}>
              <span className="text-overline text-white/80 block mb-4">
                2024 Collection
              </span>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.4}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-6">
                Liquid Gold
              </h1>
            </FadeIn>

            <FadeIn animation="slide-up" delay={0.6}>
              <p className="text-lg sm:text-xl font-light opacity-90 max-w-2xl mx-auto">
                Premium extra virgin olive oils, cold-pressed from our heritage groves
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Filter Toggle - Mobile */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden fixed bottom-6 right-6 z-50"
      >
        <div
          className="p-4 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: 'var(--color-brand-olive)', color: 'white' }}
        >
          {showFilters ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <FunnelIcon className="w-6 h-6" />
          )}
        </div>
      </button>

      {/* Main Content */}
      <Section background="default" spacing="lg">
        {/* Collection Stats - Clean Cards */}
        <FadeIn animation="fade" className="mb-16">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {[
              { number: '3', label: 'Premium Oils' },
              { number: '2024', label: 'Fresh Harvest' },
              { number: '100%', label: 'Extra Virgin' }
            ].map((stat, index) => (
              <Card key={index} variant="elevated" className="text-center p-4 sm:p-6">
                <div
                  className="text-2xl sm:text-3xl font-light mb-1"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Filter Sidebar */}
          <aside className={`
            lg:w-72 flex-shrink-0 transition-all duration-300
            ${showFilters
              ? 'fixed inset-0 z-40 bg-black/30 lg:relative lg:bg-transparent'
              : 'hidden lg:block'
            }
          `}>
            <Card
              variant="elevated"
              className={`
                ${showFilters ? 'absolute right-0 top-0 h-full w-80 max-w-[90vw] rounded-none lg:rounded-2xl' : ''}
                p-6 lg:p-8
              `}
            >
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-8">
                <h3
                  className="text-xl font-light flex items-center gap-2"
                  style={{ color: 'var(--color-brand-olive)' }}
                >
                  <FunnelIcon className="w-5 h-5" />
                  <span>Refine</span>
                </h3>
                {showFilters && (
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-2 rounded-lg transition-colors duration-200"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Harvest Year Filter */}
              <div className="mb-8">
                <h4
                  className="text-sm font-medium uppercase tracking-wide mb-4"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Harvest Year
                </h4>
                <div className="space-y-3">
                  {filterOptions.years.map(year => (
                    <label key={year} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.years.includes(year)}
                        onChange={() => handleFilterChange('years', year)}
                        className="w-4 h-4 rounded transition-colors"
                        style={{
                          accentColor: 'var(--color-brand-olive)',
                          borderColor: 'var(--color-border)'
                        }}
                      />
                      <span
                        className="transition-colors duration-200 group-hover:text-[var(--color-brand-olive)]"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {year}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bottle Size Filter */}
              <div>
                <h4
                  className="text-sm font-medium uppercase tracking-wide mb-4"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Bottle Size
                </h4>
                <div className="space-y-3">
                  {filterOptions.sizes.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.sizes.includes(size)}
                        onChange={() => handleFilterChange('sizes', size)}
                        className="w-4 h-4 rounded transition-colors"
                        style={{
                          accentColor: 'var(--color-brand-olive)',
                          borderColor: 'var(--color-border)'
                        }}
                      />
                      <span
                        className="transition-colors duration-200 group-hover:text-[var(--color-brand-olive)]"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <FadeIn
                  key={product.id}
                  animation="slide-up"
                  delay={index * 0.1}
                >
                  <Card
                    variant="elevated"
                    hover
                    className="overflow-hidden group"
                  >
                    {/* Featured Badge */}
                    {product.featured && (
                      <div
                        className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: 'var(--color-brand-gold)' }}
                      >
                        Featured
                      </div>
                    )}

                    {/* Product Image - Clean Background */}
                    <div
                      className="relative aspect-[3/4] p-8"
                      style={{ backgroundColor: 'var(--color-surface-secondary)' }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={90}
                      />
                    </div>

                    {/* Product Info */}
                    <CardBody className="space-y-4">
                      <div className="space-y-2">
                        <h2
                          className="text-xl font-light"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {product.name}
                        </h2>
                        <p
                          className="text-sm"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {product.year} Harvest • {product.size}
                        </p>
                        {product.description && (
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Price and Action */}
                      <div
                        className="flex items-center justify-between pt-4"
                        style={{ borderTop: '1px solid var(--color-border-light)' }}
                      >
                        <span
                          className="text-2xl font-light"
                          style={{ color: 'var(--color-brand-olive)' }}
                        >
                          {formatPrice(product.price)}
                        </span>

                        {product.inStock ? (
                          <Button
                            onClick={() => handleAddToCart(product)}
                            disabled={addedToCart === product.id}
                            variant="primary"
                            size="sm"
                          >
                            {addedToCart === product.id ? (
                              <span className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4" />
                                <span>Added</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <ShoppingCartIcon className="w-4 h-4" />
                                <span>Add</span>
                              </span>
                            )}
                          </Button>
                        ) : (
                          <span
                            className="text-sm px-4 py-2 rounded-lg"
                            style={{
                              backgroundColor: 'var(--color-surface-tertiary)',
                              color: 'var(--color-text-tertiary)'
                            }}
                          >
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </FadeIn>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <FadeIn animation="fade">
                <Card variant="subtle" className="text-center p-12 max-w-md mx-auto">
                  <FunnelIcon
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  />
                  <h3
                    className="text-lg font-light mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    No products found
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Try adjusting your filters
                  </p>
                </Card>
              </FadeIn>
            )}
          </div>
        </div>
      </Section>
    </div>
  )
}
