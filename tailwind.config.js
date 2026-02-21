/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ramadhan': {
          'green': {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          'gold': {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          'leaf': {
            50: '#f7fee7',
            100: '#ecfccb',
            200: '#d9f99d',
            300: '#bef264',
            400: '#a3e635',
            500: '#84cc16',
            600: '#65a30d',
            700: '#4d7c0f',
            800: '#365314',
            900: '#1a2e05',
          }
        }
      },
      backgroundImage: {
        'ramadhan-gradient': 'linear-gradient(135deg, #16a34a 0%, #22c55e 25%, #84cc16 50%, #fbbf24 75%, #f59e0b 100%)',
        'ramadhan-subtle': 'linear-gradient(135deg, rgba(22, 163, 74, 0.9) 0%, rgba(34, 197, 94, 0.8) 25%, rgba(132, 204, 22, 0.7) 50%, rgba(251, 191, 36, 0.6) 75%, rgba(245, 158, 11, 0.5) 100%)',
        'islamic-pattern': "radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)",
      },
      fontFamily: {
        'arabic': ['Amiri', 'Cairo', 'serif'],
      },
      boxShadow: {
        'ramadhan-glow': '0 0 20px rgba(251, 191, 36, 0.3)',
        'ramadhan-glow-lg': '0 0 40px rgba(251, 191, 36, 0.5)',
        'islamic': '0 4px 20px rgba(22, 163, 74, 0.15)',
      }
    },
  },
  plugins: [],
};
