import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { FeatureCard } from "@/components/shared/feature-card";
import { WHY_CHOOSE_US } from "@/lib/constants";

export function WhyChooseUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-charcoal">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(212,175,55,0.16)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Why Choose Us"
            title="The IBEX Advantage"
            subtitle="Partner with a company that combines nearly two decades of industry experience, a $200M+ asset portfolio, and a continuous expansion strategy."
            light
          />
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {WHY_CHOOSE_US.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.06} className="h-full">
              <FeatureCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                light
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
