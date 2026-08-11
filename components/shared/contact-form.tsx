"use client";

import { useState } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY } from "@/lib/constants";
import { CheckCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  variant?: "default" | "dark";
}

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      _subject: `IBEX Website Inquiry — ${String(formData.get("firstName") || "").trim()} ${String(formData.get("lastName") || "").trim()}`.trim(),
      _template: "table",
      _captcha: "false",
    };

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${COMPANY.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: string | boolean;
        message?: string;
      };

      if (!res.ok) {
        throw new Error(data.message || "Unable to send message. Please try again.");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setError(
        `Message could not be sent. Please email us directly at ${COMPANY.email} or call ${COMPANY.phone}.`
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gold/30 bg-gold/5 p-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-gold" aria-hidden="true" />
        <h3 className="font-heading text-xl font-semibold text-navy">
          Thank You for Reaching Out
        </h3>
        <p className="mt-2 text-muted">
          Your message was sent to {COMPANY.email}. Our team will respond within
          1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — leave empty (spam bots fill this) */}
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-navy">
            First Name
          </label>
          <Input id="firstName" name="firstName" placeholder="John" required disabled={loading} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-navy">
            Last Name
          </label>
          <Input id="lastName" name="lastName" placeholder="Smith" required disabled={loading} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-navy">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-navy">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          disabled={loading}
        />
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
          disabled={loading}
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <BrandButton
        type="submit"
        variant={variant === "dark" ? "gold" : "navy"}
        size="lg"
        className="w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </BrandButton>
    </form>
  );
}
