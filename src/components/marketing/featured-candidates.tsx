"use client";

import { ArrowLeft, ArrowRight, Heart, Lock, Play, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReveal } from "@/hooks/use-reveal";

type Candidate = {
  name: string;
  role: string;
  flag: string;
  bg: string;
  tags: ReadonlyArray<string>;
  extraTags: ReadonlyArray<string>;
  rate: string;
  rating: string;
  reviews: number;
  ratingBreakdown: ReadonlyArray<{ label: string; value: number }>;
};

const CANDIDATES: ReadonlyArray<Candidate> = [
  {
    name: "Valentina C.",
    role: "Senior React Developer",
    flag: "CO",
    bg: "linear-gradient(135deg, #2b4a3e 0%, #5a8b73 100%)",
    tags: ["React", "TypeScript", "+4"],
    extraTags: ["Node.js", "Next.js", "GraphQL", "PostgreSQL"],
    rate: "$42",
    rating: "4.9",
    reviews: 34,
    ratingBreakdown: [
      { label: "Communication", value: 4.9 },
      { label: "Quality", value: 5.0 },
      { label: "On time", value: 4.8 },
    ],
  },
  {
    name: "Jomari D.",
    role: "Executive Assistant",
    flag: "PH",
    bg: "linear-gradient(135deg, #6b4e2b 0%, #c49560 100%)",
    tags: ["Calendar", "Notion", "+3"],
    extraTags: ["Slack", "Travel planning", "Inbox zero"],
    rate: "$14",
    rating: "5.0",
    reviews: 58,
    ratingBreakdown: [
      { label: "Communication", value: 5.0 },
      { label: "Quality", value: 5.0 },
      { label: "On time", value: 5.0 },
    ],
  },
  {
    name: "Kasia W.",
    role: "Product Designer",
    flag: "PL",
    bg: "linear-gradient(135deg, #3a2b4e 0%, #7a5a9c 100%)",
    tags: ["Figma", "UX Research", "+2"],
    extraTags: ["Webflow", "Framer", "Design Systems"],
    rate: "$48",
    rating: "4.9",
    reviews: 21,
    ratingBreakdown: [
      { label: "Communication", value: 4.9 },
      { label: "Quality", value: 5.0 },
      { label: "On time", value: 4.8 },
    ],
  },
  {
    name: "Rui F.",
    role: "Growth Marketer",
    flag: "PT",
    bg: "linear-gradient(135deg, #4a2b2b 0%, #a56060 100%)",
    tags: ["Paid Ads", "Analytics", "+3"],
    extraTags: ["SEO", "Email", "Lifecycle"],
    rate: "$35",
    rating: "4.8",
    reviews: 42,
    ratingBreakdown: [
      { label: "Communication", value: 4.7 },
      { label: "Quality", value: 4.9 },
      { label: "On time", value: 4.8 },
    ],
  },
  {
    name: "Diego H.",
    role: "Video Editor",
    flag: "MX",
    bg: "linear-gradient(135deg, #2b3a4e 0%, #5a7a9c 100%)",
    tags: ["Premiere", "After Effects", "+2"],
    extraTags: ["DaVinci", "Motion graphics", "Color grading"],
    rate: "$28",
    rating: "5.0",
    reviews: 29,
    ratingBreakdown: [
      { label: "Communication", value: 5.0 },
      { label: "Quality", value: 5.0 },
      { label: "On time", value: 5.0 },
    ],
  },
  {
    name: "Thandi M.",
    role: "Customer Success Lead",
    flag: "ZA",
    bg: "linear-gradient(135deg, #4a4a2b 0%, #a0a060 100%)",
    tags: ["Zendesk", "Intercom", "+3"],
    extraTags: ["HubSpot", "Onboarding", "Churn analysis"],
    rate: "$22",
    rating: "4.9",
    reviews: 67,
    ratingBreakdown: [
      { label: "Communication", value: 5.0 },
      { label: "Quality", value: 4.9 },
      { label: "On time", value: 4.8 },
    ],
  },
  {
    name: "Linh P.",
    role: "Backend Engineer",
    flag: "VN",
    bg: "linear-gradient(135deg, #2b4a4a 0%, #60a0a0 100%)",
    tags: ["Go", "Postgres", "+4"],
    extraTags: ["Kubernetes", "AWS", "Redis", "gRPC"],
    rate: "$38",
    rating: "4.9",
    reviews: 18,
    ratingBreakdown: [
      { label: "Communication", value: 4.8 },
      { label: "Quality", value: 5.0 },
      { label: "On time", value: 4.9 },
    ],
  },
  {
    name: "Fernanda L.",
    role: "Copywriter",
    flag: "BR",
    bg: "linear-gradient(135deg, #4a3a2b 0%, #a08060 100%)",
    tags: ["B2B SaaS", "Email", "+2"],
    extraTags: ["Landing pages", "Brand voice", "Editing"],
    rate: "$32",
    rating: "4.8",
    reviews: 24,
    ratingBreakdown: [
      { label: "Communication", value: 4.9 },
      { label: "Quality", value: 4.8 },
      { label: "On time", value: 4.7 },
    ],
  },
];

const SLIDE_INTERVAL_MS = 3000;
const CARDS_PER_SLIDE = 4;

export function FeaturedCandidates() {
  const ref = useReveal<HTMLElement>();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const totalSlides = Math.ceil(CANDIDATES.length / CARDS_PER_SLIDE);
  const isPaused = expandedIndex !== null;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % totalSlides);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  useEffect(() => {
    if (!carouselRef.current) return;
    const cardWidth = 300;
    const gap = 20;
    const scrollAmount = slideIndex * CARDS_PER_SLIDE * (cardWidth + gap);
    carouselRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, [slideIndex]);

  useEffect(() => {
    if (expandedIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setExpandedIndex(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedIndex]);

  function goToPrev() {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }
  function goToNext() {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  }

  return (
    <section ref={ref} className="py-30 relative">
      <Container>
        <div className="mb-18 grid items-end gap-16 md:grid-cols-[1fr_1.2fr]">
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
            proposals, and booking an interview require a free account.
          </p>
        </div>

        <div className="relative -mx-8 px-8">
          <div ref={carouselRef} className="flex gap-5 overflow-hidden pb-6">
            {CANDIDATES.map((c, i) => (
              <article
                key={c.name}
                onClick={() => setExpandedIndex(i)}
                className="bg-paper border-line flex w-[300px] flex-shrink-0 cursor-pointer flex-col rounded-lg border p-[18px] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="bg-cream-deep relative mb-4 aspect-[4/5] overflow-hidden rounded-md">
                  <div
                    className="grid h-full w-full place-items-center rounded-md"
                    style={{ background: c.bg }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/50" />
                    <button
                      type="button"
                      aria-label={"Play video intro for " + c.name}
                      className="bg-paper/95 relative z-[2] grid h-14 w-14 place-items-center rounded-full"
                      onClick={(e) => e.stopPropagation()}
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
                      {c.flag}
                    </div>
                  </div>
                </div>

                <div className="mb-1 flex items-start justify-between">
                  <div>
                    <div className="font-display text-xl leading-[1.1] font-medium">
                      {c.name}
                    </div>
                    <div className="font-mono text-ink-mute mt-1.5 text-[10px] tracking-[0.14em] uppercase">
                      {c.role}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={"Save " + c.name}
                    onClick={(e) => e.stopPropagation()}
                    className="text-ink-mute grid h-8 w-8 place-items-center rounded-full"
                  >
                    <Heart className="h-[18px] w-[18px]" strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-3 mb-3.5 flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
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
                    {c.rate}
                    <span className="text-ink-mute font-body text-xs">/hr</span>
                  </div>
                  <div className="flex items-center gap-1 text-[13px] font-medium">
                    <Star className="text-amber h-3 w-3 fill-current" aria-hidden="true" />
                    <span>{c.rating}</span>
                    <span className="text-ink-mute text-xs font-normal">
                      ({c.reviews})
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-body border-ink border-b pb-0.5 text-sm font-medium">
              Browse all 2,847 candidates
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous candidates"
                className="border-line bg-paper hover:bg-ink hover:text-paper hover:border-ink grid h-11 w-11 place-items-center rounded-full border transition-colors"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next candidates"
                className="border-line bg-paper hover:bg-ink hover:text-paper hover:border-ink grid h-11 w-11 place-items-center rounded-full border transition-colors"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </Container>

      {expandedIndex !== null && (
        <ExpandedCard
          candidate={CANDIDATES[expandedIndex]!}
          onClose={() => setExpandedIndex(null)}
        />
      )}
    </section>
  );
}

function ExpandedCard({
  candidate,
  onClose,
}: {
  candidate: Candidate;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 backdrop-blur-md p-6 pt-24 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-paper border-line w-full max-w-[720px] rounded-lg border p-6 shadow-lg"
      >
        <div className="bg-cream-deep relative mb-5 aspect-[3/2] overflow-hidden rounded-md">
          <div
            className="grid h-full w-full place-items-center rounded-md"
            style={{ background: candidate.bg }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/50" />
            <button
              type="button"
              className="bg-paper/95 relative z-[2] grid h-16 w-16 place-items-center rounded-full"
            >
              <Play className="text-ink h-5 w-5 fill-current" />
            </button>
            <div className="bg-ink/85 text-paper z-[2] absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.06em] backdrop-blur-md">
              <Lock className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden="true" />
              SIGN UP
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="font-display text-2xl font-medium leading-tight">
            {candidate.name}
          </div>
          <div className="font-mono text-ink-mute mt-1.5 text-[10px] tracking-[0.14em] uppercase">
            {candidate.role}
          </div>
        </div>

        <div className="border-line-soft mb-5 flex items-center justify-between border-y py-3">
          <div className="font-display text-2xl font-medium">
            {candidate.rate}
            <span className="text-ink-mute font-body text-sm">/hr</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <Star className="text-amber h-4 w-4 fill-current" aria-hidden="true" />
            <span>{candidate.rating}</span>
            <span className="text-ink-mute text-xs font-normal">
              ({candidate.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="mb-5">
          <div className="font-mono text-ink-mute mb-2 text-[10px] tracking-[0.14em] uppercase">
            Skills
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.tags.map((t) => (
              <span
                key={t}
                className="bg-cream text-ink-soft rounded-full px-2.5 py-1 text-[12px]"
              >
                {t}
              </span>
            ))}
            {candidate.extraTags.map((t) => (
              <span
                key={t}
                className="bg-cream-deep text-ink-mute select-none rounded-full px-2.5 py-1 text-[12px] blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <div className="font-mono text-ink-mute mb-2 text-[10px] tracking-[0.14em] uppercase">
            Rating breakdown
          </div>
          <div className="flex flex-col gap-2 blur-sm select-none">
            {candidate.ratingBreakdown.map((r) => (
              <div key={r.label} className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">{r.label}</span>
                <span className="flex items-center gap-1">
                  <Star className="text-amber h-3 w-3 fill-current" aria-hidden="true" />
                  <span className="font-medium">{r.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="font-mono text-ink-mute mb-2 text-[10px] tracking-[0.14em] uppercase">
            Sample work
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-cream-deep aspect-square rounded-md blur-md"
                style={{ background: candidate.bg, opacity: 0.4 }}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="bg-cream-deep text-ink border-line hover:bg-line hover:scale-[1.02] flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3.5 font-mono text-[12px] font-bold tracking-[0.14em] uppercase transition-all"
        >
          <Lock className="h-4 w-4" strokeWidth={2.5} />
          Sign up to view full profile
        </button>
      </div>
    </div>
  );
}