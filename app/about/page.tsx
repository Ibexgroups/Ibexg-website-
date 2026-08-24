import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { StatCounter } from "@/components/shared/stat-counter";
import { BrandButton } from "@/components/ui/brand-button";
import { CORE_VALUES, COMPANY, STATS, LEADERSHIP } from "@/lib/constants";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${COMPANY.name} — founded in ${COMPANY.founded}, with 90+ locations, multi-state operations, and a $200M+ asset portfolio.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About IBEX Investments Group"
        subtitle="Founded in 2006, we specialize in acquiring, operating, improving, and expanding gas stations and commercial properties across multiple states in the United States."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
      />

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <AnimatedSection>
              <SectionTitle
                badge="Our Story"
                title="Nearly Two Decades of Growth & Excellence"
                align="left"
              />
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  IBEX Investments Group started in {COMPANY.founded}. For nearly twenty years
                  we&apos;ve bought, operated, and grown gas stations and commercial properties
                  across multiple U.S. states. It&apos;s the same work we set out to do from day
                  one.
                </p>
                <p>
                  That progress has come under CEO {COMPANY.ceo}, Vice President{" "}
                  {COMPANY.vicePresident}, and Manager Ali Sharwan. With them at the helm,
                  we&apos;ve built a $200M+ portfolio and more than 90 operating locations, plus
                  a fuel network that keeps our sites and partners supplied.
                </p>
                <p>
                  We care about doing deals fairly and running locations well for the owners who
                  sell to us, the investors who work with us, our franchise partners, and the
                  communities where we operate.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="rounded-2xl bg-navy p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-white">Leadership</h3>
                <p className="mt-4 text-white/70 leading-relaxed">
                  CEO {COMPANY.ceo}, Vice President {COMPANY.vicePresident}, and Manager Ali
                  Sharwan lead IBEX day to day. Since {COMPANY.founded}, they&apos;ve grown the
                  company from its early days into a multi-state group with a strong commercial
                  portfolio.
                </p>
                <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
                  {LEADERSHIP.map((person) => (
                    <div key={person.name}>
                      <p className="text-sm text-white/50">{person.title}</p>
                      <p className="mt-1 font-heading text-xl font-semibold text-gold">
                        {person.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-navy py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                label={stat.label}
                display={stat.display}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Our Values"
              title="What Drives Everything We Do"
              subtitle="Our core values guide every acquisition, partnership, and operational decision."
            />
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
                  <h3 className="font-heading text-xl font-semibold text-navy">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Our Journey"
              title="Key Milestones"
              subtitle="A track record of consistent growth and strategic expansion since 2006."
            />
          </AnimatedSection>
          <div className="mx-auto max-w-3xl space-y-8">
            {[
              {
                year: "2006",
                event:
                  "IBEX Investments Group founded, beginning operations in the gas station and convenience retail industry.",
              },
              {
                year: "2010",
                event:
                  "Expanded multi-state operations and strengthened fuel brand dealer relationships.",
              },
              {
                year: "2015",
                event:
                  "Grew the operating portfolio and established ancillary businesses supporting fuel retail locations.",
              },
              {
                year: "2020",
                event:
                  "Advanced sale-leaseback and Triple Net (NNN) investor partnerships across key markets.",
              },
              {
                year: "Today",
                event:
                  "90+ locations, a $200M+ asset portfolio, and a continuous expansion strategy nationwide.",
              },
            ].map((milestone, i) => (
              <AnimatedSection key={milestone.year} delay={i * 0.08}>
                <div className="flex gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 font-heading text-sm font-bold text-gold">
                    {milestone.year === "Today" ? "Now" : milestone.year}
                  </div>
                  <p className="pt-2 text-muted leading-relaxed">{milestone.event}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/contact">
              <BrandButton variant="navy" size="lg">
                Partner With Us
              </BrandButton>
            </Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Join Our Growing Network"
        description="Discover how IBEX Investments Group can support your acquisition, investment, or partnership goals."
        primaryLabel="Contact Us"
        primaryHref="/contact"
      />
    </>
  );
}
