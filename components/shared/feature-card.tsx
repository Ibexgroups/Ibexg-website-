"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
  light?: boolean;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
  light = false,
}: FeatureCardProps) {
  const IconComponent = getIcon(icon);

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.035 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn(
        "group relative h-full cursor-default rounded-2xl p-6 transition-[box-shadow,border-color,background-color] duration-300",
        light
          ? "border border-white/10 bg-white/[0.06] hover:border-gold/40 hover:bg-white/[0.11] hover:shadow-[0_22px_50px_rgba(0,0,0,0.55),0_0_0_1px_rgba(212,175,55,0.18),0_0_36px_rgba(212,175,55,0.18)]"
          : "border border-border bg-white hover:border-gold/40 hover:shadow-[0_22px_48px_rgba(20,24,32,0.18),0_8px_20px_rgba(212,175,55,0.12)]",
        className
      )}
    >
      {/* Soft gold wash on hover */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          light
            ? "bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.16)_0%,transparent_55%)]"
            : "bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.08)_0%,transparent_55%)]"
        )}
        aria-hidden="true"
      />

      <div className="relative z-[1]">
        <div
          className={cn(
            "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
            light
              ? "bg-navy/60 text-gold shadow-[0_8px_20px_rgba(0,0,0,0.35)] group-hover:bg-gold group-hover:text-navy group-hover:shadow-[0_10px_24px_rgba(212,175,55,0.45)]"
              : "bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy group-hover:shadow-[0_10px_24px_rgba(212,175,55,0.35)]"
          )}
        >
          <IconComponent className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3
          className={cn(
            "font-heading text-lg font-semibold transition-colors duration-300",
            light ? "text-white group-hover:text-gold-light" : "text-navy"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            light ? "text-white/70" : "text-muted"
          )}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}
