"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  display?: string;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  display = "",
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const useDisplay = Boolean(display);

  useEffect(() => {
    if (!isInView || useDisplay) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, useDisplay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="font-heading text-3xl font-bold text-gold md:text-4xl lg:text-5xl">
        {useDisplay ? (
          display
        ) : (
          <>
            {prefix}
            {count}
            {suffix}
          </>
        )}
      </div>
      <p className="mt-2 text-sm font-medium text-white/70 md:text-base">{label}</p>
    </motion.div>
  );
}
