export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Asian theme (purple)
        'asian-primary': '#8A4DFF',
        'asian-secondary': '#E3C4FF',
        'asian-accent': '#6A11CB',
        
        // Western theme (orange)
        'western-primary': '#fca94d',
        'western-secondary': '#ffddab',
        'western-accent': '#F57C00',
        
        // VIP theme (gold)
        'vip-primary': '#FFC107',
        'vip-secondary': '#ffca2c',
        'vip-accent': '#FFA000',
        
        // Base colors
        'bg-primary': '#111015',
        'bg-secondary': '#1C1B22',
        'bg-tertiary': '#2C2A35',
        'text-primary': '#EAEAEA',
        'text-secondary': '#9E9E9E',
        'border-color': '#33313D',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      animation: {
        'fly-crown': 'fly-crown 1s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'fly-crown': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '30%': { transform: 'translate(calc(50vw - 50px), 10vh) scale(1.5)', opacity: '1' },
          '100%': { transform: 'translate(calc(100vw - 100px), 0) scale(0.5)', opacity: '0' },
        },
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
      },
    },
  },
  plugins: [],
};