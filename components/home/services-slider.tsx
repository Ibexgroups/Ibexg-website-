"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ServicesSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const getCards = () =>
    Array.from(
      trackRef.current?.querySelectorAll<HTMLElement>("[data-service-card]") ?? []
    );

  const scrollToIndex = useCallback((index: number) => {
    const el = trackRef.current;
    const card = getCards()[index];
    if (!el || !card) return;

    const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, []);

  const updateNavState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4);

    const cards = getCards();
    if (!cards.length) return;

    const center = scrollLeft + clientWidth / 2;
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

    updateNavState();
    el.addEventListener("scroll", updateNavState, { passive: true });
    window.addEventListener("resize", updateNavState);

    const id = requestAnimationFrame(() => scrollToIndex(0));

    return () => {
      cancelAnimationFrame(id);
      el.removeEventListener("scroll", updateNavState);
      window.removeEventListener("resize", updateNavState);
    };
  }, [updateNavState, scrollToIndex]);

  const scrollByCard = (direction: -1 | 1) => {
    const next = Math.min(Math.max(active + direction, 0), SERVICES.length - 1);
    scrollToIndex(next);
  };

  return (
    <div className="relative">
      {/* Soft light stage with ambient shadow */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-b from-[#F5F8FC] via-[#EFF4FA] to-white shadow-[0_20px_60px_rgba(11,31,58,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_45%,rgba(212,175,55,0.10)_0%,transparent_65%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-8 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent"
          aria-hidden="true"
        />

        <div
          ref={trackRef}
          className="services-track relative z-[1] flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:py-12"
        >
          {SERVICES.map((service, i) => {
            const Icon = getIcon(service.icon);
            const isActive = active === i;

            return (
              <article
                key={service.title}
                data-service-card
                onClick={() => scrollToIndex(i)}
                className={cn(
                  "services-card group relative shrink-0 cursor-pointer snap-center overflow-hidden rounded-[1.5rem] border bg-white transition-[box-shadow,border-color,opacity,transform] duration-500 ease-out",
                  isActive
                    ? "z-10 border-gold/45 opacity-100 shadow-[0_28px_64px_rgba(11,31,58,0.14),0_10px_28px_rgba(212,175,55,0.14)]"
                    : "z-0 border-border/60 opacity-55 shadow-[0_12px_28px_rgba(11,31,58,0.05)] hover:opacity-80"
                )}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 86vw, 380px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent" />
                  <div
                    className={cn(
                      "absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-navy transition-shadow duration-500",
                      isActive
                        ? "shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
                        : "shadow-[0_6px_16px_rgba(0,0,0,0.14)]"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="flex min-h-[220px] flex-col p-6 sm:min-h-[230px] sm:p-7">
                  <h3 className="font-heading text-xl font-bold leading-snug text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all",
                      isActive
                        ? "bg-gold text-navy shadow-[0_8px_22px_rgba(212,175,55,0.4)] hover:bg-gold-light"
                        : "bg-navy/90 text-white hover:bg-navy"
                    )}
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Centered controls under the stage */}
      <div className="mt-7 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Previous service"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white text-navy shadow-[0_8px_20px_rgba(11,31,58,0.08)] transition-all hover:border-gold hover:text-gold hover:shadow-[0_10px_24px_rgba(212,175,55,0.2)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Services slides">
          {SERVICES.map((service, i) => (
            <button
              key={service.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to ${service.title}`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                active === i
                  ? "w-8 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  : "w-2.5 bg-navy/15 hover:bg-navy/30"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Next service"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white text-navy shadow-[0_8px_20px_rgba(11,31,58,0.08)] transition-all hover:border-gold hover:text-gold hover:shadow-[0_10px_24px_rgba(212,175,55,0.2)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
