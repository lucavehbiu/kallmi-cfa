'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { useState, useRef, useEffect } from 'react'
import { GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const localeLabels: Record<Locale, { short: string; full: string }> = {
  en: { short: 'EN', full: 'English' },
  sq: { short: 'SQ', full: 'Shqip' },
  it: { short: 'IT', full: 'Italiano' },
  de: { short: 'DE', full: 'Deutsch' },
  fr: { short: 'FR', full: 'Français' },
}

export function LanguageSwitcher({ scrolled = false }: { scrolled?: boolean }) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105
          ${scrolled
            ? 'text-gray-700 hover:text-[#8B7355] hover:bg-[#8B7355]/10'
            : 'text-white/90 hover:text-white hover:bg-white/10'
          }`}
      >
        <GlobeAltIcon className="w-4 h-4" />
        <span>{localeLabels[locale].short}</span>
        <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 flex items-center justify-between
                ${loc === locale
                  ? 'bg-[#8B7355]/10 text-[#8B7355] font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-[#8B7355]'
                }`}
            >
              <span>{localeLabels[loc].full}</span>
              <span className="text-xs text-gray-400">{localeLabels[loc].short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
