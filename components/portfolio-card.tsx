"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TechCardBackground } from "./ui/tech-card-background";

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
                className="group relative rounded-3xl overflow-hidden bg-white border-2 border-[#006666]/10 shadow-lg hover:shadow-xl hover:border-[#006666]/30 cursor-pointer transition-all"
            >
                <TechCardBackground />
                <div className="aspect-video bg-[#F0FAFA] relative overflow-hidden z-10">
                    {item.imageUrl ? (
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#006666]/30">
                            <span className="text-4xl">📁</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#006666]/90 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform z-20">
                    <span className="text-xs font-bold uppercase tracking-wider mb-2 block text-[#80FFFF]">
                        {item.category || "Project"}
                    </span>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
            </motion.div>
        </Link>
    );
}
