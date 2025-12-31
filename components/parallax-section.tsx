"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number; // 0.1 = slow, 0.5 = fast
    className?: string;
    id?: string;
}

export function ParallaxSection({
    children,
    speed = 0.15,
    className = "",
    id
}: ParallaxSectionProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [`${speed * -50}px`, `${speed * 50}px`]
    );

    return (
        <section ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }} className="will-change-transform">
                {children}
            </motion.div>
        </section>
    );
}

// For elements that should move in opposite direction (creates depth)
export function ParallaxElement({
    children,
    speed = 0.3,
    className = ""
}: Omit<ParallaxSectionProps, "id">) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [`${speed * 100}px`, `${speed * -100}px`]
    );

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            className={`will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
}
