import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ContactForm } from "@/components/shared/contact-form";
import { COMPANY } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${COMPANY.name}. We're ready to discuss acquisitions, partnerships, and more.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Ready to sell your property, explore partnerships, or learn more? Our team is here to help."
      />

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-heading text-3xl font-bold text-navy">
                  Let&apos;s Start a Conversation
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Whether you&apos;re a gas station owner looking to sell, a broker with a listing,
                  or a potential partner — we&apos;d love to hear from you. Fill out the form and
                  our team will respond within 1–2 business days.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy">Address</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{COMPANY.address.full}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy">Phone</h3>
                      <a
                        href={`tel:${COMPANY.phoneHref}`}
                        className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-gold"
                      >
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy">Email</h3>
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-gold"
                      >
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy">Business Hours</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Monday – Friday: 8:00 AM – 6:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.15} className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-white p-8 md:p-10 shadow-sm">
                <h3 className="font-heading text-xl font-semibold text-navy">Send Us a Message</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  All inquiries are handled confidentially.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-ivory-deep pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="IBEX Investments Group office location"
                src="https://maps.google.com/maps?q=45+E+Main+Street,+Unit+203,+Newark,+DE+19711&output=embed"
                className="h-80 w-full border-0 md:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
