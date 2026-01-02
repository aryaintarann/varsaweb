import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Pricing } from "@/components/pricing";
import { Portfolio } from "@/components/portfolio";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { getSiteSettings, getFaqs } from "@/actions/settings-actions";
import { getServices, getPortfolioItems, getServiceCategories } from "@/actions/admin-actions";
import { getSatisfactionPercentage, getApprovedReviews } from "@/actions/review-actions";
import { getPricingPlans } from "@/actions/pricing-actions";

export default async function Home() {
  // Fetch data from database
  const [settings, faqs, services, portfolioItems, satisfactionPercentage, reviews, pricingPlans, serviceCategories] = await Promise.all([
    getSiteSettings(),
    getFaqs(),
    getServices(),
    getPortfolioItems(),
    getSatisfactionPercentage(),
    getApprovedReviews(),
    getPricingPlans(),
    getServiceCategories(),
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd type="Organization" />
      <JsonLd type="LocalBusiness" />
      <JsonLd type="Service" />

      <main className="min-h-screen relative overflow-hidden bg-[#F0FAFA]">
        <Navbar />
        <Hero
          settings={settings}
          portfolioCount={portfolioItems.length}
          satisfactionPercentage={satisfactionPercentage}
        />
        <About settings={settings} />
        <Services services={services} categories={serviceCategories} />
        <Pricing plans={pricingPlans} />
        <Portfolio items={portfolioItems} />
        <Testimonials reviews={reviews} />
        <Faq faqs={faqs} />
        <Contact settings={settings} services={services} pricingPlans={pricingPlans} />
        <Footer />
      </main>
    </>
  );
}

