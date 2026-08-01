import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { FRANCHISE_PARTNERS } from "@/lib/constants";
import { Utensils } from "lucide-react";

export function FranchisePartners() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Restaurant & Franchise Partners"
            title="National Brands That Strengthen Our Locations"
            subtitle="These nationally recognized brands strengthen our convenience store locations and enhance the customer experience across the IBEX network."
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {FRANCHISE_PARTNERS.map((partner, i) => (
            <AnimatedSection key={partner} delay={i * 0.05}>
              <div className="flex h-full items-center gap-3 rounded-2xl border border-border bg-white px-5 py-5 shadow-sm transition-all hover:border-gold/40 hover:shadow-lg">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Utensils className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-sm font-semibold text-navy md:text-base">
                  {partner}
                </h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
