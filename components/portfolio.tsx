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
        description: "E-commerce for specialty coffee with monthly subscription features",
        category: "E-Commerce",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "2",
        title: "TechStart ID",
        description: "Indonesian startup listing platform with investor matching features",
        category: "Web App",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "3",
        title: "Healthy Living",
        description: "High converting landing page for health programs",
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
        <ParallaxSection id="portfolio" className="py-20 bg-[#F0FAFA]" speed={0.1}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-[#006666] font-bold tracking-wider uppercase text-sm mb-2 block">
                        Portfolio
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#006666] mb-4">
                        Our Best Works
                    </h2>
                    <p className="text-[#334155] max-w-xl mx-auto">
                        Every project is a success story. See how we help clients achieve their digital goals.
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
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#006666] rounded-xl text-white font-semibold hover:bg-[#004D4D] transition-all group shadow-md hover:shadow-lg"
                        >
                            View More Portfolio
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </ParallaxSection>
    );
}
