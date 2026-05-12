/**
 * Phase 16a — Incident detail shell.
 *
 * admin.html: L40659-41348
 *
 * fr-detail-wrap chrome (REUSE from Phase 15 fraud).
 * max-w 1320 / pt-22 / px-32 / pb-64.
 * Breadcrumb 3-segment / hero / 2-col body (main + 320px rail).
 */
import type { IncidentProfile } from '@/lib/mock-data/admin/incidents-data';
import { IncidentHero } from './incident-hero';
import { IncidentRail } from './incident-rail';
import { IncidentSubPlaceholder } from './sections/incident-sub-placeholder';

interface IncidentDetailShellProps {
  incident: IncidentProfile;
}

export function IncidentDetailShell({ incident }: IncidentDetailShellProps) {
  return (
    <div className="mx-auto max-w-[1320px] pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-[6px] font-mono text-[11px] text-[var(--ink-mute)] mb-[18px] tracking-[0.02em]">
        <a
          href="/admin/trust-safety/security-incidents"
          className="text-[var(--ink-mute)] no-underline cursor-pointer transition-colors duration-[120ms] ease hover:text-[var(--ink)]"
        >
          Security incidents
        </a>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <a
          href="/admin/trust-safety/security-incidents"
          className="text-[var(--ink-mute)] no-underline cursor-pointer transition-colors duration-[120ms] ease hover:text-[var(--ink)]"
        >
          {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
        </a>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">
          {incident.breadcrumbCurrent}
        </span>
      </div>

      <IncidentHero incident={incident} />

      {/* 2-col body */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[24px] items-start max-[1100px]:grid-cols-1">
        <main className="min-w-0">
          {incident.sections.map((section) => (
            <IncidentSubPlaceholder key={section.id} section={section} />
          ))}
        </main>

        <IncidentRail incident={incident} />
      </div>
    </div>
  );
}
