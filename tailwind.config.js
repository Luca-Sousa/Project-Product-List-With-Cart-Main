/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorRed: "hsl(14, 86%, 42%)",
        colorGreen: "hsl(159, 69%, 38%)",
        colorRose50: "hsl(20, 50%, 98%)",
        colorRose100: "hsl(13, 31%, 94%)",
        colorRose300: "hsl(14, 25%, 72%)",
        colorRose400: "hsl(7, 20%, 60%)",
        colorRose500: "hsl(12, 20%, 44%)",
        colorRose900: "hsl(14, 65%, 9%)"
      },
      fontFamily: {
        RedHatText: "Red Hat Text",
      }
    },
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1320px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xs': {'max': '549px'},
      '2xs': {'max': '474px'},
    },
  },
  plugins: [],
}

