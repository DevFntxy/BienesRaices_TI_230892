/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      animation: {
        'fade-out': 'fadeOut 3s ease-in-out forwards', // Dura 3 segundos
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)', display: 'none' },
          
        },
      },
      colors: {
        sesniprymary: {
          DEFAULT: "#006DAA",
          700: "#006DAA",
        },
        sesnisecondary: {
          DEFAULT: "#0353A4",
        },
        sesnitercery: {
          DEFAULT: "#003559",
        },
      },
    },
  },
  plugins: [],
}