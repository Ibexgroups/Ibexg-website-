"use client";

import Link from "next/link";
import { BrandButton } from "@/components/ui/brand-button";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTABanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: CTABannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy section-padding",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4AF37 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={primaryHref}>
            <BrandButton variant="gold" size="lg">
              {primaryLabel}
            </BrandButton>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref}>
              <BrandButton variant="outline-white" size="lg">
                {secondaryLabel}
              </BrandButton>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
