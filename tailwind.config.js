/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Opt‑in class‑based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FC644F',   // Brand
          dark:    '#D64739',   // Hover/active
          soft:    '#FFF5F3',   // Subtle bg
        },
        accent: {
          DEFAULT: '#00C775',   // Success/secondary
          soft:    '#E6F9F1',
        },
        background: {
          DEFAULT: '#FFFFFF',
          soft:    '#F7F7FA',
          dark:    '#18181B',
        },
        divider: '#E5E7EB',
        text: {
          primary:   '#1D1D1D',
          secondary: '#6B7280',
          disabled:  '#BDBDBD',
          onPrimary: '#FFFFFF',
        },
        success: '#16A34A',
        warning: '#F59E42',
        error:   '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '16px',
        xl:   '24px',
        '2xl':'32px',
      },
      boxShadow: {
        card:     '0 1px 4px rgba(30, 41, 59, 0.06)',
        elevated: '0 4px 16px rgba(30, 41, 59, 0.08)',
      },
      fontSize: {
        xs:   '12px',
        sm:   '14px',
        base: '16px',
        lg:   '18px',
        xl:   '20px',
        '2xl':'24px',
      },
      spacing: {
        'screen-padding': '1rem',
        'section-gap':    '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
