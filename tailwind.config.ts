import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        valentine: {
          red: "#FF1E56",
          pink: "#FF69B4",
          "light-pink": "#FFB6C1",
          crimson: "#DC143C",
          gold: "#FFD700",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "heart-beat": "heartBeat 1.5s ease-in-out infinite",
        "gift-open": "giftOpen 1s ease-out forwards",
        "fall-in": "fallIn 1s ease-out forwards",
        "love-shower": "loveShower 3s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "envelope-open": "envelopeOpen 1.5s ease-out forwards",
        "envelope-flap": "envelopeFlap 1.5s ease-out forwards",
        "card-rise": "cardRise 1s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        heartBeat: {
          "0%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
        giftOpen: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.2) rotate(5deg)" },
          "100%": { transform: "scale(0) rotate(10deg)", opacity: "0" },
        },
        fallIn: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        loveShower: {
          "0%": { transform: "translateY(-10vh) translateX(0)", opacity: "1" },
          "100%": {
            transform: "translateY(100vh) translateX(20px)",
            opacity: "0",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        envelopeOpen: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.1)" },
        },
        envelopeFlap: {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(180deg)", transformOrigin: "top" },
        },
        cardRise: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-20%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
