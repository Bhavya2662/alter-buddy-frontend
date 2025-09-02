/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf3f3",
          100: "#fbe8e9",
          200: "#f6d5d6",
          300: "#eeb3b5",
          400: "#e4888e",
          500: "#d45561",
          600: "#c13d50",
          700: "#a22e42",
          800: "#88293c",
          900: "#752638",
          950: "#40111a",
        },
        brand: {
          50: "#ffe5e0",
          100: "#fbb8ad",
          200: "#f38b7a",
          300: "#eb5d47",
          400: "#e43014",
          500: "#FF5733", // <-- This is the key one for colorScheme
          600: "#cc4629",
          700: "#99351f",
          800: "#662314",
          900: "#33110a",
        },
      },
      fontFamily: {
        sans: ["'Libre Franklin', sans-serif"],
        sans2: ["'Libre Franklin', sans-serif"],
        libre: ['"Libre Franklin", sans-serif'],
      },
    },
  },
  safelist: ["wrapper"],
};
