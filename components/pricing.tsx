"use client";

import { useRef } from "react";
import { PricingCard } from "./pricing-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    order: number;
}

// Static fallback data
const staticPlans: PricingPlan[] = [
    {
        id: "1",
        name: "Landing Page",
        description: "Cocok untuk bisnis yang baru mulai online",
        price: 1500000,
        discountPrice: 999000,
        discountLabel: "Hemat 33%",
        discountTerms: "Diskon berlaku untuk pemesanan pertama. Harga normal akan berlaku untuk perpanjangan atau pemesanan berikutnya.",
        features: JSON.stringify([
            "1 Halaman Responsif",
            "Desain Modern & Menarik",
            "Form Kontak WhatsApp",
            "SEO Basic",
            "Gratis Domain .com (1 Tahun)",
            "Gratis Hosting (1 Tahun)",
        ]),
        isPopular: false,
        order: 1,
    },
    {
        id: "2",
        name: "Company Profile",
        description: "Ideal untuk bisnis yang ingin tampil profesional",
        price: 3500000,
        discountPrice: 2499000,
        discountLabel: "Hemat 28%",
        discountTerms: "Diskon berlaku untuk pemesanan pertama. Termasuk revisi 2x. Revisi tambahan dikenakan biaya.",
        features: JSON.stringify([
            "5-7 Halaman Responsif",
            "Desain Custom Premium",
            "CMS Admin Panel",
            "Form Kontak & Integrasi Email",
            "SEO Optimization",
            "Gratis Domain .com (1 Tahun)",
            "Gratis Hosting (1 Tahun)",
            "Maintenance 3 Bulan",
        ]),
        isPopular: true,
        order: 2,
    },
    {
        id: "3",
        name: "E-Commerce",
        description: "Solusi lengkap untuk toko online Anda",
        price: 7500000,
        discountPrice: null,
        discountLabel: null,
        discountTerms: null,
        features: JSON.stringify([
            "Unlimited Halaman",
            "Sistem Keranjang & Checkout",
            "Payment Gateway Integration",
            "Manajemen Produk & Stok",
            "Dashboard Admin Lengkap",
            "SEO Advanced",
            "Gratis Domain .com (1 Tahun)",
            "Gratis Hosting (1 Tahun)",
            "Maintenance 6 Bulan",
            "Training Admin",
        ]),
        isPopular: false,
        order: 3,
    },
];

interface PricingProps {
    plans?: PricingPlan[];
}

export function Pricing({ plans }: PricingProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const data = plans && plans.length > 0 ? plans : staticPlans;
    const sortedData = [...data].sort((a, b) => a.order - b.order);

    const scroll = (direction: "left" | "right") => {
        if (sliderRef.current) {
            const scrollAmount = 350;
            sliderRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section id="pricing" className="py-20 bg-[#F0FAFA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-[#006666] font-bold tracking-wider uppercase text-sm mb-2 block">
                        Pricing
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#006666] mb-4">
                        Pilih Paket yang Tepat untuk Anda
                    </h2>
                    <p className="text-[#334155] max-w-xl mx-auto">
                        Harga transparan tanpa biaya tersembunyi. Semua paket termasuk support dan revisi.
                    </p>
                </div>

                {/* Pricing Cards Slider */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#006666] hover:bg-[#006666] hover:text-white transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#006666] hover:bg-[#006666] hover:text-white transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Slider Container */}
                    <div
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide py-8 snap-x snap-mandatory mx-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {sortedData.map((plan: PricingPlan, index: number) => (
                            <div key={plan.id} className="min-w-[320px] max-w-[380px] snap-center shrink-0">
                                <PricingCard plan={plan} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Project CTA */}
                <div className="mt-16 bg-[#006666]/5 rounded-2xl p-8 md:p-12 border border-[#006666]/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold text-[#006666] mb-2">
                                Butuh solusi custom?
                            </h3>
                            <p className="text-[#334155] max-w-xl">
                                Kami siap membantu mewujudkan ide unik Anda. Konsultasikan kebutuhan spesifik bisnis Anda dengan tim ahli kami.
                            </p>
                        </div>
                        <a
                            href="/#contact"
                            className="shrink-0 px-8 py-3 bg-[#006666] text-white rounded-xl font-semibold hover:bg-[#004D4D] transition-all shadow-md hover:shadow-lg"
                        >
                            Konsultasi Gratis
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
