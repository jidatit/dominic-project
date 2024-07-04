/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#6D00F8',
        customBlue: '#2187A2',
      },
    },
  },
  plugins: [],
}