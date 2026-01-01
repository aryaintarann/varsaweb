import { PricingCard } from "./pricing-card";
import { getPricingPlans } from "@/actions/pricing-actions";

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

export async function Pricing({ plans }: PricingProps) {
    // Fetch from database or use provided plans
    const dbPlans = plans || await getPricingPlans();
    const data = dbPlans.length > 0 ? dbPlans : staticPlans;

    return (
        <section id="pricing" className="py-20 bg-[#F0FAFA] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {data.map((plan: PricingPlan, index: number) => (
                        <PricingCard key={plan.id} plan={plan} index={index} />
                    ))}
                </div>

                {/* Custom Project CTA */}
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
