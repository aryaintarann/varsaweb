import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://varsaweb.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VarsaWeb - Jasa Pembuatan Website Profesional Indonesia",
    template: "%s | VarsaWeb",
  },
  description: "VarsaWeb adalah jasa pembuatan website profesional di Indonesia. Kami membantu bisnis Anda berkembang dengan website yang cepat, modern, dan SEO-friendly. Konsultasi gratis!",
  keywords: [
    "jasa pembuatan website",
    "web developer Indonesia",
    "website profesional",
    "jasa web design",
    "landing page",
    "e-commerce",
    "website bisnis",
    "VarsaWeb",
    "web developer Jakarta",
    "website murah",
    "website company profile",
  ],
  authors: [{ name: "VarsaWeb Team" }],
  creator: "VarsaWeb",
  publisher: "VarsaWeb",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "VarsaWeb",
    title: "VarsaWeb - Jasa Pembuatan Website Profesional Indonesia",
    description: "VarsaWeb adalah jasa pembuatan website profesional di Indonesia. Website cepat, modern, dan SEO-friendly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VarsaWeb - Jasa Pembuatan Website Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VarsaWeb - Jasa Pembuatan Website Profesional Indonesia",
    description: "VarsaWeb adalah jasa pembuatan website profesional di Indonesia. Website cepat, modern, dan SEO-friendly.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#006666" />
      </head>
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} ${geistMono.variable} antialiased selection:bg-teal selection:text-navy`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
