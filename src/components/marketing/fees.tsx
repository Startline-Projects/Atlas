"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReveal } from "@/hooks/use-reveal";

type FeeBar = {
  label: string;
  pct: string;
  width: number;
  highlighted?: boolean;
};

const BARS: ReadonlyArray<FeeBar> = [
  { label: "Atlas", pct: "10%", width: 25, highlighted: true },
  { label: "Upwork", pct: "20%", width: 50 },
  { label: "Fiverr", pct: "20%", width: 50 },
  { label: "Toptal", pct: "~50%", width: 85 },
];

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export function Fees() {
  const ref = useReveal<HTMLElement>();
  const [rate, setRate] = useState(40);
  const [hours, setHours] = useState(40);
  const yearlySaving = rate * hours * 52 * 0.1; // 10% delta vs Upwork

  return (
    <section ref={ref} className="bg-ink text-paper py-30">
      <Container>
        <div className="reveal mb-18 grid items-end gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow className="text-lime mb-4">
              {"// Pricing that isn’t a markup"}
            </Eyebrow>
            <h2 className="display text-[clamp(36px,5vw,64px)] leading-none">
              Half the fees.
              <br />
              <span className="serif-italic">None</span> of the guesswork.
            </h2>
          </div>
          <p className="text-paper-mute max-w-[520px] text-[17px] leading-[1.55]">
            Upwork and Fiverr quietly take 20%+. Toptal buries their margin in
            opaque client bill-rates. We charge a flat 10% — disclosed upfront,
            visible in every contract.
          </p>
        </div>

        <div className="grid items-start gap-20 md:grid-cols-2">
          <div className="reveal-stagger flex flex-col gap-5">
            {BARS.map((bar) => (
              <div
                key={bar.label}
                className="grid grid-cols-[100px_1fr_60px] items-center gap-3 md:grid-cols-[140px_1fr_80px] md:gap-5"
              >
                <div
                  className={[
                    "font-display text-[17px] font-medium md:text-[22px]",
                    bar.highlighted ? "text-lime font-semibold" : "",
                  ].join(" ")}
                >
                  {bar.label}
                </div>
                <div className="bg-ink-deep relative h-12 overflow-hidden rounded-sm">
                  <div
                    className={[
                      "flex h-full items-center justify-end rounded-sm pr-3.5 transition-[width] duration-1000",
                      bar.highlighted
                        ? "from-lime to-lime-deep bg-gradient-to-r"
                        : "bg-gradient-to-r from-[#333] to-[#444]",
                    ].join(" ")}
                    style={{ width: `${bar.width}%` }}
                  />
                </div>
                <div className="font-display text-2xl font-medium">
                  {bar.pct}
                </div>
              </div>
            ))}
          </div>

          <div
            className="reveal bg-ink-deep border-ink-line rounded-lg border p-9"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="font-display mb-7 text-[28px] leading-[1.1]">
              See what you&rsquo;d save in a year.
            </div>

            <div className="mb-7">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-paper/60 font-mono text-[11px] tracking-[0.12em] uppercase">
                  Hire rate / hour
                </span>
                <span className="font-display text-[22px] font-medium">
                  ${rate}
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={120}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="atlas-range w-full"
                aria-label="Hire rate per hour"
              />
            </div>

            <div className="mb-7">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-paper/60 font-mono text-[11px] tracking-[0.12em] uppercase">
                  Hours per week
                </span>
                <span className="font-display text-[22px] font-medium">
                  {hours}
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="atlas-range w-full"
                aria-label="Hours per week"
              />
            </div>

            <div className="bg-ink border-lime relative mt-8 rounded-md border p-6">
              <span className="bg-ink text-lime absolute -top-2.5 left-5 px-2 font-mono text-[10px] tracking-[0.14em]">
                SAVINGS
              </span>
              <div className="font-display text-lime mb-1.5 text-[52px] leading-none font-normal">
                {formatCurrency(Math.round(yearlySaving))}
              </div>
              <div className="text-paper/60 text-[13px]">
                saved per year vs Upwork (20% fee difference)
              </div>
            </div>

            <Button
              variant="lime"
              size="lg"
              className="mt-6 w-full justify-center"
            >
              Browse Talent
              <ArrowRight
                className="h-3.5 w-3.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
