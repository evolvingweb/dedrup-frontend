import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "electric-violet": {
          DEFAULT: "#6a4cff",
          dark: "#543ccc",
        },
        "neutral-darkest": "#020909",
        "scheme-1": "#ffffff",
        "scheme-2": "#2a1e66",
        "scheme-3": "#ffe1e1",
        "scheme-4": "#e1dbff",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        fraunces: ["Fraunces", "ui-serif", "serif"],
        roboto: ["Roboto", "ui-sans-serif", "sans-serif"],
      },
      fontSize: {
        "heading-1": ["84px", { lineHeight: "1.1", letterSpacing: "0.01em" }],
        "heading-2": ["60px", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        "heading-3": ["48px", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        "heading-4": ["40px", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        "heading-5": ["32px", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        "text-large": ["26px", { lineHeight: "1.6" }],
        "text-medium": ["20px", { lineHeight: "1.6" }],
        "text-regular": ["18px", { lineHeight: "1.6" }],
        "text-small": ["16px", { lineHeight: "1.6" }],
        "text-tiny": ["12px", { lineHeight: "1.6" }],
      },
      borderRadius: {
        large: "16px",
        medium: "16px",
        button: "12px",
      },
      spacing: {
        "section-lg": "112px",
        "section-md": "80px",
        "page-x": "64px",
      },
      maxWidth: {
        container: "1280px",
        content: "768px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

export default config
