'use client'

import { BeakerIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline'

const tastingNotes = [
  {
    title: 'Aroma',
    description: 'Fresh cut grass, green tomato leaves, and a hint of Mediterranean herbs',
    icon: BeakerIcon
  },
  {
    title: 'Taste',
    description: 'Perfectly balanced with notes of artichoke, almond, and fresh pepper',
    icon: SparklesIcon
  },
  {
    title: 'Finish',
    description: 'Long-lasting peppery finish with a smooth, velvety mouthfeel',
    icon: FireIcon
  }
]

export default function TastingNotes() {
  return (
    <section className="py-24 bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl sm:text-5xl font-light text-center text-[#8B7355] mb-16">
          Tasting Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {tastingNotes.map((note) => {
            const Icon = note.icon
            return (
              <div key={note.title} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#8B7355]/10 flex items-center justify-center group-hover:bg-[#8B7355]/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-[#8B7355]" />
                  </div>
                </div>
                <h3 className="text-2xl text-[#8B7355] mb-3">{note.title}</h3>
                <p className="text-gray-600 italic">{note.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}