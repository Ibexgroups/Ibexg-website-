"use client";

import { useState } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";

interface ContactFormProps {
  variant?: "default" | "dark";
}

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gold/30 bg-gold/5 p-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-gold" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-navy">
          Thank You for Reaching Out
        </h3>
        <p className="mt-2 text-muted">
          Our team will review your message and respond within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-navy">
            First Name
          </label>
          <Input id="firstName" name="firstName" placeholder="John" required />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-navy">
            Last Name
          </label>
          <Input id="lastName" name="lastName" placeholder="Smith" required />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy">
          Email Address
        </label>
        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
          Phone Number
        </label>
        <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-navy">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your property or inquiry..."
          required
        />
      </div>
      <BrandButton
        type="submit"
        variant={variant === "dark" ? "gold" : "navy"}
        size="lg"
        className="w-full sm:w-auto"
      >
        Send Message
      </BrandButton>
    </form>
  );
}
