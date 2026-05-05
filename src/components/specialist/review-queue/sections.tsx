/**
 * All review-queue section components — grouped in one file because each
 * is small and they're tightly coupled to the same `ReviewQueueCandidate`
 * shape. Sections receive only the data they need; no global state.
 */
import { Check, FileText, Lock, Play, Star } from "lucide-react";
import { IvCard } from "@/components/specialist/queue-shared/iv-card";
import { IdentityGrid } from "@/components/specialist/queue-shared/identity-grid";
import { NotesCard } from "@/components/specialist/queue-shared/notes-card";
import { RefList } from "@/components/specialist/queue-shared/ref-list";
import { SectionFrame } from "@/components/specialist/queue-shared/section-frame";
import type {
  InterviewBlock,
  IntroVideo,
  ProfileBlock,
  ReviewQueueCandidate,
  WorkSample,
} from "@/lib/mock-data/specialist/review-queue";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Overview
   ============================================================ */

export function OverviewSection({ c }: { c: ReviewQueueCandidate }) {
  return (
    <SectionFrame
      id="rs-overview"
      num="01"
      title="Overview"
      status={{ label: `AI: ${c.aiRecommendation}`, tone: "success" }}
    >
      <IvCard data={c.overview} />
    </SectionFrame>
  );
}

/* ============================================================
   Interview 1 / 2
   ============================================================ */

export function InterviewSection({
  c,
  which,
  num,
}: {
  c: ReviewQueueCandidate;
  which: "interview1" | "interview2";
  num: string;
}) {
  const block: InterviewBlock = c[which];
  return (
    <SectionFrame
      id={which === "interview1" ? "rs-interview-1" : "rs-interview-2"}
      num={num}
      title={block.title}
      meta={<span>{block.durationLabel}</span>}
      status={{
        label: block.passed ? "Passed" : "Flagged",
        tone: block.passed ? "success" : "warn",
      }}
    >
      <IvCard data={block.card} />
    </SectionFrame>
  );
}

/* ============================================================
   Profile
   ============================================================ */

export function ProfileSection({ c }: { c: ReviewQueueCandidate }) {
  const p: ProfileBlock = c.profile;
  return (
    <SectionFrame
      id="rs-profile"
      num="04"
      title="Profile"
      meta={<span>Last edited: {p.lastEditedLabel}</span>}
      status={{ label: "Editable post-approval", tone: "neutral" }}
    >
      <div className="bg-paper border-line shadow-sm rounded-md border p-5 sm:p-6">
        <div className="grid gap-6 sm:grid-cols-[140px_minmax(0,1fr)]">
          <div className="font-display text-paper grid h-32 w-32 place-items-center rounded-md bg-gradient-to-br from-[#FFD6A5] to-[#FFA07A] text-[60px] font-medium">
            {c.initials}
          </div>
          <div>
            <p className="text-ink-soft mb-4 text-[14px] leading-[1.6]">
              {p.bio}
            </p>

            <div className="mb-4">
              <strong className="text-ink-mute mb-1.5 block font-mono text-[10px] tracking-[0.16em] uppercase">
                Specializations
              </strong>
              <div className="flex flex-wrap gap-1.5">
                {p.skills.map((s) => (
                  <span
                    key={s}
                    className="bg-cream-deep text-ink-soft rounded-full px-2.5 py-1 text-[11.5px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <ProfileAttr label="Years of experience">
              {p.yearsExperience} years
            </ProfileAttr>
            <ProfileAttr label="Languages">{p.languages}</ProfileAttr>
            <ProfileAttr label="Hourly rate">{p.hourlyRate}</ProfileAttr>
            <ProfileAttr label="Availability">{p.availability}</ProfileAttr>
          </div>
        </div>

        {p.certs.length > 0 ? (
          <div className="border-line-soft mt-5 flex flex-col gap-3 border-t pt-5">
            {p.certs.map((cert, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  aria-hidden="true"
                  className="bg-cream-deep text-ink mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full"
                >
                  {cert.icon === "trust" ? (
                    <Star className="h-3 w-3 fill-current" strokeWidth={1.5} />
                  ) : (
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  )}
                </div>
                <div>
                  <div className="text-ink mb-0.5 text-[13.5px] font-semibold">
                    {cert.name}
                  </div>
                  <div className="text-ink-mute text-[12.5px]">
                    {cert.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </SectionFrame>
  );
}

function ProfileAttr({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line-soft border-t py-2 first:border-t-0 first:pt-0 last:pb-0">
      <strong className="text-ink mr-2 text-[13px] font-semibold">{label}</strong>
      <span className="text-ink-soft text-[13px]">{children}</span>
    </div>
  );
}

/* ============================================================
   Intro video
   ============================================================ */

export function IntroVideoSection({ c }: { c: ReviewQueueCandidate }) {
  const v: IntroVideo = c.introVideo;
  return (
    <SectionFrame
      id="rs-video"
      num="05"
      title="Intro video"
      meta={
        <span>
          {v.durationSeconds} sec · {v.recordedLabel}
        </span>
      }
      status={{ label: v.scoreLabel, tone: "success" }}
    >
      <div className="bg-paper border-line shadow-sm overflow-hidden rounded-md border">
        <button
          type="button"
          aria-label={`Play intro video for ${c.fullName}`}
          className="bg-ink relative grid h-72 w-full place-items-center transition-transform hover:scale-[1.005]"
          style={{
            backgroundImage: "linear-gradient(135deg, #1f2937, #2b2a26)",
          }}
        >
          <span className="bg-paper text-ink grid h-14 w-14 place-items-center rounded-full">
            <Play className="h-5 w-5 fill-current" strokeWidth={1.5} aria-hidden="true" />
          </span>
        </button>
        <div className="border-line-soft text-ink-mute flex items-center justify-between border-t px-4 py-2.5 text-[12px]">
          <span>
            {c.fullName} · 0:00 – {Math.floor(v.durationSeconds / 60)}:
            {(v.durationSeconds % 60).toString().padStart(2, "0")}
          </span>
          <span className="font-mono text-[11px] tracking-[0.04em]">
            {v.durationSeconds} sec
          </span>
        </div>
        <div className="border-line-soft flex items-start justify-between gap-4 border-t px-4 py-3">
          <p className="text-ink-soft text-[13.5px] italic leading-[1.55]">
            {v.transcriptOpener}
          </p>
          <button
            type="button"
            className="border-line text-ink-mute hover:bg-cream-deep hover:text-ink inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition-colors"
          >
            <FileText className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
            Read full transcript
          </button>
        </div>
      </div>
    </SectionFrame>
  );
}

/* ============================================================
   References
   ============================================================ */

export function ReferencesSection({ c }: { c: ReviewQueueCandidate }) {
  const verifiedCount = c.references.filter((r) => r.status === "confirmed").length;
  const otherCount = c.references.length - verifiedCount;
  const allOk = otherCount === 0;
  return (
    <SectionFrame
      id="rs-references"
      num="06"
      title="References"
      meta={
        <span>
          {verifiedCount} of {c.references.length} verified
          {otherCount > 0 ? ` · ${otherCount} pending` : ""}
        </span>
      }
      status={{
        label: allOk ? "All verified" : "1+ pending",
        tone: allOk ? "success" : "warn",
      }}
    >
      <RefList refs={c.references} />
    </SectionFrame>
  );
}

/* ============================================================
   Work samples
   ============================================================ */

const SAMPLE_GRADIENT: Record<WorkSample["gradient"], string> = {
  1: "from-[#5a8b73] to-[#2b4a3e]",
  2: "from-[#c49560] to-[#6b4e2b]",
  3: "from-[#7a5a9c] to-[#3a2b4e]",
  4: "from-[#a56060] to-[#4a2b2b]",
};

const SAMPLE_ICON: Record<WorkSample["iconKey"], React.ReactElement> = {
  spreadsheet: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="22" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 12h22M12 5v22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 16h11M14 19h11M14 22h7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="3" width="20" height="26" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9h12M10 13h12M10 17h12M10 21h8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 4 28 10v12c0 2-1.5 4-4 5L16 28l-8-1c-2.5-1-4-3-4-5V10L16 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M11 14h10M11 18h7M11 22h5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  graph: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 11 14.5 19.5M20.5 11 17.5 19.5M12 9h8" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
};

export function WorkSamplesSection({ c }: { c: ReviewQueueCandidate }) {
  return (
    <SectionFrame
      id="rs-samples"
      num="07"
      title="Work samples"
      meta={<span>{c.workSamples.length} pieces · all anonymized</span>}
      status={{ label: "All clean", tone: "success" }}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {c.workSamples.map((s, i) => (
          <button
            type="button"
            key={i}
            className="bg-paper border-line shadow-sm hover:border-ink group flex flex-col overflow-hidden rounded-md border text-left transition-colors"
          >
            <div
              className={cn(
                "text-paper grid h-32 place-items-center bg-gradient-to-br",
                SAMPLE_GRADIENT[s.gradient],
              )}
              aria-hidden="true"
            >
              <span className="text-paper/85 h-12 w-12 [&_svg]:h-full [&_svg]:w-full">
                {SAMPLE_ICON[s.iconKey]}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <div className="text-ink mb-0.5 text-[13px] font-semibold">
                {s.title}
              </div>
              <div className="text-ink-mute text-[11.5px]">{s.type}</div>
            </div>
          </button>
        ))}
      </div>
    </SectionFrame>
  );
}

/* ============================================================
   Anti-cheat
   ============================================================ */

export function AntiCheatSection({ c }: { c: ReviewQueueCandidate }) {
  const cleanCount = c.antiCheat.checks.filter((x) => x.passed).length;
  const totalCount = c.antiCheat.checks.length;
  const ok = !c.antiCheat.flagsRaised;
  return (
    <SectionFrame
      id="rs-anti-cheat"
      num="08"
      title="Anti-cheat"
      meta={
        <span>
          {cleanCount} of {totalCount} checks passed
        </span>
      }
      status={{
        label: ok ? "All clean" : "Flag raised",
        tone: ok ? "success" : "warn",
      }}
    >
      <IdentityGrid data={c.antiCheat} />
    </SectionFrame>
  );
}

/* ============================================================
   AI assessment
   ============================================================ */

export function AssessmentSection({ c }: { c: ReviewQueueCandidate }) {
  return (
    <SectionFrame
      id="rs-assessment"
      num="09"
      title="AI assessment"
      meta={<span>Composite of all signals</span>}
      status={{ label: `Recommend: ${c.aiRecommendation}`, tone: "success" }}
    >
      <IvCard data={c.assessment.card} />
      {c.assessment.predictedFitBody ? (
        <div className="bg-paper border-line shadow-sm mt-4 rounded-md border p-5">
          <div className="text-ink-mute mb-2 font-mono text-[10px] tracking-[0.16em] uppercase">
            {c.assessment.predictedFitLabel ?? "Predicted client fit"}
          </div>
          <p className="text-ink-soft text-[13.5px] leading-[1.55]">
            {c.assessment.predictedFitBody}
          </p>
        </div>
      ) : null}
    </SectionFrame>
  );
}

/* ============================================================
   Notes (auto-save placeholder)
   ============================================================ */

export function NotesSection() {
  return (
    <SectionFrame
      id="rs-notes"
      num="10"
      title="Internal notes"
      meta={
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3 w-3" strokeWidth={1.6} aria-hidden="true" />
          Visible only to specialists & admin
        </span>
      }
    >
      <NotesCard
        label="Notes for the file"
        placeholder="Anything you want a future specialist to know about this candidate…"
      />
    </SectionFrame>
  );
}
