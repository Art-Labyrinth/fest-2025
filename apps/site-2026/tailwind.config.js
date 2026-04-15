/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        deledda: ['Deledda', 'sans-serif'],
        evolventa: ['Evolventa', 'sans-serif'],
        roca: ['RocaOne', 'serif'],
      },
      colors: {
        brown: '#351904',
        orange: {
          150: '#F4E4C3',
          500: '#f97316',
        },
      },
    },
  },
  plugins: [],
}
