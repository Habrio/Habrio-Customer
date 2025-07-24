/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FC644F",
          dark: "#D64739",
        },
        text: {
          primary: "#1D1D1D",
          secondary: "#6B7280",
        },
      },
    },
  },
  plugins: [],
};
