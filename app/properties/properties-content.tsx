"use client";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { CTABanner } from "@/components/shared/cta-banner";
import { PORTFOLIO_LOCATIONS } from "@/lib/constants";

const PortfolioMap = dynamic(
  () =>
    import("@/components/properties/portfolio-map").then((m) => m.PortfolioMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[440px] items-center justify-center rounded-3xl border border-charcoal/10 bg-ivory text-sm text-muted">
        Loading portfolio map…
      </div>
    ),
  }
);

const byState = {
  Texas: PORTFOLIO_LOCATIONS.filter((p) => p.state === "Texas"),
  Louisiana: PORTFOLIO_LOCATIONS.filter((p) => p.state === "Louisiana"),
  Mississippi: PORTFOLIO_LOCATIONS.filter((p) => p.state === "Mississippi"),
} as const;

export function PropertiesContent() {
  return (
    <>
      <PageHeader
        title="Our Properties"
        subtitle="Multi-state portfolio across Texas, Louisiana, and Mississippi — gas stations and related retail assets."
        backgroundImage="/hero/33-skyline-invest.jpg"
      />

      <section className="section-padding bg-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Portfolio Map"
              title="Multi-State Portfolio Profile"
              subtitle="Explore IBEX locations on the map. Filter by state, click a pin for details, or open any site in Google Maps."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <PortfolioMap />
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="By State"
              title="Portfolio Listings"
              subtitle={`${PORTFOLIO_LOCATIONS.length} properties across Texas, Louisiana, and Mississippi.`}
            />
          </AnimatedSection>

          <div className="space-y-12">
            {(Object.keys(byState) as Array<keyof typeof byState>).map((state) => (
              <AnimatedSection key={state}>
                <h3 className="font-heading text-xl font-bold text-charcoal sm:text-2xl">
                  {state} Portfolio
                </h3>
                <div className="mt-4 overflow-x-auto rounded-2xl border border-charcoal/10">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-charcoal text-white">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Property</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Fuel Contract</th>
                      </tr>
                    </thead>
                    <tbody>
                      {byState[state].map((row, i) => (
                        <tr
                          key={row.id}
                          className={i % 2 === 0 ? "bg-white" : "bg-ivory/60"}
                        >
                          <td className="px-4 py-3 font-medium text-charcoal">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.address)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-gold hover:underline"
                            >
                              {row.address}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-muted">{row.status}</td>
                          <td className="px-4 py-3 text-muted">{row.fuelContract}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Interested in Selling Your Property?"
        description="IBEX is actively acquiring gas stations and commercial properties nationwide. Get a confidential, no-obligation offer today."
        primaryLabel="Request an Offer"
        primaryHref="/contact"
        secondaryLabel="Learn About Our Process"
        secondaryHref="/services"
      />
    </>
  );
}
