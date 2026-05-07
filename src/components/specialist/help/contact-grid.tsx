/**
 * Contact grid — 3 cards (chat-featured / email / office hours).
 *
 * The featured card (chat) gets a slightly different visual treatment:
 * lime-tinted left edge + uppercase mono caption "PRIORITY LANE ·
 * ATLAS STAFF ONLY". Other 2 cards are equal weight.
 *
 * Each card has icon + title + caption + CTA + status row at the bottom.
 *
 * Server Component.
 */

import {
  Calendar,
  Mail,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import {
  contactCards,
  type ContactCard,
  type ContactCardKind,
} from "@/lib/mock-data/specialist/help";
import { cn } from "@/lib/utils/cn";

const ICON_BY_KIND: Record<ContactCardKind, LucideIcon> = {
  chat: MessageSquare,
  email: Mail,
  "office-hours": Calendar,
};

const STATUS_DOT_TONE: Record<ContactCardKind, string> = {
  chat: "bg-success",
  email: "bg-amber",
  "office-hours": "bg-lime-deep",
};

export function ContactGrid() {
  return (
    <section>
      <header className="mb-3.5">
        <div className="mb-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-ink-mute">
          Talk to a human
        </div>
        <h2
          className="font-display m-0 text-[22px] font-medium tracking-[-0.015em] text-ink"
          style={{ fontVariationSettings: '"opsz" 96' }}
        >
          Still need help?
        </h2>
      </header>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 max-lg:grid-cols-1">
        {contactCards.map((card) => (
          <ContactCardItem key={card.key} card={card} />
        ))}
      </div>
    </section>
  );
}

function ContactCardItem({ card }: { card: ContactCard }) {
  const Icon = ICON_BY_KIND[card.key];
  return (
    <article
      className={cn(
        "bg-paper border-line flex flex-col gap-3 rounded-xl border px-5 py-5",
        card.featured && "border-l-[3px] border-l-lime-deep bg-lime/[0.04]",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className={cn(
            "grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg",
            card.featured ? "bg-lime/15 text-lime-deep" : "bg-cream-deep text-ink-soft",
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="font-display text-[16px] font-medium leading-tight text-ink"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            {card.title}
          </div>
          <div className="mt-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-ink-mute">
            {card.caption}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={cn(
          "rounded-lg px-3.5 py-2 font-body text-[12.5px] font-medium transition-colors",
          card.featured
            ? "bg-ink text-paper hover:bg-ink-soft"
            : "border-line bg-cream-deep text-ink-soft hover:bg-paper hover:text-ink border",
        )}
      >
        {card.ctaLabel}
      </button>
      <div className="border-line-soft flex items-center gap-1.5 border-t pt-2.5 font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT_TONE[card.key])}
        />
        <span>{card.statusLabel}</span>
      </div>
    </article>
  );
}
