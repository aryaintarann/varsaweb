import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getSiteSettings, getFaqs } from "@/actions/settings-actions";
import { getServices, getPortfolioItems } from "@/actions/admin-actions";

export default async function Home() {
  // Fetch data from database
  const [settings, faqs, services, portfolioItems] = await Promise.all([
    getSiteSettings(),
    getFaqs(),
    getServices(),
    getPortfolioItems(),
  ]);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-violet-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar />
      <Hero settings={settings} />
      <About settings={settings} />
      <Services services={services} />
      <Portfolio items={portfolioItems} />
      <Faq faqs={faqs} />
      <Contact settings={settings} />
      <Footer />
    </main>
  );
}
