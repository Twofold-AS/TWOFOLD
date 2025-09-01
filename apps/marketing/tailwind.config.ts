import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)"] },
      colors: {
        // tokens via CSS vars (se globals.css)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        primaryForeground: "hsl(var(--primary-foreground))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))"
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        hard: "var(--shadow-hard)"
      }
    }
  },
  plugins: []
} satisfies Config;
