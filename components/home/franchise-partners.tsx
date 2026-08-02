"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { FRANCHISE_PARTNERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FranchisePartners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const getCards = () =>
    Array.from(
      trackRef.current?.querySelectorAll<HTMLElement>("[data-franchise-card]") ?? []
    );

  const scrollToIndex = useCallback((index: number) => {
    const el = trackRef.current;
    const card = getCards()[index];
    if (!el || !card) return;
    const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, []);

  const updateActive = useCallback(() => {
    const el = trackRef.current;
    const cards = getCards();
    if (!el || !cards.length) return;

    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActive(closest);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateActive();
    el.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    const id = requestAnimationFrame(() => scrollToIndex(0));

    return () => {
      cancelAnimationFrame(id);
      el.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive, scrollToIndex]);

  // Auto one-by-one slide
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = (active + 1) % FRANCHISE_PARTNERS.length;
      scrollToIndex(next);
    }, 4500);
    return () => window.clearInterval(id);
  }, [active, scrollToIndex]);

  const step = (dir: -1 | 1) => {
    const next = Math.min(
      Math.max(active + dir, 0),
      FRANCHISE_PARTNERS.length - 1
    );
    scrollToIndex(next);
  };

  return (
    <section className="section-padding overflow-hidden bg-ivory-deep">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Restaurant & Franchise Partners"
            title="National Brands That Strengthen Our Locations"
            subtitle="Swipe through the national brands that power foodservice across the IBEX network."
            className="mb-8 md:mb-10"
          />
        </AnimatedSection>
      </div>

      {/* Upwork-style image card slider */}
      <div className="relative">
        <div
          ref={trackRef}
          className="franchise-track flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[calc((100%-min(82vw,320px))/2)] pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 sm:px-[calc((100%-min(58vw,360px))/2)]"
        >
          {FRANCHISE_PARTNERS.map((brand, i) => {
            const isActive = active === i;

            return (
              <article
                key={brand.name}
                data-franchise-card
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "franchise-card group relative shrink-0 cursor-pointer snap-center overflow-hidden rounded-[1.5rem] border bg-white transition-all duration-500",
                  isActive
                    ? "z-10 scale-100 border-transparent shadow-[0_24px_50px_rgba(11,31,58,0.18),0_8px_24px_rgba(0,0,0,0.12)]"
                    : "z-0 scale-[0.94] border-border/50 opacity-70 shadow-[0_10px_24px_rgba(11,31,58,0.06)] hover:opacity-90"
                )}
                style={
                  isActive
                    ? { boxShadow: `0 24px 50px rgba(11,31,58,0.2), 0 10px 28px ${brand.glow}` }
                    : undefined
                }
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 82vw, 360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 shadow-md">
                    <Image
                      src={brand.logo}
                      alt=""
                      width={120}
                      height={28}
                      className="h-5 w-auto object-contain"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="flex min-h-[180px] flex-col p-5 sm:p-6">
                  <h3 className="font-heading text-xl font-bold text-navy">
                    {brand.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {brand.description}
                  </p>
                  <Link
                    href="/our-companies"
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all",
                      isActive
                        ? "bg-gold text-navy shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:bg-gold-light"
                        : "bg-navy text-white hover:bg-navy-light"
                    )}
                  >
                    View Partnership
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-6 flex max-w-7xl items-center justify-center gap-4 px-4">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={active === 0}
            aria-label="Previous brand"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-navy shadow-sm transition-all hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {FRANCHISE_PARTNERS.map((brand, i) => (
              <button
                key={brand.name}
                type="button"
                aria-label={`Go to ${brand.name}`}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  active === i ? "w-8 bg-gold" : "w-2 bg-navy/15 hover:bg-navy/30"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            disabled={active === FRANCHISE_PARTNERS.length - 1}
            aria-label="Next brand"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-navy shadow-sm transition-all hover:border-gold hover:text-gold disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
