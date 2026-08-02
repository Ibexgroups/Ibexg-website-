import { CTABanner } from "@/components/shared/cta-banner";

export function FinalCTA() {
  return (
    <CTABanner
      title="Ready to Partner with IBEX?"
      description="Looking to sell a property, structure a sale-leaseback or NNN deal, secure fuel supply, or grow with IBEX? Our team is ready to talk."
      primaryLabel="Get in Touch"
      primaryHref="/contact"
      secondaryLabel="View Our Services"
      secondaryHref="/services"
    />
  );
}
