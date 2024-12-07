'use client'

import Link from 'next/link'
import { AnimateDiv } from '../motion/MotionWrapper'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-stone-900 text-white">
      <AnimateDiv
        className="max-w-3xl mx-auto px-4 text-center"
        animation="slide-up"
        duration={0.8}
      >
        <h2 className="text-4xl mb-6">Experience Our Heritage</h2>
        <p className="text-xl mb-10 opacity-90">
          Visit our estate in Durrës or contact us to learn more about our premium olive oil
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/contact#visit"
            className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-md hover:bg-white/30 transition-colors"
          >
            Visit Our Estate
          </Link>
          <Link
            href="/contact"
            className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-md hover:bg-white/20 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </AnimateDiv>
    </section>
  )
}