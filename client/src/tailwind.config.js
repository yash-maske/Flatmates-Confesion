/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // tailwind.config.js
      module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out',
        slideIn: 'slideIn 0.6s ease-in',
        pulseOnce: 'pulseOnce 1s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        pulseOnce: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.8 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
  theme: {
  extend: {
    animation: {
      fadeIn: 'fadeIn 0.8s ease-out',
      fadeInUp: 'fadeInUp 0.6s ease-out',
      slideInLeft: 'slideInLeft 0.6s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      fadeInUp: {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      slideInLeft: {
        '0%': { opacity: 0, transform: 'translateX(-20px)' },
        '100%': { opacity: 1, transform: 'translateX(0)' },
      },
    },
  },
},
theme: {
  extend: {
    animation: {
      fadeInUp: 'fadeInUp 0.6s ease-out',
      glow: 'glow 1.5s ease-in-out infinite alternate',
      shake: 'shake 0.5s ease-in-out',
    },
    keyframes: {
      fadeInUp: {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      glow: {
        '0%': { textShadow: '0 0 5px #34d399, 0 0 10px #34d399' },
        '100%': { textShadow: '0 0 15px #059669, 0 0 25px #059669' },
      },
      shake: {
        '0%, 100%': { transform: 'translateX(0)' },
        '20%, 60%': { transform: 'translateX(-6px)' },
        '40%, 80%': { transform: 'translateX(6px)' },
      },
    },
  },
},

}

    },
  },
  plugins: [],
}
