/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./ui/*.js', './client/*.html'],
  theme: {
    extend: {
      colors: {
        woodsmoke: {
          50: '#f3f6f8',
          100: '#e1e9ec',
          200: '#c6d3db',
          300: '#9fb6c1',
          400: '#718f9f',
          500: '#557485',
          600: '#496071',
          700: '#40525e',
          800: '#3a4650',
          900: '#343d45',
          950: '#090b0d',
        },
      },
    },
  },
  plugins: [],
};
