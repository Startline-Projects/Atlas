"use client";

import { ArrowRight, DollarSign, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReveal } from "@/hooks/use-reveal";

const BENEFITS = [
  {
    icon: DollarSign,
    title: "0% fees, forever",
    sub: "Keep 100% of your hourly rate. Clients pay the 10%.",
  },
  {
    icon: Globe,
    title: "US / UK / AU / CA clients",
    sub: "Serious companies with budgets who hire, not bargain.",
  },
  {
    icon: Users,
    title: "Assigned recruiter support",
    sub: "A real human on your side when things get messy.",
  },
] as const;

export function CandidateCta() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-30">
      <Container>
        <div className="reveal bg-ink text-paper relative grid items-center gap-10 overflow-hidden rounded-[28px] px-8 py-14 md:gap-16 md:px-16 md:py-20 lg:grid-cols-[1.2fr_1fr]">
          <div
            aria-hidden="true"
            className="bg-lime pointer-events-none absolute -top-1/2 -right-1/10 h-[160%] w-3/5 opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-lime) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-[1]">
            <Eyebrow className="text-lime mb-4">
              {"// For candidates"}
            </Eyebrow>
            <h2 className="display mt-5 mb-5 text-[clamp(40px,5vw,64px)] leading-none">
              Are you an
              <br />
              <span className="text-lime italic">A-player?</span>
              <br />
              Apply to join.
            </h2>
            <p className="text-paper-mute mb-8 max-w-[460px] text-[17px]">
              We&rsquo;re picky — 5.7% approval rate — but once you&rsquo;re
              in, you work with US, UK, AU, and CA clients who pay full rate.
              No platform fees, ever.
            </p>
            <Button variant="lime" size="lg">
              Apply to Join
              <ArrowRight
                className="h-3.5 w-3.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </Button>
          </div>

          <div className="relative z-[1] flex flex-col gap-4">
            {BENEFITS.map(({ icon: Icon, title, sub }) => (
              <div
                key={title}
                className="bg-ink-deep border-ink-line flex items-start gap-3.5 rounded-md border p-5"
              >
                <div className="bg-lime text-ink grid h-9 w-9 flex-shrink-0 place-items-center rounded-full">
                  <Icon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <div>
                  <div className="mb-0.5 text-[15px] font-semibold">{title}</div>
                  <div className="text-paper/60 text-[13px]">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
