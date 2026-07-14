/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Backgrounds
        charcoal: {
          DEFAULT: '#111315',
          50: '#1A1E22',
          100: '#242A30',
          200: '#2E353D',
          300: '#3A424B',
        },
        stone: {
          DEFAULT: '#1A1E22',
          light: '#242A30',
        },
        // Accents
        bronze: {
          DEFAULT: '#B88746',
          light: '#D4A05A',
          dark: '#8E6836',
          50: '#F5E9D4',
          100: '#E8D4B0',
          200: '#D4A05A',
          300: '#B88746',
          400: '#9A6F38',
          500: '#7C572C',
        },
        saffron: {
          DEFAULT: '#D68A28',
          light: '#E8A84A',
          dark: '#A86A1E',
        },
        indus: {
          DEFAULT: '#4F7A52',
          light: '#6B9A6E',
          dark: '#3A5C3D',
        },
        river: {
          DEFAULT: '#4C78A8',
          light: '#6B95C4',
          dark: '#3A5C85',
        },
        terracotta: {
          DEFAULT: '#C65A3A',
          light: '#D87858',
          dark: '#A04A30',
        },
        // Text
        ink: {
          DEFAULT: '#F4F1EA',
          secondary: '#C4BEB3',
          muted: '#8E887E',
        },
        parchment: {
          DEFAULT: '#F4F1EA',
          50: '#FBF8F0',
          100: '#F4F1EA',
          200: '#E8E2D4',
          300: '#D4CCB8',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        numeric: ['"IBM Plex Sans"', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['2.625rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h3': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'caption': ['0.9375rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        'card': '14px',
        'btn': '12px',
        'search': '18px',
        'dialog': '18px',
        'timeline': '16px',
      },
      maxWidth: {
        'content': '1320px',
        'reading': '780px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionTimingFunction: {
        'calm': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'deliberate': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '75': '75ms',
        '150': '150ms',
        '250': '250ms',
        '350': '350ms',
        '450': '450ms',
        '700': '700ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'drift-light': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(2%, -1%) scale(1.05)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'dash': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'drift-light': 'drift-light 18s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
