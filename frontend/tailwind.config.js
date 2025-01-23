/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-rgb))",
      },
      animation: {
        enter: "enter 0.5s ease-out",
        leave: "leave 0.5s ease-in",
      },
      keyframes: {
        enter: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        leave: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [],
};
