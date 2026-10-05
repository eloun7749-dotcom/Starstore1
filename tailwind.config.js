/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F9F6F1',
        'cream-dark': '#F6F3EE',
        espresso: '#1A1412',
        'espresso-light': '#2E2824',
        'espresso-mid': '#4B423C',
        terracotta: '#8C7365',
        'sage-green': '#C6CBAD',
        'shadow-olive': '#3E4233',
        vellum: '#E6E1D6',
        'sage-dark': '#9CA583',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'steam': 'steam 3s ease-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(0) scaleX(1)' },
          '50%': { opacity: '0.3' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scaleX(2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
