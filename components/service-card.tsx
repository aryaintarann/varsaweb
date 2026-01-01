"use client";

import { motion } from "framer-motion";
import { Layout, ShoppingBag, Code2, Target } from "lucide-react";
import { TechCardBackground } from "./ui/tech-card-background";

const icons: Record<string, any> = {
    layout: Layout,
    "shopping-bag": ShoppingBag,
    "code-2": Code2,
    target: Target,
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border-2 border-[#006666]/10 p-8 rounded-3xl hover:border-[#006666]/30 shadow-lg hover:shadow-xl transition-all duration-300 group h-full relative overflow-hidden"
        >
            <TechCardBackground />
            <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-[#006666]/10 text-[#006666]">
                    <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-[#006666] mb-3">{service.title}</h3>
                <p className="text-[#334155] text-sm leading-relaxed mb-6">
                    {service.description}
                </p>

                <ul className="space-y-2 text-sm text-[#334155]">
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#006666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        High Performance
                    </li>
                    <li className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#006666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Modern Design
                    </li>
                </ul>
            </div>
        </motion.div>
    );
}
