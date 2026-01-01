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
}

// Default values fallback
const defaults = {
    heroBadge: "Partner Digital Terbaik #1",
    heroTitle: "Bangun Identitas Digital Yang Tak Terlupakan.",
    heroDescription: "VarsaWeb membantu bisnis Anda bertransformasi dengan website yang cepat, estetik, dan berorientasi pada konversi penjualan.",
    heroCta1: "Konsultasi Gratis",
    heroCta2: "Lihat Karya Kami",
    stat1Value: "150+",
    stat1Label: "Project Selesai",
    stat2Value: "99%",
    stat2Label: "Kepuasan Klien",
    stat3Value: "24/7",
    stat3Label: "Support Teknis",
    stat4Value: "3-7",
    stat4Label: "Hari Pengerjaan",
};

export function Hero({ settings }: HeroProps) {
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
            className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden"
        >
            <motion.div
                style={{ y, opacity }}
                className="max-w-5xl mx-auto text-center relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    {data.heroBadge}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-white"
                >
                    {firstWords} <br />
                    <span className="text-gradient">{lastTwoWords}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
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
                        className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/25 w-full sm:w-auto flex justify-center items-center gap-2 hover:-translate-y-1"
                    >
                        <Rocket className="w-5 h-5" /> {data.heroCta1}
                    </Link>
                    <Link
                        href="#portfolio"
                        className="px-8 py-4 rounded-full bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium transition-all w-full sm:w-auto hover:-translate-y-1"
                    >
                        {data.heroCta2}
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors">
                        <h4 className="text-3xl font-bold text-white">{data.stat1Value}</h4>
                        <p className="text-sm text-slate-500 mt-1">{data.stat1Label}</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors">
                        <h4 className="text-3xl font-bold text-white">{data.stat2Value}</h4>
                        <p className="text-sm text-slate-500 mt-1">{data.stat2Label}</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors">
                        <h4 className="text-3xl font-bold text-white">{data.stat3Value}</h4>
                        <p className="text-sm text-slate-500 mt-1">{data.stat3Label}</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors">
                        <h4 className="text-3xl font-bold text-white">{data.stat4Value}</h4>
                        <p className="text-sm text-slate-500 mt-1">{data.stat4Label}</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
