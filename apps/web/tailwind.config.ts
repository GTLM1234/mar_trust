import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        trust: {
          ink: "#14213d",
          sea: "#0077b6",
          mint: "#2a9d8f",
          coral: "#e76f51",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
