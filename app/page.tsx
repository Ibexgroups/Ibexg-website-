import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { AboutPreview } from "@/components/home/about-preview";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FuelBrands } from "@/components/home/fuel-brands";
import { FranchisePartners } from "@/components/home/franchise-partners";
import { InvestmentOpportunities } from "@/components/home/investment-opportunities";
import { OurCompaniesPreview } from "@/components/home/our-companies-preview";
import { AcquisitionCTA } from "@/components/home/acquisition-cta";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCTA } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <FuelBrands />
      <FranchisePartners />
      <InvestmentOpportunities />
      <OurCompaniesPreview />
      <AcquisitionCTA />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
