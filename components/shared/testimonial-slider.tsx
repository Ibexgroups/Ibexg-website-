"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <div className="relative mx-auto max-w-4xl">
      <Quote
        className="absolute -top-4 left-0 h-12 w-12 text-gold/20"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
          className="px-4 py-8 text-center md:px-16"
        >
          <blockquote className="text-lg leading-relaxed text-navy md:text-xl lg:text-2xl">
            &ldquo;{TESTIMONIALS[current].quote}&rdquo;
          </blockquote>
          <footer className="mt-8">
            <cite className="not-italic">
              <span className="font-heading font-semibold text-navy">
                {TESTIMONIALS[current].author}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {TESTIMONIALS[current].role}
              </span>
            </cite>
          </footer>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-navy transition-colors hover:border-gold hover:text-gold"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-gold" : "w-2 bg-border hover:bg-gold/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-navy transition-colors hover:border-gold hover:text-gold"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
