"use client";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReveal } from "@/hooks/use-reveal";

type Testimonial = {
  quote: string;
  initials: string;
  bg: string;
  name: string;
  company: string;
};

const TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    quote:
      "We filled a senior React role in four days. The shortlist they sent had three candidates and we hired the first one we interviewed. She's still with us 14 months later.",
    initials: "SK",
    bg: "linear-gradient(135deg, #FFD6A5, #FFA07A)",
    name: "Sarah K.",
    company: "Head of Engineering · Mint Labs",
  },
  {
    quote:
      "I'd used Upwork for five years and always wasted a week sifting candidates. Atlas does that week for you. The first three profiles I opened were all hireable.",
    initials: "MT",
    bg: "linear-gradient(135deg, #D6F24D, #A8D821)",
    name: "Marcus T.",
    company: "Founder · Arcline",
  },
  {
    quote:
      "The 10% fee is real. No hidden markup on the hourly. No ballooning service fees. What they quote is what we pay.",
    initials: "AR",
    bg: "linear-gradient(135deg, #A8C8FF, #6A8EFF)",
    name: "Ana R.",
    company: "COO · Ferry Logistics",
  },
];

export function Testimonials() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-cream-deep py-30">
      <Container>
        <div className="reveal grid items-end gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow className="mb-4">{"// What clients say"}</Eyebrow>
            <h2 className="display text-[clamp(36px,5vw,64px)] leading-none">
              Hires who
              <br />
              <span className="serif-italic">stayed.</span>
            </h2>
          </div>
          <p className="text-ink-mute max-w-[520px] text-[17px] leading-[1.55]">
            We care less about first-month reviews than about the people still
            working together a year in. Here&rsquo;s a sample.
          </p>
        </div>

        <div className="reveal-stagger mt-15 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const dark = i === 1;
            return (
              <div
                key={t.name}
                className={[
                  "flex flex-col rounded-lg border p-8",
                  dark
                    ? "bg-ink text-paper border-ink"
                    : "bg-paper border-line",
                ].join(" ")}
              >
                <div className="text-amber mb-5 flex gap-0.5" aria-hidden="true">
                  ★★★★★
                </div>
                <div className="font-display mb-6 flex-1 text-xl leading-[1.35]">
                  &ldquo;{t.quote}&rdquo;
                </div>
                <div
                  className={[
                    "flex items-center gap-3.5 border-t pt-5",
                    dark ? "border-paper/20" : "border-line",
                  ].join(" ")}
                >
                  <div
                    aria-hidden="true"
                    className="font-display text-ink grid h-11 w-11 flex-shrink-0 place-items-center rounded-full font-medium"
                    style={{ background: t.bg }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold">{t.name}</div>
                    <div
                      className={[
                        "text-[13px]",
                        dark ? "text-paper/60" : "text-ink-mute",
                      ].join(" ")}
                    >
                      {t.company}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="font-body border-ink border-b pb-0.5 text-sm font-medium"
          >
            Read more success stories →
          </a>
        </div>
      </Container>
    </section>
  );
}
