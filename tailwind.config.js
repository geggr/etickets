/** @type {import('tailwindcss').Config} */

import pallete from './pallete'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Days One'],
        sans: ['Lexend', ...defaultTheme.fontFamily.sans]
      },
      colors: pallete
    },
  },
  plugins: [],
}

