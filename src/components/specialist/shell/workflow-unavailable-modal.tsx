"use client";

/**
 * WorkflowUnavailableModal — shared primitive for **single-entity
 * workflow actions** that are advertised on a sheet / row kebab /
 * profile hero but whose backends aren't yet wired.
 *
 * Honesty-of-treatment scaling for backend-blocked actions:
 *   - Bulk actions (acknowledge multi-target completion)
 *     → `useQueuedFlash` with N-target copy
 *   - Single-entity workflow actions (user clicked a specific Vertex
 *     / Marie and expects to drill into a feature)
 *     → `WorkflowUnavailableModal` with kind-specific copy +
 *       subjectName
 *   - Niche admin actions (rarely attempted in a normal work week)
 *     → silent leave-inert + document
 *
 * Test for which to use:
 *   - Did the user click on a specific entity (Vertex, Marie)? → modal
 *   - Did the user click on a multi-select group? → flash
 *   - Is this an action a typical user attempts in a normal work
 *     week? No → silent.
 *
 * The modal surfaces what the feature WILL do — gives the user a sense
 * of the eventual product surface, not just "backend pending".
 *
 * Wraps `queue-shared/ReviewModal` so it inherits Esc-close, backdrop-
 * click-close, body scroll lock, and the established modal aesthetic.
 * Same wrapping pattern as `PreviewUnavailableModal` (commit 6241650)
 * and `SchedulingModal` (commit 39359bf).
 *
 * 4 known consumer sites at extraction time (post-conversion polish):
 *   - my-clients sheet × 4 actions  (View contracts / Open briefs /
 *                                    Suggest talent / Pause client)
 *   - my-clients header × 1 action  (Invite client)
 *   - my-clients row kebab × 5 actions
 *   - my-candidates sheet × 2 actions (Suggest for client / Flag for
 *                                      re-cert)
 *   - my-candidates row kebab × 3 actions (same + Mark unavailable)
 *
 * Anticipated future consumers:
 *   - candidate-profile/profile-hero.tsx (hero workflow buttons — landed in b58d1ef)
 *   - sourcing/sourcing-app.tsx (header "Import list" — `import-prospects` kind)
 *   - chat-shared/chat-header.tsx (More actions)
 *   - disputes evidence ledger (some actions)
 *
 * Client Component (modal state owned by parent).
 */

import {
  Calendar,
  CalendarOff,
  FileText,
  Mail,
  Pause,
  RefreshCw,
  Send,
  Sparkles,
  Tag,
  Upload,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ReviewModal } from "@/components/specialist/queue-shared/review-modal";

export type WorkflowKind =
  | "contracts"
  | "briefs"
  | "send-brief"
  | "suggest-talent"
  | "tag-client"
  | "invite-client"
  | "pause-client"
  | "suggest-for-client"
  | "flag-recert"
  | "mark-unavailable"
  | "import-prospects";

const KIND_ICON: Record<WorkflowKind, LucideIcon> = {
  contracts: FileText,
  briefs: Calendar,
  "send-brief": Send,
  "suggest-talent": Sparkles,
  "tag-client": Tag,
  "invite-client": Mail,
  "pause-client": Pause,
  "suggest-for-client": Users,
  "flag-recert": RefreshCw,
  "mark-unavailable": CalendarOff,
  "import-prospects": Upload,
};

const KIND_TITLE: Record<WorkflowKind, string> = {
  contracts: "View contracts",
  briefs: "Open briefs",
  "send-brief": "Send brief",
  "suggest-talent": "Suggest new talent",
  "tag-client": "Tag client",
  "invite-client": "Invite client",
  "pause-client": "Pause client",
  "suggest-for-client": "Suggest for client match",
  "flag-recert": "Flag for re-cert",
  "mark-unavailable": "Mark unavailable",
  "import-prospects": "Import prospect list",
};

const KIND_BODY: Record<WorkflowKind, (subject: string) => string> = {
  contracts: (s) =>
    `Contract list lands when the contracts service is wired. This will show all active and past contracts for ${s}, with status, hire counts, and renewal dates.`,
  briefs: (s) =>
    `Brief library lands when the briefs service is wired. This will show all open and closed briefs for ${s}, with shortlist counts and SLA progress.`,
  "send-brief": (s) =>
    `Brief composer lands when the briefs service is wired. This will let you draft and send a new brief to ${s} with role, scope, and shortlist criteria.`,
  "suggest-talent": (s) =>
    `Talent matching lands when the matching service is wired. This will surface 5–10 ranked candidates from the active pool based on ${s}'s active briefs.`,
  "tag-client": (s) =>
    `Client tagging lands when the tagging service is wired. This will let you apply categorization tags to ${s} for filtering and reporting.`,
  "invite-client": () =>
    `Client invite flow lands when the auth service is wired. This will generate a unique signup link for the new client and pre-populate their workspace.`,
  "pause-client": (s) =>
    `Client pause lands when the engagements service is wired. This will pause all active engagements for ${s} and notify assigned candidates.`,
  "suggest-for-client": (s) =>
    `Client matching lands when the matching service is wired. This will surface clients with active briefs matching ${s}'s skills, tier, and availability.`,
  "flag-recert": (s) =>
    `Re-cert flagging lands when the lifecycle service is wired. This will move ${s} into the re-cert queue ahead of their natural cert-expiry date.`,
  "mark-unavailable": (s) =>
    `Availability toggle lands when the engagements service is wired. This will mark ${s} unavailable for new client matches; existing engagements continue.`,
  "import-prospects": () =>
    `CSV ingest lands when the file storage service is wired. This will let you bulk-import prospects from LinkedIn Recruiter exports, referral spreadsheets, or AI-scout result sets.`,
};

export function WorkflowUnavailableModal({
  open,
  workflow,
  subjectName,
  onClose,
}: {
  open: boolean;
  workflow: WorkflowKind;
  /** "Vertex Health" / "Marie Okonkwo" — interpolated into body copy. */
  subjectName: string;
  onClose: () => void;
}) {
  const Icon = KIND_ICON[workflow];
  const title = KIND_TITLE[workflow];
  const body = KIND_BODY[workflow](subjectName);

  return (
    <ReviewModal
      open={open}
      onClose={onClose}
      iconTone="default"
      icon={<Icon className="h-5 w-5" strokeWidth={1.6} />}
      title={title}
      subtitle="Feature in development"
      ariaLabel={`${title} — ${subjectName}`}
      body={
        <p className="text-ink-soft text-[13.5px] leading-[1.55]">{body}</p>
      }
      footer={
        <button
          type="button"
          onClick={onClose}
          className="bg-ink text-paper hover:bg-black inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
        >
          Got it
        </button>
      }
    />
  );
}
