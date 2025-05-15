/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'], // substitui o padrão "sans" por Inter
      },
      colors: {
        gray: {
          100: '#f2f2f2',
          200: '#D9D9D9',
          300: '#808080',
          400: '#333333',
          500: '#262626',
          600: '#1a1a1a',
          700: '#0D0D0D',
        },
        blue: '#4ea8de',
        bluedark: '#1e6f9f',
        purpledark: '#5e60ce',
        purple: '#8284fa',
      },
      Width: {
        input: '638px',
      },

      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        // slideUpAndFade: {
        //   from: { opacity: 1 },
        //   to: { opacity: 0 },
        // },
      },

      animation: {
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        // slideUpAndFade: 'slideUpAndFade 1s linear',
      },
    },
  },
  plugins: [],
}
