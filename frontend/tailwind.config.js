/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F172A',
          'navy-hover': '#1E293B',
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          'text-primary': '#0F172A',
          'text-secondary': '#475569',
          'text-muted': '#94A3B8',
          border: '#E2E8F0',
          'border-strong': '#CBD5E1',
        },
        semantic: {
          success: '#16A34A',
          warning: '#D97706',
          danger: '#DC2626',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'control': '8px',
        'input': '10px',
        'btn': '10px',
        'card': '14px',
        'container': '16px',
        'modal': '18px',
        'pill': '9999px',
      },
      boxShadow: {
        'saas-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'saas-md': '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03)',
        'saas-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
      }
    },
  },
  plugins: [],
}
