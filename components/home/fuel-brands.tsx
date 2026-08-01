import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { FUEL_BRANDS } from "@/lib/constants";
import { Fuel } from "lucide-react";

export function FuelBrands() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Fuel Brand Partnerships"
            title="Authorized Dealer & Operator Relationships"
            subtitle="IBEX Investments Group is an authorized dealer and operator for major fuel brands, supporting reliable supply and strong retail performance across our network."
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {FUEL_BRANDS.map((brand, i) => (
            <AnimatedSection key={brand} delay={i * 0.06}>
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-white px-4 py-8 text-center shadow-sm transition-all hover:border-gold/40 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
                  <Fuel className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-navy">{brand}</h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
