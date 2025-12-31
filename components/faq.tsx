"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const faqs = [
    {
        question: "Berapa lama proses pembuatan website?",
        answer: "Waktu pengerjaan bervariasi tergantung kompleksitas. Untuk Landing Page biasanya 3-5 hari kerja. Untuk Company Profile 5-7 hari kerja, dan Toko Online sekitar 7-14 hari kerja setelah semua materi kami terima."
    },
    {
        question: "Apakah saya mendapatkan akses admin?",
        answer: "Tentu saja! Setelah website selesai dan pelunasan dilakukan, kami akan memberikan akses penuh (username & password) ke dashboard admin. Anda bisa mengedit konten sendiri dengan mudah."
    },
    {
        question: "Apakah ada biaya perpanjangan tahunan?",
        answer: "Ya, ada biaya perpanjangan untuk Domain dan Hosting setiap tahunnya. Biaya ini wajib dibayarkan agar website Anda tetap online. Kami akan menginfokan 1 bulan sebelum masa aktif berakhir."
    },
    {
        question: "Apakah sudah termasuk optimasi SEO?",
        answer: "Semua paket kami sudah termasuk SEO Basic (Struktur URL yang rapi, Meta Tags, Sitemap, dan pendaftaran ke Google Search Console). Untuk SEO lanjutan, kami memiliki layanan terpisah."
    }
];

export function Faq() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yHeader = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <section ref={sectionRef} id="faq" className="py-20 bg-white/[0.02] overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div style={{ y: yHeader }} className="text-center mb-12 will-change-transform">
                    <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">FAQ</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pertanyaan Umum</h2>
                    <p className="text-slate-400">Hal-hal yang sering ditanyakan oleh klien kami.</p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} faq={faq} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-1"
        >
            <div
                className="group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-white hover:text-indigo-400 transition-colors">
                    <span>{faq.question}</span>
                    <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-5 h-5" />
                    </span>
                </div>
                <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="text-slate-400 px-4 pb-4 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
