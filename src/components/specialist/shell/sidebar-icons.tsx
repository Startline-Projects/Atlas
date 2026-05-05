/**
 * Inline SVGs for the Specialist sidebar nav.
 *
 * Kept inline (not lucide-react) because the source uses 1.4-stroke
 * custom shapes that the lucide set doesn't match, the icon set is
 * fixed at 12 entries, and the sidebar is a small surface where every
 * KB matters. See docs/CONVERSION_LOG.md "Conventions established".
 */

import type { NavIconKey } from "@/lib/mock-data/specialist/nav-items";

type IconProps = { className?: string | undefined };

function Dashboard({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ReviewQueue({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="6" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="m9.5 9.5 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="m4 6 1.5 1.5L8 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RecertQueue({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8a5 5 0 0 1 9-3M13 8a5 5 0 0 1-9 3M12 2v3h-3M4 14v-3h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MyCandidates({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="11.5" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2 13c0-2 2-3.5 4-3.5s4 1.5 4 3.5M10 13c0-1.5 1-2.5 2-2.5s2 1 2 2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MyClients({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="3" width="11" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.5 6h11M5 9h2M9 9h2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sourcing({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 2v12M2 8h12M4.5 4.5l7 7M11.5 4.5l-7 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Disputes({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 2 14 5v3.5c0 3.5-3 6.5-6 7-3-.5-6-3.5-6-7V5l6-3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 6v3M8 10.5v.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PoolHealth({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 12c2-3 4-3 6 0s4 3 6 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M2 8c2-3 4-3 6 0s4 3 6 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity=".4"
      />
    </svg>
  );
}

function DailyActivity({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="3" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.5 6h11M5 2v2M11 2v2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="m6 10 1.5 1.5L10 8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReviewsApprovals({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="2.5" width="10" height="11" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M5.5 6h5M5.5 8.5h5M5.5 11h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Performance({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 13V3M5 13V8M8 13V5M11 13V6M14 13V10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Help({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6 6.5c.4-.9 1.2-1.5 2.2-1.5 1.2 0 2.3.9 2.3 2 0 1.4-1.5 1.7-2 2.5M8 12.5v.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICON_BY_KEY: Record<NavIconKey, (props: IconProps) => React.ReactElement> =
  {
    dashboard: Dashboard,
    "review-queue": ReviewQueue,
    "recert-queue": RecertQueue,
    "my-candidates": MyCandidates,
    "my-clients": MyClients,
    sourcing: Sourcing,
    disputes: Disputes,
    "pool-health": PoolHealth,
    "daily-activity": DailyActivity,
    "reviews-approvals": ReviewsApprovals,
    performance: Performance,
    help: Help,
  };

export function SidebarIcon({
  iconKey,
  className,
}: {
  iconKey: NavIconKey;
  className?: string;
}) {
  const Icon = ICON_BY_KEY[iconKey];
  return <Icon className={className} />;
}
