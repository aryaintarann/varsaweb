import { prisma } from "@/lib/prisma";
import { ServiceCard } from "@/components/service-card"; // Client component for animation
// import { Service } from "@prisma/client";

// Server Component (can be async)
export async function Services() {
    let services: any[] = [];
    try {
        services = await prisma.service.findMany();
    } catch (e) {
        console.warn("Database not connected, using static services.");
    }

    // Fallback static data if DB is empty or fails
    if (services.length === 0) {
        // We cast the fallback objects to match expected shape slightly, or strict typing
        services = [
            {
                id: "1",
                title: "Web Development",
                description: "Custom Next.js applications tailored to your business needs with superior performance.",
                icon: "monitor",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "2",
                title: "SEO Optimization",
                description: "Rank higher and reach more customers with our data-driven SEO strategies.",
                icon: "search",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "3",
                title: "UI/UX Design",
                description: "Clean, modern interfaces that convert visitors into loyal customers.",
                icon: "rocket",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: "4",
                title: "CMS Integration",
                description: "Manage your content easily with our custom-built, secure admin panels.",
                icon: "shield",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
    }

    return (
        <section id="services" className="py-24 bg-background">
            <div className="container px-6 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        Our Services
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We provide comprehensive digital solutions to help your business thrive in the modern web landscape.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
