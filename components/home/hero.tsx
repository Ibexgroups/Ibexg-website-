"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { COMPANY } from "@/lib/constants";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroSlide =
  | { type: "image"; src: string; position: string }
  | {
      type: "video";
      src: string;
      mobileSrc: string;
      poster: string;
      position: string;
    };

/**
 * Video first, then images.
 * Mobile uses a lighter 720p file; desktop keeps 1080p.
 * Poster shows while buffering. Timer waits until playback starts (with timeout).
 */
const HERO_SLIDES: HeroSlide[] = [
  {
    type: "video",
    src: "/hero/hero-cinematic-1080.mp4",
    mobileSrc: "/hero/hero-cinematic-mobile.mp4",
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
const VIDEO_LOAD_TIMEOUT_MS = 10000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [preferMobileVideo, setPreferMobileVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playedOnceRef = useRef(false);

  const current = HERO_SLIDES[index];
  const isVideoSlide = current.type === "video";
  const videoSrc =
    isVideoSlide
      ? preferMobileVideo
        ? current.mobileSrc
        : current.src
      : null;
  const playVideo = isVideoSlide;
  const slideMs = playVideo && videoReady ? VIDEO_MS : IMAGE_MS;

  // Prefer lighter file on phones / narrow screens (never disable video)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setPreferMobileVideo(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Advance slides; if video never starts, don't stay stuck forever
  useEffect(() => {
    if (playVideo && !videoReady) {
      const failSafe = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      }, VIDEO_LOAD_TIMEOUT_MS);
      return () => window.clearTimeout(failSafe);
    }
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, slideMs);
    return () => window.clearInterval(id);
  }, [index, slideMs, playVideo, videoReady]);

  // Load / play video with iOS-safe muted + playsInline
  useLayoutEffect(() => {
    const el = videoRef.current;
    if (!playVideo || !videoSrc || !el) {
      setVideoReady(false);
      if (el) el.pause();
      return;
    }

    setVideoReady(false);
    playedOnceRef.current = false;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    const markPlaying = () => {
      if (playedOnceRef.current) return;
      playedOnceRef.current = true;
      setVideoReady(true);
    };

    const tryPlay = () => {
      el.muted = true;
      void el.play().then(markPlaying).catch(() => {
        // Autoplay blocked until first gesture
      });
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    el.src = videoSrc;
    el.load();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("playing", markPlaying);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });

    tryPlay();

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("playing", markPlaying);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
      el.pause();
    };
  }, [playVideo, videoSrc, index]);

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
                  {/* Poster while video buffers — looks better than a black screen */}
                  <Image
                    src={slide.poster}
                    alt=""
                    fill
                    unoptimized
                    priority
                    sizes="100vw"
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      videoReady && active ? "opacity-0" : "opacity-100",
                      slide.position.replace("object-cover ", "")
                    )}
                  />
                  <video
                    ref={videoRef}
                    className={cn(
                      "absolute inset-0 h-full w-full transition-opacity duration-500",
                      videoReady && active ? "opacity-100" : "opacity-0",
                      slide.position
                    )}
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                    poster={slide.poster}
                  />
                </>
              ) : (
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  priority={i === 1}
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
