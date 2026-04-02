import type { Config } from 'tailwindcss'
import path from 'path'

const config: Config = {
  content: [
    path.join(__dirname, './pages/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(__dirname, './components/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(__dirname, './app/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(__dirname, './contexts/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050D1C',
          900: '#0B1C3A',
          800: '#102444',
          700: '#163259',
          600: '#1C4070',
        },
        blue: {
          brand: '#1557BF',
          light: '#1E6FD9',
          pale:  '#EBF2FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
