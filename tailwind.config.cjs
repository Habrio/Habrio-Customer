const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // darkMode: false, // 'media' or 'class' if dark mode support is added later
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
  plugins: [
    // Inject CSS variables into :root based on theme values
    plugin(function({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-primary':      theme('colors.primary'),
          '--color-primary-dark': theme('colors.primary-dark'),
          '--color-accent':       theme('colors.accent'),
          '--color-accent-dark':  theme('colors.accent-dark'),
          '--color-background':   theme('colors.background'),
          '--color-background-soft': theme('colors.background-soft'),
          '--color-text-primary':   theme('colors.text-primary'),
          '--color-text-secondary': theme('colors.text-secondary'),
          '--color-divider':        theme('colors.divider'),
          '--color-error':          theme('colors.error'),
          '--color-success':        theme('colors.success'),
          '--color-warning':        theme('colors.warning'),
          '--color-info':           theme('colors.info'),
          '--shadow-card':          theme('boxShadow.card'),
          '--shadow-elevated':      theme('boxShadow.elevated'),
        }
      });
    })
  ]
};
