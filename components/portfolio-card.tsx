"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface PortfolioItem {
    id: string;
    title: string;
    description?: string;
    category: string;
    imageUrl: string | null;
    link?: string | null;
}

export function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
    return (
        <Link href={`/portfolio/${item.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-[#4DD0C7]/20 border-2 border-[#4DD0C7]/40 shadow-md hover:shadow-xl hover:bg-[#4DD0C7]/30 cursor-pointer transition-all"
            >
                <div className="aspect-video bg-surface relative overflow-hidden">
                    {item.imageUrl ? (
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground/30">
                            <span className="text-4xl">📁</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-navy/80 to-transparent opacity-80"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-xs font-bold uppercase tracking-wider mb-2 block text-teal">
                        {item.category || "Project"}
                    </span>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
            </motion.div>
        </Link>
    );
}
