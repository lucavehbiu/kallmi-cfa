'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import type { LinkProps } from 'next/link'
import { XMarkIcon, Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'

export function Header() {
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

  type NavItem = {
    name: string;
    href: LinkProps<string>['href']
  }

  const navItems: NavItem[] = [
    { name: 'Our Story', href: '/our-story' },
    { name: 'Restaurant', href: '/restaurant' },
    { name: 'Camping', href: '/camping' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">

          {/* Logo */}
          <div className="group transition-all duration-300 hover:scale-105">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
              <Image
                src="/images/logo.webp"
                alt="Kallmi Estate"
                  width={48}
                  height={48}
                  className={`w-auto h-8 transition-all duration-300 group-hover:opacity-90
                    ${scrolled ? 'brightness-0' : 'brightness-0 invert'}`}
                />
                {/* Floating glow effect */}
                <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
              <div className={`hidden sm:block transition-colors duration-300
                ${scrolled ? 'text-[#8B7355]' : 'text-white'}`}>
                <div className="text-lg font-light tracking-wider">KALLMI</div>
                <div className="text-xs font-medium tracking-widest uppercase opacity-70">Estate</div>
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

              {/* Enhanced Mini Cart Dropdown */}
              {isCartOpen && (
                <div
                  className="absolute right-0 mt-4 w-96 max-w-[90vw] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 z-50 overflow-hidden transform transition-all duration-300 ease-out"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#8B7355] to-[#A0845C] p-6 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Shopping Cart</h3>
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
                        <p className="text-gray-500 font-medium">Your cart is empty</p>
                        <p className="text-gray-400 text-sm mt-1">Add some products to get started</p>
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
                            Proceed to Checkout
                            </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Cart */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Cart Icon */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCartOpen(!isCartOpen)
                }}
                className={`p-2 rounded-xl transition-all duration-300
                  ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              </button>
            </div>

            {/* Hamburger Menu */}
            <button
              className={`p-2 rounded-xl transition-all duration-300 hover:scale-95 active:scale-90
                ${scrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'}`}
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
              }}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 origin-center
                  ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300
                  ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 origin-center
                  ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-xl
            transition-all duration-500 ease-out overflow-hidden
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-6 space-y-2">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="px-6 py-2"
                style={{
                  animationDelay: isOpen ? `${index * 100}ms` : '0ms',
                  animation: isOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                }}
              >
                <Link
                  href={item.href}
                  className="block text-gray-800 hover:text-[#8B7355] transition-all duration-300
                    text-lg font-medium py-2 px-4 rounded-xl hover:bg-[#8B7355]/5
                    transform hover:translate-x-2 hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>

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