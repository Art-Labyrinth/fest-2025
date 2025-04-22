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
        '.bg-about-md-header': {
          backgroundImage: "url('/public/img/about/sm_header.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_header.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_header.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_header.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_header.webp')",
          },
        },
        '.bg-about-md-tema-goda': {
          backgroundImage: "url('/public/img/about/sm_tema-goda.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_tema-goda.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_tema-goda.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_tema-goda.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_tema-goda.webp')",
          },
        },
        '.bg-about-sm-o-festivale': {
          backgroundImage: "url('/public/img/about/sm_o-festivale.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_o-festivale.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_o-festivale.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_o-festivale.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_o-festivale.webp')",
          },
        },
        '.bg-about-md-art-labyrinth': {
          backgroundImage: "url('/public/img/about/sm_Art-Labyrinth.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_Art-Labyrinth.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_Art-Labyrinth.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_Art-Labyrinth.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_Art-Labyrinth.webp')",
          },
        },
        '.bg-about-md-live-music': {
          backgroundImage: "url('/public/img/about/sm_live-music.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_live-music.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_live-music.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_live-music.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_live-music.webp')",
          },
        },
        '.bg-about-md-card-performance': {
          backgroundImage: "url('/public/img/about/sm_card-performance.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_card-performance.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_card-performance.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_card-performance.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_card-performance.webp')",
          },
        },
        '.bg-about-md-installation': {
          backgroundImage: "url('/public/img/about/sm_installation.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_installation.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_installation.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_installation.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_installation.webp')",
          },
        },
        '.bg-about-md-workshops': {
          backgroundImage: "url('/public/img/about/sm_workshops.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_workshops.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_workshops.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_workshops.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_workshops.webp')",
          },
        },
        '.bg-about-md-ecology': {
          backgroundImage: "url('/public/img/about/sm_ecologu.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_ecologu.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_ecologu.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_ecologu.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_ecologu.webp')",
          },
        },
        '.bg-about-md-meditations': {
          backgroundImage: "url('/public/img/about/sm_meditations.webp')",
          '@screen md': {
            backgroundImage: "url('/public/img/about/md_meditations.webp')",
          },
          '@screen lg': {
            backgroundImage: "url('/public/img/about/lg_meditations.webp')",
          },
          '@screen xl': {
            backgroundImage: "url('/public/img/about/xl_meditations.webp')",
          },
          '@screen 2xl': {
            backgroundImage: "url('/public/img/about/2xl_meditations.webp')",
          },
        },
      });
    },
  ],
};

