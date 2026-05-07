/**
 * Specialist console sidebar navigation.
 *
 * Source of truth for: labels, hrefs, badge counts, icon keys, sectioning
 * (Workspace / Operations), and which items hide on mobile.
 *
 * Mirrored from `specialist (12).html` <aside class="dash-sidebar-spec">
 * (~line 14063), reconciled with spec PDF §"Global navigation". The HTML
 * adds a "Re-cert queue" item the spec doesn't list explicitly; we keep
 * it because the spec dedicates Step 4 to re-certification reviews.
 *
 * Future sessions: badge counts will come from `apiClient.specialist.summary()`
 * and React-Query/SWR cache. The shape below mirrors the future API payload.
 */

export type NavBadgeTone = "default" | "urgent" | "attention" | "lime";

export type NavSection = "Workspace" | "Operations";

/**
 * Stable identifiers for icons. The Sidebar component maps each key to an
 * inline SVG so the sidebar stays a Server Component (no icon-library
 * client bundle for this rail).
 */
export type NavIconKey =
  | "dashboard"
  | "review-queue"
  | "recert-queue"
  | "my-candidates"
  | "my-clients"
  | "sourcing"
  | "disputes"
  | "pool-health"
  | "daily-activity"
  | "reviews-approvals"
  | "performance"
  | "help";

export type NavItem = {
  /** Stable key — also the route segment. */
  key: NavIconKey;
  label: string;
  /** Real Next.js href. Routes that aren't built yet show a "Coming soon" page. */
  href: string;
  iconKey: NavIconKey;
  section: NavSection;
  /** Optional badge: a count + tone. Omit when there's nothing to surface. */
  badge?: { value: number; tone: NavBadgeTone };
  /** Hide this item on the compact-mobile sidebar (matches `mobile-hide` in HTML). */
  mobileHide?: boolean;
  /**
   * Additional URL prefixes that should highlight this item as active.
   * Used by dynamic routes that don't have their own sidebar entry —
   * e.g. `/specialist/candidates/[id]` highlights "My candidates".
   * Compared as `pathname === prefix || pathname.startsWith(`${prefix}/`)`.
   */
  additionalActivePathPrefixes?: ReadonlyArray<string>;
};

export const navItems: ReadonlyArray<NavItem> = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/specialist/dashboard",
    iconKey: "dashboard",
    section: "Workspace",
  },
  {
    key: "review-queue",
    label: "Review queue",
    href: "/specialist/review-queue",
    iconKey: "review-queue",
    section: "Workspace",
    badge: { value: 3, tone: "urgent" },
  },
  {
    key: "recert-queue",
    label: "Re-cert queue",
    href: "/specialist/recert-queue",
    iconKey: "recert-queue",
    section: "Workspace",
    badge: { value: 5, tone: "attention" },
  },
  {
    key: "my-candidates",
    label: "My candidates",
    href: "/specialist/my-candidates",
    iconKey: "my-candidates",
    section: "Workspace",
    badge: { value: 47, tone: "default" },
    // The standalone candidate-profile route lives at /specialist/candidates/[id]
    // and the candidate-chat route at /specialist/candidate-chat — neither has a
    // sidebar entry of its own. Highlight "My candidates" while on either.
    additionalActivePathPrefixes: [
      "/specialist/candidates",
      "/specialist/candidate-chat",
    ],
  },
  {
    key: "my-clients",
    label: "My clients",
    href: "/specialist/my-clients",
    iconKey: "my-clients",
    section: "Workspace",
    badge: { value: 12, tone: "default" },
    // The client-chat route at /specialist/client-chat has no sidebar entry
    // of its own — highlight "My clients" while on it.
    additionalActivePathPrefixes: ["/specialist/client-chat"],
  },
  {
    key: "sourcing",
    label: "Sourcing",
    href: "/specialist/sourcing",
    iconKey: "sourcing",
    section: "Workspace",
    mobileHide: true,
  },
  {
    key: "disputes",
    label: "Disputes",
    href: "/specialist/disputes",
    iconKey: "disputes",
    section: "Workspace",
    badge: { value: 1, tone: "urgent" },
  },
  {
    key: "pool-health",
    label: "Pool health",
    href: "/specialist/pool-health",
    iconKey: "pool-health",
    section: "Workspace",
    badge: { value: 18, tone: "lime" },
    mobileHide: true,
  },
  {
    key: "daily-activity",
    label: "Daily activity",
    href: "/specialist/daily-activity",
    iconKey: "daily-activity",
    section: "Operations",
    mobileHide: true,
  },
  {
    key: "reviews-approvals",
    label: "Reviews",
    href: "/specialist/reviews",
    iconKey: "reviews-approvals",
    section: "Operations",
    mobileHide: true,
  },
  {
    key: "performance",
    label: "Performance",
    href: "/specialist/performance",
    iconKey: "performance",
    section: "Operations",
    mobileHide: true,
  },
  {
    key: "help",
    label: "Help & resources",
    href: "/specialist/help",
    iconKey: "help",
    section: "Operations",
    mobileHide: true,
  },
];

/**
 * Routes that already have a real page. Everything else shows "Coming soon".
 *
 * Note: `/specialist/candidates/[id]` is a dynamic route that doesn't have a
 * sidebar entry — it's reached from `/specialist/my-candidates` rows. The
 * longest-prefix matcher in `Sidebar` highlights "My candidates" when the
 * URL is `/specialist/candidates/<anything>`.
 */
export const IMPLEMENTED_ROUTES: ReadonlyArray<string> = [
  "/specialist/dashboard",
  "/specialist/review-queue",
  "/specialist/recert-queue",
  "/specialist/my-candidates",
  "/specialist/my-clients",
  "/specialist/candidate-chat",
  "/specialist/client-chat",
  "/specialist/sourcing",
  "/specialist/pool-health",
  "/specialist/disputes",
  "/specialist/daily-activity",
  "/specialist/performance",
  "/specialist/reviews",
  "/specialist/settings",
  "/specialist/help",
];
