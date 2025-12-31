"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function PortfolioCard({ item, index }: { item: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all group bg-background">
                <div className="h-48 bg-muted relative overflow-hidden">
                    {/* Placeholder for image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl">
                        {item.title[0]}
                    </div>
                </div>
                <CardHeader>
                    <CardTitle className="leading-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.description}
                    </p>
                </CardContent>
                <CardFooter>
                    {item.link && (
                        <Button variant="outline" size="sm" className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                            <Link href={item.link}>
                                View Project <ExternalLink className="w-4 h-4" />
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    );
}
