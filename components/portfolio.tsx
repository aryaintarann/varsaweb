"use client";

import { ParallaxSection } from "./parallax-section";
import { PortfolioCard } from "./portfolio-card";

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
    {
        id: "4",
        title: "Artisan Bakery",
        description: "Website toko roti premium dengan sistem pemesanan online",
        category: "E-Commerce",
        imageUrl: "https://images.unsplash.com/photo-1517433367941-f210f9c2de70?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "5",
        title: "Property Pro",
        description: "Portal listing properti dengan virtual tour 360°",
        category: "Web App",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "6",
        title: "Edu Course",
        description: "Platform kursus online dengan fitur sertifikasi",
        category: "Web App",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
];

export function Portfolio({ items }: PortfolioProps) {
    const data = items.length > 0 ? items : staticItems;

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
                    {data.map((item, index) => (
                        <PortfolioCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </ParallaxSection>
    );
}
