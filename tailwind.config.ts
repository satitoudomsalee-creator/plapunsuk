import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        panel: "rgba(255, 255, 255, 0.78)",
        frost: "rgba(255, 255, 255, 0.65)",
        line: "rgba(15, 23, 42, 0.08)",
        mint: "#0EA5E9",
        coral: "#F43F5E",
        gold: "#10B981",
        skyglass: "#6366F1",
        canvas: "#F8FAFC",
        cloud: "#EFF6FF",
        ocean: "#1E40AF"
      },
      boxShadow: {
        glass: "0 12px 40px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)",
        glow: "0 0 40px rgba(14, 165, 233, 0.18)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      },
      animation: {
        shimmer: "shimmer 2.8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
