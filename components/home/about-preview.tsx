import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { BrandButton } from "@/components/ui/brand-button";
import { CORE_VALUES, COMPANY } from "@/lib/constants";
import { Target, Eye, Heart } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="About Us"
            title="Nearly Two Decades of Industry Leadership"
            subtitle={`Founded in ${COMPANY.founded}, IBEX Investments Group specializes in acquiring, operating, improving, and expanding gas stations and commercial properties across multiple states.`}
          />
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Target className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-navy">Our Mission</h3>
                  <p className="mt-2 text-muted leading-relaxed">
                    To acquire, operate, and improve gas stations and commercial properties while
                    building trusted long-term partnerships with investors, operators, and fuel brands
                    across the United States.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-navy">Our Vision</h3>
                  <p className="mt-2 text-muted leading-relaxed">
                    To remain a trusted leader in fuel retail and commercial real estate through
                    sustainable growth, operational excellence, and a $200M+ asset portfolio that
                    delivers lasting value.
                  </p>
                </div>
              </div>

              <Link href="/about">
                <BrandButton variant="navy">Learn More</BrandButton>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  <Heart className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy">Core Values</h3>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {CORE_VALUES.map((value) => (
                  <div key={value.title} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                    <h4 className="font-heading font-semibold text-navy">{value.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
