import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { BrandButton } from "@/components/ui/brand-button";
import { CTABanner } from "@/components/shared/cta-banner";
import { CAREERS, COMPANY } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join ${COMPANY.name} and build your career with a leading fuel retail and investment company.`,
};

const BENEFITS = [
  "Competitive compensation & benefits",
  "Career growth opportunities",
  "Nationwide network exposure",
  "Professional development programs",
  "Collaborative team culture",
  "Industry-leading operations",
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers at IBEX"
        subtitle="Join a growing multi-state investment group expanding gas stations, franchise brands, and commercial operations across the United States."
        backgroundImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
      />

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <AnimatedSection>
              <SectionTitle
                badge="Why IBEX"
                title="Build Your Career With Us"
                align="left"
              />
              <p className="text-muted-foreground leading-relaxed">
                At IBEX Investments Group, you&apos;ll be part of a dynamic team operating one of
                the largest fuel retail networks in the United States. We offer meaningful careers
                with opportunities for growth, leadership, and impact.
              </p>
              <ul className="mt-8 space-y-4">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15">
                      <ArrowRight className="h-3 w-3 text-gold" aria-hidden="true" />
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="rounded-2xl bg-navy p-8 md:p-10">
                <h3 className="font-heading text-2xl font-bold text-white">Our Culture</h3>
                <p className="mt-4 text-white/70 leading-relaxed">
                  IBEX fosters a culture of integrity, excellence, and collaboration. We invest in
                  our people because they are the foundation of our success. Join a company where
                  your contributions matter and your career can thrive.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-heading text-3xl font-bold text-gold">500+</p>
                    <p className="mt-1 text-sm text-white/50">Team Members</p>
                  </div>
                  <div>
                    <p className="font-heading text-3xl font-bold text-gold">90+</p>
                    <p className="mt-1 text-sm text-white/50">Locations</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-ivory-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionTitle
              badge="Open Positions"
              title="Current Opportunities"
              subtitle="Explore our latest job openings and find your next career move."
            />
          </AnimatedSection>
          <div className="mx-auto max-w-4xl space-y-4">
            {CAREERS.map((job, i) => (
              <AnimatedSection key={job.title} delay={i * 0.08}>
                <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between md:p-8">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-navy group-hover:text-gold transition-colors">
                      {job.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Badge variant="navy">
                        <Briefcase className="mr-1 h-3 w-3" aria-hidden="true" />
                        {job.department}
                      </Badge>
                      <Badge variant="outline">
                        <MapPin className="mr-1 h-3 w-3" aria-hidden="true" />
                        {job.location}
                      </Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </div>
                  <Link href="/contact">
                    <BrandButton variant="outline" size="sm">
                      Apply Now
                    </BrandButton>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Don't See the Right Role?"
        description="Send us your resume and we'll keep you in mind for future opportunities."
        primaryLabel="Send Your Resume"
        primaryHref="/contact"
      />
    </>
  );
}
