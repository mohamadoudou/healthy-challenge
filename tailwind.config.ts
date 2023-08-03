import type { Config } from 'tailwindcss'
const plugin = require('tailwindcss/plugin')

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }:any) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        '.no-scrollbar::-webkit-scrollbar': {
            'display': 'none'
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        '.no-scrollbar' :{
            '-ms-overflow-style': 'none',  /* IE and Edge */
            'scrollbar-width': 'none',  /* Firefox */
        }
      })
    })
  ],
} satisfies Config

