"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParallaxSection } from "./parallax-section";
import { ServiceCard } from "./service-card";

interface ServiceCategory {
    id: string;
    name: string;
    order: number;
}

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
    categoryId: string | null;
}

interface ServicesProps {
    services: Service[];
    categories: ServiceCategory[];
}

const staticServices = [
    {
        id: "1",
        title: "Company Profile Website",
        description: "Boost your business credibility with an elegant website illustrating professionalism and corporate values. SEO-friendly features included.",
        icon: "layout",
        order: 0,
        categoryId: null,
    },
    {
        id: "2",
        title: "E-Commerce / Online Store",
        description: "Complete solution for online selling with shopping cart systems, integrated payments (Midtrans, etc.), and easy product management.",
        icon: "shopping-bag",
        order: 1,
        categoryId: null,
    },
    {
        id: "3",
        title: "High Conversion Landing Page",
        description: "Specialized pages designed to convert visitors into customers with strategic copywriting and persuasive design.",
        icon: "target",
        order: 2,
        categoryId: null,
    },
    {
        id: "4",
        title: "Custom Web Application",
        description: "Need unique features? We build web apps tailored to your specific business needs, from reservation systems to analytics dashboards.",
        icon: "code-2",
        order: 3,
        categoryId: null,
    },
];

export function Services({ services, categories }: ServicesProps) {
    const data = services.length > 0 ? services : staticServices;
    const [activeTab, setActiveTab] = useState<string>("all");

    // Filter services by category
    const filteredServices = activeTab === "all"
        ? data
        : data.filter((s) => s.categoryId === activeTab);

    // Sorted services
    const sortedServices = [...filteredServices].sort((a, b) => a.order - b.order);

    // Get active category name
    const activeCategoryName = activeTab === "all"
        ? "Semua Layanan"
        : categories.find(c => c.id === activeTab)?.name || "Layanan";

    return (
        <ParallaxSection id="services" className="py-20 relative bg-[#F0FAFA]" speed={0.12}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-[#006666] font-bold tracking-wider uppercase text-sm mb-2 block">
                        Our Services
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#006666] mb-4">
                        Digital Solutions for Every Need
                    </h2>
                    <p className="text-[#334155] max-w-xl mx-auto">
                        From simple websites to complex web apps, we are ready to realize your digital vision.
                    </p>
                </div>

                {/* Category Tabs */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${activeTab === "all"
                                ? "bg-[#006666] text-white shadow-lg"
                                : "bg-white text-[#006666] border border-[#006666]/20 hover:border-[#006666]/50"
                                }`}
                        >
                            Semua
                        </button>
                        {categories
                            .sort((a, b) => a.order - b.order)
                            .map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${activeTab === cat.id
                                        ? "bg-[#006666] text-white shadow-lg"
                                        : "bg-white text-[#006666] border border-[#006666]/20 hover:border-[#006666]/50"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                    </div>
                )}

                {/* Category Box with Services */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/50 backdrop-blur-sm border-2 border-[#006666]/10 rounded-3xl p-8 shadow-lg"
                    >
                        <h3 className="text-2xl font-bold text-[#006666] mb-8 text-center">
                            {activeCategoryName}
                        </h3>

                        {sortedServices.length > 0 ? (
                            <div
                                className="max-h-[500px] overflow-y-auto pr-2"
                                style={{ scrollbarWidth: "thin" }}
                            >
                                <div className="flex flex-wrap justify-center gap-6 pb-4">
                                    {sortedServices.map((service, index) => (
                                        <div key={service.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[350px]">
                                            <ServiceCard service={service} index={index} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-[#334155]">
                                Belum ada layanan dalam kategori ini.
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </ParallaxSection>
    );
}
