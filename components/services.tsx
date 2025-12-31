import { prisma } from "@/lib/prisma";
import { ServiceCard } from "@/components/service-card";

// Fallback services matching HTML content
const staticServices = [
    {
        id: "1",
        title: "Website Profil & Branding",
        description: "Ideal untuk Company Profile, Portfolio Pribadi, Blog, Landing Page, atau Website Organisasi/Komunitas.",
        icon: "layout",
    },
    {
        id: "2",
        title: "E-Commerce & Bisnis",
        description: "Solusi jualan online. Toko Online, Katalog Produk, Website Booking Hotel/Travel, hingga Marketplace.",
        icon: "shopping-bag",
    },
    {
        id: "3",
        title: "Custom & Sistem Web",
        description: "Mengerjakan jenis website apapun sesuai request. Portal Berita, Web Sekolah, Sistem Informasi, Forum, dll.",
        icon: "code-2",
    }
];

export async function Services() {
    let services = [];
    try {
        services = await prisma.service.findMany();
    } catch (e) {
        // ignore
    }

    if (services.length === 0) {
        services = staticServices;
    }

    return (
        <section id="services" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                        Layanan Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Pembuatan Segala Jenis Website
                    </h2>
                    <p className="text-slate-400">
                        Apapun kebutuhan website Anda, kami siap mewujudkannya dengan teknologi terbaru.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service: any, index: number) => {
                        return (
                            <ServiceCard key={service.id} service={service} index={index} />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
