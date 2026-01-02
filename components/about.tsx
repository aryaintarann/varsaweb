"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Target, HeartHandshake } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface AboutProps {
    settings: {
        aboutImage: string | null;
        aboutTitle: string;
        aboutParagraph1: string;
        aboutParagraph2: string;
        aboutFeature1: string;
        aboutFeature1Desc: string;
        aboutFeature2: string;
        aboutFeature2Desc: string;
    } | null;
}

const defaults = {
    aboutImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    aboutTitle: "More Than Just A Web Agency",
    aboutParagraph1: "VarsaWeb was born from the passion to help businesses compete in the digital era. We don't just write code, we design business solutions.",
    aboutParagraph2: "Our team consists of creative UI/UX designers, reliable developers, and digital strategists ready to ensure your website is not only visually appealing but also profitable.",
    aboutFeature1: "Results Focused",
    aboutFeature1Desc: "Design that prioritizes user experience and conversion.",
    aboutFeature2: "Long Term Partner",
    aboutFeature2Desc: "We accompany you from development to maintenance.",
};

export function About({ settings }: AboutProps) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yImage = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yContent = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const data = {
        ...defaults,
        ...settings,
        aboutImage: settings?.aboutImage || defaults.aboutImage,
    };

    return (
        <section ref={sectionRef} id="about" className="py-20 bg-[#F0FAFA] overflow-hidden">
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
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal/20 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-navy/10 rounded-full blur-2xl"></div>
                        <div className="relative aspect-video md:aspect-square overflow-hidden rounded-2xl shadow-2xl">
                            <Image
                                src={data.aboutImage}
                                alt="VarsaWeb Team"
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
                        <span className="text-[#006666] font-bold tracking-wider uppercase text-sm mb-2 block">
                            About Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#006666] mb-6">
                            {data.aboutTitle}
                        </h2>
                        <p className="text-[#334155] mb-6 leading-relaxed">
                            {data.aboutParagraph1}
                        </p>
                        <p className="text-[#334155] mb-8 leading-relaxed">
                            {data.aboutParagraph2}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#006666]/5 transition-colors">
                                <div className="bg-[#006666]/10 p-3 rounded-lg text-[#006666] shrink-0">
                                    <Target className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[#006666] font-bold">{data.aboutFeature1}</h4>
                                    <p className="text-sm text-[#334155]">
                                        {data.aboutFeature1Desc}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#006666]/5 transition-colors">
                                <div className="bg-[#006666]/10 p-3 rounded-lg text-[#006666] shrink-0">
                                    <HeartHandshake className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-[#006666] font-bold">{data.aboutFeature2}</h4>
                                    <p className="text-sm text-[#334155]">
                                        {data.aboutFeature2Desc}
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
