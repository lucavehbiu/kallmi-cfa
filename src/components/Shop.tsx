'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FadeIn } from './motion/FadeIn'
import { useCart } from '@/context/CartContext'
import { Section } from './layout/Section'
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
  nameKey: string
  descriptionKey: string
  year: number
  size: string
  price: number
  image: string
  inStock?: boolean
  featured?: boolean
}

const products: Product[] = [
  {
    id: 1,
    nameKey: "productEstateReserve",
    descriptionKey: "productEstateReserveDesc",
    year: 2024,
    size: "500ml",
    price: 8,
    image: "https://storage.googleapis.com/kallmi/images/product.webp",
    inStock: false,
    featured: true
  },
  {
    id: 2,
    nameKey: "productLimitedHarvest",
    descriptionKey: "productLimitedHarvestDesc",
    year: 2024,
    size: "750ml",
    price: 12,
    image: "https://storage.googleapis.com/kallmi/images/product.webp",
    inStock: true
  },
  {
    id: 3,
    nameKey: "productPremiumSelection",
    descriptionKey: "productPremiumSelectionDesc",
    year: 2024,
    size: "1000ml",
    price: 16,
    image: "https://storage.googleapis.com/kallmi/images/product.webp",
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
  const t = useTranslations('Shop')
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
    addToCart({
      id: product.id,
      name: t(product.nameKey as any),
      price: product.price,
      image: product.image
    })
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  // Filter panel content shared between desktop sidebar and mobile drawer.
  const filterGroups = (
    <>
      <div className="mb-8">
        <h4 className="label-eyebrow mb-4 text-[var(--color-text-tertiary)]">
          {t('filterHarvestYear')}
        </h4>
        <div className="space-y-3">
          {filterOptions.years.map(year => (
            <label key={year} className="flex items-center gap-3 cursor-pointer group min-h-[36px]">
              <input
                type="checkbox"
                checked={filters.years.includes(year)}
                onChange={() => handleFilterChange('years', year)}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--color-brand-olive)' }}
              />
              <span
                className="text-body transition-colors duration-200 group-hover:text-[var(--color-brand-olive)]"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {year}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="label-eyebrow mb-4 text-[var(--color-text-tertiary)]">
          {t('filterBottleSize')}
        </h4>
        <div className="space-y-3">
          {filterOptions.sizes.map(size => (
            <label key={size} className="flex items-center gap-3 cursor-pointer group min-h-[36px]">
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => handleFilterChange('sizes', size)}
                className="w-4 h-4 rounded"
                style={{ accentColor: 'var(--color-brand-olive)' }}
              />
              <span
                className="text-body transition-colors duration-200 group-hover:text-[var(--color-brand-olive)]"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[var(--color-surface-primary)]">

      {/* Hero Section — LCP image, kept static (no parallax cost) */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://storage.googleapis.com/kallmi/images/hand-harvested.webp"
            alt={t('heroImageAlt')}
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B7355]/20 via-transparent to-[#8B7355]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen text-center text-white px-4 sm:px-6 pt-24 lg:pt-32 pb-16">
          <div className="max-w-5xl space-y-6 sm:space-y-8">
            <FadeIn animation="fade" delay={0.2} className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kallmi-oil-white.svg" alt="Kallmi Oil" style={{ width: '220px', height: '50px', objectFit: 'contain' }} className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
            </FadeIn>
            <FadeIn animation="slide-up" delay={0.4}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-[0]">
                {t('heroTitle')}
              </h1>
            </FadeIn>
            <FadeIn animation="fade" delay={0.6} className="flex items-center justify-center space-x-3">
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <div className="w-1.5 h-1.5 bg-[#C4A862] rounded-full" />
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </FadeIn>
            <FadeIn animation="slide-up" delay={0.7}>
              <p className="text-lg sm:text-xl font-sans font-light italic opacity-90 max-w-2xl mx-auto">
                {t('heroSubtitle')}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Filter Toggle — Mobile floating action */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        aria-label={t('filterRefine')}
        className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
        style={{ backgroundColor: 'var(--color-brand-olive)', color: 'white' }}
      >
        {showFilters ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <FunnelIcon className="w-6 h-6" />
        )}
      </button>

      {/* Main Content */}
      <Section background="default" spacing="lg">
        {/* Collection Stats */}
        <FadeIn animation="fade" className="mb-14 sm:mb-20">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {[
              { number: '3', label: t('statPremiumOils') },
              { number: '2024', label: t('statFreshHarvest') },
              { number: '100%', label: t('statExtraVirgin') }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-3xl sm:text-4xl font-light mb-1"
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
              </div>
            ))}
          </div>
          <div className="divider-accent mx-auto mt-8" />
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* Filter Sidebar — desktop */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="text-heading flex items-center gap-2 mb-8 text-[var(--color-brand-olive)]">
                <FunnelIcon className="w-5 h-5" />
                <span>{t('filterRefine')}</span>
              </h3>
              {filterGroups}
            </div>
          </aside>

          {/* Filter Drawer — mobile */}
          {showFilters && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/40"
              onClick={() => setShowFilters(false)}
            >
              <div
                className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-[var(--color-surface-primary)] p-6 overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-light flex items-center gap-2 text-[var(--color-brand-olive)]">
                    <FunnelIcon className="w-5 h-5" />
                    <span>{t('filterRefine')}</span>
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    aria-label={t('filterRefine')}
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                {filterGroups}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <FadeIn
                  key={product.id}
                  animation="slide-up"
                  delay={index * 0.1}
                >
                  <Card
                    variant="elevated"
                    hover
                    padding="none"
                    className="relative overflow-hidden group h-full flex flex-col"
                  >
                    {/* Featured Badge */}
                    {product.featured && (
                      <div
                        className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: 'var(--color-brand-gold)' }}
                      >
                        {t('featured')}
                      </div>
                    )}

                    {/* Product Image */}
                    <div
                      className="relative aspect-[3/4] p-8"
                      style={{ backgroundColor: 'var(--color-surface-secondary)' }}
                    >
                      <Image
                        src={product.image}
                        alt={t(product.nameKey as any)}
                        fill
                        loading="lazy"
                        className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        quality={90}
                      />
                    </div>

                    {/* Product Info */}
                    <CardBody className="flex flex-col flex-1 p-6 space-y-4">
                      <div className="space-y-2">
                        <h2
                          className="text-xl font-light"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {t(product.nameKey as any)}
                        </h2>
                        <p
                          className="text-sm"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          {product.year} {t('harvest')} • {product.size}
                        </p>
                        <p className="text-body text-sm">
                          {t(product.descriptionKey as any)}
                        </p>
                      </div>

                      {/* Price and Action */}
                      <div className="mt-auto pt-4 border-t border-border-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                            className="w-full sm:w-auto"
                          >
                            {addedToCart === product.id ? (
                              <span className="flex items-center justify-center gap-2">
                                <CheckCircleIcon className="w-4 h-4" />
                                <span>{t('added')}</span>
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-2">
                                <ShoppingCartIcon className="w-4 h-4" />
                                <span>{t('add')}</span>
                              </span>
                            )}
                          </Button>
                        ) : (
                          <span
                            className="text-sm text-center px-4 py-2 rounded-lg w-full sm:w-auto"
                            style={{
                              backgroundColor: 'var(--color-surface-tertiary)',
                              color: 'var(--color-text-tertiary)'
                            }}
                          >
                            {t('comingSoon')}
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
                    {t('noProductsFound')}
                  </h3>
                  <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                    {t('tryAdjustingFilters')}
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
