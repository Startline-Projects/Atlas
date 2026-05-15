/**
 * Phase 16a — Incident detail shell.
 * Phase 16b — Conditional rendering for GDPR clock + §01/§03/§04 real sections.
 * Phase 16c — Conditional rendering for §02/§05 real sections.
 *
 * admin.html: L40659-41348
 *
 * fr-detail-wrap chrome (REUSE from Phase 15 fraud).
 * max-w 1320 / pt-22 / px-32 / pb-64.
 * Breadcrumb 3-segment / hero / 2-col body (main + 320px rail).
 * GDPR clock inside main column, before §01.
 *
 * All 5 sections: real component when data present, placeholder otherwise.
 */
import type { IncidentProfile } from '@/lib/mock-data/admin/incidents-data';
import { IncidentHero } from './incident-hero';
import { IncidentRail } from './incident-rail';
import { IncidentGDPRClock } from './incident-gdpr-clock';
import { IncidentSubPlaceholder } from './sections/incident-sub-placeholder';
import { IncidentSectionNotification } from './sections/incident-section-notification';
import { IncidentSectionDescription } from './sections/incident-section-description';
import { IncidentSectionActions } from './sections/incident-section-actions';
import { IncidentSectionTimeline } from './sections/incident-section-timeline';
import { IncidentSectionPostMortem } from './sections/incident-section-postmortem';

interface IncidentDetailShellProps {
  incident: IncidentProfile;
}

export function IncidentDetailShell({ incident }: IncidentDetailShellProps) {
  const sectionById = Object.fromEntries(incident.sections.map((s) => [s.id, s]));

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
          {/* GDPR countdown clock — inside main column (admin.html L40768, inside fr-main) */}
          {incident.gdprClock && <IncidentGDPRClock data={incident.gdprClock} />}

          {/* §01 Notification status — real or placeholder */}
          {incident.notificationData && sectionById['notification'] ? (
            <IncidentSectionNotification section={sectionById['notification']} data={incident.notificationData} />
          ) : (
            sectionById['notification'] && <IncidentSubPlaceholder section={sectionById['notification']} />
          )}

          {/* §02 Incident description — real or placeholder */}
          {incident.descriptionData && sectionById['description'] ? (
            <IncidentSectionDescription section={sectionById['description']} data={incident.descriptionData} />
          ) : (
            sectionById['description'] && <IncidentSubPlaceholder section={sectionById['description']} />
          )}

          {/* §03 Actions taken — real or placeholder */}
          {incident.actionsData && sectionById['actions'] ? (
            <IncidentSectionActions section={sectionById['actions']} data={incident.actionsData} />
          ) : (
            sectionById['actions'] && <IncidentSubPlaceholder section={sectionById['actions']} />
          )}

          {/* §04 Timeline — real or placeholder */}
          {incident.timelineData && sectionById['timeline'] ? (
            <IncidentSectionTimeline section={sectionById['timeline']} data={incident.timelineData} />
          ) : (
            sectionById['timeline'] && <IncidentSubPlaceholder section={sectionById['timeline']} />
          )}

          {/* §05 Post-mortem — real or placeholder */}
          {incident.postMortemData && sectionById['postmortem'] ? (
            <IncidentSectionPostMortem section={sectionById['postmortem']} data={incident.postMortemData} />
          ) : (
            sectionById['postmortem'] && <IncidentSubPlaceholder section={sectionById['postmortem']} />
          )}
        </main>

        <IncidentRail incident={incident} />
      </div>
    </div>
  );
}
