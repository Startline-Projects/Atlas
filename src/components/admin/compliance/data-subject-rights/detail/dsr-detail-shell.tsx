import Link from 'next/link';
import type { DsrDetail } from '@/lib/mock-data/admin/data-subject-rights-data';
import { DsrTypeBadge } from '../dsr-type-badge';
import { DsrJurisdictionBadge } from '../dsr-jurisdiction-badge';
import { DsrIdGateSection } from './dsr-id-gate';
import { DsrSubjectCardSection } from './dsr-subject-card';
import { DsrHeroMoreMenu } from './dsr-hero-more-menu';
import { DsrGroundsBalance } from './dsr-grounds-balance';
import { DsrScopeSplit } from './dsr-scope-split';
import { DsrAuditChain } from './dsr-audit-chain';
import { DsrNotesSection } from './dsr-notes-section';
import { LrCountdownCard } from '../../legal-requests/detail/lr-countdown-card';
import { LrCounselCard } from '../../legal-requests/detail/lr-counsel-card';
import { LrQuickstatsCard } from '../../legal-requests/detail/lr-quickstats-card';

interface DsrDetailShellProps {
  detail: DsrDetail;
}

export function DsrDetailShell({ detail }: DsrDetailShellProps) {
  const heroValueVariant = (v?: 'warn' | 'success' | 'danger') => {
    if (v === 'warn') return 'text-[var(--amber)]';
    if (v === 'success') return 'text-[var(--success)]';
    if (v === 'danger') return 'text-[var(--danger)]';
    return 'text-[var(--ink)]';
  };

  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb */}
      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] mb-[20px] flex items-center gap-[8px] flex-wrap">
        <Link href="/admin/compliance/data-subject-rights" className="text-[var(--ink-soft)] hover:text-[var(--ink)] underline">
          {detail.breadcrumb.backLabel}
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <Link href="/admin/compliance/data-subject-rights" className="text-[var(--ink-soft)] hover:text-[var(--ink)] underline">
          {detail.breadcrumb.filterLabel}
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">{detail.breadcrumb.currentLabel}</span>
      </div>

      {/* Hero */}
      <div className="bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden relative">
        <span className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--danger)]" />

        {/* Hero top */}
        <div className="flex items-start gap-[20px] py-[22px] px-[26px] flex-wrap">
          <div className="flex-1 min-w-0">
            {/* id row */}
            <div className="flex items-center flex-wrap gap-[10px] mb-[10px]">
              <span className="font-mono text-[13px] font-bold text-[var(--ink)] tracking-[0.04em]">{detail.hero.id}</span>
              <span className="inline-flex items-center py-[3px] px-[9px] font-mono text-[10px] font-bold tracking-[0.04em] rounded-[3px] uppercase bg-[rgba(110,63,224,0.10)] text-[var(--super)]">
                {detail.hero.statusLabel}
              </span>
              <DsrTypeBadge variant={detail.hero.type.variant} label={detail.hero.type.label} />
              <DsrJurisdictionBadge variant={detail.hero.jurisdiction.variant} label={detail.hero.jurisdiction.label} {...(detail.hero.jurisdiction.flagStyle ? { flagStyle: detail.hero.jurisdiction.flagStyle } : {})} />
              <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">{detail.hero.filedMeta}</span>
            </div>

            {/* title */}
            <h1 className="font-display text-[26px] font-medium tracking-[-0.015em] text-[var(--ink)] leading-[1.2] mb-[10px]">
              {detail.hero.title}
            </h1>

            {/* subtitle */}
            <div
              className="font-body text-[13.5px] text-[var(--ink-soft)] leading-[1.6] [&_a]:text-[var(--ink-soft)] [&_a]:underline [&_a]:cursor-pointer"
              dangerouslySetInnerHTML={{ __html: detail.hero.subtitleHtml }}
            />
          </div>

          {/* Actions */}
          <div className="inline-flex gap-[8px] flex-wrap items-start flex-shrink-0">
            <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] whitespace-nowrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Re-verify ID
            </button>
            <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] whitespace-nowrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Adjust scope
            </button>
            <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer transition-all hover:bg-[var(--ink-soft)] whitespace-nowrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Execute deletion
            </button>
            <DsrHeroMoreMenu />
          </div>
        </div>

        {/* Hero stats */}
        <div className="border-t border-dashed border-[var(--line)] grid grid-cols-4 gap-0 max-[920px]:grid-cols-2 max-[560px]:grid-cols-1">
          {detail.heroStats.map((stat, idx) => (
            <div
              key={idx}
              className={`py-[14px] px-[22px] ${idx < detail.heroStats.length - 1 ? 'border-r border-dashed border-[var(--line)]' : ''}`}
            >
              <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
                {stat.label}
              </div>
              <div
                className={`font-display text-[16px] font-medium tracking-[-0.01em] ${heroValueVariant(stat.variant)}`}
                style={stat.valueStyle}
              >
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[3px] leading-[1.4]">
                {stat.meta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-col body */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[24px] items-start max-[1100px]:grid-cols-1">
        {/* Main */}
        <main className="min-w-0">
          <DsrIdGateSection gate={detail.idGate} />

          {detail.groundsBalance && (
            <section id="dsr-section-grounds" className="mb-[28px]">
              <div className="flex items-baseline gap-[12px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">01</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">
                    Article 17 grounds analysis
                  </h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    subject's invoked right vs Atlas's overriding exemptions · DPO assessment · balancing test
                  </div>
                </div>
              </div>
              <DsrGroundsBalance balance={detail.groundsBalance} />
            </section>
          )}

          {detail.scope && (
            <section id="dsr-section-scope" className="mb-[28px]">
              <div className="flex items-baseline gap-[12px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">02</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">
                    Deletion scope preview
                  </h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    data categories with disposition · delete-side is irreversible · retain-side requires legal-basis tag · preview before execute
                  </div>
                </div>
              </div>
              <DsrScopeSplit scope={detail.scope} />
            </section>
          )}

          {detail.audit && (
            <section id="dsr-section-audit" className="mb-[28px]">
              <div className="flex items-baseline gap-[12px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">03</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">
                    Action timeline
                  </h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    chronological log · 30-day SLA clock started Apr 28 · all actions audit-logged · Article 30 record-of-processing
                  </div>
                </div>
              </div>
              <DsrAuditChain entries={detail.audit} />
            </section>
          )}

          {detail.notes && (
            <section id="dsr-section-notes" className="mb-[28px]">
              <div className="flex items-baseline gap-[12px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">04</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">
                    Internal DPO notes
                  </h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    privileged compliance work product · admin-only · NOT shared with subject · audit-logged
                  </div>
                </div>
              </div>
              <DsrNotesSection existing={detail.notes.existing} composer={detail.notes.composer} />
            </section>
          )}
        </main>

        {/* Rail */}
        <aside
          className="self-start sticky top-[88px] flex flex-col gap-[14px] max-[1100px]:static"
        >
          <LrCountdownCard
            eyebrow={detail.countdown.eyebrow}
            label={detail.countdown.label}
            cells={[
              { value: detail.countdown.days, label: 'Days' },
              { value: detail.countdown.hours, label: 'Hours' },
              { value: detail.countdown.minutes, label: 'Minutes' },
            ]}
            barFillPct={detail.countdown.barFillPct}
            meta={detail.countdown.metaHtml}
          />
          <DsrSubjectCardSection card={detail.subjectCard} />
          <LrQuickstatsCard title="Related items" stats={detail.quickstats} note={detail.quickstatsNote} />
          <LrCounselCard
            title="Assigned DPO"
            name={detail.dpoCounsel.name}
            firm={detail.dpoCounsel.firm}
            initials={detail.dpoCounsel.initials}
            avatarGradient={detail.dpoCounsel.avatarGradient}
            metaRows={detail.dpoCounsel.metaRows}
          />
        </aside>
      </div>
    </div>
  );
}
