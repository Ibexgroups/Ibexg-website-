import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { CompanyCard } from "@/components/shared/company-card";
import { BrandButton } from "@/components/ui/brand-button";
import { CTABanner } from "@/components/shared/cta-banner";
import { COMPANIES, COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Companies",
  description: `Discover the diversified portfolio of businesses under ${COMPANY.name}.`,
};

export default function OurCompaniesPage() {
  return (
    <>
      <PageHeader
        title="Our Companies"
        subtitle="A diversified portfolio of specialized businesses powering IBEX Investments Group's nationwide operations."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
      />

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Portfolio"
              title="Six Divisions, One Vision"
              subtitle="IBEX Investments Group operates multiple specialized companies, each contributing to our nationwide success."
            />
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANIES.map((company, i) => (
              <AnimatedSection key={company.title} delay={i * 0.08}>
                <CompanyCard
                  title={company.title}
                  description={company.description}
                  icon={company.icon}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Integrated Operations"
              title="Synergy Across Every Division"
              subtitle="Our companies work together to create a fully integrated energy and retail ecosystem."
            />
          </AnimatedSection>
          <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
            <AnimatedSection delay={0.1}>
              <p>
                Each division within IBEX Investments Group operates with specialized expertise
                while benefiting from the collective strength of our nationwide network. From fuel
                supply and retail operations to ATM services and commercial property management,
                our integrated approach maximizes value at every location.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p>
                This diversified structure allows IBEX to capture revenue across multiple streams,
                reduce operational risk, and provide comprehensive solutions to property owners,
                partners, and customers alike.
              </p>
            </AnimatedSection>
          </div>
          <div className="mt-10 text-center">
            <Link href="/contact">
              <BrandButton variant="navy" size="lg">Explore Partnership Opportunities</BrandButton>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Partner With an Industry Leader"
        description="Discover how IBEX's diversified portfolio can create opportunities for your business."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
