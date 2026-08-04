"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5500;

const GLOWS = [
  "rgba(212,175,55,0.55)",
  "rgba(14,165,233,0.45)",
  "rgba(212,175,55,0.5)",
  "rgba(45,212,191,0.4)",
  "rgba(251,191,36,0.45)",
  "rgba(96,165,250,0.45)",
] as const;

export function ServicesSlider() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir?: number) => {
    const next = ((index % SERVICES.length) + SERVICES.length) % SERVICES.length;
    setDirection(dir ?? (next > active ? 1 : -1));
    setActive(next);
  }, [active]);

  const step = useCallback(
    (dir: -1 | 1) => {
      goTo(active + dir, dir);
    },
    [active, goTo]
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % SERVICES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [active]);

  const service = SERVICES[active];
  const Icon = getIcon(service.icon);
  const glow = GLOWS[active % GLOWS.length];

  return (
    <div className="relative">
      {/* Soft colored stage glow that shifts with each slide */}
      <div
        className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[3rem] opacity-90 blur-3xl transition-colors duration-700 sm:-inset-x-8"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${glow} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={service.title}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority={active === 0}
                quality={100}
                unoptimized
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent to-charcoal/30" />
            </motion.div>
          </AnimatePresence>

          {/* Content — one service at a time */}
          <div className="absolute inset-0 z-10 flex items-end sm:items-center">
            <div className="w-full px-5 py-8 sm:px-10 sm:py-12 lg:px-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${service.title}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-xl"
                >
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy sm:h-14 sm:w-14"
                    style={{
                      boxShadow: `0 12px 32px ${glow}`,
                    }}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                    Service {String(active + 1).padStart(2, "0")} /{" "}
                    {String(SERVICES.length).padStart(2, "0")}
                  </p>

                  <h3 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
                    {service.description}
                  </p>

                  <Link
                    href={service.href}
                    className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-navy transition-all hover:bg-gold-light"
                    style={{
                      boxShadow: `0 10px 28px ${glow}`,
                    }}
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 mt-6 flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2" role="tablist" aria-label="Services slides">
          {SERVICES.map((item, i) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to ${item.title}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                active === i
                  ? "w-9 bg-gold"
                  : "w-2 bg-navy/20 hover:bg-navy/35"
              )}
              style={
                active === i
                  ? { boxShadow: `0 0 14px ${GLOWS[i % GLOWS.length]}` }
                  : undefined
              }
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous service"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition-all hover:bg-navy-light"
            style={{ boxShadow: `0 8px 22px ${glow}` }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next service"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy transition-all hover:bg-gold-light"
            style={{ boxShadow: `0 8px 22px ${glow}` }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
