/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: false, // 'media' or 'class' if dark mode support is added later
  theme: {
    screens: {
      sm: '640px',   // mobile landscape
      md: '768px',   // small tablets
      lg: '1024px',  // tablets / small desktops
      xl: '1280px',  // desktops
      '2xl': '1536px'
    },
    extend: {
      colors: {
        // Brand colors
        primary: '#FF9933',        // Saffron Orange
        'primary-dark': '#e68a00',
        accent: '#138808',         // Indian Green
        'accent-dark': '#0f6a06',

        // Neutrals & surfaces
        background: '#FFFFFF',
        'background-soft': '#F5F5F5',
        'text-primary': '#212121',
        'text-secondary': '#6B7280',
        divider: '#E0E0E0',

        // Semantic / feedback colors
        error: '#DC3545',           // Bootstrap Red
        success: '#138808',         // reuse brand green
        warning: '#FFC107',         // Bootstrap Yellow
        info: '#17A2B8'             // Bootstrap Teal
      },

      // Border radius scale
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px'
      },

      // Elevation shadows
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.1)',
        elevated: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },

      // Typography
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px']
      }
    }
  },
  plugins: []
};
