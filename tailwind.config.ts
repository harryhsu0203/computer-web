import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        }
      },
      boxShadow: {
        'glow': '0 10px 30px -10px rgba(245, 158, 11, 0.45)'
      },
      backgroundImage: {
        'grid': 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)',
        'hero-gradient': 'radial-gradient(1200px circle at 10% -20%, rgba(245, 158, 11, .25), transparent 40%), radial-gradient(800px circle at 90% 10%, rgba(234, 179, 8, .18), transparent 40%)'
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1400px'
        }
      }
    }
  },
  plugins: []
} satisfies Config;


