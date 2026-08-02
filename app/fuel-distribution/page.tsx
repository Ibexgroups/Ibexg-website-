import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { FeatureCard } from "@/components/shared/feature-card";
import { BrandButton } from "@/components/ui/brand-button";
import { CTABanner } from "@/components/shared/cta-banner";
import { COMPANY } from "@/lib/constants";
import { Droplets, Truck, Shield, Clock, Globe, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Fuel Distribution",
  description: `Reliable commercial fuel distribution services from ${COMPANY.name} across the United States.`,
};

const BENEFITS = [
  { title: "Reliable Supply", description: "Consistent fuel delivery you can count on, every time.", icon: "Droplets" },
  { title: "Fleet Solutions", description: "Customized fuel programs for fleet operators of all sizes.", icon: "Truck" },
  { title: "Quality Assurance", description: "Premium-grade fuel meeting all industry standards.", icon: "Shield" },
  { title: "On-Time Delivery", description: "Scheduled deliveries with real-time tracking capabilities.", icon: "Clock" },
  { title: "Nationwide Coverage", description: "Supply network spanning multiple states and regions.", icon: "Globe" },
  { title: "Competitive Pricing", description: "Volume-based pricing with transparent billing.", icon: "BarChart3" },
];

export default function FuelDistributionPage() {
  return (
    <>
      <PageHeader
        title="Fuel Distribution"
        subtitle="Reliable, scalable fuel supply solutions for commercial customers, fleet operators, and retail partners."
        backgroundImage="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80"
      />

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <AnimatedSection>
              <SectionTitle
                badge="Fuel Supply"
                title="Powering Businesses Across America"
                align="left"
              />
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  IBEX Investments Group&apos;s fuel distribution division provides reliable,
                  high-quality fuel supply to commercial customers, fleet operators, and retail
                  partners across the United States.
                </p>
                <p>
                  Leveraging our network of 90+ locations and strategic supplier relationships,
                  we deliver consistent fuel supply with competitive pricing and exceptional service.
                </p>
                <p>
                  Whether you need bulk delivery, fleet fueling programs, or retail supply
                  agreements, our experienced team has the infrastructure and expertise to meet
                  your needs.
                </p>
              </div>
              <Link href="/contact" className="mt-8 inline-block">
                <BrandButton variant="navy" size="lg">Request a Quote</BrandButton>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="relative flex aspect-square items-center justify-center rounded-3xl bg-navy p-12">
                <div className="text-center">
                  <Droplets className="mx-auto h-16 w-16 text-gold" aria-hidden="true" />
                  <p className="mt-6 font-heading text-5xl font-bold text-white">90+</p>
                  <p className="mt-2 text-white/60">Supply Points Nationwide</p>
                </div>
                <div
                  className="absolute inset-0 rounded-3xl opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Why IBEX Fuel"
              title="The IBEX Distribution Advantage"
              subtitle="Partner with a fuel supplier backed by financial strength and operational excellence."
            />
          </AnimatedSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <FeatureCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Coverage"
              title="Nationwide Supply Network"
              subtitle="Our fuel distribution network spans key markets across the United States, with continued expansion."
              light
            />
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[
                  "Louisiana", "Texas", "Florida", "Georgia",
                  "North Carolina", "South Carolina", "Pennsylvania", "Delaware",
                  "Maryland", "Virginia", "Alabama", "Mississippi",
                ].map((state) => (
                  <div
                    key={state}
                    className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 text-white/80"
                  >
                    <Globe className="h-4 w-4 text-gold" aria-hidden="true" />
                    {state}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTABanner
        title="Need a Reliable Fuel Partner?"
        description="Contact our fuel distribution team to discuss supply agreements, fleet programs, and pricing."
        primaryLabel="Contact Fuel Team"
        primaryHref="/contact"
      />
    </>
  );
}
