"use client";

import { ParallaxSection } from "./parallax-section";
import { ServiceCard } from "./service-card";

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    order: number;
}

interface ServicesProps {
    services: Service[];
}

const staticServices = [
    {
        id: "1",
        title: "Website Company Profile",
        description: "Tingkatkan kredibilitas bisnis Anda dengan website elegan yang mencerminkan profesionalisme dan nilai perusahaan. Dilengkapi fitur SEO-friendly.",
        icon: "layout",
        order: 0,
    },
    {
        id: "2",
        title: "Toko Online / E-Commerce",
        description: "Solusi lengkap untuk berjualan online dengan sistem keranjang belanja, pembayaran terintegrasi (Midtrans, dll), dan manajemen produk yang mudah.",
        icon: "shopping-bag",
        order: 1,
    },
    {
        id: "3",
        title: "Landing Page Konversi Tinggi",
        description: "Halaman khusus yang dirancang untuk mengubah pengunjung menjadi pelanggan dengan copywriting strategis dan desain yang persuasif.",
        icon: "target",
        order: 2,
    },
    {
        id: "4",
        title: "Custom Web Application",
        description: "Butuh fitur yang unik? Kami membangun aplikasi web sesuai kebutuhan spesifik bisnis Anda, dari sistem reservasi hingga dashboard analitik.",
        icon: "code-2",
        order: 3,
    },
];

export function Services({ services }: ServicesProps) {
    const data = services.length > 0 ? services : staticServices;

    return (
        <ParallaxSection id="services" className="py-20 relative" speed={0.12}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                        Layanan Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Solusi Digital untuk Setiap Kebutuhan
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Dari website sederhana hingga aplikasi web kompleks, kami siap mewujudkan visi digital Anda.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.sort((a, b) => a.order - b.order).map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </ParallaxSection>
    );
}
