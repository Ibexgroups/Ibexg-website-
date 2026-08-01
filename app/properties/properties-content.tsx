"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { PropertyCard } from "@/components/shared/property-card";
import { CTABanner } from "@/components/shared/cta-banner";
import { PROPERTIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Gas Station", "Convenience Store", "Commercial", "Fuel Distribution"];

export function PropertiesContent() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.type === activeFilter);

  return (
    <>
      <PageHeader
        title="Our Properties"
        subtitle="Explore IBEX Investments Group's portfolio of gas stations, convenience stores, and commercial properties nationwide."
        backgroundImage="https://images.unsplash.com/photo-1604719312566-8912a92a1b02?w=1920&q=80"
      />

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Portfolio"
              title="Nationwide Property Network"
              subtitle="90+ operating locations and growing — strategically positioned across key markets in the United States."
            />
          </AnimatedSection>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  activeFilter === filter
                    ? "bg-navy text-white shadow-lg shadow-navy/20"
                    : "border border-border bg-white text-muted-foreground hover:border-gold hover:text-navy"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property, i) => (
              <AnimatedSection key={property.id} delay={i * 0.08}>
                <PropertyCard
                  title={property.title}
                  location={property.location}
                  type={property.type}
                  image={property.image}
                />
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
