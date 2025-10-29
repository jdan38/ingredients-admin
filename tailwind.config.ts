// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f3f6ff",
          100: "#e8edff",
          200: "#d5dcff",
          300: "#b6c2ff",
          400: "#8ea1ff",
          500: "#6e83ff",   // primary (indigo-ish)
          600: "#5a6af0",
          700: "#4a55d1",
          800: "#3d46aa",
          900: "#2f367f",
        },
        accent: {
          400: "#38bdf8",   // sky
          500: "#0ea5e9",
          600: "#0284c7",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f7f8fb",
          card: "#ffffff",
          border: "#e9ecf2",
        },
        text: {
          primary: "#0f172a",
          secondary: "#334155",
          muted: "#64748b",
        },
      },
      boxShadow: {
        card: "0 6px 18px rgba(10, 22, 50, 0.06)",
        header: "0 1px 0 rgba(15, 23, 42, 0.06)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        pill: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
