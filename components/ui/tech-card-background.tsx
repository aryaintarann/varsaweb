"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Database,
    Code2,
    Atom,
    Server,
    Smartphone,
    Globe,
    Cpu,
    Terminal,
    FileCode,
    CodeXml
} from "lucide-react";

export function TechCardBackground() {
    const [mounted, setMounted] = useState(false);
    const [elements, setElements] = useState<{
        items: {
            id: number;
            type: string;
            x: number;
            y: number;
            delay: number;
            duration: number;
            size: number;
        }[];
    }>({ items: [] });

    // Available tech icons mapping
    const techIcons = [
        "database", // Database
        "react",    // Atom
        "html",     // CodeXml
        "code",     // Code2
        "server",   // Server
        "mobile",   // Smartphone
        "web",      // Globe
        "chip",     // Cpu
        "terminal", // Terminal
        "php",      // FileCode
    ];

    useEffect(() => {
        setMounted(true);
        const newElements = [];
        // Generate random elements
        for (let i = 0; i < 6; i++) { // Slightly fewer elements as icons are more detailed
            const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];

            newElements.push({
                id: i,
                type: randomIcon,
                x: Math.random() * 80 + 10, // Keep away from extreme edges
                y: Math.random() * 80 + 10,
                delay: Math.random() * 5,
                duration: Math.random() * 3 + 4, // Slower, more floating feel
                size: Math.random() * 10 + 15, // Random size between 15px and 25px
            });
        }
        setElements({ items: newElements });
    }, []);

    const getIconComponent = (type: string, size: number) => {
        const props = { size, className: "text-[#006666]" }; // Removed opacity-20, let motion.div handle it
        switch (type) {
            case "database": return <Database {...props} />;
            case "react": return <Atom {...props} />;
            case "html": return <CodeXml {...props} />;
            case "code": return <Code2 {...props} />;
            case "server": return <Server {...props} />;
            case "mobile": return <Smartphone {...props} />;
            case "web": return <Globe {...props} />;
            case "chip": return <Cpu {...props} />;
            case "terminal": return <Terminal {...props} />;
            case "php": return <FileCode {...props} />;
            default: return <Code2 {...props} />;
        }
    };

    // Static background elements always visible
    const staticBackground = (
        <>
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(#006666 1px, transparent 1px),
                        linear-gradient(90deg, #006666 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px'
                }}
            ></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4DD0C7]/5 rounded-full filter blur-[60px]"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#006666]/5 rounded-full filter blur-[60px]"></div>
        </>
    );

    if (!mounted) {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
                {staticBackground}
            </div>
        );
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
            {staticBackground}

            {/* Random Animated Elements */}
            {elements.items.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute select-none pointer-events-none flex items-center justify-center z-0"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: [0, 0.5, 0], // Increased max opacity to 0.5 for visibility
                        y: [0, -40], // Increased float distance
                        rotate: [0, Math.random() > 0.5 ? 15 : -15],
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut"
                    }}
                >
                    {getIconComponent(item.type, item.size)}
                </motion.div>
            ))}

            {/* Scanning Line Effect - Subtle */}
            <motion.div
                className="absolute w-full h-px bg-linear-to-r from-transparent via-[#006666]/10 to-transparent"
                animate={{ top: ["0%", "100%"] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: Math.random() * 5 // Random delay for scanline per card
                }}
            />
        </div>
    );
}
