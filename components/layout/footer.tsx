import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Share2, Globe, MessageCircle } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES, SOCIAL_LINKS } from "@/lib/constants";

const socialIcons = {
  LinkedIn: Share2,
  Facebook: Globe,
  Twitter: MessageCircle,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden bg-charcoal text-white"
      role="contentinfo"
    >
      {/* Warm gold atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_0%,rgba(212,175,55,0.12)_0%,transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand column */}
          <div className="lg:pr-4">
            <Link href="/" className="group inline-flex flex-col items-start gap-4">
              <span className="relative inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/70 bg-charcoal-light p-2 shadow-[0_0_32px_rgba(212,175,55,0.2)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-28 sm:w-28">
                <Image
                  src="/logo-transparent.png"
                  alt={COMPANY.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              </span>
              <span className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-gold">
                {COMPANY.name}
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              A leading investment company specializing in gas station acquisitions,
              commercial real estate, fuel distribution, and convenience store operations
              across the United States.
            </p>

            <div className="mt-7 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 transition-all duration-300 hover:border-gold/50 hover:bg-gold hover:text-charcoal hover:shadow-[0_8px_24px_rgba(212,175,55,0.35)]"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Our Services
            </h3>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-start gap-2 text-sm leading-snug text-white/60 transition-colors hover:text-gold"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/50 transition-colors group-hover:bg-gold" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold">
              Contact Us
            </h3>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="pt-1.5 text-sm leading-relaxed text-white/60">
                  {COMPANY.address.full}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="text-sm text-white/60 transition-colors hover:text-gold"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-white/60 transition-colors hover:text-gold"
                >
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-center text-sm text-white/40 md:text-left">
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-center text-sm text-white/40 md:text-right">
            <span className="text-gold/80">{COMPANY.ceo}</span>
            <span className="text-white/30"> · </span>
            CEO
            <span className="mx-2 text-white/25">|</span>
            <span className="text-gold/80">{COMPANY.vicePresident}</span>
            <span className="text-white/30"> · </span>
            Vice President
          </p>
        </div>
      </div>
    </footer>
  );
}
