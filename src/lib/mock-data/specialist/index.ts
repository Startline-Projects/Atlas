/**
 * Barrel export for specialist mock data. Future sessions:
 *
 *   import { currentUser, navItems, snapshot } from "@/lib/mock-data/specialist";
 *
 * When real data wires up, replace each named export with a typed
 * fetcher (Server Component) or hook (Client) — the public shape stays
 * the same so call sites don't change.
 */

export * from "./current-user";
export * from "./nav-items";
export * from "./dashboard-kpis";
export * from "./dashboard-cards";
export * from "./queue-types";
export * from "./review-queue";
export * from "./recert-queue";
export * from "./my-candidates";
export * from "./my-clients";
export * from "./candidate-profile";
export * from "./chat-types";
export * from "./candidate-chats";
export * from "./client-chats";
export * from "./sourcing";
export * from "./pool-health";
export * from "./disputes";
export * from "./daily-activity";
export * from "./performance";
export * from "./reviews-approvals";
export * from "./settings";
export * from "./help";
export * from "./topbar-feed";
