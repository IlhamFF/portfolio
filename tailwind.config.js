/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html', // Memantau file .html di root
    './js/**/*.js', // Memantau semua file .js di dalam folder js
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      aspectRatio: {
        'video': '16 / 9',

      colors: {
        'snap-bg-primary': '#0a0e14',
        'snap-bg-secondary': '#141a24',
        'snap-text-primary': '#f8f9fa',
        'snap-text-secondary': '#ced4da',
        'snap-accent-primary': '#00e676',
        'snap-accent-secondary': '#00c853',
        'snap-accent-tertiary': '#ffeb3b',
        'snap-accent-quaternary': '#ffc107',
      },
      // Semua font family dari file CSS-mu
      fontFamily: {
        'sans': ['Poppins', 'Montserrat', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
      },
      // Semua custom shadow dari file CSS-mu
      boxShadow: {
        'snap-sm': '0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 230, 118, 0.1)',
        'snap-md': '0 4px 8px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 230, 118, 0.15)',
        'snap-lg': '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 230, 118, 0.2)',
        'snap-xl': '0 12px 24px rgba(0, 0, 0, 0.35), 0 6px 12px rgba(0, 230, 118, 0.25)',
        'snap-glow': '0 0 15px rgba(0, 230, 118, 0.6), 0 0 5px rgba(0, 200, 83, 0.3)',
      },
      // Menambahkan gradient untuk glass effect
      backgroundImage: {
        'snap-glass': 'linear-gradient(135deg, rgba(20, 26, 36, 0.7) 0%, rgba(20, 26, 36, 0.85) 100%)',
      },
      // Menambahkan border color untuk glass effect
      borderColor: {
        'snap-glass': 'rgba(0, 230, 118, 0.2)',
        'snap-glass-light': 'rgba(0, 230, 118, 0.1)',
      },
    },
  },
  plugins: [
    // Plugin untuk menambahkan utility class custom
    function({ addUtilities }) {
      const newUtilities = {
        '.snap-glass-effect': {
          'background': 'rgba(20, 26, 36, 0.7)',
          'backdrop-filter': 'blur(15px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(15px) saturate(180%)',
          'border': '1px solid rgba(0, 230, 118, 0.2)',
          'border-radius': '8px',
          'box-shadow': '0 4px 8px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 230, 118, 0.15)',
          'transition': 'all 0.3s ease',
        },
        '.snap-text-gradient': {
          'background': 'linear-gradient(135deg, #00e676 0%, #00c853 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}
}