import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-primary': '#1B6B3A',
        'green-mid': '#27AE60',
        'green-light': '#2ECC71',
        lime: '#A8FF78',
        'dark-bg': '#0A1810',
        'dark-card': '#0D2218',
        'dark-2': '#1A3328',
        'light-green': '#D4EDDA',
        'gray-light': '#F2F7F4',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        condensed: ['var(--font-barlow-condensed)', 'sans-serif'],
        body: ['var(--font-barlow)', 'sans-serif'],
      },
      backgroundImage: {
        'lime-gradient': 'linear-gradient(90deg, #1B6B3A, #A8FF78, #27AE60)',
        'dark-gradient': 'linear-gradient(135deg, #0A1810 0%, #0D2218 100%)',
        'green-gradient': 'linear-gradient(135deg, #1B6B3A 0%, #27AE60 100%)',
      },
      maxWidth: {
        site: '1280px',
      },
      boxShadow: {
        'green-sm': '0 4px 16px rgba(27,107,58,0.15)',
        'green-md': '0 8px 30px rgba(27,107,58,0.2)',
        'green-lg': '0 16px 48px rgba(27,107,58,0.3)',
        lime: '0 0 20px rgba(168,255,120,0.3)',
      },
    },
  },
  plugins: [],
}
export default config
