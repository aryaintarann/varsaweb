"use client";

import { useState, useRef } from "react";
import { submitContact } from "@/actions/contact";
import { motion, useScroll, useTransform } from "framer-motion";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { TechCardBackground } from "./ui/tech-card-background";

interface Service {
    id: string;
    title: string;
}

interface PricingPlan {
    id: string;
    name: string;
}

interface ContactProps {
    settings: {
        contactEmail: string;
        contactPhone: string;
        contactAddress: string;
    } | null;
    services?: Service[];
    pricingPlans?: PricingPlan[];
}

const defaults = {
    contactEmail: "hello@varsaweb.com",
    contactPhone: "+62 812 3456 7890",
    contactAddress: "Jakarta Selatan, Indonesia",
};

export function Contact({ settings, services = [], pricingPlans = [] }: ContactProps) {
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
        <section ref={sectionRef} id="contact" className="py-20 relative overflow-hidden bg-[#F0FAFA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div style={{ y: yInfo }} className="will-change-transform">
                        <span className="text-[#006666] font-bold tracking-wider uppercase text-sm mb-2 block">
                            Contact Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#006666] mb-6">
                            Let's Discuss Your Great Idea
                        </h2>
                        <p className="text-[#334155] mb-8 leading-relaxed">
                            Have a question or ready to start a project? Fill out the form or contact us directly.
                            Our team will respond in less than 24 hours.
                        </p>

                        <div className="space-y-6">
                            <a
                                href={`mailto:${data.contactEmail}`}
                                className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-[#006666]/5 transition-all"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#006666]/10 flex items-center justify-center text-[#006666] group-hover:bg-[#006666] group-hover:text-white transition-all">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-[#006666] font-bold">Email</h5>
                                    <p className="text-[#334155]">{data.contactEmail}</p>
                                </div>
                            </a>
                            <a
                                href={`https://wa.me/${data.contactPhone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-[#006666]/5 transition-all"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#006666]/10 flex items-center justify-center text-[#006666] group-hover:bg-[#006666] group-hover:text-white transition-all">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-[#006666] font-bold">WhatsApp</h5>
                                    <p className="text-[#334155]">{data.contactPhone}</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-[#006666]/5 transition-all">
                                <div className="w-12 h-12 rounded-full bg-[#006666]/10 flex items-center justify-center text-[#006666] group-hover:bg-[#006666] group-hover:text-white transition-all">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h5 className="text-[#006666] font-bold">Studio Location</h5>
                                    <p className="text-[#334155]">{data.contactAddress}</p>
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
                        className="bg-white p-8 rounded-3xl border-2 border-[#006666]/10 will-change-transform shadow-lg hover:shadow-xl hover:border-[#006666]/30 transition-all duration-300 relative overflow-hidden"
                    >
                        <TechCardBackground />
                        <div className="relative z-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#006666] mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all placeholder:text-foreground/40"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#006666] mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all placeholder:text-foreground/40"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#006666] mb-2">WhatsApp Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all placeholder:text-foreground/40"
                                        placeholder="+62 812 3456 7890"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#006666] mb-3">Preferred Contact Method</label>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="preferredContact"
                                                value="Email"
                                                defaultChecked
                                                className="w-4 h-4 text-teal focus:ring-teal border-navy/20 accent-teal"
                                            />
                                            <span className="text-[#334155] group-hover:text-[#006666] transition-colors">Email</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="preferredContact"
                                                value="WhatsApp"
                                                className="w-4 h-4 text-teal focus:ring-teal border-navy/20 accent-teal"
                                            />
                                            <span className="text-[#334155] group-hover:text-[#006666] transition-colors">WhatsApp</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#006666] mb-2">Service Interested</label>
                                    <select
                                        name="service"
                                        className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                                    >
                                        {(services.length > 0 || pricingPlans.length > 0) ? (
                                            <>
                                                {pricingPlans.length > 0 && (
                                                    <optgroup label="Pricing Packages">
                                                        {pricingPlans.map((plan) => (
                                                            <option key={`plan-${plan.id}`} value={plan.name}>
                                                                {plan.name}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                )}
                                                {services.length > 0 && (
                                                    <optgroup label="Services">
                                                        {services.map((service) => (
                                                            <option key={`service-${service.id}`} value={service.title}>
                                                                {service.title}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                )}
                                                <option value="Other">Other</option>
                                            </>
                                        ) : (
                                            <>
                                                <option>Company Profile</option>
                                                <option>Online Store / E-Commerce</option>
                                                <option>Landing Page</option>
                                                <option>Other</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#006666] mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-white border border-navy/10 rounded-xl px-4 py-3 text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all placeholder:text-foreground/40"
                                        placeholder="Tell us about your website needs..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#006666] hover:bg-[#004D4D] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#006666]/25 transition-all transform hover:-translate-y-1 flex justify-center items-center"
                                >
                                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
