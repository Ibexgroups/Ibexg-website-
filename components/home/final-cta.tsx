import { CTABanner } from "@/components/shared/cta-banner";

export function FinalCTA() {
  return (
    <CTABanner
      title="Ready to Partner with IBEX?"
      description="Whether you're looking to sell your property, explore fuel distribution, or discuss investment opportunities, our team is ready to help."
      primaryLabel="Get in Touch"
      primaryHref="/contact"
      secondaryLabel="View Our Services"
      secondaryHref="/services"
    />
  );
}
