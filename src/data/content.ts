interface Feature {
  title: string
  description: string
  image: string
}

interface TastingNote {
  title: string
  description: string
  icon: string
}

interface Certification {
  title: string
  description: string
  icon: string
}

interface PressReview {
  quote: string
  source: string
  logo: string
}

export const features: Feature[] = [
  {
    title: 'Hand-Harvested',
    description: 'Each olive carefully selected at peak ripeness from our century-old groves',
    image: '/images/hand-harvested.webp'
  },
  {
    title: 'Cold-Pressed',
    description: 'Pressed within hours of harvest to capture the purest flavors',
    image: '/images/cold-pressed.webp'
  },
  {
    title: 'Family Legacy',
    description: "Five generations of olive oil craftsmanship on Kallmi's pristine coast",
    image: '/images/family-legacy.webp'
  }
]

export const tastingNotes: TastingNote[] = [
  {
    title: 'Aroma',
    description: 'Fresh cut grass, green tomato leaves, and a hint of Mediterranean herbs',
    icon: '/images/aroma-icon.svg'
  },
  {
    title: 'Taste',
    description: 'Perfectly balanced with notes of artichoke, almond, and fresh pepper',
    icon: '/images/taste-icon.svg'
  },
  {
    title: 'Finish',
    description: 'Long-lasting peppery finish with a smooth, velvety mouthfeel',
    icon: '/images/finish-icon.svg'
  }
]

export const certifications: Certification[] = [
  {
    title: 'Organic Certified',
    description: 'Our olives are grown without pesticides or artificial fertilizers, certified by the European Union Organic Farming standards.',
    icon: '/images/organic-cert.svg'
  },
  {
    title: 'Protected Geographical Indication',
    description: 'Recognized by the EU for our unique terroir and traditional production methods in the Kallmi region.',
    icon: '/images/pgi-cert.svg'
  },
  {
    title: 'Extra Virgin Grade A+',
    description: 'Certified by the International Olive Council for exceptional quality and purity.',
    icon: '/images/evoo-cert.svg'
  }
]

export const pressReviews: PressReview[] = [
  {
    source: 'Olive Oil Times',
    quote: 'A remarkable oil that captures the essence of Albania\'s ancient olive-growing tradition.',
    logo: '/images/olive-times-logo.svg'
  },
  {
    source: 'Gourmet Magazine',
    quote: 'One of the finest Mediterranean olive oils we\'ve tasted this year.',
    logo: '/images/gourmet-logo.svg'
  },
  {
    source: 'Food & Wine',
    quote: 'A hidden gem from Albania that deserves a place among the world\'s premium olive oils.',
    logo: '/images/food-wine-logo.svg'
  }
]