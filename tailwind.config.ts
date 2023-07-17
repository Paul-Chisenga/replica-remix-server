import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  prefix: "tw-",
  important: true,
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
