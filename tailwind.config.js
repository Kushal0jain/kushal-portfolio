/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter:   ["Inter",   "sans-serif"],
      },

      /* ── Custom animations ──────────────────────────── */
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'gradient':     'gradientShift 4s ease infinite',
        'orb-1':        'orbFloat1 12s ease-in-out infinite',
        'orb-2':        'orbFloat2 15s ease-in-out infinite',
        'orb-3':        'orbFloat3 18s ease-in-out infinite',
        'spin-slow':    'spinSlow 25s linear infinite',
        'spin-reverse': 'spinReverse 20s linear infinite',
        'blink':        'blinkCursor 1s ease-in-out infinite',
        'bounce-slow':  'bounceSlow 2.2s ease-in-out infinite',
        'scale-in':     'scaleIn .5s cubic-bezier(.175,.885,.32,1.275) forwards',
      },

      /* ── Keyframes ──────────────────────────────────── */
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':       { transform: 'translateY(-18px) rotate(2deg)' },
          '66%':       { transform: 'translateY(8px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(20,184,166,.35), 0 0 40px rgba(20,184,166,.1)' },
          '50%':       { boxShadow: '0 0 45px rgba(20,184,166,.7), 0 0 90px rgba(139,92,246,.3), 0 0 130px rgba(20,184,166,.1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '25%':       { transform: 'translate(60px,-40px) scale(1.1)' },
          '50%':       { transform: 'translate(-30px,60px) scale(.9)' },
          '75%':       { transform: 'translate(40px,30px) scale(1.05)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '25%':       { transform: 'translate(-70px,40px) scale(.95)' },
          '50%':       { transform: 'translate(40px,-60px) scale(1.1)' },
          '75%':       { transform: 'translate(-30px,20px) scale(1)' },
        },
        orbFloat3: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '25%':       { transform: 'translate(50px,50px) scale(1.05)' },
          '50%':       { transform: 'translate(-60px,-30px) scale(.95)' },
          '75%':       { transform: 'translate(20px,-40px) scale(1.02)' },
        },
        spinSlow:    { from: { transform: 'rotate(0deg)' },   to: { transform: 'rotate(360deg)' } },
        spinReverse: { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        blinkCursor: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(.75)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        autoRevealUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        autoRevealLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        autoRevealRight: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },

      /* ── Custom shadows ─────────────────────────────── */
      boxShadow: {
        'glow-teal':     '0 0 30px rgba(20,184,166,.35)',
        'glow-teal-sm':  '0 4px 15px rgba(20,184,166,.3)',
        'glow-violet':   '0 0 30px rgba(139,92,246,.3)',
        'card-hover':    '0 25px 50px rgba(0,0,0,.45), 0 0 30px rgba(20,184,166,.1)',
        'project-hover': '0 30px 60px rgba(0,0,0,.5), 0 0 40px rgba(20,184,166,.15)',
        'btn-hover':     '0 12px 30px rgba(20,184,166,.4)',
        'social-hover':  '0 8px 20px rgba(20,184,166,.25)',
        'lift-hover':    '0 20px 40px rgba(20,184,166,.2)',
        'scroll-btn':    '0 4px 20px rgba(20,184,166,.45)',
      },
    },
  },
  plugins: [],
};
