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
  const { cartCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  type NavItem = {
    name: string;
    href: LinkProps<string>['href']
  }

  const navItems: NavItem[] = [
    { name: 'Our Story', href: '/our-story' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'header-scrolled' : 'header-transparent'}
        ${isOpen ? 'bg-white/95 backdrop-blur-md' : ''}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="group transition-transform duration-200 hover:scale-[1.02]">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo.webp"
                alt="Kallmi Estate"
                width={45}
                height={45}
                className="w-auto h-10 transition-opacity duration-200 group-hover:opacity-90 brightness-0 invert"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm tracking-wide font-medium group transition-colors duration-300
                  ${scrolled ? 'text-neutral-800' : 'text-white'}`}
              >
                {item.name}
                <span className={`absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 ease-out
                  ${scrolled ? 'bg-neutral-800' : 'bg-white'}`}
                />
              </Link>
            ))}

            {/* Cart Icon */}
            <div className="relative group">
              <ShoppingCartIcon
                className={`w-6 h-6 transition-colors duration-300
                  ${scrolled ? 'text-neutral-800' : 'text-white'}`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
            <div className="relative">
              <ShoppingCartIcon
                className={`w-6 h-6 ${scrolled ? 'text-neutral-800' : 'text-white'}`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            <button
              className="transition-transform duration-200 hover:scale-95 active:scale-90"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className={`w-6 h-6 ${scrolled ? 'text-neutral-800' : 'text-white'}`} />
              ) : (
                <Bars3Icon className={`w-6 h-6 ${scrolled ? 'text-neutral-800' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg
          transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.name} className="px-8 py-3">
                <Link
                  href={item.href}
                  className="block text-neutral-800 hover:text-neutral-950 transition-colors duration-200
                    text-lg font-medium hover:translate-x-1 transform transition-transform"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header