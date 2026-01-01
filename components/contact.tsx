"use client";

import { useState, useRef } from "react";
import { submitContact } from "@/actions/contact";
import { motion, useScroll, useTransform } from "framer-motion";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

interface ContactProps {
    settings: {
        contactEmail: string;
        contactPhone: string;
        contactAddress: string;
    } | null;
}

const defaults = {
    contactEmail: "hello@varsaweb.com",
    contactPhone: "+62 812 3456 7890",
    contactAddress: "Jakarta Selatan, Indonesia",
};

export function Contact({ settings }: ContactProps) {
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yInfo = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const yForm = useTransform(scrollYProgress, [0, 1], [60, -60]);

    const data = settings || defaults;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const result = await submitContact(formData);
        setLoading(false);

        if (result.success) {
            toast.success("Message sent successfully!");
            (e.target as HTMLFormElement).reset();
        } else {
            toast.error(result.error || "Something went wrong.");
        }
    }

    return (
        <section ref={sectionRef} id="contact" className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div style={{ y: yInfo }} className="will-change-transform">
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-2 block">
                            Hubungi Kami
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Mari Diskusikan Ide Hebat Anda
                        </h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Punya pertanyaan atau siap memulai proyek? Isi formulir di samping atau hubungi kami melalui
                            kontak langsung. Tim kami akan merespons dalam waktu kurang dari 24 jam.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold">Email</h5>
                                    <p className="text-slate-400">{data.contactEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold">WhatsApp / Telepon</h5>
                                    <p className="text-slate-400">{data.contactPhone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold">Lokasi Studio</h5>
                                    <p className="text-slate-400">{data.contactAddress}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        style={{ y: yForm }}
                        className="glass-card p-8 rounded-3xl border border-white/10 will-change-transform"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Nama</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                        placeholder="Nama Anda"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Layanan yang Diminati</label>
                                <select
                                    name="service"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all bg-dark"
                                >
                                    <option className="bg-dark text-white">Company Profile</option>
                                    <option className="bg-dark text-white">Toko Online</option>
                                    <option className="bg-dark text-white">Landing Page</option>
                                    <option className="bg-dark text-white">Lainnya</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Pesan</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                                    placeholder="Ceritakan kebutuhan website Anda..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-1 flex justify-center items-center"
                            >
                                {loading ? <Loader2 className="animate-spin mr-2" /> : "Kirim Pesan"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
