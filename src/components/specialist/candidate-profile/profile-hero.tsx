import { Calendar, MessageSquare, RefreshCw, Sparkles } from "lucide-react";
import Link from "next/link";
import { AVATAR_GRADIENTS } from "@/lib/mock-data/specialist/queue-types";
import type { CandidateProfile } from "@/lib/mock-data/specialist/candidate-profile";
import { cn } from "@/lib/utils/cn";

const TAG_TONE = {
  default: "bg-paper border-line text-ink-soft",
  success: "bg-success-bg text-success border-success",
  amber: "bg-amber/14 text-amber border-amber",
  danger: "bg-danger-bg text-danger border-danger",
  lime: "bg-lime/18 text-lime-text border-lime-deep",
  elite: "bg-lime/20 text-lime-text border-lime-deep font-semibold",
} as const;

type TagTone = keyof typeof TAG_TONE;

/** Map a managed candidate's status into a tag tone. */
function statusTone(status: CandidateProfile["status"]): TagTone {
  if (status === "in-dispute" || status === "pending-action") return "danger";
  if (status === "paused" || status === "vacation") return "amber";
  if (status === "off-boarded") return "default";
  return "success";
}

function tierTone(tier: CandidateProfile["tier"]): TagTone {
  if (tier === "Elite") return "elite";
  if (tier === "Vetted") return "success";
  return "default";
}

type ProfileHeroProps = {
  p: CandidateProfile;
  /** Opens SchedulingModal (date/time picker). */
  onSchedule: () => void;
  /** Opens WorkflowUnavailableModal kind="suggest-for-client". */
  onSuggestForClient: () => void;
  /** Opens WorkflowUnavailableModal kind="flag-recert". */
  onFlagForRecert: () => void;
};

export function ProfileHero({
  p,
  onSchedule,
  onSuggestForClient,
  onFlagForRecert,
}: ProfileHeroProps) {
  const gradient = p.avatarGradient
    ? AVATAR_GRADIENTS[p.avatarGradient]
    : { from: "#FFD6A5", to: "#FFA07A" };

  return (
    <>
      <div className="bg-cream px-6 pt-3.5 sm:px-10">
        <Link
          href="/specialist/my-candidates"
          className="text-ink-mute hover:text-ink inline-flex items-center gap-1.5 py-1.5 font-mono text-[11px] tracking-[0.06em] uppercase transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="m7.5 2.5-3 3.5 3 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 6h6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Back to{" "}
          <em className="text-ink-soft font-mono not-italic italic">My candidates</em>
        </Link>
      </div>

      <header className="bg-cream border-line-soft grid items-start gap-6 border-b px-6 pt-5 pb-7 sm:px-10 lg:grid-cols-[auto_1fr_auto]">
        <div
          aria-hidden="true"
          className="font-display text-paper grid h-24 w-24 flex-shrink-0 place-items-center rounded-[18px] text-[36px] font-medium tracking-[-0.02em]"
          style={{
            background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            fontVariationSettings: '"opsz" 144',
          }}
        >
          {p.initials}
        </div>

        <div className="min-w-0">
          <div className="text-ink-mute mb-1 font-mono text-[10px] font-medium tracking-[0.16em] uppercase">
            Candidate profile · <span className="text-ink-soft">{p.atlasId}</span>
          </div>
          <h1
            className="font-display text-ink m-0 mb-1.5 flex flex-wrap items-center gap-3 text-[42px] leading-[1.05] font-normal tracking-[-0.03em]"
            style={{ fontVariationSettings: '"opsz" 144' }}
          >
            <span>{p.fullName}</span>
            <span aria-hidden="true" className="text-[32px]">
              {p.countryFlag}
            </span>
          </h1>
          <div className="text-ink-mute mb-2.5 font-mono text-[11px] tracking-[0.06em] uppercase">
            {p.city.toUpperCase()}, {p.countryName.toUpperCase()} · {p.age} ·
            JOINED {p.poolJoinedLabel.toUpperCase()} · LAST ACTIVE{" "}
            {p.lastActivityLabel.toUpperCase()}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Tag label={p.tier} tone={tierTone(p.tier)} />
            <Tag label={p.statusLabel} tone={statusTone(p.status)} />
            {p.averageRating > 0 ? (
              <Tag label={`★ ${p.averageRating.toFixed(1)} avg`} tone="success" />
            ) : null}
            {p.disputes === 0 ? (
              <Tag label="Clean record" tone="default" />
            ) : (
              <Tag label={`${p.disputes} dispute${p.disputes === 1 ? "" : "s"}`} tone="danger" />
            )}
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-wrap items-center gap-2 lg:flex-col lg:items-stretch">
          <ActionButton
            href={`/specialist/candidate-chat?id=${p.id}`}
            variant="primary"
            icon={<MessageSquare className="h-3 w-3" strokeWidth={1.5} />}
          >
            Send message
          </ActionButton>
          <ActionButton
            icon={<Calendar className="h-3 w-3" strokeWidth={1.5} />}
            onClick={onSchedule}
          >
            Schedule check-in
          </ActionButton>
          <ActionButton
            icon={<Sparkles className="h-3 w-3" strokeWidth={1.5} />}
            onClick={onSuggestForClient}
          >
            Suggest for client
          </ActionButton>
          <ActionButton
            icon={<RefreshCw className="h-3 w-3" strokeWidth={1.5} />}
            onClick={onFlagForRecert}
          >
            Flag for re-cert
          </ActionButton>
        </div>
      </header>
    </>
  );
}

function Tag({ label, tone }: { label: string; tone: TagTone }) {
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-[3px] font-mono text-[10px] font-medium tracking-[0.06em] uppercase",
        TAG_TONE[tone],
      )}
    >
      {label}
    </span>
  );
}

type ActionButtonProps = {
  variant?: "default" | "primary";
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

function ActionButton({
  variant = "default",
  icon,
  href,
  onClick,
  children,
}: ActionButtonProps) {
  const className = cn(
    "inline-flex min-w-[180px] items-center gap-1.5 rounded-lg border px-3.5 py-2 text-[12.5px] transition-colors max-md:min-w-0",
    variant === "primary"
      ? "bg-ink text-paper border-ink hover:bg-ink-soft"
      : "bg-paper border-line text-ink-soft hover:bg-cream-deep hover:text-ink",
  );
  if (href) {
    return (
      <Link href={href} className={className}>
        <span aria-hidden="true">{icon}</span>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("cursor-pointer", className)}
    >
      <span aria-hidden="true">{icon}</span>
      {children}
    </button>
  );
}
