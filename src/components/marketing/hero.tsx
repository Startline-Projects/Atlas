"use client";

import { Check, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useReveal } from "@/hooks/use-reveal";

type CardData = {
  initials: string;
  bg: string;
  name: string;
  role: string;
  flag: string;
  tags: ReadonlyArray<string>;
  rate: string;
  english: string;
  rehire: string;
};

const HERO_CARDS: ReadonlyArray<CardData> = [
  {
    initials: "MG",
    bg: "linear-gradient(135deg, #FFD6A5, #FFA07A)",
    name: "Maria G.",
    role: "Full-stack Dev · 🇦🇷 Argentina",
    flag: "🇦🇷",
    tags: ["React", "Node", "AWS"],
    rate: "$38/hr",
    english: "C2",
    rehire: "98%",
  },
  {
    initials: "JO",
    bg: "linear-gradient(135deg, #D6F24D, #A8D821)",
    name: "James O.",
    role: "Brand Designer · 🇰🇪 Kenya",
    flag: "🇰🇪",
    tags: ["Figma", "Webflow", "Identity"],
    rate: "$42/hr",
    english: "C1",
    rehire: "100%",
  },
  {
    initials: "PR",
    bg: "linear-gradient(135deg, #A8C8FF, #6A8EFF)",
    name: "Priya R.",
    role: "Growth Marketer · 🇮🇳 India",
    flag: "🇮🇳",
    tags: ["SEO", "Paid Ads", "HubSpot"],
    rate: "$28/hr",
    english: "C2",
    rehire: "96%",
  },
];

const ROLE_OPTIONS = [
  "Any role",
  "Developer",
  "Designer",
  "Marketer",
  "Virtual Assistant",
  "Customer Support",
  "Video Editor",
  "Accountant",
];

function HeroCard({
  card,
  variant,
  className,
}: {
  card: CardData;
  variant: 1 | 2 | 3;
  className: string;
}) {
  const dark = variant === 2;
  return (
    <div
      className={[
        "absolute rounded-lg p-5 shadow-lg",
        dark ? "bg-ink border-ink text-paper" : "bg-paper border-line",
        "border",
        className,
      ].join(" ")}
    >
      <div className="mb-3.5 flex items-center gap-3">
        <div
          aria-hidden="true"
          className="font-display text-ink grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-[17px] font-medium"
          style={{ background: card.bg }}
        >
          {card.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={[
              "flex items-center gap-1.5 text-[15px] font-semibold",
              dark ? "text-paper" : "",
            ].join(" ")}
          >
            {card.name}
            <span
              aria-label="Verified"
              className="bg-lime text-ink grid h-3.5 w-3.5 flex-shrink-0 place-items-center rounded-full"
            >
              <Check className="h-2 w-2" strokeWidth={4} aria-hidden="true" />
            </span>
          </div>
          <div
            className={[
              "text-xs",
              dark ? "text-paper/60" : "text-ink-mute",
            ].join(" ")}
          >
            {card.role}
          </div>
        </div>
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className={[
              "rounded-full border px-2 py-0.5 text-[11px]",
              dark
                ? "border-paper/20 text-paper/85"
                : "border-line text-ink-soft",
            ].join(" ")}
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        className={[
          "flex justify-between border-t pt-3 text-xs",
          dark ? "border-paper/20" : "border-line-soft",
        ].join(" ")}
      >
        <div>
          <div className="font-semibold">{card.rate}</div>
          <div
            className={[
              "text-[11px]",
              dark ? "text-paper/60" : "text-ink-mute",
            ].join(" ")}
          >
            Rate
          </div>
        </div>
        <div>
          <div className="font-semibold">{card.english}</div>
          <div
            className={[
              "text-[11px]",
              dark ? "text-paper/60" : "text-ink-mute",
            ].join(" ")}
          >
            English
          </div>
        </div>
        <div>
          <div className="font-semibold">{card.rehire}</div>
          <div
            className={[
              "text-[11px]",
              dark ? "text-paper/60" : "text-ink-mute",
            ].join(" ")}
          >
            Rehire
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden pt-18 pb-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div className="reveal">
            <div className="bg-paper border-line text-ink-soft mb-7 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-3.5 pl-1.5 text-[13px]">
              <span
                className="bg-lime grid h-5.5 w-5.5 place-items-center rounded-full"
                aria-hidden="true"
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              Pre-vetted. Human-reviewed. A-players only.
            </div>

            <h1 className="display mb-6 text-[clamp(48px,7vw,92px)]">
              Hire <span className="serif-italic text-ink">pre-vetted</span>
              <br />
              global A-players.
              <br />
              <span className="underline-accent">Browse</span> before
              <br />
              signing up.
            </h1>

            <p className="text-ink-soft mb-10 max-w-[540px] text-[19px] leading-[1.55]">
              Every candidate passes an{" "}
              <strong className="text-ink font-semibold">
                uncheatable English test
              </strong>
              , two recorded AI interviews, and{" "}
              <strong className="text-ink font-semibold">human review</strong>{" "}
              by our recruiters. Explore the full pool. Signup only when
              you&rsquo;re ready to act.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="bg-paper border-line shadow-md mb-5 flex max-w-[620px] items-center gap-1 rounded-xl border p-2"
              role="search"
              aria-label="Search candidates"
            >
              <label className="flex min-w-0 flex-1 flex-col px-4 py-3">
                <span className="text-ink-mute mb-0.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                  Role category
                </span>
                <select
                  defaultValue="Any role"
                  className="text-ink w-full appearance-none bg-transparent text-sm font-medium outline-none"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label className="border-line-soft flex min-w-0 flex-1 flex-col border-l px-4 py-3">
                <span className="text-ink-mute mb-0.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                  Core skills
                </span>
                <input
                  type="text"
                  placeholder="React, Figma, GA4…"
                  className="text-ink w-full bg-transparent text-sm font-medium outline-none"
                />
              </label>
              <label className="border-line-soft flex min-w-0 flex-1 flex-col border-l px-4 py-3">
                <span className="text-ink-mute mb-0.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                  Budget / mo
                </span>
                <input
                  type="text"
                  placeholder="$1,500 – $4,000"
                  className="text-ink w-full bg-transparent text-sm font-medium outline-none"
                />
              </label>
              <button
                type="submit"
                aria-label="Search"
                className="bg-ink text-paper grid h-12 w-12 flex-shrink-0 place-items-center rounded-full transition-colors hover:bg-black"
              >
                <Search
                  className="h-[18px] w-[18px]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </form>

            <p className="text-ink-mute mb-12 text-sm">
              Looking for work instead?{" "}
              <a
                href="#"
                className="text-ink hover:text-amber hover:border-amber border-ink border-b pb-px font-medium"
              >
                Apply to join the pool →
              </a>
            </p>

            <div className="border-line flex flex-wrap gap-10 border-t pt-7">
              <div className="flex flex-col gap-1">
                <div className="font-display flex items-baseline gap-1.5 text-4xl leading-none font-medium">
                  <span
                    aria-hidden="true"
                    className="bg-amber mr-1 inline-block h-2 w-2 animate-pulse rounded-full"
                  />
                  218
                </div>
                <div className="text-ink-mute font-mono text-[11px] tracking-[0.1em] uppercase">
                  Approved this month
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-display text-4xl leading-none font-medium">
                  3,842
                </div>
                <div className="text-ink-mute font-mono text-[11px] tracking-[0.1em] uppercase">
                  Applied this month
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-display text-4xl leading-none font-medium">
                  5.7%
                </div>
                <div className="text-ink-mute font-mono text-[11px] tracking-[0.1em] uppercase">
                  Approval rate
                </div>
              </div>
            </div>
          </div>

          <div
            className="reveal relative mx-auto aspect-[4/5] w-full max-w-[440px] lg:max-w-none lg:aspect-[4/5] lg:max-h-[640px]"
            style={{ transitionDelay: "0.15s" }}
          >
            {HERO_CARDS[0] ? (
              <HeroCard
                card={HERO_CARDS[0]}
                variant={1}
                className="top-0 right-[20%] left-0 -rotate-2"
              />
            ) : null}
            {HERO_CARDS[1] ? (
              <HeroCard
                card={HERO_CARDS[1]}
                variant={2}
                className="top-[32%] right-0 left-[24%] rotate-2"
              />
            ) : null}
            {HERO_CARDS[2] ? (
              <HeroCard
                card={HERO_CARDS[2]}
                variant={3}
                className="right-[8%] bottom-0 left-[8%] -rotate-1"
              />
            ) : null}
            <div
              className="bg-lime text-ink shadow-sm absolute top-[18%] -right-2.5 rotate-[8deg] rounded-full px-3.5 py-2 font-mono text-xs font-semibold tracking-[0.04em]"
              aria-hidden="true"
            >
              10% flat fee
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
