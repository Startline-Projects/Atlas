/**
 * Canonical Manager identity record.
 *
 * Atlas currently has ONE Manager of Talent Specialists: Mateo
 * Vargas, `mgr-001-v8b2c4`. ID prefix matches the admin precedent
 * established in `docs/admin/CONVERSION_LOG.md` Step 8.
 *
 * The Manager prototype (`reference/manager.html`) uses the placeholder
 * name "Miguel Ramos"; this file is the canonical translation target.
 * ALL downstream Manager UI must read from `currentManager` — never
 * hardcode "Miguel Ramos" or another Manager name. This convention
 * prevents the Miguel-Ramos-drift problem where 14 conversion steps
 * accumulate inconsistent name references.
 *
 * Exported from the barrel (`src/lib/mock-data/manager/index.ts`)
 * from Step 1 even though no UI consumes it yet — locking the
 * canonical record from day one.
 *
 * The Specialist-side data layer (`src/lib/mock-data/specialist/`)
 * may still reference "Miguel Ramos" — that's pre-existing Specialist
 * app state, out of scope for the Manager initiative. Do not touch.
 *
 * ## Future shape
 *
 * If product decisions add multiple Managers, this file graduates
 * from a single export to a directory + array pattern (mirroring
 * `managedClients` in the Specialist mock-data layer).
 */

export type ManagerIdentity = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  initials: string;
  /** Role label rendered on the Manager topbar tag and in
   *  notification subject lines. */
  roleLabel: string;
  /** Cross-session avatar gradient. Visually distinct from the 10
   *  team-member gradients (av-1..av-10) so "self" stays findable
   *  in roster lists. Mirrors the prototype's `av-you` slot. */
  avatarGradient: { from: string; to: string };
};

export const currentManager: ManagerIdentity = {
  id: "mgr-001-v8b2c4",
  fullName: "Mateo Vargas",
  firstName: "Mateo",
  lastName: "Vargas",
  initials: "MV",
  roleLabel: "Manager of Talent Specialists",
  /* Reserved "av-you" gradient — ink-on-ink, distinct from the
     10 team-member gradients to keep "self" visually findable. */
  avatarGradient: {
    from: "#0E0E0C",
    to: "#2B2A26",
  },
};
