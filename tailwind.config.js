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
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... } for tablet

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    }
  },
  plugins: [],
}


module.exports = tailwindConfig
