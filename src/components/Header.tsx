'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Hamburger from 'hamburger-react'
import { useCart } from '@/context/CartContext'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useTranslations } from 'next-intl'

export function Header() {
  const t = useTranslations('Navigation')
  const tCart = useTranslations('Cart')
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartCount, cartItems, removeFromCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false)
      if (isCartOpen) setIsCartOpen(false)
    }

    if (isOpen || isCartOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, isCartOpen])

  const navItems: Array<{ name: string; href: string }> = [
    { name: t('stay'), href: '/stay' },
    { name: t('restaurant'), href: '/restaurant' },
    { name: t('shop'), href: '/shop' },
    { name: t('camping'), href: '/camping' },
    { name: t('ourStory'), href: '/our-story' },
    { name: t('contact'), href: '/contact' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
      ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5' : 'bg-transparent'}
      lg:bg-transparent lg:pt-4 lg:px-8`}>
      <nav className={`max-w-7xl mx-auto px-4 lg:px-0 transition-all duration-500 ease-out
        ${scrolled
          ? 'lg:bg-white/90 lg:backdrop-blur-xl lg:shadow-lg lg:rounded-none lg:border-b lg:border-white/20 lg:px-10'
          : 'lg:bg-black/30 lg:backdrop-blur-[8px] lg:rounded-full lg:px-14'
        }`}>
        <div className="flex justify-between items-center h-16 lg:h-20">

          {/* Logo */}
          <div className="group transition-all duration-300 hover:scale-105">
            <Link href="/" className="flex items-center">
              <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scrolled ? '/kallmi-black.svg' : '/kallmi-white.svg'}
                alt="Kallmi Estate"
                style={{ width: '120px', height: '35px', objectFit: 'contain' }}
                className="transition-all duration-300 group-hover:opacity-90"
              />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm xl:text-base tracking-wide font-medium group transition-all duration-300 hover:scale-105
                  ${scrolled ? 'text-gray-700 hover:text-[#8B7355]' : 'text-white/90 hover:text-white'}`}
              >
                {item.name}

                {/* Animated underline */}
                <span className={`absolute inset-x-0 -bottom-2 h-0.5 scale-x-0 group-hover:scale-x-100
                  transition-all duration-500 ease-out origin-center rounded-full
                  ${scrolled ? 'bg-[#8B7355]' : 'bg-white'}`}
                />

                {/* Floating dot indicator */}
                <span className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full
                  scale-0 group-hover:scale-100 transition-all duration-300 delay-100
                  ${scrolled ? 'bg-[#8B7355]' : 'bg-white'}`}
                />
              </Link>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher scrolled={scrolled} />

            {/* Enhanced Cart Icon */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCartOpen(!isCartOpen)
                }}
                className={`relative group p-2 rounded-2xl transition-all duration-300 hover:scale-110
                  ${scrolled
                    ? 'hover:bg-[#8B7355]/10 text-gray-700 hover:text-[#8B7355]'
                    : 'hover:bg-white/10 text-white/90 hover:text-white'
                  }`}
              >
                <ShoppingCartIcon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />

                {/* Cart count badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                    {cartCount}
                  </span>
                )}

                {/* Floating glow */}
                <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="lg:hidden flex items-center space-x-1">
            {/* Mobile Language Switcher */}
            <LanguageSwitcher scrolled={scrolled} />

            {/* Hamburger Menu */}
            <div onClick={(e) => e.stopPropagation()}>
              <Hamburger
                toggled={isOpen}
                toggle={setIsOpen}
                size={22}
                color={scrolled ? '#374151' : '#ffffff'}
                rounded
                label="Toggle menu"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu - Frosted glass dark */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-black/60 border-t border-white/10 shadow-xl
            transition-all duration-500 ease-out overflow-hidden
            ${isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-6 space-y-1">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="px-6"
                style={{
                  animationDelay: isOpen ? `${index * 60}ms` : '0ms',
                  animation: isOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                }}
              >
                <Link
                  href={item.href}
                  className="block text-white/90 hover:text-white transition-all duration-300
                    text-xl font-light tracking-wide py-3 px-4 rounded-xl hover:bg-white/10 border-b border-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}

            {/* Cart in mobile menu */}
            <div className="px-6 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                  setIsCartOpen(true)
                }}
                className="flex items-center space-x-3 w-full text-white/90 hover:text-white transition-all duration-300 text-xl font-light tracking-wide py-3 px-4 rounded-xl hover:bg-white/10"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                <span>{tCart('title')}</span>
                {cartCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Panel - fixed overlay, works on both mobile and desktop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[60]"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="absolute right-4 top-20 w-96 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B7355] to-[#A0845C] p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{tCart('title')}</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              {cartCount > 0 && (
                <p className="text-white/80 text-sm mt-1">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
              )}
            </div>

            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCartIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">{tCart('empty')}</p>
                  <p className="text-gray-400 text-sm mt-1">{tCart('emptyHint')}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-80 overflow-auto custom-scrollbar">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-200 group">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-medium text-gray-900 mb-4">
                      <p>Total</p>
                      <p className="text-[#8B7355]">
                        {formatPrice(
                          cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
                        )}
                      </p>
                    </div>
                    <Link
                      href="/checkout"
                      className="w-full flex justify-center items-center px-6 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] text-white rounded-2xl font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
                      onClick={() => setIsCartOpen(false)}
                    >
                      {tCart('proceedToCheckout')}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8B7355;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B563F;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  )
}

export default Header