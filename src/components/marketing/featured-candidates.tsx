"use client";

import { ArrowLeft, ArrowRight, Heart, Lock, Play } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReveal } from "@/hooks/use-reveal";

type Candidate = {
  name: string;
  role: string;
  flag: string;
  bg: string;
  tags: ReadonlyArray<string>;
  rate: string;
  rating: string;
  reviews: number;
};

const CANDIDATES: ReadonlyArray<Candidate> = [
  {
    name: "Valentina C.",
    role: "Senior React Developer",
    flag: "🇨🇴",
    bg: "linear-gradient(135deg, #2b4a3e 0%, #5a8b73 100%)",
    tags: ["React", "TypeScript", "+4"],
    rate: "$42",
    rating: "4.9",
    reviews: 34,
  },
  {
    name: "Jomari D.",
    role: "Executive Assistant",
    flag: "🇵🇭",
    bg: "linear-gradient(135deg, #6b4e2b 0%, #c49560 100%)",
    tags: ["Calendar", "Notion", "+3"],
    rate: "$14",
    rating: "5.0",
    reviews: 58,
  },
  {
    name: "Kasia W.",
    role: "Product Designer",
    flag: "🇵🇱",
    bg: "linear-gradient(135deg, #3a2b4e 0%, #7a5a9c 100%)",
    tags: ["Figma", "UX Research", "+2"],
    rate: "$48",
    rating: "4.9",
    reviews: 21,
  },
  {
    name: "Rui F.",
    role: "Growth Marketer",
    flag: "🇵🇹",
    bg: "linear-gradient(135deg, #4a2b2b 0%, #a56060 100%)",
    tags: ["Paid Ads", "Analytics", "+3"],
    rate: "$35",
    rating: "4.8",
    reviews: 42,
  },
  {
    name: "Diego H.",
    role: "Video Editor",
    flag: "🇲🇽",
    bg: "linear-gradient(135deg, #2b3a4e 0%, #5a7a9c 100%)",
    tags: ["Premiere", "After Effects", "+2"],
    rate: "$28",
    rating: "5.0",
    reviews: 29,
  },
  {
    name: "Thandi M.",
    role: "Customer Success Lead",
    flag: "🇿🇦",
    bg: "linear-gradient(135deg, #4a4a2b 0%, #a0a060 100%)",
    tags: ["Zendesk", "Intercom", "+3"],
    rate: "$22",
    rating: "4.9",
    reviews: 67,
  },
  {
    name: "Linh P.",
    role: "Backend Engineer",
    flag: "🇻🇳",
    bg: "linear-gradient(135deg, #2b4a4a 0%, #60a0a0 100%)",
    tags: ["Go", "Postgres", "+4"],
    rate: "$38",
    rating: "4.9",
    reviews: 18,
  },
  {
    name: "Fernanda L.",
    role: "Copywriter",
    flag: "🇧🇷",
    bg: "linear-gradient(135deg, #4a3a2b 0%, #a08060 100%)",
    tags: ["B2B SaaS", "Email", "+2"],
    rate: "$32",
    rating: "4.8",
    reviews: 24,
  },
];

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <article className="bg-paper border-line hover:border-ink hover:shadow-md flex w-[300px] flex-shrink-0 cursor-pointer snap-start flex-col rounded-lg border p-[18px] transition-all duration-200 hover:-translate-y-1">
      <div className="bg-cream-deep relative mb-4 aspect-[4/5] overflow-hidden rounded-md">
        <div
          className="grid h-full w-full place-items-center"
          style={{ background: candidate.bg }}
        >
          <div className="bg-gradient-to-b from-transparent from-40% to-black/50 absolute inset-0" />
          <button
            type="button"
            aria-label={`Play video intro for ${candidate.name}`}
            className="bg-paper/95 group-hover:scale-108 relative z-[2] grid h-14 w-14 place-items-center rounded-full transition-transform"
          >
            <Play className="text-ink h-[18px] w-[18px] fill-current" />
          </button>
          <div className="bg-ink/85 text-paper z-[2] absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.06em] backdrop-blur-md">
            <Lock className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
            SIGN UP
          </div>
          <div
            className="z-[2] absolute bottom-3 left-3 text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            aria-hidden="true"
          >
            {candidate.flag}
          </div>
        </div>
      </div>

      <div className="mb-1 flex items-start justify-between">
        <div>
          <div className="font-display text-xl leading-[1.1] font-medium">
            {candidate.name}
          </div>
          <div className="text-ink-mute mt-0.5 text-[13px]">
            {candidate.role}
          </div>
        </div>
        <button
          type="button"
          aria-label={`Save ${candidate.name}`}
          className="text-ink-mute hover:text-danger hover:bg-cream-deep grid h-8 w-8 place-items-center rounded-full transition-colors"
        >
          <Heart className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
      </div>

      <div className="mt-3 mb-3.5 flex flex-wrap gap-2">
        {candidate.tags.map((tag) => (
          <span
            key={tag}
            className="bg-cream text-ink-soft rounded-full px-2.5 py-1 text-[11px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="border-line-soft mt-auto flex items-center justify-between border-t pt-3.5">
        <div className="font-display text-lg font-medium">
          {candidate.rate}
          <span className="text-ink-mute font-body text-xs">/hr</span>
        </div>
        <div className="flex items-center gap-1 text-[13px] font-medium">
          <span className="text-amber" aria-hidden="true">
            ★
          </span>
          <span>{candidate.rating}</span>
          <span className="text-ink-mute text-xs font-normal">
            ({candidate.reviews})
          </span>
        </div>
      </div>
    </article>
  );
}

export function FeaturedCandidates() {
  const ref = useReveal<HTMLElement>();
  const carouselRef = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  }

  return (
    <section ref={ref} className="py-30">
      <Container>
        <div className="reveal mb-18 grid items-end gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow className="mb-4">{"// Featured this week"}</Eyebrow>
            <h2 className="display text-[clamp(36px,5vw,64px)] leading-none">
              Meet a few of
              <br />
              our <span className="serif-italic">A-players</span>.
            </h2>
          </div>
          <p className="text-ink-mute max-w-[520px] text-[17px] leading-[1.55]">
            Click any card for the full profile. Video intros, messaging,
            proposals, and booking an interview require a free account —
            everything else stays open.
          </p>
        </div>

        <div className="relative -mx-8 px-8">
          <div
            ref={carouselRef}
            className="reveal-stagger flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
          >
            {CANDIDATES.map((c) => (
              <CandidateCard key={c.name} candidate={c} />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <a
              href="#"
              className="font-body border-ink border-b pb-0.5 text-sm font-medium"
            >
              Browse all 2,847 candidates →
            </a>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous candidates"
                className="border-line bg-paper hover:bg-ink hover:text-paper hover:border-ink grid h-11 w-11 place-items-center rounded-full border transition-colors"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next candidates"
                className="border-line bg-paper hover:bg-ink hover:text-paper hover:border-ink grid h-11 w-11 place-items-center rounded-full border transition-colors"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
