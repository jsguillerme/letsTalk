/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    screens: {
       'mobile': {'max': '890px'}
    },
    extend: {
      colors: {
        brand: {
          500: '#68B28A'
        },
        google: {
          500: '#EA4335'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}
