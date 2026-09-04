/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#FBF9F5',
          'ivory-dark': '#F4F1EA',
          charcoal: '#1C1C1E',
          'charcoal-light': '#3A3A3C',
          obsidian: '#0F0F10',
          blush: '#F7EFEA',
          'blush-border': '#E8DCD5',
          rose: '#C88A7C',
          'rose-dark': '#B07567',
          grey: '#F3F0EA',
          'grey-border': '#E4E0D7',
          accent: '#8E9A86', // Subtle sage accent for natural ingredients / ratings
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'float': '0 12px 32px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(28, 28, 30, 0.04)',
      },
    },
  },
  plugins: [],
}
