/**
 * Inline SVGs for the Manager TEAM MANAGEMENT sidebar section.
 *
 * Mirrors the Specialist `sidebar-icons.tsx` pattern: one function
 * per icon, then a `Record<ManagerNavIconKey, Icon>` dispatch, then
 * `ManagerSidebarIcon({ iconKey })` resolves at render.
 *
 * ## Why duplicated (not imported from Specialist side)
 *
 * Per Session 1 / Step 2 lock: where a Manager icon would be
 * visually similar to a Specialist one, we duplicate the SVG here
 * rather than importing from `specialist/shell/sidebar-icons.tsx`.
 * Keeps the role-surface boundary clean and prevents the
 * Manager-extension files from depending on internal Specialist
 * component layout.
 *
 * Shapes ported faithfully from `reference/manager.html` lines
 * 33301-33345 (`TEAM_MANAGEMENT_ITEMS` array). 1.4-stroke + 16x16
 * viewBox per Atlas convention.
 */

import type { ManagerNavIconKey } from "@/lib/mock-data/manager/manager-nav-items";

type IconProps = { className?: string | undefined };

/* ============================================================
   Icon components — one per ManagerNavIconKey
   ============================================================ */

function MyTeam({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="11" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M1.5 13c0-1.7 1.6-3 3.5-3s3.5 1.3 3.5 3M8 13c0-1.7 1.6-3 3.5-3s3.5 1.3 3.5 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DailyAudit({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="2.5"
        width="10"
        height="11"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M5.5 6h5M5.5 8.5h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="m5.5 11 1.2 1.2 2.3-2.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TeamDisputes({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 2 14 5v3.5c0 3.5-3 6.5-6 7-3-.5-6-3.5-6-7V5l6-3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="7.5" r="1" fill="currentColor" />
      <circle cx="10" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function PoolCoordination({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3.5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12.5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="3.5" cy="12.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12.5" cy="12.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="m4.5 4.5 2.5 2.5M11.5 4.5 9 7M4.5 11.5 7 9M11.5 11.5 9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RecruitmentSprints({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 1.5 4 9h3l-1 5.5L11 7H8l1-5.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TeamReports({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 2.5h7l3 3V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10 2.5V5h3M5 9h4M5 11h6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ManagerDailyActivity({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="3"
        width="11"
        height="11"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M2.5 6h11M5 2v2M11 2v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="m6 10 1.2 1.2L9.5 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   Dispatcher
   ============================================================ */

const ICON_BY_KEY: Record<
  ManagerNavIconKey,
  (props: IconProps) => React.ReactElement
> = {
  "my-team": MyTeam,
  "daily-audit": DailyAudit,
  "team-disputes": TeamDisputes,
  "pool-coordination": PoolCoordination,
  "recruitment-sprints": RecruitmentSprints,
  "team-reports": TeamReports,
  "manager-daily-activity": ManagerDailyActivity,
};

export function ManagerSidebarIcon({
  iconKey,
  className,
}: {
  iconKey: ManagerNavIconKey;
  className?: string;
}) {
  const Icon = ICON_BY_KEY[iconKey];
  return <Icon className={className} />;
}
