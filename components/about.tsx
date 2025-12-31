"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function About() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section ref={ref} id="about" className="py-24 bg-muted/30 overflow-hidden">
            <div className="container px-6 mx-auto">
                <motion.div
                    style={{ opacity, y }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    {/* Text Content */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary">
                            Who We Are
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            VarsaWeb is a forward-thinking digital agency dedicated to crafting superior web experiences. We believe in the power of clean design and robust engineering to elevate brands.
                        </p>
                        <ul className="space-y-4 mt-6">
                            {[
                                "Custom High-Performance Websites",
                                "Scalable CMS Solutions",
                                "SEO-Optimized Architecture",
                                "Modern, Clean Aesthetics"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-accent h-5 w-5" />
                                    <span className="text-foreground font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4">
                            <Button variant="secondary" asChild>
                                <Link href="#portfolio">See Our Work</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Visual/Image Placeholder */}
                    <div className="flex-1 relative">
                        <div className="relative z-10 bg-primary p-8 rounded-2xl shadow-2xl text-primary-foreground">
                            <div className="text-8xl font-bold opacity-10 absolute top-4 right-4">01</div>
                            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                            <p className="text-primary-foreground/80">
                                To empower businesses with digital tools that are not just functional, but exceptional. We strip away the clutter to focus on what matters: your success.
                            </p>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute top-10 -right-10 w-full h-full border-2 border-accent/20 rounded-2xl -z-10 transform rotate-3" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
