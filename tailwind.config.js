/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter:   ["Inter",   "sans-serif"],
      },

      animation: {
        'scale-in': 'scaleIn .35s cubic-bezier(.175,.885,.32,1.275) forwards',
      },

      keyframes: {
        scaleIn: {
          from: { opacity: '0', transform: 'scale(.75)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },

      boxShadow: {
        'glow-teal-sm':  '0 4px 15px rgba(20,184,166,.3)',
        'card-hover':    '0 25px 50px rgba(0,0,0,.45), 0 0 30px rgba(20,184,166,.1)',
        'project-hover': '0 30px 60px rgba(0,0,0,.5), 0 0 40px rgba(20,184,166,.15)',
        'btn-hover':     '0 12px 30px rgba(20,184,166,.4)',
        'social-hover':  '0 8px 20px rgba(20,184,166,.25)',
        'lift-hover':    '0 20px 40px rgba(20,184,166,.2)',
      },
    },
  },
  plugins: [],
};
