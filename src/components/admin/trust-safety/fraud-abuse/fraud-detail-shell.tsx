/**
 * Phase 15a — Fraud alert detail shell.
 *
 * admin.html CSS: .fr-detail-wrap + .fr-breadcrumb + .fr-body (L15929-15979)
 * admin.html markup: L39545-40310
 *
 * max-w 1320 (NOT 1400). padding 22px 32px 64px. body gap 24px.
 * Breadcrumb: mono 11px inline-flex, no back-arrow — simple text chain.
 * Actions live inside hero (hero-top right side), NOT as separate row.
 */
import type { FraudAlertProfile } from '@/lib/mock-data/admin/fraud-alerts-data';
import { FraudHero } from './fraud-hero';
import { FraudRail } from './fraud-rail';
import { FraudSubPlaceholder } from './sections/fraud-sub-placeholder';

interface FraudDetailShellProps {
  alert: FraudAlertProfile;
}

export function FraudDetailShell({ alert }: FraudDetailShellProps) {
  return (
    <div className="mx-auto max-w-[1320px] pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb — fr-breadcrumb */}
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

      {/* 2-col body — fr-body: gap 24px, rail 320px */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[24px] items-start max-[1100px]:grid-cols-1">
        <main className="min-w-0">
          {alert.sections.map((section) => (
            <FraudSubPlaceholder key={section.id} section={section} />
          ))}
        </main>

        <FraudRail alert={alert} />
      </div>
    </div>
  );
}
