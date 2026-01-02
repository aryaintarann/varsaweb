import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PortfolioDetailPage({ params }: PageProps) {
    const { id } = await params;

    const portfolio = await prisma.portfolioItem.findUnique({
        where: { id },
    });

    if (!portfolio) {
        notFound();
    }

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#F0FAFA]">
            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-[#006666] hover:text-[#004D4D] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>

                    {/* Image */}
                    <div className="aspect-video bg-white relative overflow-hidden rounded-2xl mb-8 shadow-lg">
                        {portfolio.imageUrl ? (
                            <Image
                                src={portfolio.imageUrl}
                                alt={portfolio.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#006666]/30">
                                <span className="text-6xl">📁</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="bg-white p-8 rounded-2xl border-2 border-[#006666]/10 shadow-lg">
                        <span className="text-[#006666] font-bold tracking-wider uppercase text-sm mb-2 block">
                            {portfolio.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#006666] mb-4">
                            {portfolio.title}
                        </h1>
                        <div
                            className="rich-text-content text-[#334155] mb-8"
                            dangerouslySetInnerHTML={{ __html: portfolio.description }}
                        />

                        {portfolio.link && (
                            <a
                                href={portfolio.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#006666] rounded-xl text-white hover:bg-[#004D4D] transition-colors shadow-lg"
                            >
                                View Project
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
