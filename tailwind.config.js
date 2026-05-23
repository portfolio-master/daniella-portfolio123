/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
          600: '#B08D1E',
        },
        dark: {
          900: '#0A0A0A',
          800: '#141414',
          700: '#1F1F1F',
        }
      }
    },
  },
  plugins: [],
}