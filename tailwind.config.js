/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          cream: '#FFFBF5',
          card: '#FFFDF9',
          gold: '#E59124',
          amber: '#C86D27',
          jaggery: '#8C4617',
          chocolate: '#3D2314',
          wheat: '#F5E6CF',
          pink: '#FF6B8B',
          pinkLight: '#FFF0F3',
          teal: '#0EA5E9',
          tealLight: '#F0F9FF',
          green: '#22C55E'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'bakery': '0 10px 30px -5px rgba(140, 70, 23, 0.1), 0 4px 12px rgba(0,0,0,0.04)',
        'bakery-hover': '0 20px 40px -10px rgba(140, 70, 23, 0.18), 0 8px 16px rgba(0,0,0,0.06)',
        'glow': '0 0 25px rgba(229, 145, 36, 0.25)',
      }
    },
  },
  plugins: [],
}
