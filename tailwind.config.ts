import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#101216",
          50: "#2a2f38",
          100: "#222730",
          200: "#1a1e25",
          300: "#16191f",
          400: "#13151a",
          500: "#101216",
          600: "#0d0f12",
          700: "#0a0b0e",
          800: "#07080a",
          900: "#040405",
        },
        graphite: {
          DEFAULT: "#20252C",
          light: "#2b323c",
          border: "#2d3540",
          card: "#181d24",
          subtle: "#1c2128",
        },
        ivory: {
          DEFAULT: "#F3F0E8",
          muted: "#C5C2BA",
          dim: "#8E9196",
        },
        gold: {
          DEFAULT: "#C6A66B",
          light: "#deb87a",
          dark: "#a58548",
          muted: "rgba(198, 166, 107, 0.15)",
          glow: "rgba(198, 166, 107, 0.3)",
        },
        cyber: {
          green: "#10B981",
          red: "#EF4444",
          orange: "#F59E0B",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          purple: "#8B5CF6",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
      boxShadow: {
        gold: "0 0 25px -5px rgba(198, 166, 107, 0.25)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        cyber: "0 0 15px -3px rgba(16, 185, 129, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
