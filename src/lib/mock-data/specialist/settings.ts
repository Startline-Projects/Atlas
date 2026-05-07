/**
 * Mock data for `/specialist/settings` — sub-nav rail + form panel.
 *
 * 7 sections grouped under 3 sub-nav headers per source HTML:
 *   Account     → Profile · Security
 *   Workflow    → Notifications · Preferences · Integrations
 *   System      → Data & export · Advanced (incl. Danger Zone)
 *
 * Reads heavily from `currentUser` (extended in 6.1c with displayName,
 * bio, timeZone, tenureMonths, cityCountry).
 *
 * PDF rules captured as type fields, not surfaced this session:
 *   - 2FA is mandatory (per PDF Step 15). HTML shows the toggle as
 *     ENABLED with manage option only — no enable/disable toggle.
 *     Captured via `TWO_FACTOR_REQUIRED = true` constant.
 *   - Login history per PDF — HTML has only login alerts + active sessions.
 *     `LoginHistoryEntry` type exists for migration; not consumed.
 *   - "Working hours" + "Out of office" per PDF — HTML's avatar-menu
 *     dropdown lists them but no panels; menu dropdown unbuilt
 *     (Session 1 deferred). Type-only capture.
 *   - Display preferences (theme/density/auto-refresh) per PDF — HTML
 *     has compact-lists toggle but no theme/density/auto-refresh fields.
 *     Captured as type fields with UI deferred.
 */

/* ============================================================
   Constants — business rules
   ============================================================ */

/**
 * Per PDF Step 15: 2FA is **mandatory** for all specialists. The UI
 * surface shows a manage-only flow (no enable/disable toggle on the
 * required-state). When services land, `accountService.disable2FA()`
 * must throw a `BusinessRuleError("TWO_FACTOR_REQUIRED")`.
 *
 * Migration target: `lib/config/constants.ts` alongside
 * `POOL_DEPLETION_THRESHOLD`, `DISPUTE_SLA_HOURS`,
 * `REVIEW_SLA_HOURS`, etc.
 */
export const TWO_FACTOR_REQUIRED = true;

/* ============================================================
   Sub-nav structure
   ============================================================ */

export type SettingsSection =
  | "profile"
  | "security"
  | "notifications"
  | "preferences"
  | "integrations"
  | "data-export"
  | "advanced";

export type SettingsSubnavGroup = {
  /** "Account" / "Workflow" / "System". */
  groupLabel: string;
  items: ReadonlyArray<SettingsSubnavItem>;
};

export type SettingsSubnavItem = {
  key: SettingsSection;
  label: string;
  /** Optional badge ("12", "2FA on", "3 of 6"). */
  badge?: { label: string; tone: "default" | "success" | "amber" };
};

export const SETTINGS_SUBNAV: ReadonlyArray<SettingsSubnavGroup> = [
  {
    groupLabel: "Account",
    items: [
      { key: "profile", label: "Profile" },
      {
        key: "security",
        label: "Security",
        badge: { label: "2FA on", tone: "success" },
      },
    ],
  },
  {
    groupLabel: "Workflow",
    items: [
      {
        key: "notifications",
        label: "Notifications",
        badge: { label: "12", tone: "default" },
      },
      { key: "preferences", label: "Preferences" },
      {
        key: "integrations",
        label: "Integrations",
        badge: { label: "3 of 6", tone: "default" },
      },
    ],
  },
  {
    groupLabel: "System",
    items: [
      { key: "data-export", label: "Data & export" },
      { key: "advanced", label: "Advanced" },
    ],
  },
];

/* ============================================================
   Notifications — 4-channel matrix
   ============================================================ */

export type NotificationChannel = "in-app" | "email" | "sms";

export type NotificationEventKey =
  | "review-queue-new"
  | "recert-deadline"
  | "dispute-filed"
  | "client-brief-new"
  | "talent-message"
  | "client-message"
  | "performance-milestone"
  | "daily-digest";

export type NotificationEvent = {
  key: NotificationEventKey;
  label: string;
  /** Required notifications can't be turned off — render disabled toggle. */
  required?: boolean;
  /** Default channel selections. */
  channels: Record<NotificationChannel, boolean>;
};

export const NOTIFICATION_EVENTS: ReadonlyArray<NotificationEvent> = [
  {
    key: "review-queue-new",
    label: "New review queue item",
    channels: { "in-app": true, email: true, sms: false },
  },
  {
    key: "recert-deadline",
    label: "Re-cert deadline approaching",
    channels: { "in-app": true, email: true, sms: false },
  },
  {
    key: "dispute-filed",
    label: "Dispute filed",
    required: true,
    channels: { "in-app": true, email: true, sms: true },
  },
  {
    key: "client-brief-new",
    label: "New client brief",
    channels: { "in-app": true, email: false, sms: false },
  },
  {
    key: "talent-message",
    label: "Talent message received",
    channels: { "in-app": true, email: false, sms: false },
  },
  {
    key: "client-message",
    label: "Client message received",
    channels: { "in-app": true, email: false, sms: false },
  },
  {
    key: "performance-milestone",
    label: "Performance milestone",
    channels: { "in-app": true, email: true, sms: false },
  },
  {
    key: "daily-digest",
    label: "Daily digest",
    channels: { "in-app": false, email: true, sms: false },
  },
];

export type QuietHours = {
  enabled: boolean;
  fromHHmm: string; // "22:00"
  toHHmm: string; // "07:30"
};

export const quietHours: QuietHours = {
  enabled: true,
  fromHHmm: "22:00",
  toHHmm: "07:30",
};

/* ============================================================
   Preferences
   ============================================================ */

export type PreferencesState = {
  /** Auto-advance to next item after a decision. */
  autoAdvanceAfterDecision: boolean;
  /** Show inline AI suggestions in composers. */
  showAiSuggestions: boolean;
  /** Compact-density list rendering. */
  compactLists: boolean;
  /** Default sort key for /specialist/my-candidates. */
  defaultCandidateSort:
    | "recent-activity"
    | "name-asc"
    | "highest-rating"
    | "most-hours"
    | "cert-expiry";
  /** Default order for /specialist/review-queue. */
  defaultReviewQueueOrder:
    | "sla-priority"
    | "submission-time"
    | "ai-confidence";
  /** Confirm before destructive actions (cascade to review/recert/disputes). */
  confirmDestructiveActions: boolean;

  /* PDF additions — UI deferred (see file docblock). */
  theme?: "light" | "dark" | "system";
  density?: "compact" | "comfortable";
  autoRefreshSec?: 0 | 15 | 30 | 60;
};

export const preferences: PreferencesState = {
  autoAdvanceAfterDecision: true,
  showAiSuggestions: true,
  compactLists: false,
  defaultCandidateSort: "recent-activity",
  defaultReviewQueueOrder: "sla-priority",
  confirmDestructiveActions: true,
};

/* ============================================================
   Active sessions
   ============================================================ */

export type ActiveSession = {
  id: string;
  /** "MacBook Pro · Chrome 124". */
  device: string;
  /** "Mexico City, MX · 2 minutes ago" */
  locationAndWhen: string;
  /** Current session — show CURRENT chip; no sign-out button. */
  isCurrent: boolean;
};

export const activeSessions: ReadonlyArray<ActiveSession> = [
  {
    id: "ses-1",
    device: "MacBook Pro · Chrome 124",
    locationAndWhen: "Mexico City, MX · 2 minutes ago",
    isCurrent: true,
  },
  {
    id: "ses-2",
    device: "iPhone 15 · Atlas mobile app",
    locationAndWhen: "Mexico City, MX · 5 hours ago",
    isCurrent: false,
  },
  {
    id: "ses-3",
    device: "MacBook Air · Safari 17",
    locationAndWhen: "Mexico City, MX · 3 days ago",
    isCurrent: false,
  },
];

/* ============================================================
   PDF login history — typed only, not rendered
   ============================================================ */

/**
 * PDF Step 15 §"Login & security · Login history" — captured for
 * migration. HTML has only "Active sessions"; a future polish session
 * adds a separate "Login history" panel (or a tab on Security).
 */
export type LoginHistoryEntry = {
  id: string;
  whenIso: string;
  device: string;
  ipMasked: string;
  location: string;
  /** "success" / "challenged" (2FA prompt) / "failed". */
  outcome: "success" | "challenged" | "failed";
};

/* ============================================================
   Integrations
   ============================================================ */

export type IntegrationKey =
  | "google-calendar"
  | "gmail"
  | "slack"
  | "linkedin"
  | "zoom"
  | "notion";

export type IntegrationCard = {
  key: IntegrationKey;
  /** "Google Calendar" — display name. */
  name: string;
  /** Brand glyph color literal — known decoratives, see CONVERSION_LOG. */
  brandColor: string;
  /** Short description of what the integration does. */
  description: string;
  connected: boolean;
  /** Connected-state meta line ("Sarah's calendar" / "#vas-specialists-mx"). */
  metaLabel?: string;
};

export const integrations: ReadonlyArray<IntegrationCard> = [
  {
    key: "google-calendar",
    name: "Google Calendar",
    brandColor: "#4285F4",
    description:
      "Sync upcoming check-ins and 1-on-1s with talents and clients.",
    connected: true,
    metaLabel: "miguel@atlasworld.co · primary calendar",
  },
  {
    key: "gmail",
    name: "Gmail",
    brandColor: "#EA4335",
    description: "Send outreach emails from your Atlas-routed Gmail address.",
    connected: false,
  },
  {
    key: "slack",
    name: "Slack",
    brandColor: "#4A154B",
    description: "Route specialist alerts to a Slack channel.",
    connected: true,
    metaLabel: "Alerts → #vas-specialists-mx",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    brandColor: "#0A66C2",
    description: "Surface prospect profiles inline during sourcing.",
    connected: false,
  },
  {
    key: "zoom",
    name: "Zoom",
    brandColor: "#2D8CFF",
    description:
      "Generate Zoom links for video interviews and dispute mediation calls.",
    connected: true,
    metaLabel: "Pro account · auto-create rooms",
  },
  {
    key: "notion",
    name: "Notion",
    brandColor: "#000000",
    description: "Pull dispute SOWs and reference docs from a shared workspace.",
    connected: false,
  },
];

/* ============================================================
   Data & export
   ============================================================ */

export type DataExportItem = {
  key: string;
  label: string;
  description: string;
  /** Button label ("Export CSV" / "Export JSON" / "Request archive"). */
  ctaLabel: string;
};

export const dataExportItems: ReadonlyArray<DataExportItem> = [
  {
    key: "decisions",
    label: "Decision history",
    description: "Every approval, rejection, dispute decision you've made.",
    ctaLabel: "Export CSV",
  },
  {
    key: "activity",
    label: "Activity log",
    description:
      "Daily-activity feed exported as JSON · matches /specialist/daily-activity.",
    ctaLabel: "Export JSON",
  },
  {
    key: "pool",
    label: "Pool snapshot",
    description: "Current state of your Virtual Assistants pool.",
    ctaLabel: "Export CSV",
  },
  {
    key: "comms",
    label: "Communication archive",
    description:
      "All sent + received messages with talents and clients (GDPR-compliant ZIP).",
    ctaLabel: "Request archive",
  },
];

/* ============================================================
   Advanced + Danger zone
   ============================================================ */

export type AdvancedToggle = {
  key: "keyboard-shortcuts" | "beta-features" | "developer-mode";
  label: string;
  description: string;
  enabled: boolean;
};

export const advancedToggles: ReadonlyArray<AdvancedToggle> = [
  {
    key: "keyboard-shortcuts",
    label: "Atlas keyboard shortcuts",
    description: "Enable ? to open the shortcut cheat sheet anywhere.",
    enabled: true,
  },
  {
    key: "beta-features",
    label: "Beta features",
    description:
      "Try features still in active development. May behave inconsistently.",
    enabled: false,
  },
  {
    key: "developer-mode",
    label: "Developer mode",
    description:
      "Show audit ids and request traces in the UI. For platform-team debugging.",
    enabled: false,
  },
];

export type DangerZoneAction = {
  key: "transfer-pool" | "request-deletion";
  title: string;
  description: string;
  ctaLabel: string;
  /** Long warning shown in the confirm modal. */
  confirmCopy: string;
};

export const dangerZoneActions: ReadonlyArray<DangerZoneAction> = [
  {
    key: "transfer-pool",
    title: "Transfer your pool to another specialist",
    description:
      "Move all 47 talents, 12 client accounts, and active engagements to a different specialist. Used when changing roles or leaving Atlas.",
    ctaLabel: "Initiate transfer",
    confirmCopy:
      "This routes a transfer request to your manager + admin. Both must co-sign before the transfer is executed. You will receive a final confirmation prompt before anything moves.",
  },
  {
    key: "request-deletion",
    title: "Request account deletion",
    description:
      "Permanent deletion of your Atlas account. Atlas retains audit logs for 7 years per compliance.",
    ctaLabel: "Request deletion",
    confirmCopy:
      "Account deletion is irreversible. Audit logs are retained for 7 years (legal compliance). Your active engagements must be transferred or terminated first; admin will guide you through the offboarding sequence.",
  },
];
