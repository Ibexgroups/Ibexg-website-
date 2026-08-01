import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        align === "left" && "text-left max-w-2xl",
        className
      )}
    >
      {badge && (
        <Badge variant={light ? "outline" : "default"} className={cn("mb-4", light && "border-white/30 text-gold")}>
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          "font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/75" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
