/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['RocaOne', 'sans-serif'],
        deledda: ['Deledda', 'sans-serif'],
      },
      colors: {
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          150: '#F4E4C3',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        matchaGreen: {
          DEFAULT: '#A8B400',
          50: '#C0CCA440',
          hover: '#7A8D00',
        },
        customOrange: {
          DEFAULT: '#F07B17',
          hover: '#BE6010',
          disabled: '#F6D8B4',
        },
      },
      backgroundImage: {
        'custom-red-black': 'linear-gradient(to bottom, rgba(241, 156, 85, 0.3), rgba(241, 156, 85, 0.3) 60%, #0F0809)',
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.bg-main': {
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/public/img/sm_back-main-page.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '@screen md': {
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/public/img/md_back-main-page.webp')",
          },
          '@screen lg': {
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/public/img/lg_back-main-page.webp')",
          },
          '@screen xl': {
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/public/img/xl_back-main-page.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/public/img/2xl_back-main-page.webp')",
          },
        },
      });
    },
  ],
};

