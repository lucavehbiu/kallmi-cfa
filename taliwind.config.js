module.exports = {
    // ... other config
    extend: {
      keyframes: {
        'subtle-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite alternate',
        'fade-in-up': 'fade-in-up 1s ease-out forwards'
      }
    }
  }