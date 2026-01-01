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
        title: "Company Profile Website",
        description: "Boost your business credibility with an elegant website illustrating professionalism and corporate values. SEO-friendly features included.",
        icon: "layout",
        order: 0,
    },
    {
        id: "2",
        title: "E-Commerce / Online Store",
        description: "Complete solution for online selling with shopping cart systems, integrated payments (Midtrans, etc.), and easy product management.",
        icon: "shopping-bag",
        order: 1,
    },
    {
        id: "3",
        title: "High Conversion Landing Page",
        description: "Specialized pages designed to convert visitors into customers with strategic copywriting and persuasive design.",
        icon: "target",
        order: 2,
    },
    {
        id: "4",
        title: "Custom Web Application",
        description: "Need unique features? We build web apps tailored to your specific business needs, from reservation systems to analytics dashboards.",
        icon: "code-2",
        order: 3,
    },
];

export function Services({ services }: ServicesProps) {
    const data = services.length > 0 ? services : staticServices;

    return (
        <ParallaxSection id="services" className="py-20 relative bg-[#F0FAFA]" speed={0.12}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
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
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.sort((a, b) => a.order - b.order).map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </ParallaxSection>
    );
}
