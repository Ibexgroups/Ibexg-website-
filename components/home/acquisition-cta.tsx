import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BrandButton } from "@/components/ui/brand-button";
import { ArrowRight } from "lucide-react";

export function AcquisitionCTA() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-navy p-8 md:p-16 lg:p-20">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1597764694900-55d837a7a1c4?w=1200&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" aria-hidden="true" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Looking to Sell Your Gas Station?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                IBEX Investments Group offers a streamlined, confidential acquisition process.
                We provide fair market valuations, fast closings, and flexible deal structures
                including sale-leaseback options. Let our experienced team guide you through
                every step.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
