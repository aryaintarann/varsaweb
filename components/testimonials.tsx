"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Link from "next/link";

interface Review {
    id: string;
    name: string;
    company: string | null;
    rating: number;
    message: string;
}

interface TestimonialsProps {
    reviews: Review[];
}

const defaultReviews: Review[] = [
    {
        id: "1",
        name: "Budi Santoso",
        company: "PT Maju Jaya",
        rating: 5,
        message: "VarsaWeb sangat profesional dalam mengerjakan website kami. Hasilnya melebihi ekspektasi dan proses komunikasinya sangat baik. Highly recommended!",
    },
    {
        id: "2",
        name: "Sarah Wijaya",
        company: "Kopi Nusantara",
        rating: 5,
        message: "Tim VarsaWeb sangat responsif dan kreatif. Website e-commerce kami sekarang jauh lebih modern dan penjualan meningkat signifikan.",
    },
    {
        id: "3",
        name: "Ahmad Hidayat",
        company: "StartUp ID",
        rating: 4,
        message: "Pelayanan yang memuaskan dengan harga yang reasonable. Website landing page kami jadi sangat menarik dan konversi meningkat.",
    },
];

export function Testimonials({ reviews }: TestimonialsProps) {
    return (
        <section id="testimonials" className="py-20 bg-white/2 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-pink-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                        Testimoni
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Apa Kata Klien Kami
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Dengarkan pengalaman langsung dari klien yang telah bekerja sama dengan VarsaWeb.
                    </p>
                </div>

                {reviews.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <Star className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                        <p className="text-slate-500 text-lg mb-10">Belum ada Testimoni</p>
                        <Link
                            href="/review"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition-colors"
                        >
                            <Star className="w-4 h-4" />
                            Jadilah yang Pertama Memberi Review
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.slice(0, 6).map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glass-card p-6 rounded-2xl border border-white/10 relative"
                                >
                                    <Quote className="w-10 h-10 text-indigo-500/20 absolute top-4 right-4" />

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= review.rating
                                                    ? "text-amber-400 fill-amber-400"
                                                    : "text-slate-600"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Message */}
                                    <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-4">
                                        "{review.message}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                                            {review.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold text-sm">{review.name}</h4>
                                            {review.company && (
                                                <p className="text-slate-500 text-xs">{review.company}</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            className="text-center mt-12"
                        >
                            <Link
                                href="/review"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
                            >
                                <Star className="w-4 h-4" />
                                Berikan Review Anda
                            </Link>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
}

