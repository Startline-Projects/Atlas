/**
 * Phase 15a — Fraud alert detail shell.
 * Phase 15b — Conditional rendering for §01/§02/§03 real components.
 *
 * admin.html CSS: .fr-detail-wrap + .fr-breadcrumb + .fr-body (L15929-15979)
 * admin.html markup: L39545-40310
 *
 * max-w 1320. padding 22px 32px 64px. body gap 24px.
 * §01/§02/§03 render real component if signalsData/relatedData/anomaliesData present,
 * else fall back to FraudSubPlaceholder. §04/§05/§06 always placeholders (15c).
 */
import type { FraudAlertProfile } from '@/lib/mock-data/admin/fraud-alerts-data';
import { FraudHero } from './fraud-hero';
import { FraudRail } from './fraud-rail';
import { FraudSubPlaceholder } from './sections/fraud-sub-placeholder';
import { FraudSectionSignals } from './sections/fraud-section-signals';
import { FraudSectionRelated } from './sections/fraud-section-related';
import { FraudSectionAnomalies } from './sections/fraud-section-anomalies';
import { FraudSectionDocuments } from './sections/fraud-section-documents';
import { FraudSectionTimeline } from './sections/fraud-section-timeline';
import { FraudSectionNotes } from './sections/fraud-section-notes';

interface FraudDetailShellProps {
  alert: FraudAlertProfile;
}

export function FraudDetailShell({ alert }: FraudDetailShellProps) {
  /* Quick lookup of section meta by id */
  const sectionById = Object.fromEntries(alert.sections.map((s) => [s.id, s]));

  return (
    <div className="mx-auto max-w-[1320px] pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb */}
      <div className="inline-flex items-center gap-[6px] font-mono text-[11px] text-[var(--ink-mute)] mb-[18px] tracking-[0.02em]">
        <a
          href="/admin/trust-safety/fraud-abuse"
          className="text-[var(--ink-mute)] no-underline cursor-pointer transition-colors duration-[120ms] ease hover:text-[var(--ink)]"
        >
          Fraud &amp; abuse
        </a>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <a
          href="/admin/trust-safety/fraud-abuse"
          className="text-[var(--ink-mute)] no-underline cursor-pointer transition-colors duration-[120ms] ease hover:text-[var(--ink)]"
        >
          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
        </a>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">
          {alert.atlasId} · {alert.title.split(' · ')[1] || alert.title}
        </span>
      </div>

      <FraudHero alert={alert} />

      {/* 2-col body */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[24px] items-start max-[1100px]:grid-cols-1">
        <main className="min-w-0">
          {/* §01 Signals — real or placeholder */}
          {alert.signalsData ? (
            <FraudSectionSignals data={alert.signalsData} />
          ) : (
            sectionById['signals'] && (
              <FraudSubPlaceholder section={sectionById['signals']} message="No signals data available for this alert." />
            )
          )}

          {/* §02 Related accounts — real or single-account message */}
          {alert.relatedData ? (
            <FraudSectionRelated data={alert.relatedData} />
          ) : (
            sectionById['related-accounts'] && (
              <FraudSubPlaceholder
                section={sectionById['related-accounts']}
                message="No related entities data available."
              />
            )
          )}

          {/* §03 Behavioral anomalies — real or placeholder */}
          {alert.anomaliesData ? (
            <FraudSectionAnomalies data={alert.anomaliesData} />
          ) : (
            sectionById['anomalies'] && (
              <FraudSubPlaceholder section={sectionById['anomalies']} message="No behavioral anomalies recorded." />
            )
          )}

          {/* §04 Documents — real or placeholder */}
          {alert.documentsData ? (
            <FraudSectionDocuments data={alert.documentsData} />
          ) : (
            sectionById['documents'] && (
              <FraudSubPlaceholder section={sectionById['documents']} message="No documents attached to this alert." />
            )
          )}

          {/* §05 Timeline — real or placeholder */}
          {alert.timelineData ? (
            <FraudSectionTimeline data={alert.timelineData} />
          ) : (
            sectionById['timeline'] && (
              <FraudSubPlaceholder section={sectionById['timeline']} message="No timeline events recorded." />
            )
          )}

          {/* §06 Notes — real or placeholder */}
          {alert.notesData ? (
            <FraudSectionNotes data={alert.notesData} />
          ) : (
            sectionById['notes'] && (
              <FraudSubPlaceholder section={sectionById['notes']} message="No admin notes for this alert yet." />
            )
          )}
        </main>

        <FraudRail alert={alert} />
      </div>
    </div>
  );
}
