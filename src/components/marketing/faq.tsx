"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils/cn";

type Item = { q: string; a: string };

const ITEMS: ReadonlyArray<Item> = [
  {
    q: "What's your actual fee?",
    a: "10% of the hourly or monthly rate you pay the candidate. No markup on their rate, no ballooning service fees, no hidden premium tier. It's disclosed on every contract before you sign.",
  },
  {
    q: "How is your vetting actually uncheatable?",
    a: "The English test uses face match, gaze tracking, environment scan, and audio analysis. Interviews use the same anti-cheat stack plus coaching detection. Every tape is then reviewed by a human recruiter who verifies references by phone.",
  },
  {
    q: "How fast can I hire?",
    a: "Median time-to-hire is 4 days. You browse the pool, shortlist, interview on the platform, and the contract auto-generates the moment you say yes. No procurement cycle required.",
  },
  {
    q: "What if the hire doesn't work out?",
    a: "Within the first 14 days, we replace them free. After that, the 72-hour dispute process kicks in for any billed hours or deliverable issues. Escrow holds funds until both sides confirm.",
  },
  {
    q: "Where are candidates based?",
    a: "Forty-two countries and counting. Argentina, Philippines, Poland, Kenya, South Africa, Mexico, India, Vietnam, Portugal, Brazil — wherever the talent is. Every candidate meets the same vetting bar regardless of location.",
  },
  {
    q: "Is my money actually protected?",
    a: "Yes. You can fund escrow upfront (recommended) or run post-paid invoicing. Funds only release after the candidate logs hours and you have a 7-day adjustment window to flag anything. Disputes get a real human reviewer within 72 hours.",
  },
  {
    q: "Do I need to sign up to browse?",
    a: "No. Full profiles, bios, reviews, rates, scorecards, portfolios — all open. You only sign up when you want to watch a video intro, save a favorite, message, send a proposal, or book an interview.",
  },
];

export function Faq() {
  const ref = useReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-30">
      <Container>
        <div className="grid items-start gap-10 md:gap-20 lg:grid-cols-[1fr_1.5fr]">
          <div className="reveal">
            <Eyebrow className="mb-5">{"// Common questions"}</Eyebrow>
            <h2 className="display mt-5 mb-5 text-[clamp(40px,5vw,64px)] leading-none">
              Things
              <br />
              people ask.
            </h2>
            <p className="text-ink-soft mb-6 text-base">
              Still have questions? Drop us a note and we&rsquo;ll answer
              within a day — often within an hour.
            </p>
            <Button variant="outline">Contact us</Button>
          </div>

          <div className="reveal flex flex-col" style={{ transitionDelay: "0.1s" }}>
            {ITEMS.map((item, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={item.q}
                  className={cn(
                    "border-line border-b py-6",
                    i === 0 && "border-t",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="font-display flex w-full items-center justify-between gap-5 text-left text-[22px] leading-[1.3] font-medium"
                  >
                    <span>{item.q}</span>
                    <span
                      className={cn(
                        "border-line grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border transition-all duration-200",
                        open && "bg-ink text-paper border-ink rotate-45",
                      )}
                      aria-hidden="true"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "text-ink-soft max-w-[620px] overflow-hidden text-[15px] leading-[1.6] transition-[max-height,padding] duration-300",
                      open ? "max-h-96 pt-4" : "max-h-0",
                    )}
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
