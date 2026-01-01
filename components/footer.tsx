import { Instagram, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-[#006666] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/logo-brand.png"
                                    alt="VarsaWeb Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl text-white">Varsa<span className="text-teal">Web</span></span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                            We are a creative team focused on high-quality website development to help business growth in Indonesia.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-teal hover:text-navy transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-teal hover:text-navy transition-all">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-teal hover:text-navy transition-all">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Navigation</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li><Link href="#home" className="hover:text-teal transition-colors">Home</Link></li>
                            <li><Link href="#about" className="hover:text-teal transition-colors">About Us</Link></li>
                            <li><Link href="#services" className="hover:text-teal transition-colors">Services</Link></li>
                            <li><Link href="#portfolio" className="hover:text-teal transition-colors">Portfolio</Link></li>
                            <li><Link href="#testimonials" className="hover:text-teal transition-colors">Testimonials</Link></li>
                            <li><Link href="#faq" className="hover:text-teal transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li><Link href="#" className="hover:text-teal transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
                    &copy; 2026 VarsaWeb. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
