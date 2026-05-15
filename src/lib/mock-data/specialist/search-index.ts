/**
 * Search index — flat `SearchResult[]` built from the 5 entity mock
 * arrays for the global topbar search (`useSearch` hook + the
 * `TopbarSearchDropdown` panel).
 *
 * **Built once at module init** — the mock data is static (no
 * runtime mutation of records); the index never rebuilds. When a
 * real search service lands, this transformation moves to the
 * service layer; until then, this file IS the search backend.
 *
 * ## Entity coverage
 *
 *   - candidates  (47 from `managedCandidates`)        → /specialist/candidates/{id}
 *   - clients     (12 from `managedClients`)           → /specialist/my-clients
 *   - disputes    ( 7 from `disputes`)                 → /specialist/disputes?id={id}
 *   - briefs      (~32 from `clientBriefs`)            → /specialist/my-clients?focus={clientId}
 *   - prospects   (~27 from `sourcingProspects`)       → /specialist/sourcing?id={id}
 *
 * Total ≈ 125 results. Substring filter at this scale is O(N) ≈ sub-
 * millisecond; no debouncing required.
 *
 * ## Field-name mismatches resolved (Checkpoint 1 architecture review)
 *
 * Several proposed search fields don't exist on the canonical entity
 * shapes — substitutions documented inline:
 *
 *   - **Brief title** — `ClientBrief` has no `title` field; we use
 *     `role` as the result title. The "BRIEFS" type-group header
 *     disambiguates from a candidate role match.
 *   - **Brief description** — no `description` field; we use `scope`
 *     (truncated to 80 chars in haystack).
 *   - **Candidate `role`** — not on universal `ManagedCandidate`; we
 *     substitute `category` ("Virtual Assistants" etc.) for haystack.
 *   - **Candidate `skills`** — only on the 13 `CandidateProfile`s
 *     (not on all 47 managed candidates). Asymmetric coverage was
 *     judged worse than no coverage — `skills` is dropped from the
 *     index entirely. Re-add when mock-data backfills universal
 *     skills OR when real services land.
 *   - **Prospect `fullName`** — `SourcingProspect` uses `name`; we
 *     read `name` directly.
 *
 * Convention: when extending a static placeholder UI to functional,
 * verify mock-data field names BEFORE writing filter logic.
 * Asymmetric data coverage (e.g. 13/47 candidates with skills) is
 * worse than no coverage — drop the field from the searchable set
 * rather than create inconsistent search behavior.
 *
 * ## Deferred href updates
 *
 * Brief + client hrefs route to `/specialist/my-clients` for now
 * because Session 9's dedicated `/specialist/clients/[id]` and
 * `/specialist/clients/[id]/briefs/[briefId]` routes haven't landed
 * yet. Update both hrefs in the same checkpoint that introduces
 * those routes.
 */

import { managedCandidates } from "./my-candidates";
import { managedClients } from "./my-clients";
import { disputes } from "./disputes";
import { clientBriefs } from "./client-briefs";
import { sourcingProspects, type SourcingSource } from "./sourcing";

/* ============================================================
   Types
   ============================================================ */

export type SearchEntityType =
  | "candidate"
  | "client"
  | "dispute"
  | "brief"
  | "prospect";

export type SearchResult = {
  /** Canonical entity id. */
  id: string;
  type: SearchEntityType;
  /** Primary display field — bold in result row. */
  title: string;
  /** Secondary display field — muted in result row. */
  subtitle: string;
  /** Navigation target — full `/specialist/...` href. */
  href: string;
  /**
   * Lowercase concatenation of all searchable fields. The hook's
   * filter (Checkpoint 2) does `haystack.includes(query.toLowerCase())`
   * against this string. Precomputed once at module init.
   */
  haystack: string;
};

/* ============================================================
   Helpers
   ============================================================ */

/** Truncate a string to N chars, no ellipsis (haystack only). */
function trunc(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n);
}

/** Build a haystack from a list of optional fields. */
function buildHaystack(parts: ReadonlyArray<string | undefined>): string {
  return parts
    .filter((p): p is string => typeof p === "string" && p.length > 0)
    .join(" ")
    .toLowerCase();
}

/**
 * Prospect source label transform — the raw enum values
 * (`"linkedin"` / `"search"` / etc.) aren't user-friendly. The
 * `SOURCING_SOURCE_FILTERS` constant in `sourcing.ts` has the canonical
 * labels but importing it would couple this file to a UI constant;
 * inline lookup keeps the dependency one-way (mock-data only).
 */
const PROSPECT_SOURCE_LABEL: Record<SourcingSource, string> = {
  linkedin: "LinkedIn",
  referral: "Referral",
  search: "Talent search",
  scout: "AI scout",
};

/* ============================================================
   Per-entity transformers
   ============================================================ */

function candidateToResult(c: (typeof managedCandidates)[number]): SearchResult {
  const location = `${c.city}, ${c.countryName}`;
  return {
    id: c.id,
    type: "candidate",
    title: c.fullName,
    subtitle: `${c.category} · ${location}`,
    href: `/specialist/candidates/${c.id}`,
    haystack: buildHaystack([
      c.fullName,
      c.category,
      c.city,
      c.countryName,
      c.statusLabel,
    ]),
  };
}

function clientToResult(c: (typeof managedClients)[number]): SearchResult {
  const location = `${c.city}, ${c.countryName}`;
  return {
    id: c.id,
    type: "client",
    title: c.companyName,
    subtitle: `${c.industry} · ${location}`,
    href: `/specialist/my-clients`,
    haystack: buildHaystack([
      c.companyName,
      c.industry,
      c.city,
      c.countryName,
      c.healthLabel,
    ]),
  };
}

function disputeToResult(d: (typeof disputes)[number]): SearchResult {
  /* Find the claimant's first claim body for haystack inclusion.
     Disputes can have multiple claims (claimant + respondent sides);
     we index the claimant body only (the headline allegation). */
  const claimantBody = d.claims.find((c) => c.side === "claimant")?.body ?? "";
  return {
    id: d.id,
    type: "dispute",
    title: d.caseId,
    subtitle: `${d.claimantName} vs. ${d.respondentName} · ${d.reasonLabel}`,
    href: `/specialist/disputes?id=${d.id}`,
    haystack: buildHaystack([
      d.caseId,
      d.claimantName,
      d.respondentName,
      d.reasonLabel,
      trunc(claimantBody, 80),
    ]),
  };
}

function briefToResult(
  b: (typeof clientBriefs)[number],
  clientNameById: ReadonlyMap<string, string>,
): SearchResult {
  const clientName = clientNameById.get(b.clientId) ?? b.clientId;
  const scopeShort = trunc(b.scope, 80);
  return {
    id: b.id,
    type: "brief",
    title: b.role,
    subtitle: `${clientName} · ${scopeShort}`,
    /* Deferred — Session 9 will introduce
       /specialist/clients/[id]/briefs/[briefId]; until then we route
       to the my-clients roster with a focus param the page will
       eventually honor. */
    href: `/specialist/my-clients?focus=${b.clientId}`,
    haystack: buildHaystack([
      b.role,
      clientName,
      scopeShort,
      b.status,
    ]),
  };
}

function prospectToResult(p: (typeof sourcingProspects)[number]): SearchResult {
  const sourceLabel = PROSPECT_SOURCE_LABEL[p.source];
  const subtitleParts = [
    p.currentRole ?? "—",
    p.location,
    sourceLabel,
  ];
  return {
    id: p.id,
    type: "prospect",
    title: p.name,
    subtitle: subtitleParts.join(" · "),
    href: `/specialist/sourcing?id=${p.id}`,
    haystack: buildHaystack([
      p.name,
      p.currentRole,
      p.location,
      sourceLabel,
    ]),
  };
}

/* ============================================================
   Build the index (runs once at module init)
   ============================================================ */

function buildSearchIndex(): ReadonlyArray<SearchResult> {
  /* Client-name lookup for brief subtitle composition. */
  const clientNameById = new Map<string, string>(
    managedClients.map((c) => [c.id, c.companyName]),
  );

  return [
    ...managedCandidates.map(candidateToResult),
    ...managedClients.map(clientToResult),
    ...disputes.map(disputeToResult),
    ...clientBriefs.map((b) => briefToResult(b, clientNameById)),
    ...sourcingProspects.map(prospectToResult),
  ];
}

/** Static search index — built at module init, never rebuilds. */
export const searchIndex: ReadonlyArray<SearchResult> = buildSearchIndex();

/** Per-entity-type counts. Useful for the dropdown's empty/results header. */
export const SEARCH_INDEX_COUNTS: Record<SearchEntityType, number> = {
  candidate: managedCandidates.length,
  client: managedClients.length,
  dispute: disputes.length,
  brief: clientBriefs.length,
  prospect: sourcingProspects.length,
};
