"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { COMPANY } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  { src: "/hero/01-analysis.jpg", alt: "Market analysis and investment insight" },
  { src: "/hero/02-buildings.jpg", alt: "Commercial real estate and investment growth" },
  { src: "/hero/03-growth.jpg", alt: "Digital growth and upward performance" },
  { src: "/hero/04-business.jpg", alt: "Business partnership and lasting success" },
  { src: "/hero/05-station-night.jpg", alt: "Modern gas station at night" },
  { src: "/hero/06-fuel-highway.jpg", alt: "Fuel station glowing at night" },
  { src: "/hero/07-fuel-glow.jpg", alt: "Gas station canopy lights at night" },
] as const;

const SLIDE_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const safeIndex = ((index % HERO_IMAGES.length) + HERO_IMAGES.length) % HERO_IMAGES.length;
  const current = HERO_IMAGES[safeIndex];

  useEffect(() => {
    setIndex((prev) => prev % HERO_IMAGES.length);

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Auto-rotating full-bleed backgrounds */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt=""
              fill
              priority={safeIndex === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left-weighted charcoal overlay for premium brand block */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/55 to-charcoal/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/45 via-transparent to-charcoal/75"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-2xl text-left">
          {/* Circular logo + contact — TAIBA-style brand block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <Link
              href="/"
              aria-label={`${COMPANY.name} — Home`}
              className="group inline-flex"
            >
              <span className="relative inline-flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-gold bg-charcoal/90 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(212,175,55,0.25)] transition-transform duration-500 group-hover:scale-[1.03] sm:h-40 sm:w-40 sm:p-4">
                <span
                  className="pointer-events-none absolute inset-[5px] rounded-full border border-gold/25"
                  aria-hidden="true"
                />
                <Image
                  src="/logo-transparent.png"
                  alt={COMPANY.name}
                  width={1024}
                  height={1024}
                  className="h-full w-full object-contain"
                  priority
                  unoptimized
                />
              </span>
            </Link>

            <div className="mt-5 space-y-1.5">
              <p className="font-heading text-xl font-semibold tracking-wide text-white sm:text-2xl">
                {COMPANY.name}
              </p>
              <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                {COMPANY.address.full}
              </p>
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="inline-block text-sm font-medium text-gold transition-colors hover:text-gold-light sm:text-base"
              >
                {COMPANY.phone}
              </a>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Invest. Operate.{" "}
            <span className="text-gradient-gold">Expand.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-lg"
          >
            A multi-state investment group acquiring and operating gas stations and franchise
            businesses across America since 2006.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/contact">
              <BrandButton variant="gold" size="lg">
                Partner With IBEX
              </BrandButton>
            </Link>
            <Link href="/contact">
              <BrandButton variant="outline-white" size="lg">
                Sell Your Property
              </BrandButton>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:left-auto sm:right-8 sm:translate-x-0 lg:right-12">
        {HERO_IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`Show background ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === safeIndex
                ? "w-8 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.55)]"
                : "w-1.5 bg-white/35 hover:bg-white/60"
            )}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <ChevronDown className="h-6 w-6 animate-bounce text-white/50" />
      </motion.div>
    </section>
  );
}
