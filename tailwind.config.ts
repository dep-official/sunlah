import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"ltc-nicholas-cochin-pro"', 'sans-serif'],
        nicholas: ['"ltc-nicholas-cochin-pro"', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
      },
      fontStyle: {
        italic: 'italic',
      },
    },
  },
  plugins: [],
};

export default config; 