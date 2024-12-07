'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MotionDiv, MotionButton, AnimatePresence } from './motion/MotionWrapper'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (pathname !== '/') {
      window.location.href = `/#${sectionId}`
    }
  }

  return (
    <>
      <MotionDiv
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between max-w-[1920px] mx-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-2xl p-2"
            >
              <span className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                {isMobileMenuOpen ? '×' : '☰'}
              </span>
            </button>

            <div className="hidden md:flex space-x-16 flex-1 justify-start">
              <MotionDiv whileHover={{ y: -2 }}>
                <Link
                  href="/shop"
                  className={`font-cormorant text-lg ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-[#8B7355] transition-colors`}
                >
                  Shop
                </Link>
              </MotionDiv>
              <MotionButton
                onClick={() => scrollToSection('our-story')}
                className={`font-cormorant text-lg ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-[#8B7355] transition-colors`}
                whileHover={{ y: -2 }}
              >
                Our Story
              </MotionButton>
            </div>

            <Link
              href="/"
              className="text-2xl sm:text-3xl font-cormorant tracking-[0.3em] sm:tracking-[0.5em] text-center whitespace-nowrap"
            >
              KALLMI
            </Link>

            <div className="hidden md:flex space-x-16 flex-1 justify-end">
              <MotionButton
                onClick={() => scrollToSection('process')}
                className={`font-cormorant text-lg ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-[#8B7355] transition-colors`}
                whileHover={{ y: -2 }}
              >
                Process
              </MotionButton>
              <MotionDiv whileHover={{ y: -2 }}>
                <Link
                  href="/contact"
                  className={`font-cormorant text-lg ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-[#8B7355] transition-colors`}
                >
                  Contact
                </Link>
              </MotionDiv>
            </div>
          </nav>
        </div>
      </MotionDiv>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-40 bg-black/95 pt-24"
          >
            <nav className="flex flex-col items-center space-y-8 p-8">
              <MotionDiv whileHover={{ x: 10 }}>
                <Link
                  href="/shop"
                  className="font-cormorant text-2xl text-white hover:text-[#8B7355] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              </MotionDiv>
              {['our-story', 'process'].map((item) => (
                <MotionButton
                  key={item}
                  onClick={() => {
                    scrollToSection(item)
                    setIsMobileMenuOpen(false)
                  }}
                  className="font-cormorant text-2xl text-white hover:text-[#8B7355] transition-colors"
                  whileHover={{ x: 10 }}
                >
                  {item === 'our-story' ? 'Our Story' : 'Process'}
                </MotionButton>
              ))}
              <MotionDiv whileHover={{ x: 10 }}>
                <Link
                  href="/contact"
                  className="font-cormorant text-2xl text-white hover:text-[#8B7355] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </MotionDiv>
            </nav>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header