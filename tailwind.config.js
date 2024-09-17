/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '6.5': '29.5px'
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1282px',  // Changed from 1280px to 1279px
        '2xl': '1536px',
      },
      borderWidth: {
        '1.5': '1px',
      },
      fontSize: {
        'extra-extra-small':'5px',
        'extra-small':'7px',
        'xxxs': '8px',
        'xxs': '9px', // Define a new text size class
      },
      width: {
        '500': '500px', // Custom width of 500px
        '77': '77px'
      },
      lineHeight: {
        'custom-tight': '5.5rem', // Customize this value as needed
      },
      borderRadius: {
        '4xl': '2rem', // Example of a larger custom border-radius value
      },
      colors: {
        'custom-blue': '#3146FF', // Define your custom color here
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'], // Ensure Outfit font is loaded
        'sans': ['Open Sans', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      
      
    },
  },
  plugins: [],
}