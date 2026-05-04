"use client";

import { Clock, Mic, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReveal } from "@/hooks/use-reveal";

type Step = {
  num: string;
  title: string;
  body: string;
  meta: string;
  icon: React.ReactNode;
  numClass: string;
};

const STEPS: ReadonlyArray<Step> = [
  {
    num: "01",
    title: "Uncheatable English test.",
    body: "A 25-minute proctored assessment with face match, gaze tracking, and environment scan. Scores CEFR A1–C2 across fluency, grammar, pronunciation, and comprehension.",
    meta: "25 MIN · AUTO-SCORED",
    icon: <Clock className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />,
    numClass: "bg-ink text-paper",
  },
  {
    num: "02",
    title: "Two recorded AI interviews.",
    body: "Role-specific scenarios evaluated by our assessment model and flagged for human review. Anti-cheat monitors for coaching, scripting, and multi-person attempts.",
    meta: "45 MIN · AI + HUMAN",
    icon: <Mic className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />,
    numClass: "bg-lime text-ink",
  },
  {
    num: "03",
    title: "Human recruiter review.",
    body: "A senior recruiter reviews every interview tape, verifies two references by phone, and confirms ID + work history. Only then do they go live on the platform.",
    meta: "60–90 MIN · BY NAME",
    icon: <Users className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />,
    numClass: "bg-amber text-paper",
  },
];

export function Vetting() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="bg-paper border-line relative overflow-hidden border-y py-35"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(214, 242, 77, 0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(232, 118, 58, 0.05) 0%, transparent 40%)",
        }}
      />
      <Container className="relative z-[1]">
        <div className="reveal mx-auto mb-20 max-w-[760px] text-center">
          <Eyebrow className="mb-5 inline-flex">
            {"// How vetting works"}
          </Eyebrow>
          <h2 className="display mt-5 mb-4 text-[clamp(40px,6vw,72px)]">
            We reject <span className="serif-italic">94.3%</span>
            <br />
            of applicants.
          </h2>
          <p className="text-ink-soft text-lg">
            Every name on the platform cleared three gates — an uncheatable
            language test, two AI interviews, and a human recruiter review.
            This is the filter we&rsquo;d want if we were hiring.
          </p>
        </div>

        <div className="reveal-stagger relative mb-15 grid gap-6 lg:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute top-10 right-[12%] left-[12%] z-0 hidden h-0.5 lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--color-line) 0 8px, transparent 8px 16px)",
            }}
          />
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-cream border-line relative z-[1] rounded-lg border p-8 transition-transform hover:-translate-y-1"
            >
              <div
                className={`font-display mb-6 grid h-14 w-14 place-items-center rounded-full text-2xl font-medium ${step.numClass}`}
              >
                {step.num}
              </div>
              <h3 className="font-display mb-3 text-[26px] leading-[1.1] font-medium">
                {step.title}
              </h3>
              <p className="text-ink-soft mb-4.5 text-[15px] leading-[1.55]">
                {step.body}
              </p>
              <div className="border-line-soft text-ink-mute flex items-center gap-2 border-t pt-4 font-mono text-xs tracking-[0.06em] uppercase">
                {step.icon}
                {step.meta}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal bg-ink text-paper rounded-lg px-8 py-12 text-center">
          <div
            className="font-display text-lime mb-3 text-[clamp(64px,10vw,120px)] leading-none font-normal"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            5.7%
          </div>
          <div className="text-paper-mute mx-auto mb-6 max-w-[480px] text-lg">
            Approval rate this quarter. 3,842 applications reviewed — 218
            approved.
          </div>
          <a
            href="#"
            className="text-lime border-lime border-b pb-0.5 text-[15px] font-medium"
          >
            See the full vetting process →
          </a>
        </div>
      </Container>
    </section>
  );
}
