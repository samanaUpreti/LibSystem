/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          dark: '#0F0F0F',
          surface: '#141414',
          'surface-2': '#1A1A1A',
          'surface-3': '#222222',
          border: '#2A2A2A',
          red: '#8B0000',
          'red-hover': '#B22222',
          'red-soft': 'rgba(139,0,0,0.15)',
          gold: '#C9A96E',
          'gold-light': '#D4B87A',
          'gold-soft': 'rgba(201,169,110,0.12)',
          cream: '#FFF8E6',
          butter: '#F9E7A7',
          ink: '#34281F',
          plum: '#736080',
          blush: '#F3D8DD',
          mist: '#E7F1E6',
          warm: '#FAF4E7',
        },
        txt: {
          primary: '#F0F0F0',
          secondary: '#8A8A8A',
          muted: '#555555',
        },
        reader: {
          dark: '#111111',
          light: '#FFFDF7',
          sepia: '#F4ECD8',
        },
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Nunito Sans', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
