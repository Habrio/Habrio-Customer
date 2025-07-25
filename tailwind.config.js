/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Enables dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FC644F",   // Your main brand color
          dark: "#D64739",      // Slightly darker for hover/active
          soft: "#FFF5F3",      // For subtle backgrounds/cards
        },
        accent: {
          DEFAULT: "#00C775",   // Used for secondary actions/success
          soft: "#E6F9F1",
        },
        background: {
          DEFAULT: "#FFFFFF",
          soft: "#F7F7FA",
          dark: "#18181B",
        },
        divider: "#E5E7EB",
        text: {
          primary: "#1D1D1D",
          secondary: "#6B7280",
          disabled: "#BDBDBD",
          onPrimary: "#FFFFFF",
        },
        success: "#16A34A",
        warning: "#F59E42",
        error: "#DC2626",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        '2xl': "32px",
      },
      boxShadow: {
        card: "0 1px 4px rgba(30, 41, 59, 0.06)",
        elevated: "0 4px 16px rgba(30, 41, 59, 0.08)",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        '2xl': "24px",
      },
      spacing: {
        'screen-padding': "1rem",
        'section-gap': "1.5rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
