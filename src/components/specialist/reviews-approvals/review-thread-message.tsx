/**
 * Single thread message — avatar (32×32) + actor block + body.
 *
 * Avatar discriminator: actor.avatarGradient is either an
 * AvatarGradientKey (resolved against queue-types/AVATAR_GRADIENTS)
 * or a `{from, to}` literal pair (the ad-hoc admin pattern from
 * Session 6). System-role messages get a smaller cream-deep avatar
 * with an icon.
 *
 * "you" variant gets a cream background; "system" variant gets a
 * left-border-only treatment per source CSS.
 *
 * Server Component.
 */

import { Cog } from "lucide-react";
import {
  AVATAR_GRADIENTS,
  type AvatarGradientKey,
} from "@/lib/mock-data/specialist/queue-types";
import type {
  ReviewThreadActor,
  ReviewThreadMessage,
} from "@/lib/mock-data/specialist/reviews-approvals";
import { cn } from "@/lib/utils/cn";

function gradientStyle(
  key: AvatarGradientKey | { from: string; to: string },
): React.CSSProperties {
  if (typeof key === "string") {
    const g = AVATAR_GRADIENTS[key];
    return { background: `linear-gradient(135deg, ${g.from}, ${g.to})` };
  }
  return { background: `linear-gradient(135deg, ${key.from}, ${key.to})` };
}

const ACTOR_ROLE_TONE: Record<string, string> = {
  Specialist: "bg-warm/15 text-ink-soft",
  Admin: "bg-cream-deep text-ink-soft",
  Manager: "bg-navy/10 text-navy",
  System: "bg-cream-deep text-ink-mute",
  Talent: "bg-success-bg text-success",
  Client: "bg-amber/15 text-amber",
};

export function ReviewThreadMessageRow({
  msg,
}: {
  msg: ReviewThreadMessage;
}) {
  const isSystem = msg.actor.isSystem === true;
  const isYou = msg.isYou === true;

  return (
    <article
      className={cn(
        "border-line grid grid-cols-[32px_minmax(0,1fr)] items-start gap-3 rounded-[10px] border bg-paper px-3.5 py-3",
        isYou && "bg-cream",
        isSystem &&
          "rounded-none border-0 border-l-[2px] border-l-line bg-transparent px-3 py-2",
      )}
    >
      <ReviewThreadAvatar actor={msg.actor} isSystem={isSystem} />
      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-baseline gap-2">
          <span className="text-[12.5px] font-medium text-ink">
            {msg.actor.name}
          </span>
          <span
            className={cn(
              "rounded-full px-1.5 py-px font-mono text-[9.5px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase",
              ACTOR_ROLE_TONE[msg.actor.role] ?? "bg-cream-deep text-ink-soft",
            )}
          >
            {msg.actor.role}
          </span>
          <span className="font-mono text-[10px] tracking-[0.04em] uppercase text-ink-mute">
            {msg.whenLabel}
          </span>
        </div>
        <ReviewThreadBody body={msg.body} />
      </div>
    </article>
  );
}

/* ============================================================
   Avatar — discriminated gradient or system icon
   ============================================================ */

function ReviewThreadAvatar({
  actor,
  isSystem,
}: {
  actor: ReviewThreadActor;
  isSystem: boolean;
}) {
  if (isSystem) {
    return (
      <div
        className="bg-cream-deep grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-md text-ink-mute"
        aria-hidden="true"
      >
        <Cog className="h-3 w-3" strokeWidth={1.6} />
      </div>
    );
  }
  return (
    <div
      className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-[7px] font-mono text-[12px] font-semibold text-paper"
      style={gradientStyle(actor.avatarGradient)}
      aria-hidden="true"
    >
      {actor.initials}
    </div>
  );
}

/* ============================================================
   Body — supports inline <strong> markers (no innerHTML)
   ============================================================ */

type BodyNode =
  | { kind: "text"; value: string }
  | { kind: "strong"; value: string };

function parseBody(s: string): ReadonlyArray<BodyNode> {
  const out: BodyNode[] = [];
  const re = /<strong>([\s\S]*?)<\/strong>/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    if (m.index > lastIndex)
      out.push({ kind: "text", value: s.slice(lastIndex, m.index) });
    out.push({ kind: "strong", value: m[1] ?? "" });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < s.length)
    out.push({ kind: "text", value: s.slice(lastIndex) });
  return out;
}

function ReviewThreadBody({ body }: { body: string }) {
  const nodes = parseBody(body);
  return (
    <p className="m-0 text-[13px] leading-[1.5] text-ink-soft">
      {nodes.map((n, i) =>
        n.kind === "strong" ? (
          <strong key={i} className="font-medium text-ink">
            {n.value}
          </strong>
        ) : (
          <span key={i}>{n.value}</span>
        ),
      )}
    </p>
  );
}
