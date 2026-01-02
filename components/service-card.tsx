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

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.4 },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            className="bg-white border-2 border-[#006666]/10 p-8 rounded-3xl hover:border-[#006666]/30 shadow-lg hover:shadow-xl transition-all duration-300 group h-full relative overflow-hidden"
        >
            <TechCardBackground />
            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    variants={itemVariants}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform bg-[#006666]/10 text-[#006666]"
                >
                    <Icon className="w-7 h-7" />
                </motion.div>

                <motion.h3
                    variants={itemVariants}
                    className="text-xl font-bold text-[#006666] mb-3"
                >
                    {service.title}
                </motion.h3>

                <motion.p
                    variants={itemVariants}
                    className="text-[#334155] text-sm leading-relaxed"
                >
                    {service.description}
                </motion.p>
            </div>
        </motion.div>
    );
}
