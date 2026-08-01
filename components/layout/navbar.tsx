"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { BrandButton } from "@/components/ui/brand-button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-light shadow-lg shadow-navy/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex shrink-0 items-center">
          <Logo size="compact" className="sm:hidden" />
          <Logo size="default" className="hidden sm:inline-flex" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                scrolled
                  ? "text-navy hover:text-gold"
                  : "text-white/90 hover:text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden xl:block">
          <Link href="/contact">
            <BrandButton variant="gold" size="sm">
              Sell Your Property
            </BrandButton>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg xl:hidden",
            scrolled ? "text-navy" : "text-white"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-navy xl:hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <BrandButton variant="gold" className="w-full">
                    Sell Your Property
                  </BrandButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
