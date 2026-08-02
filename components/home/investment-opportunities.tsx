import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { FeatureCard } from "@/components/shared/feature-card";
import { BrandButton } from "@/components/ui/brand-button";
import { INVESTMENT_OPPORTUNITIES } from "@/lib/constants";

export function InvestmentOpportunities() {
  return (
    <section className="section-padding bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Investment Opportunities"
            title="Partner With IBEX Investments Group"
            subtitle="We partner with investors through sale-leaseback transactions, Triple Net (NNN) lease agreements, commercial real estate investments, long-term property management, and nationwide expansion opportunities."
          />
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INVESTMENT_OPPORTUNITIES.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.06}>
              <FeatureCard
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.25} className="mt-12 text-center">
          <Link href="/contact">
            <BrandButton variant="navy" size="lg">
              Discuss Investment Opportunities
            </BrandButton>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
