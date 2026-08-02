import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { CompanyCard } from "@/components/shared/company-card";
import { BrandButton } from "@/components/ui/brand-button";
import { COMPANIES } from "@/lib/constants";

export function OurCompaniesPreview() {
  return (
    <section className="section-padding bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Our Companies"
            title="A Diversified Portfolio of Businesses"
            subtitle="IBEX Investments Group operates multiple divisions, each delivering specialized services across the energy and retail sectors."
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

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <Link href="/our-companies">
            <BrandButton variant="navy" size="lg">
              Explore Our Companies
            </BrandButton>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
