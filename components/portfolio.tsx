"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PortfolioCard } from "./portfolio-card";
import { ParallaxSection } from "@/components/parallax-section";

const staticItems = [
    {
        id: "1",
        title: "PT. Maju Logistik",
        category: "Company Profile",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        titleColorClass: "text-indigo-400"
    },
    {
        id: "2",
        title: "Sneaker Hype Store",
        category: "E-Commerce",
        imageUrl: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800",
        titleColorClass: "text-pink-400"
    },
    {
        id: "3",
        title: "Webinar Keuangan",
        category: "Landing Page",
        imageUrl: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800",
        titleColorClass: "text-blue-400"
    }
];

export function Portfolio() {
    const items = staticItems;

    return (
        <ParallaxSection id="portfolio" className="py-20 bg-black/20" speed={0.1}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                            Portfolio
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Karya Terbaru
                        </h2>
                        <p className="text-slate-400">
                            Beberapa project pilihan yang telah kami kerjakan.
                        </p>
                    </div>
                    <Link href="#" className="text-indigo-400 font-medium hover:text-indigo-300 flex items-center gap-1 group">
                        Lihat Semua <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <PortfolioCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </ParallaxSection>
    );
}
