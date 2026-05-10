/**
 * Phase 9d — Global Search Index
 *
 * Flat searchable index across all 5 admin entity types:
 * candidates (8) + clients (6) + specialists (11) + manager (1) + admins (5)
 * = 31 records, built once at module load.
 */

import { CANDIDATE_PROFILES } from './candidate-profiles-data';
import { CLIENT_PROFILES } from './client-profiles-data';
import { SPECIALIST_PROFILES } from './specialist-profiles-data';
import { MANAGER_PROFILES } from './manager-profiles-data';
import { ADMIN_PROFILES } from './admin-profiles-data';

export type SearchEntityType =
  | 'candidate'
  | 'client'
  | 'specialist'
  | 'manager'
  | 'admin';

export interface SearchResult {
  entityType: SearchEntityType;
  id: string;
  name: string;
  meta: string;
  atlasId: string;
  href: string;
  initials: string;
  avatarVariant: number; // 1-12 — keys into AV_GRADIENTS in admin-profiles-data.ts
}

// Char-code modulo helper for entities without an explicit avatarVariant field
function idHashToVariant(id: string): number {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return (sum % 12) + 1;
}

// ============================================================
// SEARCHABLE_INDEX — built once at module load
// ============================================================

export const SEARCHABLE_INDEX: SearchResult[] = [
  // 8 candidates
  ...Object.values(CANDIDATE_PROFILES).map((p): SearchResult => ({
    entityType: 'candidate',
    id: p.id,
    name: p.name,
    meta: `${p.email} · ${p.country}`,
    atlasId: p.atlasId,
    href: `/admin/users/candidates/${p.id}`,
    initials: p.initials,
    avatarVariant: idHashToVariant(p.id),
  })),
  // 6 clients
  ...Object.values(CLIENT_PROFILES).map((p): SearchResult => ({
    entityType: 'client',
    id: p.id,
    name: p.name,
    meta: `${p.email ?? p.industry ?? ''} · ${p.location ?? ''}`.replace(/^\s*·\s*|\s*·\s*$/g, ''),
    atlasId: p.atlasId,
    href: `/admin/users/clients/${p.id}`,
    initials: p.initials,
    avatarVariant: idHashToVariant(p.id),
  })),
  // 11 specialists
  ...Object.values(SPECIALIST_PROFILES).map((p): SearchResult => ({
    entityType: 'specialist',
    id: p.id,
    name: p.name,
    meta: `${p.region} · ${p.category}`,
    atlasId: p.atlasId,
    href: `/admin/users/specialists/${p.id}`,
    initials: p.initials,
    avatarVariant: idHashToVariant(p.id),
  })),
  // 1 manager
  ...Object.values(MANAGER_PROFILES).map((p): SearchResult => ({
    entityType: 'manager',
    id: p.id,
    name: p.name,
    meta: `${p.roleTag} · ${p.region}`,
    atlasId: p.atlasId,
    href: `/admin/users/managers/${p.id}`,
    initials: p.initials,
    avatarVariant: idHashToVariant(p.id),
  })),
  // 5 admins (uses existing avatarVariant field; href deep-links to master-detail with hash)
  ...Object.values(ADMIN_PROFILES).map((p): SearchResult => ({
    entityType: 'admin',
    id: p.id,
    name: p.name,
    meta: `${p.roleLabel} · ${p.email}`,
    atlasId: p.atlasId,
    href: `/admin/users/admins/profile#${p.id}`,
    initials: p.initials,
    avatarVariant: p.avatarVariant,
  })),
];

// ============================================================
// HELPERS
// ============================================================

/** Case-insensitive substring filter on name | meta | atlasId */
export function filterSearchIndex(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCHABLE_INDEX.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.meta.toLowerCase().includes(q) ||
      r.atlasId.toLowerCase().includes(q)
  );
}

export interface SearchGroup {
  type: SearchEntityType;
  results: SearchResult[];
}

const GROUP_ORDER: SearchEntityType[] = [
  'candidate',
  'client',
  'specialist',
  'manager',
  'admin',
];

/** Group results by entityType in display order, capping each group */
export function groupResultsByType(results: SearchResult[], perGroupLimit = 5): SearchGroup[] {
  return GROUP_ORDER.map((type) => ({
    type,
    results: results.filter((r) => r.entityType === type).slice(0, perGroupLimit),
  })).filter((g) => g.results.length > 0);
}

/** Flatten grouped results back to a list — order matches dropdown render order */
export function flattenGrouped(groups: SearchGroup[]): SearchResult[] {
  return groups.flatMap((g) => g.results);
}

/** Display label for each entity type (used in group headers + chips) */
export const ENTITY_TYPE_LABELS: Record<SearchEntityType, string> = {
  candidate: 'Candidates',
  client: 'Clients',
  specialist: 'Specialists',
  manager: 'Manager',
  admin: 'Admins',
};

/** Short uppercase chip label */
export const ENTITY_TYPE_CHIPS: Record<SearchEntityType, string> = {
  candidate: 'CAND',
  client: 'CLIENT',
  specialist: 'SPEC',
  manager: 'MGR',
  admin: 'ADMIN',
};
