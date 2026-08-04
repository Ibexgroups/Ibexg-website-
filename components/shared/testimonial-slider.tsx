"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function useVisibleCount() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else setCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating ? "fill-gold text-gold" : "fill-white/15 text-white/15"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function TestimonialSlider() {
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, TESTIMONIALS.length - visible);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setPage((p) => Math.min(p, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setPage((p) => (p >= maxIndex ? 0 : p + 1));
    }, 5000);
    return () => window.clearInterval(timer);
  }, [maxIndex]);

  const go = (nextPage: number, dir: number) => {
    setDirection(dir);
    setPage(nextPage);
  };

  const prev = () => go(page <= 0 ? maxIndex : page - 1, -1);
  const next = () => go(page >= maxIndex ? 0 : page + 1, 1);

  const slice = TESTIMONIALS.slice(page, page + visible);

  return (
    <div className="relative">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Stars rating={5} />
          <span className="text-sm font-medium text-gold">180+ reviews</span>
        </div>
        <Link
          href="/contact"
          className="text-sm font-semibold text-gold transition-colors hover:text-gold-light"
        >
          See All Reviews
        </Link>
      </div>

      <div className="relative px-8 sm:px-12 lg:px-14">
        <button
          type="button"
          onClick={prev}
          className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
          aria-label="Previous reviews"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
          aria-label="Next reviews"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* One line: 2–3 open feedbacks, slide together */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={`${page}-${visible}`}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 48 : -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -48 : 48 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "grid gap-8 lg:gap-10",
                visible === 1 && "grid-cols-1",
                visible === 2 && "grid-cols-2",
                visible === 3 && "grid-cols-3"
              )}
            >
              {slice.map((item, i) => (
                <article
                  key={`${item.author}-${item.date}`}
                  className={cn(
                    "min-w-0 text-left",
                    i < slice.length - 1 &&
                      "sm:border-r sm:border-white/10 sm:pr-8 lg:pr-10"
                  )}
                >
                  <p className="text-xs text-white/40">{item.date}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <p className="font-heading text-base font-semibold text-white sm:text-lg">
                      {item.author}
                    </p>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-400">
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="mt-2">
                    <Stars rating={item.rating} />
                  </div>

                  <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {item.headline}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px]">
                    {item.quote}
                  </p>

                  <p className="mt-3 text-xs text-white/40">{item.role}</p>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className="mt-10 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Review pages"
      >
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === page}
            aria-label={`Reviews page ${i + 1}`}
            onClick={() => go(i, i > page ? 1 : -1)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === page
                ? "w-8 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.45)]"
                : "w-1.5 bg-white/25 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
