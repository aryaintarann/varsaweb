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
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Custom professional palette (Solid colors, no gradients allowed in usage)
                primary: {
                    DEFAULT: "#0f172a", // Slate 900
                    foreground: "#f8fafc", // Slate 50
                },
                secondary: {
                    DEFAULT: "#f1f5f9", // Slate 100
                    foreground: "#0f172a", // Slate 900
                },
                accent: {
                    DEFAULT: "#0ea5e9", // Sky 500 (Clean Blue)
                    foreground: "#ffffff",
                },
                destructive: {
                    DEFAULT: "#ef4444", // Red 500
                    foreground: "#ffffff",
                },
                muted: {
                    DEFAULT: "#f8fafc", // Slate 50
                    foreground: "#64748b", // Slate 500
                },
            },
            borderRadius: {
                lg: "0.5rem",
                md: "calc(0.5rem - 2px)",
                sm: "calc(0.5rem - 4px)",
            },
        },
    },
    plugins: [],
};

export default config;
