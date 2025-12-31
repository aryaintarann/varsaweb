"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Need to create Input
import { Textarea } from "./ui/textarea"; // Need to create Textarea
import { submitContact } from "@/actions/contact";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner or just native alert for now. Setup sonner later? No, alert for concise.

// I will assume Input/Textarea exist or create them.
// I'll use standard HTML inputs if components missing, but creating them next is better.

export function Contact() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const result = await submitContact(formData);
        setLoading(false);

        if (result.success) {
            setSuccess(true);
            // Reset form
            (e.target as HTMLFormElement).reset();
        } else {
            alert(result.error);
        }
    }

    return (
        <section id="contact" className="py-24 bg-background">
            <div className="container px-6 mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-secondary/30 p-8 md:p-12 rounded-2xl border border-border"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            Get In Touch
                        </h2>
                        <p className="text-muted-foreground">
                            Ready to start your project? Send us a message and we'll get back to you within 24 hours.
                        </p>
                    </div>

                    {success ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">Message Sent!</h3>
                            <p className="text-muted-foreground mt-2">Thank you for reaching out.</p>
                            <Button variant="outline" className="mt-6" onClick={() => setSuccess(false)}>Send Another</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                            <Button type="submit" size="lg" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                                Send Message
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
