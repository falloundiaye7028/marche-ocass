import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vert: {
          50:  "#f0faf4",
          100: "#d9f2e3",
          200: "#b3e5c8",
          300: "#7dcfaa",
          400: "#45b485",
          500: "#1d9c68",
          600: "#0e7d52",
          700: "#0a6342",
          800: "#094f35",
          900: "#07402b",
          950: "#042c1d",
        },
        or: {
          300: "#ffd633",
          400: "#ffc800",
          500: "#ffb300",
          600: "#e09000",
          700: "#b86e00",
        },
        orange: {
          400: "#ff7a2a",
          500: "#f55f0a",
          600: "#e04a00",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-ocass": "linear-gradient(135deg, #042c1d 0%, #07402b 40%, #0a6342 70%, #1d9c68 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
