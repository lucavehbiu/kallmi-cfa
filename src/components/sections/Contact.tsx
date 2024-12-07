'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-stone-900 text-white">
      <motion.div
        className="max-w-3xl mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl mb-6">Experience Our Heritage</h2>
        <p className="text-xl mb-10 opacity-90">
          Visit our estate in Durrës or contact us to learn more about our premium olive oil
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="#visit"
            className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-md hover:bg-white/30 transition-colors"
          >
            Visit Our Estate
          </Link>
          <Link
            href="#contact"
            className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-md hover:bg-white/20 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  )
}