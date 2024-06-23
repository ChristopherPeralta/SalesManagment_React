/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#731E62',
        'custom-pink': '#C299A4',
        'primary-pink': '#D5B4BD',
      },
    },
  },
  plugins: [],
}