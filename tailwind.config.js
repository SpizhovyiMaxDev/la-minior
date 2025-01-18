/* eslint-disable */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
      paint:["Rubik Wet Paint", "serif"],
    },
    extend: {
      screens: {
        xs: '415px',
      },
      height:{
        screen:"100dvh",
      }
    },
  },
  plugins: [],
}

