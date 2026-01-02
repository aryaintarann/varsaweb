import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://varsaweb.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get all portfolio items
    let portfolioItems: { id: string; updatedAt: Date }[] = [];
    try {
        portfolioItems = await prisma.portfolioItem.findMany({
            select: { id: true, updatedAt: true },
        });
    } catch {
        // Ignore error
    }

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteUrl}/portfolio`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    // Dynamic portfolio pages
    const portfolioPages: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
        url: `${siteUrl}/portfolio/${item.id}`,
        lastModified: item.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...portfolioPages];
}
