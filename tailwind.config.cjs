/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  safelist: [
    "border-[#bc4749]",
    "border-[#f2e8cf]",
    "border-[#386641]",
    "border-[#6a994e]",
    "border-[#a7c957]",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Roboto Mono", "sans-serif"],
    },
  },
  plugins: [],
};
