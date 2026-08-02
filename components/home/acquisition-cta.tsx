import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BrandButton } from "@/components/ui/brand-button";
import { ArrowRight, ShieldCheck, Clock3, Handshake } from "lucide-react";

const POINTS = [
  { icon: ShieldCheck, label: "Confidential process" },
  { icon: Clock3, label: "Fast closings" },
  { icon: Handshake, label: "Sale-leaseback ready" },
] as const;

export function AcquisitionCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      {/* Full-bleed atmosphere — no inset box */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero/07-fuel-glow.jpg"
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/92 to-charcoal/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
        <div className="absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-[50%] bg-gradient-to-t from-gold/10 to-transparent" />
      </div>

      {/* Gold accent rail */}
      <div
        className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent sm:w-1.5"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <AnimatedSection className="lg:col-span-7">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Acquire with IBEX
          </p>
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Looking to Sell Your{" "}
            <span className="text-gradient-gold">Gas Station?</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            IBEX offers a streamlined, confidential acquisition process — fair market valuations,
            fast closings, and flexible structures including sale-leaseback. Our team guides you
            through every step.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {POINTS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-medium text-white/80 backdrop-blur-sm sm:text-sm"
              >
                <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact">
              <BrandButton variant="gold" size="lg" className="group">
                Request an Offer
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </BrandButton>
            </Link>
            <Link href="/contact">
              <BrandButton variant="outline-white" size="lg">
                Contact Us
              </BrandButton>
            </Link>
          </div>
        </AnimatedSection>

        {/* Right visual panel — open composition, not a boxed CTA */}
        <AnimatedSection delay={0.12} className="relative hidden lg:col-span-5 lg:block">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gold/10 blur-2xl" aria-hidden="true" />
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-gold/25 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <Image
                src="/hero/05-station-night.jpg"
                alt="Gas station acquisition opportunity"
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-heading text-2xl font-bold text-gold">$200M+</p>
                <p className="mt-1 text-sm text-white/75">
                  Asset portfolio actively expanding nationwide
                </p>
              </div>
            </div>
            {/* Floating accent chip */}
            <div className="absolute -left-6 top-10 rounded-2xl border border-gold/30 bg-charcoal/90 px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-md">
              <p className="text-xs uppercase tracking-wider text-white/50">Since</p>
              <p className="font-heading text-xl font-bold text-white">2006</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
