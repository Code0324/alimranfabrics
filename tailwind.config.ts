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
        // ── SAYA-inspired luxury palette (primary) ──
        cream: {
          DEFAULT: "#FAF7F2",   // page background
          dark:    "#F5F2ED",   // footer background
          deep:    "#F0EBE1",   // subtle section bg
        },
        charcoal: {
          DEFAULT: "#1A1A1A",   // primary text
          light:   "#444444",
          muted:   "#666666",   // secondary text
        },
        "site-dark": "#111111", // CTA buttons / announcement bar
        "saya-gold": "#F5A623", // star ratings
        // ── Legacy / backward-compat tokens ──
        ivory: {
          DEFAULT: "#FAF7F2",
          dark:    "#F0EBE1",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light:   "#D9BC74",
          dark:    "#A8882E",
        },
        navy: {
          DEFAULT: "#0C1350",
          deep:    "#070D38",
        },
        brightGold: "#FFE500",
        crimson:    "#B71C1C",
        // Admin tokens
        surface:  "#FFFFFF",
        muted:    "#666666",
        border: { DEFAULT: "#E8E4DC", dark: "#D4CFC4" },
      },
      fontFamily: {
        playfair:  ["var(--font-playfair)",   "Georgia", "serif"],
        cormorant: ["var(--font-cormorant)",  "Georgia", "serif"],
        "dm-sans": ["var(--font-dm-sans)",    "system-ui", "sans-serif"],
        inter:     ["var(--font-inter)",      "system-ui", "sans-serif"],
        tenor:     ["var(--font-tenor)",      "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":    "linear-gradient(135deg, #C9A84C 0%, #D9BC74 50%, #A8882E 100%)",
        "dark-gradient":    "linear-gradient(135deg, #111111 0%, #2a2a2a 100%)",
        "navy-gradient":    "linear-gradient(135deg, #0C1350 0%, #070D38 100%)",
        "hero-overlay":     "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 50%, transparent 100%)",
        "linen-texture":
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect width='4' height='4' fill='%23FDFCF7'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23e8e4da' opacity='0.4'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23e8e4da' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-in":        "fadeIn 0.5s ease-in-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-up":       "slideUp 0.4s ease-out",
        "ticker":         "ticker 30s linear infinite",
        "slide-in":       "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%":   { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideUp: {
          "0%":   { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        slideIn: {
          "0%":   { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        ticker: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        gold:          "0 4px 20px rgba(201, 168, 76, 0.3)",
        "bright-gold": "0 4px 20px rgba(255, 230, 0, 0.35)",
        navy:          "0 4px 20px rgba(7, 13, 56, 0.5)",
        card:          "0 1px 12px rgba(0, 0, 0, 0.06)",
        "card-hover":  "0 6px 32px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
