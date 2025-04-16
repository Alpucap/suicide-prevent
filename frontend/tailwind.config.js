/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5A7D5A',
        secondary: '#A3B8A3', 
        accent: '#DDE7DD',
        background: '#F2F6F3', 
        text: '#2F3E36', 
        dark_primary: '#5A7D5A',
        dark_secondary: '#3E5640', 
        dark_accent: '#A3B8A3',
        dark_background: '#1E2924', 
        dark_text: '#DDE7DD', 
      },
    },
  },
  plugins: [],
}
