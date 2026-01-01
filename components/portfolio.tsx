"use client";

import { ParallaxSection } from "./parallax-section";
import { PortfolioCard } from "./portfolio-card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string | null;
    link: string | null;
}

interface PortfolioProps {
    items: PortfolioItem[];
}

const staticItems = [
    {
        id: "1",
        title: "Kopi Nusantara",
        description: "E-commerce untuk kopi spesialti dengan fitur langganan bulanan",
        category: "E-Commerce",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "2",
        title: "TechStart ID",
        description: "Platform listing startup Indonesia dengan fitur investor matching",
        category: "Web App",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "3",
        title: "Healthy Living",
        description: "Landing page untuk program kesehatan dengan konversi tinggi",
        category: "Landing Page",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
];

export function Portfolio({ items }: PortfolioProps) {
    const data = items.length > 0 ? items : staticItems;
    const displayItems = data.slice(0, 3);
    const hasMore = data.length > 3;

    return (
        <ParallaxSection id="portfolio" className="py-20 bg-black/20" speed={0.1}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-pink-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                        Portfolio
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Karya Terbaik Kami
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Setiap proyek adalah cerita sukses. Lihat bagaimana kami membantu klien mencapai tujuan digital mereka.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayItems.map((item, index) => (
                        <PortfolioCard key={item.id} item={item} index={index} />
                    ))}
                </div>

                {hasMore && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-all group"
                        >
                            Lihat Portfolio Lainnya
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </ParallaxSection>
    );
}
