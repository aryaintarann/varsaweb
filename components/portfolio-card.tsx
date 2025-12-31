"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function PortfolioCard({ item, index }: { item: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl overflow-hidden glass-card border-0"
        >
            <div className="aspect-video bg-slate-800 relative overflow-hidden">
                <Image
                    src={item.imageUrl || ""}
                    alt={item.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark to-transparent opacity-80"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-6 w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                <span
                    className={`text-xs font-bold uppercase tracking-wider mb-2 block ${item.titleColorClass || "text-indigo-400"
                        }`}
                >
                    {item.category || "Project"}
                </span>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
            </div>
        </motion.div>
    );
}
