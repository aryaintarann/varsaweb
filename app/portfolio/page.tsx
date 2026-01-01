import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getPortfolioItems } from "@/actions/admin-actions";
import { PortfolioCard } from "@/components/portfolio-card";

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
        description: "E-commerce untuk kopi spesialti dengan fitur langganan bulanan",
        category: "E-Commerce",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "2",
        title: "TechStart ID",
        description: "Platform listing startup Indonesia dengan fitur investor matching",
        category: "Web App",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
    {
        id: "3",
        title: "Healthy Living",
        description: "Landing page untuk program kesehatan dengan konversi tinggi",
        category: "Landing Page",
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
        link: null,
    },
];

export default async function PortfolioPage() {
    const portfolioItems = await getPortfolioItems();
    const data: PortfolioItem[] = portfolioItems.length > 0 ? portfolioItems : staticItems;

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-violet-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-pink-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                            Portfolio
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Karya Terbaik Kami
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Lihat koleksi lengkap proyek-proyek yang telah kami kerjakan.
                            Setiap karya mencerminkan dedikasi kami dalam menciptakan solusi digital yang berkualitas.
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
                            <p className="text-slate-500 text-lg">Belum ada portfolio</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
