/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        christmasRed: '#C41E3A',
        christmasGreen: '#006400',
        christmasGold: '#FFD700',
      },
      animation: {
        'snow-fall': 'snowFall 10s linear infinite',
        'typing': 'typing 2s steps(20) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        snowFall: {
          '0%': { transform: 'translateY(-10vh) translateX(0)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(20px)', opacity: '0' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        }
      }
    },
  },
  plugins: [],
}