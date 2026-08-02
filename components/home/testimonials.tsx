import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { TestimonialSlider } from "@/components/shared/testimonial-slider";

export function Testimonials() {
  return (
    <section className="section-padding bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Testimonials"
            title="Trusted by Industry Professionals"
            subtitle="Hear from gas station owners, brokers, and partners who have worked with IBEX Investments Group."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <TestimonialSlider />
        </AnimatedSection>
      </div>
    </section>
  );
}
