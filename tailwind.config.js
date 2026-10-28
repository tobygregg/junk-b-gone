/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Island green – sampled from the Guernsey shape in the logo (#7AB83C)
        leaf: {
          50: '#F3F8EC',
          100: '#E4F0D6', // pale tint used behind illustrations
          200: '#C9E2AC',
          300: '#A9D276', // leaves in the illustrations
          DEFAULT: '#7AB83C',
          600: '#5C9A26',
          700: '#467A1C', // buttons and links (passes contrast on white)
          800: '#355D16',
          900: '#20391A', // reviews band
        },
        // Brick red – sampled from the "Junk-B-Gone" lettering in the logo (#933A1A)
        rust: {
          50: '#FBEEE8',
          100: '#F5D9CC',
          400: '#CC6E45',
          500: '#B4532C',
          DEFAULT: '#933A1A',
          700: '#7A2F14',
        },
        // Cardboard and timber – from the brown in the logo palette (#956725)
        card: { light: '#F3D9A3', DEFAULT: '#E2B56B', dark: '#956725' },
        // Deep green-black for text and illustration outlines
        ink: { DEFAULT: '#1F2A17', soft: '#4A5442', muted: '#6B7363' },
        paper: '#FAF8F2',
      },
      fontFamily: {
        display: ['Rokkitt', 'Rockwell', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
      boxShadow: {
        card: '0 1px 2px rgba(31,42,23,.06), 0 8px 24px -12px rgba(31,42,23,.18)',
        lift: '0 2px 4px rgba(31,42,23,.06), 0 18px 36px -16px rgba(31,42,23,.28)',
        bar: '0 -6px 24px -8px rgba(31,42,23,.22)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(18px)' }, '100%': { opacity: '1', transform: 'none' } },
        'panel-in': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
        'panel-in': 'panel-in .45s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
