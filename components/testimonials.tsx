"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export function Testimonials({ reviews }: TestimonialsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    const nextSlide = () => {
        if (reviews.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }
    };

    const prevSlide = () => {
        if (reviews.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        }
    };

    // Auto-play
    useEffect(() => {
        if (!autoPlay || reviews.length === 0) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [autoPlay, reviews.length, currentIndex]);

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
                    <div
                        className="max-w-3xl mx-auto"
                        onMouseEnter={() => setAutoPlay(false)}
                        onMouseLeave={() => setAutoPlay(true)}
                    >
                        {/* Slider with Arrows Container */}
                        <div className="relative">
                            {/* Card */}
                            <div className="overflow-hidden rounded-3xl">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        className="glass-card p-8 md:p-12 border border-white/10 text-center"
                                    >
                                        <Quote className="w-12 h-12 text-indigo-500/30 mx-auto mb-6" />

                                        {/* Message */}
                                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
                                            "{reviews[currentIndex].message}"
                                        </p>

                                        {/* Stars */}
                                        <div className="flex gap-1 justify-center mb-6">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-5 h-5 ${star <= reviews[currentIndex].rating
                                                            ? "text-amber-400 fill-amber-400"
                                                            : "text-slate-600"
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {/* Author */}
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg">
                                                {reviews[currentIndex].name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-white font-semibold">{reviews[currentIndex].name}</h4>
                                                {reviews[currentIndex].company && (
                                                    <p className="text-slate-500 text-sm">{reviews[currentIndex].company}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Navigation Arrows - Positioned relative to card */}
                            {reviews.length > 1 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Dots Indicator */}
                        {reviews.length > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {reviews.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                                ? "bg-indigo-500 w-8"
                                                : "bg-white/20 hover:bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

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
                    </div>
                )}
            </div>
        </section>
    );
}
