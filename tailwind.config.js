module.exports = {
  // ... other config
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        fade: 'fade 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        scale: 'scale 0.3s ease-out forwards',
      },
    },
  },
} 