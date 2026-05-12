/**
 * Phase 9d + 10c + 11b + 12b + 13b-3 — Global Search Index
 *
 * Flat searchable index across all 10 admin entity types:
 * candidates (8) + clients (6) + specialists (11) + manager (1) + admins (5)
 *   + engagements (8) + jobs (10) + disputes (10) + reviews (10) + fraud (9) = 78 records,
 *   built once at module load.
 */

import { CANDIDATE_PROFILES } from './candidate-profiles-data';
import { CLIENT_PROFILES } from './client-profiles-data';
import { SPECIALIST_PROFILES } from './specialist-profiles-data';
import { MANAGER_PROFILES } from './manager-profiles-data';
import { ADMIN_PROFILES } from './admin-profiles-data';
import { ENGAGEMENT_PROFILES } from './engagement-profiles-data';
import { JOB_PROFILES } from './job-profiles-data';
import { DISPUTE_PROFILES } from './dispute-profiles-data';
import { REVIEW_PROFILES } from './review-profiles-data';
import { FRAUD_ALERT_PROFILES } from './fraud-alerts-data';

export type SearchEntityType =
  | 'candidate'
  | 'client'
  | 'specialist'
  | 'manager'
  | 'admin'
  | 'engagement'
  | 'job'
  | 'dispute'
  | 'review'
  | 'fraud';

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
  // 8 engagements
  ...Object.values(ENGAGEMENT_PROFILES).map((p): SearchResult => ({
    entityType: 'engagement',
    id: p.id,
    name: `${p.client.name} ↔ ${p.candidate.name}`,
    meta: `${p.client.flag} ↔ ${p.candidate.flag} · ${p.status} · engaged ${p.engagedDate}`,
    atlasId: p.atlasId,
    href: `/admin/operations/engagements/${p.id}`,
    initials: p.client.avatarInitials.charAt(0) + p.candidate.avatarInitials.charAt(0),
    avatarVariant: idHashToVariant(p.id),
  })),
  // 10 jobs
  ...Object.values(JOB_PROFILES).map((p): SearchResult => ({
    entityType: 'job',
    id: p.id,
    name: p.title,
    meta: `${p.client.name} · ${p.status} · ${p.category} · ${p.statusPillText}`,
    atlasId: p.atlasId,
    href: `/admin/operations/jobs/${p.id}`,
    initials: p.client.avatarInitials,
    avatarVariant: idHashToVariant(p.id),
  })),
  // 10 disputes (Phase 12b)
  ...Object.values(DISPUTE_PROFILES).map((p): SearchResult => ({
    entityType: 'dispute',
    id: p.id,
    name: `${p.claimant.name} ↔ ${p.respondent.name}`,
    meta: `${p.atlasId} · ${p.statusPillText} · ${p.titleItalic} · ${p.openedMeta}`,
    atlasId: p.atlasId,
    href: `/admin/operations/disputes/${p.id}`,
    initials: `${p.claimant.avatarInitials.charAt(0)}${p.respondent.avatarInitials.charAt(0)}`,
    avatarVariant: idHashToVariant(p.id),
  })),
  // 10 reviews (Phase 13b-3)
  ...Object.values(REVIEW_PROFILES).map((p): SearchResult => ({
    entityType: 'review',
    id: p.id,
    name: `${p.reviewerHero.name} → ${p.revieweeHero.name}`,
    meta: `${p.atlasId} · ${p.statusPillText} · ${p.ratingNum} ★ · ${p.postedMetaLine.split(' · ')[0]?.replace('posted ', '') ?? ''}`,
    atlasId: p.atlasId,
    href: `/admin/operations/reviews/${p.id}`,
    initials: `${p.reviewerHero.initials.charAt(0)}${p.revieweeHero.initials.charAt(0)}`,
    avatarVariant: idHashToVariant(p.id),
  })),
  // 9 fraud alerts (Phase 15c)
  ...Object.values(FRAUD_ALERT_PROFILES).map((p): SearchResult => ({
    entityType: 'fraud',
    id: p.id,
    name: p.title,
    meta: `${p.atlasId} · ${p.severity} · ${p.statusLabel} · ${p.detectedAgo}`,
    atlasId: p.atlasId,
    href: `/admin/trust-safety/fraud-abuse/${p.id}`,
    initials: 'FA',
    avatarVariant: idHashToVariant(p.id),
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
  'engagement',
  'job',
  'dispute',
  'review',
  'fraud',
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
  engagement: 'Engagements',
  job: 'Jobs',
  dispute: 'Disputes',
  review: 'Reviews',
  fraud: 'Fraud alerts',
};

/** Short uppercase chip label */
export const ENTITY_TYPE_CHIPS: Record<SearchEntityType, string> = {
  candidate: 'CAND',
  client: 'CLIENT',
  specialist: 'SPEC',
  manager: 'MGR',
  admin: 'ADMIN',
  engagement: 'ENG',
  job: 'JOB',
  dispute: 'DSP',
  review: 'REV',
  fraud: 'FRAUD',
};
