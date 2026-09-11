/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Apple-inspired OLED dark palette
        appleDark: {
          950: '#000000', // Pure OLED black
          900: '#050508', // Ultra-deep obsidian
          850: '#0b0b10', // Deep background
          800: '#121218', // Card surface
          750: '#181822', // Hover surface
          700: '#22222e', // Border subtle
          600: '#2e2e3d',
        },
        // Apple-inspired Crimson Red / Rose
        appleRed: {
          400: '#fb7185',
          500: '#ff2d55', // Apple Keynote Crimson
          600: '#e11d48', // Ruby
          700: '#be123c',
          900: '#4c0519',
        },
        // Apple-inspired Electric Blue
        appleBlue: {
          400: '#38bdf8',
          500: '#0a84ff', // Apple System Blue
          600: '#0284c7',
          700: '#0369a1',
        },
        // Apple-inspired Vibrant Green / Emerald
        appleGreen: {
          400: '#34d399',
          500: '#30d158', // Apple System Green
          600: '#10b981',
          700: '#059669',
        },
        // Deep purple / violet transition
        appleViolet: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
};
