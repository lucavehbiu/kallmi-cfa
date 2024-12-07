'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimateDiv, AnimateButton, AnimatePresence } from './motion/MotionWrapper'

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
      <AnimateDiv
        animation="slide-down"
        duration={0.8}
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
              <AnimateDiv animation="fade" className="hover:-translate-y-1 transition-transform duration-200">
                <Link
                  href="/shop"
                  className={`font-cormorant text-lg ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-[#8B7355] transition-colors`}
                >
                  Shop
                </Link>
              </AnimateDiv>
              <AnimateButton
                animation="fade"
                className={`font-cormorant text-lg ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-[#8B7355] transition-colors hover:-translate-y-1`}
                onClick={() => scrollToSection('our-story')}
              >
                Our Story
              </AnimateButton>
            </div>

            <Link
              href="/"
              className="text-2xl sm:text-3xl font-cormorant tracking-[0.3em] sm:tracking-[0.5em] text-center whitespace-nowrap"
            >
              KALLMI
            </Link>

            <div className="hidden md:flex space-x-16 flex-1 justify-end">
              <AnimateButton
                animation="fade"
                className={`font-cormorant text-lg ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                } hover:text-[#8B7355] transition-colors hover:-translate-y-1`}
                onClick={() => scrollToSection('process')}
              >
                Process
              </AnimateButton>
              <AnimateDiv animation="fade" className="hover:-translate-y-1 transition-transform duration-200">
                <Link
                  href="/contact"
                  className={`font-cormorant text-lg ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  } hover:text-[#8B7355] transition-colors`}
                >
                  Contact
                </Link>
              </AnimateDiv>
            </div>
          </nav>
        </div>
      </AnimateDiv>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <AnimateDiv
            animation="slide-down"
            duration={0.4}
            className="fixed inset-0 z-40 bg-black/95 pt-24"
          >
            <nav className="flex flex-col items-center space-y-8 p-8">
              <AnimateDiv animation="slide-right" delay={0.1} className="hover:translate-x-2 transition-transform duration-200">
                <Link
                  href="/shop"
                  className="font-cormorant text-2xl text-white hover:text-[#8B7355] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              </AnimateDiv>
              {['our-story', 'process'].map((item, index) => (
                <AnimateButton
                  key={item}
                  animation="slide-right"
                  delay={0.2 + index * 0.1}
                  className="font-cormorant text-2xl text-white hover:text-[#8B7355] transition-colors hover:translate-x-2"
                  onClick={() => {
                    scrollToSection(item)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  {item === 'our-story' ? 'Our Story' : 'Process'}
                </AnimateButton>
              ))}
              <AnimateDiv animation="slide-right" delay={0.4} className="hover:translate-x-2 transition-transform duration-200">
                <Link
                  href="/contact"
                  className="font-cormorant text-2xl text-white hover:text-[#8B7355] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </AnimateDiv>
            </nav>
          </AnimateDiv>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header