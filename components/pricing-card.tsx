"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Info, X } from "lucide-react";
import Link from "next/link";
import { TechCardBackground } from "./ui/tech-card-background";

interface PricingPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice: number | null;
    discountLabel: string | null;
    discountTerms: string | null;
    features: string;
    isPopular: boolean;
}

interface PricingCardProps {
    plan: PricingPlan;
    index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
    const [showTerms, setShowTerms] = useState(false);

    const features = JSON.parse(plan.features || "[]") as string[];
    const hasDiscount = plan.discountPrice !== null && plan.discountPrice < plan.price;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 transition-all hover:shadow-xl ${plan.isPopular
                    ? "border-[#006666] scale-105"
                    : "border-[#006666]/10 hover:border-[#006666]/30"
                    }`}
            >
                <TechCardBackground />

                {/* Popular Badge */}
                {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <span className="bg-[#006666] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                            Paling Populer
                        </span>
                    </div>
                )}

                <div className="relative z-10">

                    {/* Plan Name */}
                    <h3 className="text-xl font-bold text-[#006666] mb-2">{plan.name}</h3>
                    <p className="text-[#334155] text-sm mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                        {hasDiscount ? (
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#334155]/50 line-through text-lg">
                                        {formatPrice(plan.price)}
                                    </span>
                                    {plan.discountLabel && (
                                        <span className="bg-[#4DD0C7]/20 text-[#006666] text-xs font-bold px-2 py-0.5 rounded-full">
                                            {plan.discountLabel}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-[#006666]">
                                        {formatPrice(plan.discountPrice!)}
                                    </span>
                                </div>
                                {plan.discountTerms && (
                                    <button
                                        onClick={() => setShowTerms(true)}
                                        className="inline-flex items-center gap-1 text-xs text-[#006666]/70 hover:text-[#006666] transition-colors"
                                    >
                                        <Info className="w-3 h-3" />
                                        S&K Berlaku
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-[#006666]">
                                    {formatPrice(plan.price)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#4DD0C7] shrink-0 mt-0.5" />
                                <span className="text-[#334155] text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                        href="/#contact"
                        className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${plan.isPopular
                            ? "bg-[#006666] text-white hover:bg-[#004D4D]"
                            : "bg-[#006666]/10 text-[#006666] hover:bg-[#006666]/20"
                            }`}
                    >
                        Select Package
                    </Link>
                </div>
            </motion.div>

            {/* Terms Modal */}
            {showTerms && plan.discountTerms && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-[#006666]">Syarat & Ketentuan</h4>
                            <button
                                onClick={() => setShowTerms(false)}
                                className="p-1 hover:bg-[#006666]/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-[#334155]" />
                            </button>
                        </div>
                        <p className="text-[#334155] text-sm whitespace-pre-line">
                            {plan.discountTerms}
                        </p>
                        <button
                            onClick={() => setShowTerms(false)}
                            className="mt-6 w-full py-2 bg-[#006666] text-white rounded-xl font-medium hover:bg-[#004D4D] transition-colors"
                        >
                            Mengerti
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
}
