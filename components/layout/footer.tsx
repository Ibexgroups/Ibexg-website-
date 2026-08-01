import Link from "next/link";
import { MapPin, Phone, Mail, Share2, Globe, MessageCircle } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { COMPANY, NAV_LINKS, SERVICES, SOCIAL_LINKS } from "@/lib/constants";

const socialIcons = {
  LinkedIn: Share2,
  Facebook: Globe,
  Twitter: MessageCircle,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex justify-center lg:justify-start">
              <Logo full />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              A leading investment company specializing in gas station acquisitions,
              commercial real estate, fuel distribution, and convenience store operations
              across the United States.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-all hover:bg-gold hover:text-navy"
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
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h3>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Our Services
            </h3>
            <ul className="mt-6 space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <Link
                    href="/services"
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Contact Us
            </h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="text-sm text-white/60">{COMPANY.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="text-sm text-white/60 transition-colors hover:text-gold"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/40">
            &copy; {currentYear} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Owned by {COMPANY.owner}
          </p>
        </div>
      </div>
    </footer>
  );
}
