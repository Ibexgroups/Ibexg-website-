"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { FUEL_BRANDS } from "@/lib/constants";

export function FuelBrands() {
  const loop = [...FUEL_BRANDS, ...FUEL_BRANDS, ...FUEL_BRANDS];

  return (
    <section className="section-padding overflow-hidden bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Fuel Brand Partnerships"
            title="Trusted Fuel Relationships"
            subtitle="IBEX Investments Group is an authorized dealer and operator for major fuel brands, supporting reliable supply and strong retail performance across our network."
          />
        </AnimatedSection>
      </div>

      {/* Full-bleed premium logo marquee — no white boxes */}
      <div className="relative mt-4">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ivory to-transparent sm:w-28"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ivory to-transparent sm:w-28"
          aria-hidden="true"
        />

        <div className="brand-marquee group/marquee py-6">
          <div className="brand-marquee-track flex w-max items-center gap-10 sm:gap-16">
            {loop.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="group/item flex shrink-0 items-center justify-center px-2 transition-transform duration-300 hover:scale-110"
                title={brand.name}
              >
                <div
                  className="relative flex h-14 w-[150px] items-center justify-center transition-all duration-300 sm:h-16 sm:w-[180px] group-hover/item:drop-shadow-[0_10px_28px_rgba(212,175,55,0.45)]"
                    style={{ ["--brand-glow" as string]: brand.glow } as CSSProperties}
                >
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} — authorized IBEX fuel partner`}
                    width={180}
                    height={56}
                    className="h-10 w-auto max-w-[150px] object-contain opacity-80 transition-all duration-300 group-hover/item:opacity-100 sm:h-12 sm:max-w-[170px] group-hover/item:[filter:drop-shadow(0_8px_20px_var(--brand-glow))]"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
