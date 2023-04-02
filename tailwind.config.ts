import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "landing-bg": "url('/polluted-world.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
