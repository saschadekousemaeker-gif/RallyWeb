import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0D0D",
        foreground: "#ffffff",
        "rally-green": "#CCFF00",
        "card-bg": "#1A1A1A",
        muted: "#888888",
      },
    },
  },
  plugins: [],
};
export default config;
