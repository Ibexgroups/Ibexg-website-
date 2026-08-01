"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  className,
}: ServiceCardProps) {
  const IconComponent = getIcon(icon);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("h-full", className)}
    >
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5">
        <CardContent className="p-8">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/5 text-navy transition-all duration-300 group-hover:bg-gold/15 group-hover:text-gold">
            <IconComponent className="h-7 w-7" aria-hidden="true" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-navy">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
