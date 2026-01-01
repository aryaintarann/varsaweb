"use client";

import { useState } from "react";
import { submitReview } from "@/actions/review-actions";
import { motion } from "framer-motion";
import { Star, Send, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ReviewPage() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set("rating", rating.toString());

        const result = await submitReview(formData);

        if (result.success) {
            setSubmitted(true);
        } else {
            alert(result.error);
        }
        setLoading(false);
    }

    if (submitted) {
        return (
            <main className="min-h-screen relative overflow-hidden bg-white">
                {/* Ambient Background Effects */}
                <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full filter blur-[100px] opacity-50 animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-navy/5 rounded-full filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                </div>

                <div className="flex items-center justify-center min-h-screen px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <CheckCircle className="w-20 h-20 text-teal mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-navy mb-4">Thank You!</h1>
                        <p className="text-foreground/70 mb-8">
                            Your review has been submitted and will be displayed after approval.
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-teal text-navy font-semibold rounded-xl hover:bg-teal/90 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen relative overflow-hidden bg-white">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full filter blur-[100px] opacity-50 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-navy/5 rounded-full filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-teal/5 rounded-full filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-navy border-b border-teal/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                                <Image
                                    src="/logo-brand.png"
                                    alt="VarsaWeb Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-white">
                                Varsa<span className="text-teal">Web</span>
                            </span>
                        </Link>
                        <Link
                            href="/"
                            className="text-white/70 hover:text-white text-sm transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <span className="text-teal font-bold tracking-wider uppercase text-sm mb-2 block">
                            Testimonials
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                            Leave a Review
                        </h1>
                        <p className="text-foreground/70 max-w-xl mx-auto">
                            Share your experience working with VarsaWeb.
                            Your review means a lot to us.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="bg-[#4DD0C7]/20 p-8 rounded-3xl border-2 border-[#4DD0C7]/40 space-y-6 shadow-lg"
                    >
                        {/* Star Rating */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-navy text-center">Rating</label>
                            <div className="flex gap-3 justify-center">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const isActive = star <= (hoverRating || rating);
                                    return (
                                        <motion.button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            className="relative"
                                        >
                                            <motion.div
                                                animate={{
                                                    scale: isActive ? 1 : 0.9,
                                                    opacity: isActive ? 1 : 0.5,
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Star
                                                    className={`w-12 h-12 transition-colors duration-300 ${isActive
                                                        ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                                                        : "text-foreground/30"
                                                        }`}
                                                />
                                            </motion.div>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1.5, opacity: 0 }}
                                                    transition={{ duration: 0.4 }}
                                                    className="absolute inset-0 bg-amber-400/30 rounded-full"
                                                />
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                            <p className="text-center text-sm text-foreground/60">
                                {rating === 5 && "Excellent! ⭐"}
                                {rating === 4 && "Very Good!"}
                                {rating === 3 && "Good"}
                                {rating === 2 && "Fair"}
                                {rating === 1 && "Poor"}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-navy">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your Name"
                                    className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-foreground/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-navy">Company (Optional)</label>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company Name"
                                    className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-foreground/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-navy">Review</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                placeholder="Tell us about your experience working with VarsaWeb..."
                                className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-foreground/40 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal hover:bg-teal/90 text-navy font-bold py-4 rounded-xl shadow-lg shadow-teal/25 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit Review
                                </>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>
        </main>
    );
}
