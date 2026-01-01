"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface HeroProps {
    settings: {
        heroBadge: string;
        heroTitle: string;
        heroDescription: string;
        heroCta1: string;
        heroCta2: string;
        stat1Value: string;
        stat1Label: string;
        stat2Value: string;
        stat2Label: string;
        stat3Value: string;
        stat3Label: string;
        stat4Value: string;
        stat4Label: string;
    } | null;
    portfolioCount?: number;
    satisfactionPercentage?: number;
}

// Default values fallback
const defaults = {
    heroBadge: "#1 Best Digital Partner",
    heroTitle: "Build an Unforgettable Digital Identity.",
    heroDescription: "VarsaWeb helps your business transform with fast, aesthetic, and sales-conversion oriented websites.",
    heroCta1: "Free Consultation",
    heroCta2: "View Our Work",
    stat1Value: "150+",
    stat1Label: "Projects Completed",
    stat2Value: "99%",
    stat2Label: "Client Satisfaction",
    stat3Value: "24/7",
    stat3Label: "Technical Support",
    stat4Value: "3-7",
    stat4Label: "Days Delivery",
};

export function Hero({ settings, portfolioCount, satisfactionPercentage }: HeroProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const data = settings || defaults;

    // Split title for gradient effect
    const titleParts = data.heroTitle.split(" ");
    const lastTwoWords = titleParts.slice(-2).join(" ");
    const firstWords = titleParts.slice(0, -2).join(" ");

    return (
        <section
            ref={ref}
            id="home"
            className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden bg-[#F0FAFA]"
        >
            {/* Tech-Themed Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(#006666 1px, transparent 1px),
                            linear-gradient(90deg, #006666 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                ></div>

                {/* Gradient Glow - Animated */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4DD0C7]/10 rounded-full filter blur-[100px] animate-pulse-glow"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#006666]/10 rounded-full filter blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

                {/* Circuit Lines with Animation */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M0 50 L40 50 L40 20 L60 20 L60 50 L100 50" stroke="#006666" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-circuit-flow" />
                            <path d="M50 0 L50 40 L80 40 L80 60 L50 60 L50 100" stroke="#006666" strokeWidth="1" fill="none" strokeDasharray="5,5" className="animate-circuit-flow" style={{ animationDelay: '1.5s' }} />
                            <circle cx="40" cy="50" r="3" fill="#4DD0C7" className="animate-pulse" />
                            <circle cx="60" cy="50" r="3" fill="#4DD0C7" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                            <circle cx="50" cy="40" r="3" fill="#4DD0C7" className="animate-pulse" style={{ animationDelay: '1s' }} />
                            <circle cx="80" cy="40" r="3" fill="#4DD0C7" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>

                {/* Floating Code Brackets - Animated */}
                <div className="absolute top-1/4 left-10 text-[#006666]/10 text-9xl font-mono animate-float">&lt;/&gt;</div>
                <div className="absolute bottom-1/4 right-10 text-[#4DD0C7]/10 text-8xl font-mono animate-float-slow" style={{ animationDelay: '1s' }}>{ }</div>
                <div className="absolute top-1/2 right-1/3 text-[#006666]/5 text-7xl font-mono animate-float" style={{ animationDelay: '2s' }}>01</div>

                {/* Subtle IT Icons */}
                <svg className="absolute top-1/3 right-20 w-16 h-16 text-[#006666]/10 animate-float" style={{ animationDelay: '1.5s' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6l-2 4v1h8v-1l-2-4h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z" />
                </svg>
                <svg className="absolute bottom-1/3 left-20 w-12 h-12 text-[#4DD0C7]/10 animate-float-slow" style={{ animationDelay: '0.5s' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z" />
                </svg>
                <div className="absolute top-20 right-1/3 text-[#006666]/8 text-5xl font-mono animate-float-slow" style={{ animationDelay: '3s' }}>&lt;html&gt;</div>

                {/* Additional IT Elements */}
                <div className="absolute bottom-20 left-1/4 text-[#4DD0C7]/8 text-4xl font-mono animate-float" style={{ animationDelay: '2.5s' }}>.css</div>
                <div className="absolute top-1/3 left-1/4 text-[#006666]/6 text-6xl font-mono animate-float-slow" style={{ animationDelay: '1s' }}>@</div>

                {/* Database Icon */}
                <svg className="absolute bottom-1/4 right-1/4 w-14 h-14 text-[#006666]/8 animate-float" style={{ animationDelay: '4s' }} fill="currentColor" viewBox="0 0 24 24">
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
                    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                </svg>

                {/* Cloud Icon */}
                <svg className="absolute top-40 left-1/3 w-20 h-20 text-[#4DD0C7]/6 animate-float-slow" style={{ animationDelay: '2s' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>

                {/* Code Snippet */}
                <div className="absolute bottom-40 right-1/3 text-[#006666]/5 text-3xl font-mono animate-float" style={{ animationDelay: '3.5s' }}>npm run dev</div>
            </div>

            <motion.div
                style={{ y, opacity }}
                className="max-w-5xl mx-auto text-center relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006666]/10 border border-[#006666]/20 text-[#006666] text-xs font-semibold uppercase tracking-wider mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
                    {data.heroBadge}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-[#006666]"
                >
                    {firstWords} <br />
                    <span className="text-gradient">{lastTwoWords}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-[#334155] mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {data.heroDescription}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href="#contact"
                        className="px-8 py-4 rounded-full bg-[#006666] hover:bg-[#004D4D] text-white font-bold transition-all shadow-lg shadow-[#006666]/25 w-full sm:w-auto flex justify-center items-center gap-2 hover:-translate-y-1"
                    >
                        <Rocket className="w-5 h-5" /> {data.heroCta1}
                    </Link>
                    <Link
                        href="#portfolio"
                        className="px-8 py-4 rounded-full bg-[#006666]/10 border-2 border-[#006666]/10 hover:bg-[#006666]/20 text-[#006666] font-medium transition-all w-full sm:w-auto hover:-translate-y-1"
                    >
                        {data.heroCta2}
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 pt-10 border-t border-[#006666]/10 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    <div className="p-4 rounded-2xl hover:bg-[#006666]/10 transition-colors">
                        <h4 className="text-3xl font-bold text-[#006666]">
                            {portfolioCount !== undefined ? portfolioCount : data.stat1Value}
                        </h4>
                        <p className="text-sm text-[#334155] mt-1">{data.stat1Label}</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-[#006666]/10 transition-colors">
                        <h4 className="text-3xl font-bold text-[#006666]">
                            {satisfactionPercentage !== undefined ? `${satisfactionPercentage}%` : data.stat2Value}
                        </h4>
                        <p className="text-sm text-[#334155] mt-1">{data.stat2Label}</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-[#006666]/10 transition-colors">
                        <h4 className="text-3xl font-bold text-[#006666]">{data.stat3Value}</h4>
                        <p className="text-sm text-[#334155] mt-1">{data.stat3Label}</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-[#006666]/10 transition-colors">
                        <h4 className="text-3xl font-bold text-[#006666]">{data.stat4Value}</h4>
                        <p className="text-sm text-[#334155] mt-1">{data.stat4Label}</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
