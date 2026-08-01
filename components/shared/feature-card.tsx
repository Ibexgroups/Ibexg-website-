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
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        light
          ? "glass hover:bg-white/12"
          : "border border-border bg-white hover:border-gold/30 hover:shadow-lg",
        className
      )}
    >
      <div
        className={cn(
          "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
          light ? "bg-gold/20 text-gold" : "bg-gold/10 text-gold"
        )}
      >
        <IconComponent className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3
        className={cn(
          "font-heading text-lg font-semibold",
          light ? "text-white" : "text-navy"
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
    </motion.div>
  );
}
