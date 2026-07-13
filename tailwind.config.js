/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        "gruvbox-bg": "#282828",
        "gruvbox-fg": "#ebdbb2",
        "gruvbox-red": "#cc241d",
        "gruvbox-green": "#98971a",
        "gruvbox-yellow": "#d79921",
        "gruvbox-blue": "#458588",
        "gruvbox-purple": "#b16286",
        "gruvbox-aqua": "#689d6a",
        "gruvbox-orange": "#d65d0e",
        "gruvbox-gray": "#a89984",
        "gruvbox-bg2": "#3c3836",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
