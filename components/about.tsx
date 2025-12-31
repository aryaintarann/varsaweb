"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Target, HeartHandshake } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function About() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yImage = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yContent = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <section ref={sectionRef} id="about" className="py-20 bg-white/2 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        style={{ y: yImage }}
                        className="relative will-change-transform"
                    >
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl"></div>
                        <div className="relative aspect-video md:aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                                alt="Tim VarsaWeb"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        style={{ y: yContent }}
                        className="will-change-transform"
                    >
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                            Tentang Kami
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Lebih Dari Sekadar Jasa Pembuatan Website
                        </h2>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            VarsaWeb lahir dari semangat untuk membantu UMKM dan perusahaan
                            Indonesia bersaing di era digital. Kami bukan hanya menulis kode,
                            kami merancang solusi bisnis.
                        </p>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Tim kami terdiri dari desainer UI/UX yang kreatif, developer yang
                            handal, dan ahli strategi digital yang siap memastikan website Anda
                            tidak hanya bagus dilihat, tapi juga menghasilkan profit.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="bg-indigo-500/10 p-3 rounded-lg text-indigo-400 shrink-0">
                                    <Target className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Fokus Hasil</h4>
                                    <p className="text-sm text-slate-500">
                                        Desain yang mengutamakan user experience dan konversi.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="bg-pink-500/10 p-3 rounded-lg text-pink-400 shrink-0">
                                    <HeartHandshake className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Partner Jangka Panjang</h4>
                                    <p className="text-sm text-slate-500">
                                        Kami menemani Anda dari awal pembuatan hingga maintenance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
