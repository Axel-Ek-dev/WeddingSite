/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        forest: {
          DEFAULT: '#1F4D3A',
          600: '#1b4331'
        },
        sage: '#A6C1A0',
        'near-black': '#1E1E1E',
        muted: '#6B6B6B'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
