/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B4513',
          light: '#A0522D',
          dark: '#654321'
        },
        secondary: {
          DEFAULT: '#DAA520',
          light: '#FFD700',
          dark: '#B8860B'
        },
        accent: {
          DEFAULT: '#006400',
          light: '#228B22',
          dark: '#004D00'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
};