"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface CompanyCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function CompanyCard({
  title,
  description,
  icon,
  className,
}: CompanyCardProps) {
  const IconComponent = getIcon(icon);

  return (
    <div
      className={cn(
        "h-full transition-transform duration-300 hover:-translate-y-1",
        className
      )}
    >
      <Card className="group h-full transition-all duration-300 hover:border-gold/40 hover:shadow-lg">
        <CardContent className="flex h-full flex-col items-center p-8 text-center">
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-gold shadow-lg shadow-navy/20 transition-transform duration-300 group-hover:scale-110">
            <IconComponent className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-navy">{title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
