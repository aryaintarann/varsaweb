"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
    order: number;
}

interface FaqProps {
    faqs: FaqItem[];
}

const defaultFaqs = [
    {
        id: "1",
        question: "Berapa lama proses pembuatan website?",
        answer: "Waktu pengerjaan bervariasi tergantung kompleksitas proyek. Untuk website standar, biasanya membutuhkan waktu 1-2 minggu. Website dengan fitur kustom seperti e-commerce atau sistem booking bisa memakan waktu 3-4 minggu.",
        order: 0,
    },
    {
        id: "2",
        question: "Apakah harga sudah termasuk domain dan hosting?",
        answer: "Harga paket kami belum termasuk domain dan hosting untuk memberikan Anda fleksibilitas dalam memilih provider. Namun, kami dengan senang hati akan membantu Anda dalam proses setup domain dan hosting pilihan Anda.",
        order: 1,
    },
    {
        id: "3",
        question: "Apa saja yang termasuk dalam layanan maintenance?",
        answer: "Layanan maintenance kami mencakup backup rutin, update keamanan, monitoring uptime, perbaikan bug minor, dan support teknis melalui WhatsApp atau email selama jam kerja.",
        order: 2,
    },
    {
        id: "4",
        question: "Bisakah saya request revisi desain?",
        answer: "Tentu! Kami menyediakan revisi desain sesuai paket yang dipilih. Setiap milestone akan melalui proses approval dari Anda sebelum kami melanjutkan ke tahap berikutnya.",
        order: 3,
    },
];

function FaqItemComponent({ faq, index }: { faq: FaqItem; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card rounded-2xl p-1"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-5 text-left"
            >
                <span className="font-semibold text-white">{faq.question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="px-5 pb-5 text-slate-400 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function Faq({ faqs }: FaqProps) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yHeader = useTransform(scrollYProgress, [0, 1], [40, -40]);

    const data = faqs.length > 0 ? faqs : defaultFaqs;

    return (
        <section ref={sectionRef} id="faq" className="py-20 bg-white/2 overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div style={{ y: yHeader }} className="text-center mb-12 will-change-transform">
                    <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">FAQ</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Beberapa pertanyaan yang sering ditanyakan klien kami.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {data.sort((a, b) => a.order - b.order).map((faq, index) => (
                        <FaqItemComponent key={faq.id} faq={faq} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
