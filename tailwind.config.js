// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Adjust this to match your project structure
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 0.7s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}