"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TechCardBackground } from "./ui/tech-card-background";

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
        question: "How long does it take to create a website?",
        answer: "Development time varies depending on project complexity. For a standard website, it usually takes 1-2 weeks. websites with custom features like e-commerce or booking systems can take 3-4 weeks.",
        order: 0,
    },
    {
        id: "2",
        question: "Does the price include domain and hosting?",
        answer: "Our package prices do not include domain and hosting to give you flexibility in choosing a provider. However, we are happy to assist you in the setup process with your chosen domain and hosting.",
        order: 1,
    },
    {
        id: "3",
        question: "What is included in the maintenance service?",
        answer: "Our maintenance service includes routine backups, security updates, uptime monitoring, minor bug fixes, and technical support via WhatsApp or email during business hours.",
        order: 2,
    },
    {
        id: "4",
        question: "Can I request design revisions?",
        answer: "Absolutely! We provide design revisions according to the selected package. Each milestone will go through an approval process from you before we proceed to the next stage.",
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
            className="bg-white border-2 border-[#006666]/10 rounded-2xl p-1 shadow-md hover:shadow-lg hover:border-[#006666]/30 transition-all duration-300 relative overflow-hidden"
        >
            <TechCardBackground />
            <div className="relative z-10">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full p-5 text-left"
                >
                    <span className="font-semibold text-[#006666]">{faq.question}</span>
                    <ChevronDown
                        className={`w-5 h-5 text-[#006666] transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                            <p className="px-5 pb-5 text-[#334155] leading-relaxed">{faq.answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
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
        <section ref={sectionRef} id="faq" className="py-20 bg-[#F0FAFA] overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div style={{ y: yHeader }} className="text-center mb-12 will-change-transform">
                    <span className="text-[#006666] font-bold tracking-wider uppercase text-sm mb-2 block">FAQ</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#006666] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[#334155] max-w-xl mx-auto">
                        Some common questions asked by our clients.
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
