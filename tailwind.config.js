/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      },
      colors: {
        'blue-black': '#121c31',
      },
    },
  },
  plugins: [],
}

module.exports = tailwindConfig
