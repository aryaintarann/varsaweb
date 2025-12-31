"use client";

import { motion } from "framer-motion";
import { Layout, ShoppingBag, Code2 } from "lucide-react";

const icons: Record<string, any> = {
    layout: Layout,
    "shopping-bag": ShoppingBag,
    "code-2": Code2,
};

interface ServiceCardProps {
    service: {
        title: string;
        description: string;
        icon: string;
    };
    index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
    const Icon = icons[service.icon] || Layout;
    // Determine color based on index or type if needed, or stick to design
    // The HTML design had specific colors for specific items.
    // We can map icon/title to specific styles.

    let colorClass = "text-blue-400 bg-blue-500/10";
    if (service.title.includes("E-Commerce")) colorClass = "text-indigo-400 bg-indigo-500/10";
    if (service.title.includes("Custom")) colorClass = "text-pink-400 bg-pink-500/10";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 group h-full ${service.title.includes("E-Commerce") ? "border-indigo-500/30 relative" : ""}`}
        >
            {/* Glow effect for middle card */}
            {service.title.includes("E-Commerce") && (
                <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl filter blur-xl -z-10"></div>
            )}

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${colorClass}`}>
                <Icon className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {service.description}
            </p>

            <ul className="space-y-2 text-sm text-slate-500">
                {/* We can static code these features or pass them in. For now I'll adhere to the HTML provided text roughly, 
             or implies we should pass features. 
             Since the Prisma schema doesn't have features, we will mock them in the parent or add them.
             For perfect fidelity, I'll assume we pass features in the parent map. */}
                <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    High Performance
                </li>
                <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Modern Design
                </li>
            </ul>
        </motion.div>
    );
}
