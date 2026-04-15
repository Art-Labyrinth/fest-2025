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
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.bg-main': {
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('https://files.art-labyrinth.org/fest2025/sm_back-main-page.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '@screen md': {
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('https://files.art-labyrinth.org/fest2025/md_back-main-page.webp')",
          },
          '@screen lg': {
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('https://files.art-labyrinth.org/fest2025/lg_back-main-page.webp')",
          },
          '@screen xl': {
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('https://files.art-labyrinth.org/fest2025/xl_back-main-page.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('https://files.art-labyrinth.org/fest2025/2xl_back-main-page.webp')",
          },
        },
      });
    },
    function ({ addBase }) {
      addBase({
        'body': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'background-color': '#F4E4C3',
          'font-family': 'RocaOne, serif',
        },
      });
    },
  ],
}
