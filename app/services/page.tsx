import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { ServicesSlider } from "@/components/home/services-slider";
import { CTABanner } from "@/components/shared/cta-banner";
import { COMPANY } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore the comprehensive investment and operational services offered by ${COMPANY.name}.`,
};

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "We discuss your goals, property details, and timeline in a confidential meeting.",
  },
  {
    step: "02",
    title: "Valuation & Offer",
    description: "Our team conducts a thorough market analysis and presents a fair, competitive offer.",
  },
  {
    step: "03",
    title: "Due Diligence",
    description: "We handle all due diligence efficiently, minimizing disruption to your operations.",
  },
  {
    step: "04",
    title: "Closing & Transition",
    description: "Fast, professional closing with seamless transition to IBEX management if desired.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Acquiring, operating, improving, and expanding gas stations and commercial properties—while partnering with investors through sale-leaseback and Triple Net (NNN) structures."
      />

      <section className="section-padding overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Our Business Model"
              title="How IBEX Creates Value"
              subtitle="Swipe through our services — from acquisitions and operations to investor partnerships and operator support."
            />
          </AnimatedSection>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8 md:mt-10">
          <AnimatedSection delay={0.1}>
            <ServicesSlider />
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Our Process"
              title="How We Work With You"
              subtitle="A streamlined, transparent process designed for speed and certainty."
            />
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.1}>
                <div className="relative rounded-2xl border border-border bg-white p-8 shadow-sm">
                  <span className="font-heading text-4xl font-bold text-gold/30">{item.step}</span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  {i < PROCESS_STEPS.length - 1 && (
                    <ArrowRight
                      className="absolute top-1/2 -right-4 hidden h-6 w-6 -translate-y-1/2 text-gold/40 lg:block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Let's Discuss Your Next Project"
        description="Contact our team to explore how IBEX can support your acquisition, investment, or operational needs."
        primaryLabel="Get Started"
        primaryHref="/contact"
        secondaryLabel="View Properties"
        secondaryHref="/properties"
      />
    </>
  );
}
