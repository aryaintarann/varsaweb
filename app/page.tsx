import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getSiteSettings, getFaqs } from "@/actions/settings-actions";
import { getServices, getPortfolioItems } from "@/actions/admin-actions";
import { getSatisfactionPercentage, getApprovedReviews } from "@/actions/review-actions";

export default async function Home() {
  // Fetch data from database
  const [settings, faqs, services, portfolioItems, satisfactionPercentage, reviews] = await Promise.all([
    getSiteSettings(),
    getFaqs(),
    getServices(),
    getPortfolioItems(),
    getSatisfactionPercentage(),
    getApprovedReviews(),
  ]);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#F0FAFA]">
      <Navbar />
      <Hero
        settings={settings}
        portfolioCount={portfolioItems.length}
        satisfactionPercentage={satisfactionPercentage}
      />
      <About settings={settings} />
      <Services services={services} />
      <Portfolio items={portfolioItems} />
      <Testimonials reviews={reviews} />
      <Faq faqs={faqs} />
      <Contact settings={settings} />
      <Footer />
    </main>
  );
}
