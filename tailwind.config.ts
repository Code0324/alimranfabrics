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
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #D9BC74 50%, #A8882E 100%)",
        "emerald-gradient": "linear-gradient(135deg, #1B4D3E 0%, #2A6B56 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
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
      },
      boxShadow: {
        gold: "0 4px 20px rgba(201, 168, 76, 0.3)",
        emerald: "0 4px 20px rgba(27, 77, 62, 0.3)",
        card: "0 2px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
