import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-jakarta)', 'sans-serif'],
            },
            colors: {
                background: "#FFFFFF",
                foreground: "#334155",
                primary: {
                    DEFAULT: "#0D1F38", // Navy
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#4DD0C7", // Teal
                    foreground: "#0D1F38",
                },
                accent: {
                    DEFAULT: "#4DD0C7", // Teal
                    foreground: "#0D1F38",
                },
                dark: "#0D1F38",
                surface: "#F4F7FA",
                muted: {
                    DEFAULT: "#F4F7FA",
                    foreground: "#64748b",
                },
                card: {
                    DEFAULT: "#F4F7FA",
                    foreground: "#334155",
                },
                navy: "#0D1F38",
                teal: "#4DD0C7",
            },
            animation: {
                blob: "blob 7s infinite",
                "fade-in-up": "fadeInUp 0.5s ease-out forwards",
                "pulse-glow": "pulseGlow 4s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "float-slow": "float 8s ease-in-out infinite",
                "circuit-flow": "circuitFlow 3s linear infinite",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "0.1", transform: "scale(1)" },
                    "50%": { opacity: "0.2", transform: "scale(1.05)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                circuitFlow: {
                    "0%": { strokeDashoffset: "100" },
                    "100%": { strokeDashoffset: "0" },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

export default config;
