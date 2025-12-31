"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
                    Partner Digital Terbaik #1
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-white"
                >
                    Bangun Identitas Digital <br />
                    <span className="text-gradient">Yang Tak Terlupakan.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    VarsaWeb membantu bisnis Anda bertransformasi dengan website yang cepat,
                    estetik, dan berorientasi pada konversi penjualan.
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
                        <Rocket className="w-5 h-5" /> Konsultasi Gratis
                    </Link>
                    <Link
                        href="#portfolio"
                        className="px-8 py-4 rounded-full bg-transparent border border-white/10 hover:bg-white/5 text-white font-medium transition-all w-full sm:w-auto hover:-translate-y-1"
                    >
                        Lihat Karya Kami
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
                        <h4 className="text-3xl font-bold text-white">150+</h4>
                        <p className="text-sm text-slate-500 mt-1">Project Selesai</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors">
                        <h4 className="text-3xl font-bold text-white">99%</h4>
                        <p className="text-sm text-slate-500 mt-1">Kepuasan Klien</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors">
                        <h4 className="text-3xl font-bold text-white">24/7</h4>
                        <p className="text-sm text-slate-500 mt-1">Support Teknis</p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-white/5 transition-colors">
                        <h4 className="text-3xl font-bold text-white">3-7</h4>
                        <p className="text-sm text-slate-500 mt-1">Hari Pengerjaan</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
