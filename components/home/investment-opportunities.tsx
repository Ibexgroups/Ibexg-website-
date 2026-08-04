"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { BrandButton } from "@/components/ui/brand-button";
import { INVESTMENT_OPPORTUNITIES } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Design 4: Hover Reveal Panels
 * Default = icon + title. Hover/tap = description + Learn more.
 */
export function InvestmentOpportunities() {
  return (
    <section className="section-padding relative overflow-hidden bg-ivory">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(212,175,55,0.07), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Investment Opportunities"
            title="Partner With IBEX Investments Group"
            subtitle="Hover or tap a panel to explore each partnership path — clean, focused, and built for investors."
          />
        </AnimatedSection>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {INVESTMENT_OPPORTUNITIES.map((item, i) => (
            <AnimatedSection
              key={item.title}
              delay={i * 0.06}
              className={cn(
                i === 3 && "lg:col-start-1 lg:col-end-2",
                i === 4 && "lg:col-start-2 lg:col-end-4"
              )}
            >
              <RevealPanel item={item} index={i} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.28} className="mt-10 text-center sm:mt-12">
          <Link href="/contact">
            <BrandButton variant="navy" size="lg" className="group">
              Discuss Investment Opportunities
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </BrandButton>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

type Opp = (typeof INVESTMENT_OPPORTUNITIES)[number];

function RevealPanel({ item, index }: { item: Opp; index: number }) {
  const Icon = getIcon(item.icon);
  const [open, setOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const num = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !item.video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "100px", threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [item.video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !item.video || !inView) return;

    if (!el.getAttribute("src")) {
      el.src = item.video;
      el.load();
    }

    const play = () => {
      setVideoReady(true);
      void el.play().catch(() => {});
    };

    if (el.readyState >= 3) {
      play();
      return;
    }

    el.addEventListener("canplay", play);
    el.addEventListener("loadeddata", play);
    return () => {
      el.removeEventListener("canplay", play);
      el.removeEventListener("loadeddata", play);
    };
  }, [inView, item.video]);

  useEffect(() => {
    const el = videoRef.current;
    const node = rootRef.current;
    if (!el || !node || !item.video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) el.pause();
        else if (videoReady) void el.play().catch(() => {});
      },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [item.video, videoReady]);

  return (
    <motion.article
      ref={rootRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onClick={() => setOpen((v) => !v)}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`${item.title}. ${open ? "Hide" : "Show"} details`}
      className={cn(
        "group relative flex h-full min-h-[240px] cursor-pointer flex-col justify-end overflow-hidden rounded-3xl border border-charcoal/10 bg-charcoal outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:min-h-[280px]",
        open
          ? "border-gold/50 shadow-[0_22px_50px_rgba(20,24,32,0.28),0_0_0_1px_rgba(212,175,55,0.2)]"
          : "hover:border-gold/30 hover:shadow-[0_16px_40px_rgba(20,24,32,0.18)]"
      )}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={cn(
          "z-0 object-cover transition-all duration-700 ease-out",
          videoReady
            ? "scale-105 opacity-0"
            : open
              ? "scale-105 brightness-[0.45]"
              : "scale-100 brightness-[0.55]"
        )}
      />

      {item.video && (
        <video
          ref={videoRef}
          className={cn(
            "pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-700",
            videoReady ? "opacity-100" : "opacity-0"
          )}
          muted
          playsInline
          loop
          preload="none"
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-0 z-[2] bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/15"
        aria-hidden="true"
      />

      <div className="relative z-[3] p-6 sm:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300",
              open
                ? "border-gold bg-gold text-charcoal shadow-[0_8px_24px_rgba(212,175,55,0.4)]"
                : "border-white/20 bg-white/10 text-gold backdrop-blur-sm"
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-white/40">
            {num}
          </span>
        </div>

        <h3 className="font-heading text-xl font-bold tracking-tight text-white sm:text-2xl">
          {item.title}
        </h3>

        <p
          className={cn(
            "mt-2 text-xs font-medium uppercase tracking-[0.16em] text-gold/70 transition-opacity duration-300 sm:text-[11px]",
            open ? "opacity-0" : "opacity-100"
          )}
        >
          Hover or tap to explore
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, height: 0, y: 8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                {item.description}
              </p>
              <Link
                href="/contact"
                onClick={(e) => e.stopPropagation()}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
              >
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
