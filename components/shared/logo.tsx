import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 1024;

interface LogoProps {
  className?: string;
  size?: "default" | "large" | "compact";
  full?: boolean;
  centered?: boolean;
}

const sizeMap = {
  compact: { box: "h-12 w-12", pixels: 48 },
  default: { box: "h-16 w-16", pixels: 64 },
  large: { box: "h-20 w-20", pixels: 80 },
  full: { box: "h-44 w-44 sm:h-52 sm:w-52", pixels: 208 },
} as const;

export function Logo({
  className,
  size = "default",
  full = false,
  centered = false,
}: LogoProps) {
  const dimensions = full ? sizeMap.full : sizeMap[size];

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center justify-center bg-transparent",
        centered && "mx-auto",
        className
      )}
      aria-label={`${COMPANY.name} - Home`}
    >
      <Image
        src="/logo-transparent.png"
        alt={`${COMPANY.shortName} Investment Group — ${COMPANY.tagline}`}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={cn(
          "bg-transparent object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]",
          dimensions.box
        )}
        priority
        unoptimized
        sizes={`${dimensions.pixels}px`}
      />
    </Link>
  );
}
