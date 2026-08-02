import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { ServicesSlider } from "@/components/home/services-slider";
import { BrandButton } from "@/components/ui/brand-button";

export function ServicesPreview() {
  return (
    <section className="section-padding overflow-hidden bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Our Business Model"
            title="How IBEX Creates Value"
            subtitle="Watch each service come forward — acquisitions, operations, sale-leaseback, and NNN partnerships."
            className="mb-8 md:mb-10"
          />
        </AnimatedSection>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0.08}>
          <ServicesSlider />
        </AnimatedSection>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Link href="/services">
          <BrandButton variant="outline" size="lg">
            View All Services
          </BrandButton>
        </Link>
      </div>
    </section>
  );
}
