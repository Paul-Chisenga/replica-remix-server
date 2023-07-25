import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color1)",
      },
      textColor: {
        dark: "var(--title-color-dark)",
        secondary: "var(--text-color1)",
      },
      fontFamily: {
        cormorant: "var(--font-cormorant)",
        jost: "var(--font-Jost)",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
  important: true,
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
