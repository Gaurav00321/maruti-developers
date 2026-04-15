import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#E8720C',
          'orange-light': '#F59E0B',
          green: '#34C759',
          'green-dark': '#248A3D',
          blue: '#0071E3',
        },
        apple: {
          bg: '#FFFFFF',
          'bg-alt': '#F5F5F7',
          'bg-warm': '#FBFBFD',
          text: '#1D1D1F',
          'text-secondary': '#424245',
          'text-body': '#6E6E73',
          'text-muted': '#86868B',
          'text-light': '#AEAEB2',
          border: '#D2D2D7',
          'border-light': '#E8E8ED',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0,0,0,0.08)',
        'apple-md': '0 4px 12px rgba(0,0,0,0.08)',
        'apple-lg': '0 8px 28px rgba(0,0,0,0.12)',
        'apple-xl': '0 16px 48px rgba(0,0,0,0.12)',
        'card': '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
