'use client'

import Link from 'next/link'
import { AnimateDiv } from '../motion/MotionWrapper'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact.webp"
          alt="Olive grove background"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay for readability */}
      </div>

      <AnimateDiv
        className="relative z-10 max-w-6xl mx-auto px-4"
        animation="slide-up"
        duration={0.8}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-6">Experience Our Heritage</h2>
          <p className="text-xl mb-10 opacity-90">
            Visit our estate in Durrës or contact us to learn more about our premium olive oil
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11983.527505482583!2d19.4110409697754!3d41.333181900000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134fda8c7a364bcd%3A0x8399697acbf36121!2sKallmi%20i%20Bukur!5e0!3m2!1sen!2snl!4v1733650293269!5m2!1sen!2snl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6 backdrop-blur-sm bg-black/30 p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>

              <a href="mailto:eldivehbiu@gmail.com" className="flex items-center space-x-4 hover:text-stone-300 transition-colors group">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <span className="text-lg">eldivehbiu@gmail.com</span>
              </a>

              <a href="tel:+355682450851" className="flex items-center space-x-4 hover:text-stone-300 transition-colors group">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <span className="text-lg">+355 682 450 851</span>
              </a>

              <a href="https://instagram.com/kallmi__bukur" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:text-stone-300 transition-colors group">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-lg">@kallmi__bukur</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/contact#visit"
                className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-md hover:bg-white/30 transition-colors text-center shadow-lg"
              >
                Visit Our Estate
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-md hover:bg-white/20 transition-colors text-center shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </AnimateDiv>
    </section>
  )
}