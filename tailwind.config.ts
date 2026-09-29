import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          100: "#F5F5F3",
          200: "#E5E5E5",
          300: "#CCCCCC",
          500: "#999999",
          600: "#777777",
          700: "#555555",
          800: "#303030",
          850: "#242424",
          900: "#181818",
          950: "#111111",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "hero-desktop": ["clamp(5rem, 9vw, 8.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "hero-tablet": ["clamp(4rem, 8vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "hero-mobile": ["clamp(2.75rem, 11vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "section-title": ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "section-sub": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        container: "1400px",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      letterSpacing: {
        editorial: "0.22em",
        tightest: "-0.04em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
