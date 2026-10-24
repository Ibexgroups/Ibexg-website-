"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { CAREERS, COMPANY, LEADERSHIP, PORTFOLIO_LOCATIONS, SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ChatLink = { label: string; href: string; external?: boolean };
type Message = { id: number; from: "bot" | "user"; text: string; links?: ChatLink[] };
type Step = "menu" | "lead-name" | "lead-phone" | "lead-detail";

const ceo = LEADERSHIP.find((person) => person.shortTitle === "CEO");
const ceoEmail = ceo && "email" in ceo ? ceo.email : COMPANY.email;
const ceoPhone = ceo && "phone" in ceo ? ceo.phone : COMPANY.phone;

const QUICK_ACTIONS = [
  { id: "sell", label: "Sell a Gas Station" },
  { id: "invest", label: "Buy / Invest" },
  { id: "services", label: "Our Services" },
  { id: "properties", label: "Properties" },
  { id: "fuel", label: "Fuel Distribution" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Talk to Our Team" },
] as const;

const whatsappLink = (text: string) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;

export function Chatbot() {
  const nextIdRef = useRef(1);
  const makeBotMessage = (text: string, links?: ChatLink[]): Message => ({
    id: nextIdRef.current++,
    from: "bot",
    text,
    links,
  });
  const makeUserMessage = (text: string): Message => ({ id: nextIdRef.current++, from: "user", text });

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>("menu");
  const [leadTopic, setLeadTopic] = useState("");
  const [lead, setLead] = useState({ name: "", phone: "" });
  const [messages, setMessages] = useState<Message[]>(() => [
    makeBotMessage(
      `Hi! I'm the ${COMPANY.shortName} Assistant. I can help you sell or buy a gas station, explore our services and properties, or connect you with our team. What would you like to do?`
    ),
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function reply(text: string, links?: ChatLink[]) {
    setTyping(true);
    timers.current.push(
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, makeBotMessage(text, links)]);
      }, 500)
    );
  }

  function startLead(topic: string, intro: string) {
    setLeadTopic(topic);
    setLead({ name: "", phone: "" });
    setStep("lead-name");
    reply(`${intro}\n\nFirst, may I have your full name?`);
  }

  /** echo=true jab quick-action button dabta hai (user bubble dikhana hai). */
  function handleIntent(id: string, echo = true) {
    if (step !== "menu") {
      setLead({ name: "", phone: "" });
      setLeadTopic("");
      setStep("menu");
    }

    if (echo) {
      const action = QUICK_ACTIONS.find((a) => a.id === id);
      if (action) setMessages((prev) => [...prev, makeUserMessage(action.label)]);
    }

    switch (id) {
      case "sell":
        startLead(
          "Sell a Gas Station / Property",
          "Great — we buy gas stations and commercial properties nationwide with professional valuations and reliable closings."
        );
        break;
      case "invest":
        startLead(
          "Buy / Invest with IBEX",
          "Excellent — we offer sale-leaseback, Triple Net (NNN) lease, and commercial real estate investment opportunities backed by a $200M+ portfolio."
        );
        break;
      case "fuel":
        startLead(
          "Fuel Distribution",
          "We supply fuel through major brand dealerships (Exxon, Shell, Chevron, Valero, Marathon) and support fleet and retail customers."
        );
        break;
      case "services":
        reply(
          `Here is what we do:\n${SERVICES.map((s) => `• ${s.title}`).join("\n")}\n\nTap a service to learn more, or choose "Talk to Our Team" to connect with us.`,
          [{ label: "View All Services", href: "/services" }]
        );
        break;
      case "properties":
        reply(
          `Here are a few locations from our multi-state portfolio:\n${PORTFOLIO_LOCATIONS.slice(0, 5)
            .map((p) => `• ${p.state} — ${p.address} — ${p.price} (${p.status})`)
            .join("\n")}`,
          [
            { label: "View All Properties", href: "/properties" },
            {
              label: "Chat on WhatsApp",
              href: whatsappLink(`Hi ${COMPANY.shortName}, I'd like to know more about your properties.`),
              external: true,
            },
          ]
        );
        break;
      case "careers":
        reply(
          `We're hiring for roles such as:\n${CAREERS.map((c) => `• ${c.title} — ${c.location} (${c.type})`).join("\n")}`,
          [{ label: "View Careers & Apply", href: "/careers" }]
        );
        break;
      case "contact":
        reply(
          `You can reach our leadership team directly:\n\nCEO ${COMPANY.ceo}\nEmail: ${ceoEmail}\nPhone: ${ceoPhone}\n\nOffice: ${COMPANY.address.full}\nGeneral: ${COMPANY.email} • ${COMPANY.phone}`,
          [
            { label: `Call ${ceoPhone}`, href: `tel:${COMPANY.phoneHref}` },
            { label: "Email the CEO", href: `mailto:${ceoEmail}` },
            {
              label: "Chat on WhatsApp",
              href: whatsappLink(`Hi ${COMPANY.shortName}, I'd like to speak with your team.`),
              external: true,
            },
          ]
        );
        break;
    }
  }

  function handleLeadStep(text: string) {
    const trimmedText = text.trim();

    if (step === "lead-name") {
      const nextName = trimmedText || "Unknown";
      const updatedLead = { ...lead, name: nextName };
      setLead(updatedLead);
      setStep("lead-phone");
      reply(`Thanks, ${nextName.split(" ")[0]}! What's the best phone number to reach you?`);
      return;
    }

    if (step === "lead-phone") {
      const nextPhone = trimmedText || "Not provided";
      const updatedLead = { ...lead, phone: nextPhone };
      setLead(updatedLead);
      setStep("lead-detail");
      reply(
        "Got it. Please share a short detail — for example, your property's city & state, or what you're looking for."
      );
      return;
    }

    const finalLead = {
      name: lead.name || "Unknown",
      phone: lead.phone || "Not provided",
    };
    const summary = `New enquiry via website chatbot\nTopic: ${leadTopic}\nName: ${finalLead.name}\nPhone: ${finalLead.phone}\nDetail: ${trimmedText}`;

    setLead({ name: "", phone: "" });
    setLeadTopic("");
    setStep("menu");

    reply(
      `Thank you, ${finalLead.name.split(" ")[0]}! Your details are ready:\n\nTopic: ${leadTopic}\nPhone: ${finalLead.phone}\nDetail: ${trimmedText}\n\nTap "Send on WhatsApp" to share this with our team instantly, or call us at ${COMPANY.phone}.`,
      [
        { label: "Send on WhatsApp", href: whatsappLink(summary), external: true },
        { label: `Call ${COMPANY.phone}`, href: `tel:${COMPANY.phoneHref}` },
        { label: "Open Contact Page", href: "/contact" },
      ]
    );
  }

  function handleFreeText(raw: string) {
    if (step !== "menu") return handleLeadStep(raw);

    const text = raw.toLowerCase();
    if (/(sell|selling)/.test(text)) return handleIntent("sell", false);
    if (/(buy|invest|leaseback|nnn|triple net)/.test(text)) return handleIntent("invest", false);
    if (/(propert|location|stations?\s+for\s+sale)/.test(text)) return handleIntent("properties", false);
    if (/(fuel|diesel|petrol|supply)/.test(text)) return handleIntent("fuel", false);
    if (/(job|career|hiring|vacancy)/.test(text)) return handleIntent("careers", false);
    if (/(service|offer|do you do|what do)/.test(text)) return handleIntent("services", false);
    if (/(contact|phone|call|email|mail|ceo|talk|number)/.test(text)) return handleIntent("contact", false);
    if (/(about|company|founded|who are)/.test(text)) {
      return reply(
        `${COMPANY.name} has been operating since ${COMPANY.founded} — 90+ locations, multi-state operations, and a $200M+ asset portfolio across gas stations, convenience retail, and commercial properties. We are led by CEO ${COMPANY.ceo} and Vice President ${COMPANY.vicePresident}.`,
        [{ label: "More About Us", href: "/about" }]
      );
    }
    if (/(hi|hello|hey|namaste)/.test(text)) {
      return reply(
        `Hello! How can I help you today? You can pick an option below, or type things like "sell my station", "properties", or "contact".`
      );
    }
    if (/(thank|shukria|dhanyavad)/.test(text)) {
      return reply("You're welcome! If you need anything else, I'm right here.");
    }
    return reply(
      `I can help with selling or buying a gas station, our services, properties, fuel distribution, careers, or connecting you with our team. Please pick an option below — or reach us anytime at ${COMPANY.phone} / ${COMPANY.email}.`
    );
  }

  function onSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    setMessages((prev) => [...prev, makeUserMessage(text)]);
    handleFreeText(text);
  }

  return (
    <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-5">
      {open && (
        <div className="flex h-[min(540px,calc(100dvh-9rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_24px_60px_rgba(10,12,18,0.45)]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-navy px-4 py-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-charcoal">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-semibold text-white">{COMPANY.shortName} Assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online — replies instantly
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#f7f5f0] px-3.5 py-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.from === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                    msg.from === "user"
                      ? "rounded-br-sm bg-navy text-white"
                      : "rounded-bl-sm border border-black/5 bg-white text-charcoal"
                  )}
                >
                  <p>{msg.text}</p>
                  {msg.links && (
                    <span className="mt-2.5 flex flex-col gap-1.5">
                      {msg.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="rounded-lg bg-gold/15 px-3 py-2 text-center text-xs font-semibold text-navy transition hover:bg-gold hover:text-charcoal"
                        >
                          {link.label}
                        </a>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-black/5 bg-white px-3.5 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy/40"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick actions */}
          {step === "menu" && (
            <div className="flex flex-wrap gap-1.5 border-t border-black/5 bg-white px-3.5 pt-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleIntent(action.id)}
                  className="rounded-full border border-navy/15 bg-navy/[0.04] px-3 py-1.5 text-xs font-medium text-navy transition hover:border-gold hover:bg-gold/20"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={onSend} className="flex items-center gap-2 bg-white px-3.5 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step === "menu" ? "Type your message..." : "Type your answer..."}
              aria-label="Type your message"
              className="h-10 flex-1 rounded-full border border-black/10 bg-[#f7f5f0] px-4 text-sm text-charcoal outline-none transition placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-charcoal transition hover:bg-gold-light disabled:opacity-40"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with IBEX Assistant"}
        aria-expanded={open}
        className="group flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white shadow-[0_12px_30px_rgba(20,24,32,0.45)] ring-1 ring-gold/50 transition hover:bg-navy-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-auto sm:w-auto sm:justify-start sm:gap-2 sm:py-2.5 sm:pl-3 sm:pr-4"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gold text-charcoal sm:h-8 sm:w-8">
          {open ? <X className="h-4 w-4" aria-hidden="true" /> : <MessageCircle className="h-4 w-4" aria-hidden="true" />}
          {!open && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-navy" />}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block font-heading text-[13px] font-semibold">IBEX Assistant</span>
          <span className="block text-[11px] text-white/60">Chat with us</span>
        </span>
      </button>
    </div>
  );
}
