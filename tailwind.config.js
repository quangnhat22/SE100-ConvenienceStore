module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
    },
  },
  plugins: ["@tailwindcss/line-clamp"],
  variants: {
    lineClamp: ["responsive", "hover"],
  },
};
