/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter:   ["Inter",   "sans-serif"],
      },

      // The site accent is chosen in the admin panel. teal-400…700 resolve to
      // CSS variables (set in index.css, overridden at runtime), so every
      // existing teal-* class — including /opacity variants — follows it.
      colors: {
        teal: {
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
        },
      },

      boxShadow: {
        soft: '0 14px 34px -18px rgba(0,0,0,.65)',
      },
    },
  },
  plugins: [],
};
