"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "/#about" },
        { name: "Services", href: "/#services" },
        { name: "Portfolio", href: "/#portfolio" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "FAQ", href: "/#faq" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <nav
            className={cn(
                "fixed w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg"
                    : "bg-transparent py-2"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logo-brand.png"
                                alt="VarsaWeb Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-[#006666]">
                            Varsa<span className="text-[#4DD0C7]">Web</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-[#334155] hover:text-[#006666] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/#contact"
                        className="hidden md:flex px-5 py-2.5 rounded-full bg-[#006666] hover:bg-[#004D4D] text-white text-sm font-semibold transition-all items-center gap-2 group"
                    >
                        Start Project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#006666] p-2 hover:bg-[#006666]/10 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#006666]/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-3 text-base font-medium text-[#334155] hover:text-[#006666] hover:bg-[#006666]/5 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
