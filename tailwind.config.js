/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./go_route/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0, 0%, 90%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(0, 0%, 10%)",
        accent: "hsl(24, 94%, 50%)", 
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
