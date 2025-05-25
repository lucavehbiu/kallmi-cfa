'use client'

import Image from 'next/image'
import { certifications } from '@/data/content'

export default function Certifications() {
  return (
    <section className="py-24 bg-white relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(#8B7355 0.5px, transparent 0.5px)`,
          backgroundSize: '10px 10px',
          opacity: 0.5
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-100">
              <Image src="/images/sustainability.webp" alt="Sustainability" fill className="object-cover" />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-light text-[#8B7355]">Sustainability & Heritage</h2>
            <div className="space-y-6">
              {certifications.map((cert) => (
                <div key={cert.title} className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B7355]/20 transition-colors duration-300">
                    <div className="w-6 h-6 text-[#8B7355]">
                      <cert.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-[#8B7355] mb-2 group-hover:text-[#6B563F] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}