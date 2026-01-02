import { getSiteSettings } from "@/actions/settings-actions";

interface JsonLdProps {
    type: "Organization" | "WebSite" | "LocalBusiness" | "Service";
}

interface ExtendedSettings {
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    footerInstagram?: string;
    footerTiktok?: string;
    footerLinkedin?: string;
}

export async function JsonLd({ type }: JsonLdProps) {
    const rawSettings = await getSiteSettings();
    const settings = rawSettings as ExtendedSettings | null;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://varsaweb.com";

    const socialLinks = [
        settings?.footerInstagram,
        settings?.footerTiktok,
        settings?.footerLinkedin,
    ].filter(Boolean);

    const schemas: Record<string, object> = {
        Organization: {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "VarsaWeb",
            url: siteUrl,
            logo: `${siteUrl}/logo-brand.png`,
            description: "Jasa pembuatan website profesional di Indonesia",
            address: {
                "@type": "PostalAddress",
                addressLocality: settings?.contactAddress || "Jakarta, Indonesia",
                addressCountry: "ID",
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: settings?.contactPhone || "+62 812 3456 7890",
                contactType: "customer service",
                email: settings?.contactEmail || "hello@varsaweb.com",
            },
            ...(socialLinks.length > 0 && { sameAs: socialLinks }),
        },
        WebSite: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "VarsaWeb",
            url: siteUrl,
            potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
            },
        },
        LocalBusiness: {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "VarsaWeb",
            image: `${siteUrl}/logo-brand.png`,
            url: siteUrl,
            telephone: settings?.contactPhone || "+62 812 3456 7890",
            email: settings?.contactEmail || "hello@varsaweb.com",
            address: {
                "@type": "PostalAddress",
                addressLocality: settings?.contactAddress || "Jakarta",
                addressCountry: "ID",
            },
            priceRange: "$$",
            openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "09:00",
                closes: "18:00",
            },
        },
        Service: {
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Web Development",
            provider: {
                "@type": "Organization",
                name: "VarsaWeb",
            },
            areaServed: {
                "@type": "Country",
                name: "Indonesia",
            },
            description: "Jasa pembuatan website profesional untuk bisnis, company profile, e-commerce, dan landing page.",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[type]) }}
        />
    );
}
