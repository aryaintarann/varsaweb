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
                background: "#0B0F19", // Deep dark blue/black
                foreground: "#e2e8f0",
                primary: {
                    DEFAULT: "#6366f1", // Indigo
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#ec4899", // Pink
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "#8b5cf6", // Violet
                    foreground: "#ffffff",
                },
                dark: "#0B0F19",
                glass: "rgba(255, 255, 255, 0.05)",
                glassHover: "rgba(255, 255, 255, 0.1)",
                muted: {
                    DEFAULT: "#1e293b",
                    foreground: "#94a3b8",
                },
                card: {
                    DEFAULT: "rgba(255, 255, 255, 0.03)",
                    foreground: "#e2e8f0",
                }
            },
            animation: {
                blob: "blob 7s infinite",
                "fade-in-up": "fadeInUp 0.5s ease-out forwards",
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
                }
            },
        },
    },
    plugins: [],
};

export default config;
