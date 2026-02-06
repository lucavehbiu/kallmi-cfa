import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Semantic color tokens
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Brand colors
        brand: {
          olive: '#8B7355',
          'olive-light': '#A0845C',
          'olive-dark': '#6B563F',
          gold: '#D4AF37',
          'gold-light': '#E5C766',
          'gold-dark': '#B8962F',
        },
        // Surface colors for backgrounds
        surface: {
          primary: '#FAFAF8',      // warm white - main background
          secondary: '#F5F3EF',    // cards, elevated surfaces
          tertiary: '#EBE7E0',     // hover states, borders
          inverse: '#1A1814',      // dark sections
          'inverse-soft': '#2A2620', // dark section cards
        },
        // Text colors
        text: {
          primary: '#1A1814',      // main text
          secondary: '#5C584F',    // secondary text
          tertiary: '#8A8578',     // muted text
          accent: '#8B7355',       // brand text
          'on-dark': '#FAFAF8',    // text on dark backgrounds
          'on-dark-muted': '#B8B4AC', // muted text on dark
        },
        // Border colors
        border: {
          light: '#EBE7E0',
          DEFAULT: '#D4CFC4',
          dark: '#B8B4AC',
        },
      },
      // Golden ratio typography scale (1.618)
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.618rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.618rem', { lineHeight: '2.25rem' }],     // golden
        '3xl': ['2rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.618rem', { lineHeight: '3rem' }],        // golden²
        '5xl': ['3.236rem', { lineHeight: '3.5rem' }],
        '6xl': ['4.236rem', { lineHeight: '4.5rem' }],      // golden³
        '7xl': ['5.236rem', { lineHeight: '5.5rem' }],
        '8xl': ['6.854rem', { lineHeight: '7rem' }],        // golden⁴
        'display': ['4.236rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['6.854rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      // Golden ratio spacing scale
      spacing: {
        'golden-xs': '0.382rem',   // ~6px  (1/golden²)
        'golden-sm': '0.618rem',   // ~10px (1/golden)
        'golden-md': '1rem',       // 16px  (base)
        'golden-lg': '1.618rem',   // ~26px (golden)
        'golden-xl': '2.618rem',   // ~42px (golden²)
        'golden-2xl': '4.236rem',  // ~68px (golden³)
        'golden-3xl': '6.854rem',  // ~110px (golden⁴)
        'golden-4xl': '11.09rem',  // ~177px (golden⁵)
      },
      // Font families
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      // Border radius
      borderRadius: {
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      // Box shadows - more subtle, less "AI generic"
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.03)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.15)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 10px 40px -10px rgb(0 0 0 / 0.08)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      // Animations - more restrained
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        // Remove pulse animations - they look too "AI"
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      // Transitions
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
