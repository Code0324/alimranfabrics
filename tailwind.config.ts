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
        // Legacy palette (kept for backward-compat)
        emerald: {
          DEFAULT: "#1B4D3E",
          light: "#2A6B56",
          dark: "#122E25",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#D9BC74",
          dark: "#A8882E",
        },
        ivory: {
          DEFAULT: "#FAF7F2",
          dark: "#F0EBE1",
        },
        charcoal: {
          DEFAULT: "#2C2C2C",
          light: "#444444",
        },
        // Al Imran Brand Design System
        navy: {
          DEFAULT: "#0C1350",
          deep: "#070D38",
        },
        brightGold: "#FFE500",
        crimson: "#B71C1C",
        cream: "#FDFCF7",
        // Admin panel tokens
        surface: "#FFFFFF",
        muted: "#6B6560",
        border: { DEFAULT: "#E0D8CC", dark: "#CCC4B4" },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        tenor: ["var(--font-tenor)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #D9BC74 50%, #A8882E 100%)",
        "emerald-gradient": "linear-gradient(135deg, #1B4D3E 0%, #2A6B56 100%)",
        "navy-gradient": "linear-gradient(135deg, #0C1350 0%, #070D38 100%)",
        "linen-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23FDFCF7'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23e8e4da' opacity='0.4'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23e8e4da' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "ticker": "ticker 28s linear infinite",
        "slide-in": "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        gold: "0 4px 20px rgba(201, 168, 76, 0.3)",
        "bright-gold": "0 4px 20px rgba(255, 230, 0, 0.35)",
        emerald: "0 4px 20px rgba(27, 77, 62, 0.3)",
        navy: "0 4px 20px rgba(7, 13, 56, 0.5)",
        card: "0 2px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
