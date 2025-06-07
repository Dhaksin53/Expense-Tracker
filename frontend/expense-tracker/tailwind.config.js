/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#875cf5', // enables bg-primary, text-primary, etc.
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'], // enables font-display
      },
    },
  },
  plugins: [],
}
