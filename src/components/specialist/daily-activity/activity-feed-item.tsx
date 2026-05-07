/**
 * Single feed item: time / icon / body block (actor + title + detail
 * + optional quote + optional chips).
 *
 * The `title` field carries inline `<strong>...</strong>` and
 * `<em>...</em>` markers from mock data. Parsed here into React
 * fragments — NO `dangerouslySetInnerHTML` (per AI_RULES B11 spirit:
 * untrusted-style strings should be structured, not raw HTML).
 *
 * Server Component.
 */

import {
  Activity,
  CheckCircle2,
  Cog,
  MessageSquare,
  RefreshCw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import type {
  ActivityChip,
  ActivityChipTone,
  ActivityFeedItem,
  ActivityFeedItemKind,
} from "@/lib/mock-data/specialist/daily-activity";
import { cn } from "@/lib/utils/cn";

/* ============================================================
   Icon + tone per item kind (matches `.act-item-icon.*`)
   ============================================================ */

const ICON_TONE: Record<
  ActivityFeedItemKind,
  { wrap: string; icon: React.ReactNode }
> = {
  review: {
    wrap: "bg-success/12 text-success",
    icon: <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  message: {
    wrap: "bg-lime/15 text-lime-deep",
    icon: <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />,
  },
  recert: {
    // The recert icon-bg uses #5C4A6E (purple) per source — known
    // decorative literal from Session 5 token note.
    wrap: "bg-[rgba(92,74,110,0.14)] text-[#5C4A6E]",
    icon: <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.7} />,
  },
  dispute: {
    wrap: "bg-danger-bg text-danger",
    icon: <ShieldAlert className="h-3.5 w-3.5" strokeWidth={1.6} />,
  },
  match: {
    wrap: "bg-navy/10 text-navy",
    icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
  },
  system: {
    wrap: "bg-cream-deep text-ink-soft",
    icon: <Cog className="h-3.5 w-3.5" strokeWidth={1.5} />,
  },
};
// Note: source CSS also defines `.act-item-icon.note` (amber). Mock
// data's `ActivityFeedItemKind` doesn't include "note" — the typed
// kind set is a strict subset of the visual variants. If a future
// session adds note-kind feed items, extend both `ActivityFilterKey`
// and this map together.

/* ============================================================
   Chip tones (matches `.act-item-chip.*`)
   ============================================================ */

const CHIP_TONE: Record<ActivityChipTone, string> = {
  default: "bg-cream-deep text-ink-soft",
  success: "bg-success-bg text-success",
  amber: "bg-amber/15 text-amber",
  danger: "bg-danger-bg text-danger",
  lime: "bg-lime/20 text-lime-deep",
  elite: "bg-lime/20 text-lime-deep font-semibold",
};

/* ============================================================
   Inline title renderer — parses <strong> and <em> markers
   ============================================================ */

type TitleNode =
  | { kind: "text"; value: string }
  | { kind: "strong"; value: string }
  | { kind: "em"; value: string };

/**
 * Parses a string with `<strong>...</strong>` and `<em>...</em>`
 * markers into a flat sequence of typed nodes. Doesn't support
 * nested markup (mock data doesn't use it).
 */
function parseTitle(s: string): ReadonlyArray<TitleNode> {
  const out: TitleNode[] = [];
  const re = /<(strong|em)>([\s\S]*?)<\/\1>/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    if (m.index > lastIndex) {
      out.push({ kind: "text", value: s.slice(lastIndex, m.index) });
    }
    const tag = m[1] === "strong" ? "strong" : "em";
    out.push({ kind: tag, value: m[2] ?? "" });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < s.length) {
    out.push({ kind: "text", value: s.slice(lastIndex) });
  }
  return out;
}

function RenderTitle({ html }: { html: string }) {
  const nodes = parseTitle(html);
  return (
    <>
      {nodes.map((n, i) => {
        if (n.kind === "strong") {
          return (
            <strong key={i} className="font-medium text-ink">
              {n.value}
            </strong>
          );
        }
        if (n.kind === "em") {
          return (
            <em key={i} className="italic text-ink-soft">
              {n.value}
            </em>
          );
        }
        return <span key={i}>{n.value}</span>;
      })}
    </>
  );
}

/* ============================================================
   Component
   ============================================================ */

export function ActivityFeedItemRow({ item }: { item: ActivityFeedItem }) {
  const tone = ICON_TONE[item.kind];
  return (
    <article className="border-line-soft -mx-2.5 grid grid-cols-[80px_32px_minmax(0,1fr)] items-start gap-4 rounded-md border-b px-2.5 py-4 transition-colors hover:border-transparent hover:bg-paper last:border-b-0 max-sm:grid-cols-[60px_28px_minmax(0,1fr)] max-sm:gap-3">
      <div className="pt-1 text-right font-mono text-[11px] tracking-[0.04em] uppercase text-ink-mute tabular-nums whitespace-nowrap">
        {item.time}
      </div>
      <div
        className={cn(
          "grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg max-sm:h-7 max-sm:w-7",
          tone.wrap,
        )}
        aria-hidden="true"
      >
        {tone.icon}
      </div>
      <div className="min-w-0">
        <div className="mb-1 font-mono text-[9.5px] font-semibold tracking-[0.1em] uppercase text-ink-mute">
          {item.actor === "system" ? (
            <span className="inline-flex items-center gap-1">
              <Activity className="h-2.5 w-2.5" strokeWidth={2} aria-hidden="true" />
              System
            </span>
          ) : (
            "You"
          )}
        </div>
        <div className="text-[14px] leading-[1.5] font-normal text-ink">
          <RenderTitle html={item.title} />
        </div>
        {item.detail ? (
          <div className="mt-1 text-[12.5px] leading-[1.5] text-ink-mute">
            <RenderTitle html={item.detail} />
          </div>
        ) : null}
        {item.quote ? (
          <blockquote
            className="bg-cream border-line group-hover:bg-cream-deep group-hover:border-l-ink-mute mt-2 rounded-r-md border-l-2 px-3.5 py-2.5 text-[13px] italic leading-[1.5] text-ink-soft"
            style={{ fontVariationSettings: '"opsz" 36' }}
          >
            <span className="font-display">{item.quote}</span>
          </blockquote>
        ) : null}
        {item.chips && item.chips.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.chips.map((c, i) => (
              <ChipTag key={i} chip={c} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function ChipTag({ chip }: { chip: ActivityChip }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 font-mono text-[9.5px] font-medium tracking-[0.06em] uppercase",
        CHIP_TONE[chip.tone],
      )}
    >
      {chip.label}
    </span>
  );
}
