"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Rocket, Search, ShieldCheck, Code, Globe } from "lucide-react";

const icons: Record<string, any> = {
    monitor: Laptop,
    search: Search,
    rocket: Rocket,
    shield: ShieldCheck,
    code: Code,
    globe: Globe,
};

export function ServiceCard({ service, index }: { service: any; index: number }) {
    const Icon = icons[service.icon] || Laptop;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-secondary/20">
                <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {service.description}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
