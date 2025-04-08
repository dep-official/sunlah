/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nicholas: ['ltc-nicholas-cochin-pro', 'sans-serif'],
        seoul: ['SeoulNamsan', 'sans-serif'],
        verdana: ['Verdana', 'sans-serif']
      },
    },
  },
  plugins: [],
} 