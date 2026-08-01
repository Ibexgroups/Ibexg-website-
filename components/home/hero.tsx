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
    // Keep index in range if image list changes (prevents crash)
    setIndex((prev) => prev % HERO_IMAGES.length);

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
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

      {/* Light overlays only — keep photos vivid, text still readable */}
      <div
        className="absolute inset-0 bg-navy/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/55 via-transparent to-navy/65"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-6 inline-block rounded-full border border-gold/40 bg-navy/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur-sm">
            {COMPANY.name}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Building America&apos;s{" "}
          <span className="text-gradient-gold">Fuel Network</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] md:text-xl"
        >
          {COMPANY.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/properties">
            <BrandButton variant="gold" size="lg">
              View Properties
            </BrandButton>
          </Link>
          <Link href="/contact">
            <BrandButton variant="outline-white" size="lg">
              Sell Your Property
            </BrandButton>
          </Link>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
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
