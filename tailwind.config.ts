import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        cyber: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        neon: {
          blue:   "#00d4ff",
          purple: "#a855f7",
          green:  "#00ff88",
          pink:   "#ff0080",
        },
      },
      animation: {
        "fade-in":      "fadeIn 0.6s ease-out",
        "slide-up":     "slideUp 0.8s ease-out",
        "slide-right":  "slideRight 0.8s ease-out",
        "float":        "float 6s ease-in-out infinite",
        "pulse-glow":   "pulseGlow 2s ease-in-out infinite",
        "gradient":     "gradient 8s ease infinite",
        "spin-slow":    "spin 8s linear infinite",
        "marquee":      "marquee 25s linear infinite",
        "marquee2":     "marquee2 25s linear infinite",
        "count-up":     "countUp 2s ease-out",
      },
      keyframes: {
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp:   { "0%": { opacity: "0", transform: "translateY(30px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        slideRight:{ "0%": { opacity: "0", transform: "translateX(-30px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        float:     { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-20px)" } },
        pulseGlow: { "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(14,165,233,0.4)" }, "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(14,165,233,0.8)" } },
        gradient:  { "0%, 100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        marquee:   { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-100%)" } },
        marquee2:  { "0%": { transform: "translateX(100%)" }, "100%": { transform: "translateX(0%)" } },
        countUp:   { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient":   "radial-gradient(at 40% 20%, hsla(210,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(264,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
