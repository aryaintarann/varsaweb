import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getPortfolioItems } from "@/actions/admin-actions";
import { PortfolioCard } from "@/components/portfolio-card";

export const metadata: Metadata = {
    title: "Portfolio - Karya Terbaik Kami",
    description: "Lihat koleksi lengkap proyek website yang telah kami kerjakan. Setiap karya mencerminkan dedikasi kami dalam menciptakan solusi digital berkualitas.",
    openGraph: {
        title: "Portfolio VarsaWeb - Karya Terbaik Kami",
        description: "Lihat koleksi lengkap proyek website yang telah kami kerjakan.",
    },
};

interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string | null;
    link: string | null;
}

const staticItems: PortfolioItem[] = [
    {
        id: "1",
        title: "Kopi Nusantara",
        description: "Specialty coffee e-commerce with monthly subscription features",
        category: "E-Commerce",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "2",
        title: "TechStart ID",
        description: "Indonesian startup listing platform with investor matching features",
        category: "Web App",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "3",
        title: "Healthy Living",
        description: "High-conversion landing page for health programs",
        category: "Landing Page",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
];

export default async function PortfolioPage() {
    const portfolioItems = await getPortfolioItems();
    const data: PortfolioItem[] = portfolioItems.length > 0 ? portfolioItems : staticItems;

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#F0FAFA]">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-[#006666] font-bold tracking-wider uppercase text-sm mb-2 block">
                            Portfolio
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#006666] mb-4">
                            Our Best Works
                        </h1>
                        <p className="text-[#334155] max-w-2xl mx-auto">
                            Explore our complete collection of projects.
                            Each work reflects our dedication to creating quality digital solutions.
                        </p>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((item, index) => (
                            <PortfolioCard key={item.id} item={item} index={index} />
                        ))}
                    </div>

                    {data.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[#334155] text-lg">No portfolio items yet</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
