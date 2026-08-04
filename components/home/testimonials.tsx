import { AnimatedSection } from "@/components/shared/animated-section";
import { TestimonialSlider } from "@/components/shared/testimonial-slider";

export function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden bg-charcoal">
      {/* Soft brand atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.1), transparent 55%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      {/* Faint IBEX watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
        aria-hidden="true"
      >
        <span className="font-heading text-[clamp(4rem,18vw,12rem)] font-bold tracking-tight text-white">
          IBEX
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-10 text-center md:mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Testimonials
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/55 md:text-base">
              Feedback from gas station owners, brokers, and partners who have worked with IBEX
              Investments Group.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <TestimonialSlider />
        </AnimatedSection>
      </div>
    </section>
  );
}
