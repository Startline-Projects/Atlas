/**
 * Mock-data barrel for the Manager surface.
 *
 * Matches `src/lib/mock-data/specialist/index.ts` shape. Direct
 * file imports also work — the barrel is a convenience.
 *
 * Step 1 surface: types + canonical identity + Specialist roster
 * stub. Steps 4-13 populate the rest (team detail, activity audit,
 * team disputes, pool coordination, sprints, team reports, manager
 * daily activity, notifications, messages).
 *
 * See `docs/manager/CONVERSION_LOG.md` for the per-step roadmap.
 */

export * from "./manager-identity";
export * from "./team";
export * from "./manager-nav-items";
