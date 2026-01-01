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
        <main className="min-h-screen relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-violet-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <Navbar />

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>

                    {/* Image */}
                    <div className="aspect-video bg-slate-800 relative overflow-hidden rounded-2xl mb-8">
                        {portfolio.imageUrl ? (
                            <Image
                                src={portfolio.imageUrl}
                                alt={portfolio.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                <span className="text-6xl">📁</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="glass-card p-8 rounded-2xl border border-white/10">
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                            {portfolio.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {portfolio.title}
                        </h1>
                        <p className="text-slate-400 leading-relaxed mb-8">
                            {portfolio.description}
                        </p>

                        {portfolio.link && (
                            <a
                                href={portfolio.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-colors"
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
