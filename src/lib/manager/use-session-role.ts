"use client";

/**
 * useSessionRole — mocked role check for the Manager-extension
 * surface.
 *
 * ## Current implementation (Session 1)
 *
 * Hardcoded to `"manager"`. This is the temporary shape until real
 * auth-backed session data lands (Clerk, Auth.js v5, or whichever
 * `docs/TECH_STACK.md` §2.5 ADR finalizes). Per Atlas convention,
 * mock-first; wire backend later.
 *
 * ## Role gate contract
 *
 * Every Manager-extension UI element (ModeToggle, sidebar
 * TEAM MANAGEMENT section, dashboard mode fork, notification
 * context tags + filter, etc.) MUST guard its render with
 * `useSessionRole() === "manager"`. Non-Manager Specialist users
 * see ZERO behavior change — the extension is invisible to them.
 *
 * This contract enables the Path C architecture (ADR 0001) to stay
 * "purely additive for non-Managers" even though it touches existing
 * Specialist files.
 *
 * ## Future swap
 *
 * When real auth lands, replace the function body with a session
 * read (e.g. `useSession()?.user?.role ?? "specialist"`). Consumers
 * don't change.
 *
 * ## Why a hook rather than a constant
 *
 * Hook shape future-proofs the swap to a session subscription
 * (Clerk's `useUser`, Auth.js `useSession`, etc.) without rewriting
 * every consumer.
 */

export type SessionRole = "manager" | "specialist";

export function useSessionRole(): SessionRole {
  return "manager";
}
