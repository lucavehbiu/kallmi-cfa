'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50  backdrop-blur-md border-b border-stone-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.webp"
              alt="Kallmi Estate"
              width={40}
              height={40}
              className="w-auto h-8"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#our-story" className="text-stone-600 hover:text-stone-900 transition-colors">
              Our Story
            </Link>
            <Link href="/shop" className="text-stone-600 hover:text-stone-900 transition-colors">
              Shop
            </Link>
            <Link href="/limited-edition" className="text-stone-600 hover:text-stone-900 transition-colors">
              Limited Edition
            </Link>
            <Link href="/contact" className="text-stone-600 hover:text-stone-900 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header