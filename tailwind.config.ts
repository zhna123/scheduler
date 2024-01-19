import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sch_orange: {
          600: '#FF6000',
          300: '#FFE8CE'
        },
        sch_gray: {
          800: '#454545',
          600: '#CCCCCC',
          300: '#F4F2F2'
        }
      }
    },
  },
  plugins: [],
}
export default config
