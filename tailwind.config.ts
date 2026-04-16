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
          gold: '#C4973B',
          'gold-light': '#D4A84B',
          'gold-muted': '#8B7A3E',
          green: '#34C759',
          'green-dark': '#248A3D',
          whatsapp: '#25D366',
        },
        dark: {
          bg: '#0A0A0A',
          surface: '#141414',
          elevated: '#1A1A1A',
          card: '#111111',
          border: '#2A2A2A',
          'border-light': '#1F1F1F',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          secondary: '#B8B0A0',
          body: '#9A9288',
          muted: '#6B6355',
          faint: '#3D3830',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'gold-sm': '0 2px 8px rgba(196, 151, 59, 0.08)',
        'gold-md': '0 4px 16px rgba(196, 151, 59, 0.12)',
        'gold-lg': '0 8px 32px rgba(196, 151, 59, 0.15)',
        'gold-xl': '0 16px 48px rgba(196, 151, 59, 0.2)',
        'dark-sm': '0 1px 3px rgba(0,0,0,0.3)',
        'dark-md': '0 4px 12px rgba(0,0,0,0.4)',
        'dark-lg': '0 8px 28px rgba(0,0,0,0.5)',
        'dark-xl': '0 16px 48px rgba(0,0,0,0.6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
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
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(196, 151, 59, 0.3)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(196, 151, 59, 0.15)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
