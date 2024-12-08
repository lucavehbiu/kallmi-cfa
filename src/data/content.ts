import {
  NoSymbolIcon,
  FireIcon,
  SparklesIcon,
  CheckBadgeIcon,
  MapPinIcon,
  StarIcon,
  NewspaperIcon,
  BookOpenIcon,
  TrophyIcon,
  HandRaisedIcon,
  BeakerIcon,
  HomeModernIcon
} from '@heroicons/react/24/outline'
import type { ElementType } from 'react'

interface Feature {
  title: string
  description: string
  image: string
  icon: ElementType
}

interface TastingNote {
  title: string
  description: string
  icon: ElementType
}

interface Certification {
  title: string
  description: string
  icon: ElementType
}

interface PressReview {
  quote: string
  source: string
  imageUrl: string
}

export const features: Feature[] = [
  {
    title: 'Hand-Harvested',
    description: 'Each olive carefully selected at peak ripeness from our century-old groves',
    image: '/images/hand-harvested.webp',
    icon: HandRaisedIcon
  },
  {
    title: 'Cold-Pressed',
    description: 'Pressed within hours of harvest to capture the purest flavors',
    image: '/images/cold-pressed.webp',
    icon: BeakerIcon
  },
  {
    title: 'Family Legacy',
    description: "Five generations of olive oil craftsmanship on Kallmi's pristine coast",
    image: '/images/family-legacy.webp',
    icon: HomeModernIcon
  }
]

export const tastingNotes: TastingNote[] = [
  {
    title: 'Aroma',
    description: 'Fresh cut grass, green tomato leaves, and a hint of Mediterranean herbs',
    icon: NoSymbolIcon
  },
  {
    title: 'Taste',
    description: 'Perfectly balanced with notes of artichoke, almond, and fresh pepper',
    icon: FireIcon
  },
  {
    title: 'Finish',
    description: 'Long-lasting peppery finish with a smooth, velvety mouthfeel',
    icon: SparklesIcon
  }
]

export const certifications: Certification[] = [
  {
    title: 'Organic Certified',
    description: 'Our olives are grown without pesticides or artificial fertilizers, certified by the European Union Organic Farming standards.',
    icon: CheckBadgeIcon
  },
  {
    title: 'Protected Geographical Indication',
    description: 'Recognized by the EU for our unique terroir and traditional production methods in the Kallmi region.',
    icon: MapPinIcon
  },
  {
    title: 'Extra Virgin Grade A+',
    description: 'Certified by the International Olive Council for exceptional quality and purity.',
    icon: StarIcon
  }
]

export const pressReviews: PressReview[] = [
  {
    source: 'Olive Oil Times',
    quote: 'A remarkable oil that captures the essence of Albania\'s ancient olive-growing tradition.',
    imageUrl: '/images/olive_oil_times.webp'
  },
  {
    source: 'Gourmet Magazine',
    quote: 'One of the finest Mediterranean olive oils we\'ve tasted this year.',
    imageUrl: '/images/gourmet.webp'
  },
  {
    source: 'Food & Wine',
    quote: 'A hidden gem from Albania that deserves a place among the world\'s premium olive oils.',
    imageUrl: '/images/foo_and_wine.webp'
  }
]