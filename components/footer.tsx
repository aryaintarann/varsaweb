import { Zap, Instagram, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/5 pt-16 pb-8 bg-black/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-6 h-6 text-indigo-500 fill-current" />
                            <span className="font-bold text-xl text-white">Varsa<span className="text-indigo-400">Web</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            Kami adalah tim kreatif yang berfokus pada pengembangan website berkualitas tinggi untuk
                            membantu pertumbuhan bisnis UMKM dan Korporat di Indonesia.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Navigasi</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#home" className="hover:text-indigo-400 transition-colors">Home</Link></li>
                            <li><Link href="#about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                            <li><Link href="#services" className="hover:text-indigo-400 transition-colors">Services</Link></li>
                            <li><Link href="#portfolio" className="hover:text-indigo-400 transition-colors">Portfolio</Link></li>
                            <li><Link href="#testimonials" className="hover:text-indigo-400 transition-colors">Testimonials</Link></li>
                            <li><Link href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-indigo-400 transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-sm text-slate-600">
                    &copy; 2024 VarsaWeb Creative Agency. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
