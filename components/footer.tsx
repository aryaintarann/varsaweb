import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/actions/settings-actions";

// TikTok icon component (lucide-react doesn't have TikTok)
function TiktokIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    );
}

interface FooterSettings {
    footerDescription: string;
    footerInstagram: string;
    footerTiktok: string;
    footerLinkedin: string;
    footerCopyright: string;
}

const defaults: FooterSettings = {
    footerDescription: "We are a creative team focused on high-quality website development to help business growth in Indonesia.",
    footerInstagram: "",
    footerTiktok: "",
    footerLinkedin: "",
    footerCopyright: "© 2026 VarsaWeb. All rights reserved.",
};

export async function Footer() {
    const settings = await getSiteSettings();

    const data: FooterSettings = {
        footerDescription: settings?.footerDescription || defaults.footerDescription,
        footerInstagram: settings?.footerInstagram || defaults.footerInstagram,
        footerTiktok: settings?.footerTiktok || defaults.footerTiktok,
        footerLinkedin: settings?.footerLinkedin || defaults.footerLinkedin,
        footerCopyright: settings?.footerCopyright || defaults.footerCopyright,
    };

    const hasSocialLinks = data.footerInstagram || data.footerTiktok || data.footerLinkedin;

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
                            {data.footerDescription}
                        </p>
                        {hasSocialLinks && (
                            <div className="flex gap-4 mt-6">
                                {data.footerInstagram && (
                                    <Link href={data.footerInstagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-teal hover:text-navy transition-all">
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                )}
                                {data.footerTiktok && (
                                    <Link href={data.footerTiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-teal hover:text-navy transition-all">
                                        <TiktokIcon className="w-5 h-5" />
                                    </Link>
                                )}
                                {data.footerLinkedin && (
                                    <Link href={data.footerLinkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-teal hover:text-navy transition-all">
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                )}
                            </div>
                        )}
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
                    {data.footerCopyright}
                </div>
            </div>
        </footer>
    );
}
