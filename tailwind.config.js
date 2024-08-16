/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '500': '500px', // Custom width of 500px
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
      fontSize: {
        '9xl': '90px', // Custom font size for 90px
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