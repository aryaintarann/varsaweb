import { prisma } from "@/lib/prisma";
import { PortfolioCard } from "./portfolio-card";
// import { PortfolioItem } from "@prisma/client"; // Removed for build stability until client fixed

export async function Portfolio() {
    let items: any[] = [];
    try {
        items = await prisma.portfolioItem.findMany({
            orderBy: { createdAt: "desc" }
        });
    } catch (e) {
        console.warn("DB offline");
    }

    // Fallback
    if (items.length === 0) {
        items = [1, 2, 3].map((i) => ({
            id: i.toString(),
            title: `Project Alpha ${i} `,
            description: "A high-conversion e-commerce platform built with Next.js and Stripe.",
            imageUrl: null, // Placeholder in card
            link: "#",
            createdAt: new Date(),
            updatedAt: new Date()
        }));
    }

    return (
        <section id="portfolio" className="py-24 bg-muted/30">
            <div className="container px-6 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Selected Work</h2>
                        <p className="text-muted-foreground text-lg max-w-xl">
                            Explore our latest projects where design meets functionality.
                        </p>
                    </div>
                    {/* Maybe filter buttons here later */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <PortfolioCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
