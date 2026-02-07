'use client'

import Link from 'next/link'
import { AnimateDiv } from '../motion/MotionWrapper'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  HeartIcon,
  SparklesIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50 font-cormorant overflow-hidden">

      {/* Hero Section - matching restaurant style */}
      <section className="relative min-h-[70vh] lg:min-h-[60vh] overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image
            src="/images/entrance.webp"
            alt="Kallmi Estate Entrance - Welcome to Our Heritage"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 sm:px-6 py-20">
          <div className="max-w-4xl space-y-6">
            <AnimateDiv animation="fade" duration={1.0} delay={0.2}>
              <div className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/10 text-white border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium tracking-wide">
                <EnvelopeIcon className="w-4 h-4" />
                Get in Touch
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.3}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-wide">
                Contact
                <span className="block text-3xl sm:text-5xl lg:text-6xl italic text-[#D4AF37] mt-2">
                  Us
                </span>
              </h1>
            </AnimateDiv>

            <AnimateDiv animation="fade" duration={1.0} delay={0.5}>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-px bg-white/40" />
                <HeartIcon className="w-5 h-5 text-[#D4AF37]" />
                <div className="w-16 h-px bg-white/40" />
              </div>
            </AnimateDiv>

            <AnimateDiv animation="slide-up" duration={1.2} delay={0.6}>
              <p className="text-lg sm:text-xl lg:text-2xl font-light opacity-90 max-w-2xl mx-auto">
                Visit our estate in the heart of Albania's olive country and discover
                the <span className="text-[#D4AF37]">timeless traditions</span> behind our liquid gold
              </p>
            </AnimateDiv>

            {/* Info Cards */}
            <AnimateDiv animation="slide-up" duration={1.0} delay={0.8}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: MapPinIcon, text: "Durrës, Albania" },
                  { icon: ClockIcon, text: "Open Daily" },
                  { icon: SparklesIcon, text: "Estate Tours" },
                ].map((item, index) => (
                  <div key={index} className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl px-4 py-3 min-w-[120px] text-center">
                    <item.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                    <p className="text-white/90 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimateDiv>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <div className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-stone-50">
        <AnimateDiv
          className="max-w-7xl mx-auto px-4 sm:px-6"
          animation="fade"
          duration={1.0}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Contact Information Side */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-block">
                  <span className="text-sm sm:text-base text-[#8B7355] font-medium tracking-widest uppercase">
                    Connect With Us
                  </span>
                  <div className="w-16 h-px bg-[#8B7355] mt-2" />
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight text-[#8B7355] leading-tight">
                  Visit Our
                  <span className="block italic mt-1 sm:mt-2">Estate</span>
                </h2>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4 sm:space-y-6">
                <AnimateDiv
                  animation="slide-up"
                  delay={0.2}
                  className="group"
                >
                  <a
                    href="mailto:kallmibukur@gmail.com"
                    className="flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 backdrop-blur-sm bg-white/60 rounded-2xl sm:rounded-3xl border border-white/40 hover:border-[#8B7355]/30 transition-all duration-300 hover:shadow-xl group-hover:scale-[1.02]"
                  >
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-[#8B7355]/10 to-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <EnvelopeIcon className="w-6 sm:w-8 h-6 sm:h-8 text-[#8B7355]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-gray-600 font-light">Email Us</p>
                      <p className="text-base sm:text-lg lg:text-xl text-[#8B7355] font-light group-hover:text-[#A0845C] transition-colors duration-300">
                        kallmibukur@gmail.com
                      </p>
                    </div>
                  </a>
                </AnimateDiv>

                <AnimateDiv
                  animation="slide-up"
                  delay={0.4}
                  className="group"
                >
                  <a
                    href="tel:+355682450851"
                    className="flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 backdrop-blur-sm bg-white/60 rounded-2xl sm:rounded-3xl border border-white/40 hover:border-[#8B7355]/30 transition-all duration-300 hover:shadow-xl group-hover:scale-[1.02]"
                  >
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-[#8B7355]/10 to-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PhoneIcon className="w-6 sm:w-8 h-6 sm:h-8 text-[#8B7355]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-gray-600 font-light">Call Us</p>
                      <p className="text-base sm:text-lg lg:text-xl text-[#8B7355] font-light group-hover:text-[#A0845C] transition-colors duration-300">
                        +355 682 450 851
                      </p>
                    </div>
                  </a>
                </AnimateDiv>

                <AnimateDiv
                  animation="slide-up"
                  delay={0.6}
                  className="group"
                >
                  <a
                    href="https://instagram.com/kallmi_bukur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 backdrop-blur-sm bg-white/60 rounded-2xl sm:rounded-3xl border border-white/40 hover:border-[#8B7355]/30 transition-all duration-300 hover:shadow-xl group-hover:scale-[1.02]"
                  >
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-[#8B7355]/10 to-[#D4AF37]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 sm:w-8 h-6 sm:h-8 text-[#8B7355]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-gray-600 font-light">Follow Us</p>
                      <p className="text-base sm:text-lg lg:text-xl text-[#8B7355] font-light group-hover:text-[#A0845C] transition-colors duration-300">
                        @kallmi_bukur
                      </p>
                    </div>
                  </a>
                </AnimateDiv>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8">
                <Link
                  href="/contact#visit"
                  className="group inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#8B7355] to-[#A0845C] hover:from-[#A0845C] hover:to-[#8B7355] text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <MapPinIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Visit Our Estate</span>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center space-x-3 px-8 py-4 backdrop-blur-sm bg-white/60 border border-white/40 hover:border-[#8B7355]/30 text-[#8B7355] hover:text-[#A0845C] rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <HeartIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>

            {/* Map Side */}
            <div className="lg:col-span-5 order-1 lg:order-2 mb-8 lg:mb-0">
              <AnimateDiv
                animation="slide-up"
                duration={1.0}
                delay={0.3}
                className="relative group"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11983.527505482583!2d19.4110409697754!3d41.333181900000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134fda8c7a364bcd%3A0x8399697acbf36121!2sKallmi%20i%20Bukur!5e0!3m2!1sen!2snl!4v1733650293269!5m2!1sen!2snl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-3xl"
                  />
                  {/* Floating Frame Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#8B7355]/20 to-transparent rounded-3xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </AnimateDiv>
            </div>
          </div>
        </AnimateDiv>
      </div>

      {/* Heritage Quote Section */}
      <div className="relative py-16 sm:py-24 bg-gradient-to-b from-stone-50/50 to-white">
        <AnimateDiv
          className="max-w-4xl mx-auto px-4 sm:px-6 text-center"
          animation="fade"
          duration={1.0}
        >
          <div className="backdrop-blur-sm bg-white/60 rounded-3xl p-8 lg:p-12 border border-white/40">
            <SparklesIcon className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 italic font-light leading-relaxed mb-6">
              "Every drop of our olive oil carries the essence of Albanian soil,
              the warmth of Mediterranean sun, and the love of generations who have
              tended these ancient groves."
            </blockquote>
            <div className="w-16 h-px bg-[#8B7355] mx-auto mb-4" />
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Vehbiu Family
            </p>
          </div>
        </AnimateDiv>
      </div>
    </section>
  )
}