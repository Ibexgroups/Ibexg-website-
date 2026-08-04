"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionTitle } from "@/components/shared/section-title";
import { CompanyCard } from "@/components/shared/company-card";
import { BrandButton } from "@/components/ui/brand-button";
import { COMPANIES } from "@/lib/constants";

/**
 * Desktop-friendly: whileInView + stagger.
 * (Scroll-scrub often skips on mouse wheel; this plays clearly on laptop + phone.)
 */
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 120 + i * 40,
  }),
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function OurCompaniesPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding relative bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionTitle
            badge="Our Companies"
            title="A Diversified Portfolio of Businesses"
            subtitle="IBEX Investments Group operates multiple divisions, each delivering specialized services across the energy and retail sectors."
          />
        </AnimatedSection>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={reduceMotion ? undefined : gridVariants}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {COMPANIES.map((company, i) => (
            <motion.div
              key={company.title}
              custom={i}
              variants={reduceMotion ? undefined : cardVariants}
              className="h-full"
            >
              <CompanyCard
                title={company.title}
                description={company.description}
                icon={company.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection delay={0.15} className="mt-12 text-center">
          <Link href="/our-companies">
            <BrandButton variant="navy" size="lg">
              Explore Our Companies
            </BrandButton>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
