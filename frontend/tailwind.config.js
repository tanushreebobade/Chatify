/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A1119",
          900: "#0E1822",
          800: "#132130",
          700: "#1A2B3D",
          600: "#243A50",
          500: "#2F4B66",
        },
        mist: {
          100: "#EAF1F7",
          300: "#B7C6D6",
          500: "#8CA1B6",
          700: "#5E7590",
        },
        lagoon: {
          200: "#B4F0F7",
          300: "#7FE3EF",
          400: "#3FD1E3",
          500: "#1FB8CC",
          600: "#128FA1",
          700: "#0F6E80",
          800: "#0C5261",
        },
        live: "#3DD68C",
        danger: "#F5716F",
        warn: "#F5B94F",
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        bubble: "1.125rem",
      },
      boxShadow: {
        raised: "0 1px 0 0 rgb(255 255 255 / 0.04) inset, 0 8px 24px -12px rgb(0 0 0 / 0.6)",
        pop: "0 12px 40px -12px rgb(0 0 0 / 0.7)",
      },
      keyframes: {
        "message-in": {
          from: { opacity: "0", transform: "translateY(6px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "panel-in": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "message-in": "message-in 180ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "panel-in": "panel-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "fade-in": "fade-in 160ms ease-out both",
        "rise-in": "rise-in 240ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};
