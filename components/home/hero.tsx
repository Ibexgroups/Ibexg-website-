"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { COMPANY } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroSlide =
  | { type: "image"; src: string; position: string }
  | { type: "video"; src: string; poster: string; position: string };

/**
 * Images first = fast first paint.
 * Large video loads ONLY when that slide is active (no preload).
 */
const HERO_SLIDES: HeroSlide[] = [
  {
    type: "video",
    src: "/hero/hero-intro.mp4",
    poster: "/hero/09-concrete-gas.jpg",
    position: "object-cover object-center",
  },
  { type: "image", src: "/hero/01-refinery-dawn.jpg", position: "object-cover object-[center_42%]" },
  { type: "image", src: "/hero/06-modern-gas.jpg", position: "object-cover object-center" },
  { type: "image", src: "/hero/08-timber-canopy.jpg", position: "object-cover object-center" },
  { type: "image", src: "/hero/09-concrete-gas.jpg", position: "object-cover object-[center_48%]" },
  { type: "image", src: "/hero/11-shell-night.jpg", position: "object-cover object-[center_52%]" },
  { type: "image", src: "/hero/16-yx-winter.jpg", position: "object-cover object-[center_55%]" },
  { type: "image", src: "/hero/18-shell-trails.jpg", position: "object-cover object-[center_48%]" },
  { type: "image", src: "/hero/19-orange-island.jpg", position: "object-cover object-center" },
  { type: "image", src: "/hero/20-orkan-mountains.jpg", position: "object-cover object-[center_75%]" },
  { type: "image", src: "/hero/21-shell-sunrise.jpg", position: "object-cover object-[center_45%]" },
  { type: "image", src: "/hero/24-station-lit-night.jpg", position: "object-cover object-[center_62%]" },
  { type: "image", src: "/hero/33-skyline-invest.jpg", position: "object-cover object-[center_40%]" },
];

const IMAGE_MS = 5000;
const VIDEO_MS = 12000;
const FADE_MS = 900;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const current = HERO_SLIDES[index];
  const playVideo = allowVideo && current.type === "video";
  const slideMs = playVideo ? VIDEO_MS : IMAGE_MS;

  // Skip video on Save-Data / very slow networks so the site stays snappy
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const c = nav.connection;
    if (
      c?.saveData ||
      c?.effectiveType === "2g" ||
      c?.effectiveType === "slow-2g"
    ) {
      setAllowVideo(false);
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, slideMs);
    return () => window.clearInterval(id);
  }, [index, slideMs]);

  // Load / play video only while that slide is active
  useEffect(() => {
    const el = videoRef.current;
    if (!playVideo || current.type !== "video") {
      setVideoReady(false);
      if (el) {
        el.pause();
        el.removeAttribute("src");
        el.load();
      }
      return;
    }
    if (!el) return;
    el.src = current.src;
    el.load();
    const onCanPlay = () => {
      setVideoReady(true);
      void el.play().catch(() => {});
    };
    el.addEventListener("canplay", onCanPlay, { once: true });
    return () => el.removeEventListener("canplay", onCanPlay);
  }, [playVideo, current]);

  // Warm next image only (not video)
  useEffect(() => {
    const next = HERO_SLIDES[(index + 1) % HERO_SLIDES.length];
    if (next.type === "image") {
      const img = new window.Image();
      img.src = next.src;
    }
  }, [index]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-charcoal" aria-hidden="true">
        {HERO_SLIDES.map((slide, i) => {
          const active = i === index;
          // Only keep nearby slides mounted (perf)
          const near =
            active ||
            i === (index + 1) % HERO_SLIDES.length ||
            i === (index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
          if (!near && !active) return null;

          return (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity ease-in-out will-change-[opacity]",
                active ? "opacity-100" : "opacity-0"
              )}
              style={{
                transitionDuration: `${FADE_MS}ms`,
                zIndex: active ? 1 : 0,
                pointerEvents: "none",
              }}
            >
              {slide.type === "video" ? (
                <>
                  {/* Poster shows instantly; video loads only when active + allowed */}
                  <Image
                    src={slide.poster}
                    alt=""
                    fill
                    unoptimized
                    priority
                    sizes="100vw"
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      allowVideo && videoReady && active
                        ? "opacity-0"
                        : "opacity-100",
                      slide.position.replace("object-cover ", "")
                    )}
                  />
                  {allowVideo && active && (
                    <video
                      ref={videoRef}
                      className={cn(
                        "absolute inset-0 h-full w-full transition-opacity duration-500",
                        videoReady ? "opacity-100" : "opacity-0",
                        slide.position
                      )}
                      muted
                      playsInline
                      preload="auto"
                      poster={slide.poster}
                    />
                  )}
                </>
              ) : (
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  priority={i === 0}
                  quality={85}
                  sizes="100vw"
                  className={slide.position}
                />
              )}
            </div>
          );
        })}
      </div>

      <div
        className="absolute inset-0 z-[2] bg-gradient-to-r from-charcoal/92 via-charcoal/55 to-charcoal/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-b from-charcoal/45 via-transparent to-charcoal/75"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-2xl text-left">
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
              <p className="pt-1 text-sm font-medium tracking-wide text-gold/90 sm:text-base">
                Building America&apos;s Premier Fuel &amp; Real Estate Network
              </p>
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

      <div className="absolute bottom-16 left-1/2 z-10 flex max-w-[90vw] flex-wrap items-center justify-center gap-2 sm:left-auto sm:right-8 sm:translate-x-0 lg:right-12">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show background ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index
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
