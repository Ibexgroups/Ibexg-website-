import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const brandButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        gold:
          "bg-gold text-navy hover:bg-gold-light shadow-lg shadow-gold/20 hover:shadow-gold/30 hover:-translate-y-0.5",
        navy: "bg-navy text-white hover:bg-navy-light shadow-lg shadow-navy/20 hover:-translate-y-0.5",
        outline:
          "border-2 border-gold text-gold bg-transparent hover:bg-gold hover:text-navy",
        "outline-white":
          "border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-navy",
        ghost: "text-navy hover:bg-navy/5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "default",
    },
  }
);

export interface BrandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brandButtonVariants> {}

const BrandButton = React.forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(brandButtonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
BrandButton.displayName = "BrandButton";

export { BrandButton, brandButtonVariants };
