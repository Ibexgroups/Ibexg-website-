"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { BrandButton } from "@/components/ui/brand-button";
import { CORE_VALUES, COMPANY } from "@/lib/constants";
import { Target, Eye } from "lucide-react";

const HIGHLIGHTS = [
  { label: "Operating Since", value: String(COMPANY.founded) },
  { label: "Locations", value: "90+" },
  { label: "Asset Portfolio", value: "$200M+" },
  { label: "Footprint", value: "Multi-State" },
] as const;

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const logoScale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.85, 1.05, 1.08, 0.95]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55, 0.85], [0, 0.18, 0.22, 0.1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0, 0.55, 0.7, 0.25]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-charcoal"
    >
      {/* Charcoal + warm gold atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(212,175,55,0.2)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_70%,rgba(184,146,46,0.12)_0%,transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      {/* Scroll-reactive IBEX logo watermark */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        style={{ y: logoY }}
        aria-hidden="true"
      >
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="relative"
        >
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute left-1/2 top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35)_0%,transparent_68%)] blur-2xl"
          />
          <div className="relative h-[min(72vw,480px)] w-[min(72vw,480px)]">
            <Image
              src="/logo-transparent.png"
              alt=""
              fill
              className="object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.25)]"
              sizes="480px"
              unoptimized
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="About Us"
            title="An Investment Group Built on Real Businesses"
            subtitle={`Founded in ${COMPANY.founded}, IBEX acquires, operates, and expands gas stations and franchise brands across the United States — with a growing $200M+ portfolio.`}
            light
          />
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.06}>
          <div className="mb-12 grid grid-cols-2 gap-3 md:mb-16 md:grid-cols-4 md:gap-4">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gold/15 bg-charcoal-light/90 px-4 py-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition-all duration-300 hover:border-gold/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_24px_rgba(212,175,55,0.12)]"
              >
                <p className="font-heading text-2xl font-bold text-gold sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#B8C0CC] sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Mission + Vision */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          <AnimatedSection delay={0.1}>
            <div className="h-full rounded-2xl border border-gold/15 bg-gradient-to-b from-charcoal-panel/95 to-charcoal-light/95 p-7 shadow-[0_14px_36px_rgba(0,0,0,0.4)] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_24px_50px_rgba(0,0,0,0.55),0_0_36px_rgba(212,175,55,0.14)] sm:p-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#C5CDD8] sm:text-base">
                To acquire and operate high-performing gas stations and franchise businesses,
                structure strong sale-leaseback and NNN partnerships, and help operators compete
                with modern imaging and competitive fuel supply.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.16}>
            <div className="h-full rounded-2xl border border-gold/15 bg-gradient-to-b from-charcoal-panel/95 to-charcoal-light/95 p-7 shadow-[0_14px_36px_rgba(0,0,0,0.4)] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_24px_50px_rgba(0,0,0,0.55),0_0_36px_rgba(212,175,55,0.14)] sm:p-8">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#C5CDD8] sm:text-base">
                To expand multi-state operations across fuel retail, QSR franchises, and commercial
                real estate — delivering lasting value for investors, operators, and communities
                nationwide.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Core values */}
        <AnimatedSection delay={0.2}>
          <div className="mt-12 md:mt-16">
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Core Values
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CORE_VALUES.map((value, i) => (
                <motion.div
                  key={value.title}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="rounded-2xl border border-gold/12 bg-charcoal-light/92 p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition-shadow duration-300 hover:border-gold/45 hover:shadow-[0_22px_48px_rgba(0,0,0,0.55),0_0_32px_rgba(212,175,55,0.2)]"
                >
                  <span className="font-heading text-sm font-bold text-gold">
                    0{i + 1}
                  </span>
                  <h4 className="mt-2 font-heading text-lg font-semibold text-white">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#B8C0CC]">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.28} className="mt-12 text-center">
          <Link href="/about">
            <BrandButton variant="gold" size="lg">
              Learn More About IBEX
            </BrandButton>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
