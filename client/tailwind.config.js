/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          red: '#dc2626',   
          grey: '#4b5563',   
          yellow: '#facc15', 
          glass: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  },
  plugins: [],
}