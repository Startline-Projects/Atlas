import Link from 'next/link';
import { AudImmutableBadge } from './aud-immutable-badge';
import { AudSummaryCard } from './aud-summary-card';
import { AudTriggerCard } from './aud-trigger-card';
import { AudHeroMoreMenu } from './aud-hero-more-menu';
import { AudImmutabilityCard } from './aud-immutability-card';
import { AudForensicGrid } from './aud-forensic-grid';
import { AudSubjectsList } from './aud-subjects-list';
import { AudDiffViewer } from './aud-diff-viewer';
import { AudRelatedActions } from './aud-related-actions';
import { AudContextNotes } from './aud-context-notes';
import { DsrSubjectCardSection } from '../../data-subject-rights/detail/dsr-subject-card';
import { LrCountdownCard } from '../../legal-requests/detail/lr-countdown-card';
import { LrQuickstatsCard } from '../../legal-requests/detail/lr-quickstats-card';
import type { AudDetail } from '@/lib/mock-data/admin/audit-logs-data';

interface AudDetailShellProps {
  detail: AudDetail;
}

export function AudDetailShell({ detail }: AudDetailShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* Breadcrumb */}
      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.04em] mb-[20px] flex items-center gap-[8px] flex-wrap">
        <Link href="/admin/compliance/audit-logs" className="text-[var(--ink-soft)] hover:text-[var(--ink)] underline">
          {detail.breadcrumb.backLabel}
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <Link href="/admin/compliance/audit-logs" className="text-[var(--ink-soft)] hover:text-[var(--ink)] underline">
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
              <span className="font-mono text-[13px] font-bold text-[var(--ink)] tracking-[0.04em]">
                {detail.hero.id}
              </span>
              <span className="inline-flex items-center py-[3px] px-[9px] font-mono text-[10px] font-bold tracking-[0.04em] uppercase rounded-[3px] bg-[rgba(110,63,224,0.10)] text-[var(--super)]">
                {detail.hero.actionChip.label}
              </span>
              <span className="inline-flex items-center py-[3px] px-[9px] font-mono text-[10px] font-bold tracking-[0.04em] uppercase rounded-[3px] bg-[rgba(34,177,76,0.12)] text-[var(--success)]">
                {detail.hero.result.label}
              </span>
              <AudImmutableBadge />
              <span className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
                {detail.hero.timestamp}
              </span>
            </div>

            {/* title */}
            <h1 className="font-display text-[26px] font-medium tracking-[-0.015em] text-[var(--ink)] leading-[1.2] mb-[10px]">
              {detail.hero.title}
            </h1>

            {/* subtitle */}
            <div
              className="font-body text-[13.5px] text-[var(--ink-soft)] leading-[1.6] [&_a]:text-[var(--super)] [&_a]:underline [&_a]:cursor-pointer"
              dangerouslySetInnerHTML={{ __html: detail.hero.subtitleHtml }}
            />
          </div>

          {/* Actions */}
          <div className="inline-flex gap-[8px] flex-wrap items-start flex-shrink-0">
            {detail.heroActions.map((action, idx) => (
              <button
                key={idx}
                className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full text-[var(--paper)] cursor-pointer transition-all whitespace-nowrap ${
                  action.isPrimary
                    ? 'bg-[var(--ink)] border border-[var(--ink)] hover:bg-[var(--ink-soft)]'
                    : 'bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
                }`}
              >
                {action.label}
              </button>
            ))}
            <AudHeroMoreMenu
              navigate={detail.heroMoreMenu.navigateSection}
              forensics={detail.heroMoreMenu.forensicsSection}
              disabled={detail.heroMoreMenu.disabledSection}
            />
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
                className={`font-display text-[16px] font-medium tracking-[-0.01em] ${
                  stat.variant === 'danger' ? 'text-[var(--danger)]' : 'text-[var(--ink)]'
                }`}
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
          <AudSummaryCard
            variant={detail.summary.variant}
            eyebrow={detail.summary.eyebrow}
            title={detail.summary.title}
            detailHtml={detail.summary.detailHtml}
          />

          <AudTriggerCard
            eyebrow={detail.trigger.eyebrow}
            titleHtml={detail.trigger.titleHtml}
            detailHtml={detail.trigger.detailHtml}
          />

          {/* Section 01 — Forensic context */}
          <section id="aud-section-forensic" className="mb-[28px]">
            <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <div className="flex items-baseline gap-[12px]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">01</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Forensic context</h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    session details · network · device · MFA proof · all captured at action time · cannot be altered
                  </div>
                </div>
              </div>
            </div>
            <AudForensicGrid
              title={detail.forensicGrid.title}
              meta={detail.forensicGrid.meta}
              cells={detail.forensicGrid.cells}
            />
          </section>

          {/* Section 02 — Subjects affected */}
          <section id="aud-section-subjects" className="mb-[28px]">
            <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <div className="flex items-baseline gap-[12px]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">02</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Subjects affected</h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    5 entities transitioned · all linked through Vorona ring · same admin action · cascade complete in 217ms
                  </div>
                </div>
              </div>
            </div>
            <AudSubjectsList subjects={detail.subjects} />
          </section>

          {/* Section 03 — Before/After state diff */}
          <section id="aud-section-diff" className="mb-[28px]">
            <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <div className="flex items-baseline gap-[12px]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">03</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Before/After state diff</h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    per-entity changes · captured at action time · diff guarantees field-level reproducibility · forensic-grade
                  </div>
                </div>
              </div>
            </div>
            <AudDiffViewer
              title={detail.diff.title}
              meta={detail.diff.meta}
              entities={detail.diff.entities}
              expandLabel={detail.diff.expandLabel}
            />
          </section>

          {/* Section 04 — Related actions chain */}
          <section id="aud-section-related" className="mb-[28px]">
            <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <div className="flex items-baseline gap-[12px]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">04</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Related actions chain</h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    audit entries immediately before + after this one · same session · same matter · click any to jump
                  </div>
                </div>
              </div>
            </div>
            <AudRelatedActions
              title={detail.relatedActions.title}
              meta={detail.relatedActions.meta}
              rows={detail.relatedActions.rows}
            />
          </section>

          {/* Section 05 — Context notes */}
          <section id="aud-section-notes" className="mb-[28px]">
            <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <div className="flex items-baseline gap-[12px]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">05</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Context notes</h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">
                    admins can ADD notes after the fact · cannot edit or delete · each note timestamped + attributed + chain-linked
                  </div>
                </div>
              </div>
            </div>
            <AudContextNotes
              meta={detail.contextNotes.meta}
              immutBadge={detail.contextNotes.immutBadge}
              notes={detail.contextNotes.notes}
              composer={detail.contextNotes.composer}
            />
          </section>
        </main>

        {/* Rail */}
        <aside className="self-start sticky top-[88px] flex flex-col gap-[14px] max-[1100px]:static">
          <AudImmutabilityCard
            title={detail.immutability.title}
            description={detail.immutability.description}
            metaRows={detail.immutability.metaRows}
          />

          <DsrSubjectCardSection
            card={{
              title: 'Actor',
              name: detail.actor.name,
              subjectId: detail.actor.subjectId,
              initials: detail.actor.initials,
              avatarGradient: detail.actor.avatarGradient,
              metaRows: detail.actor.metaRows,
            }}
            actionLabels={[detail.actor.actionLabel]}
          />

          <LrQuickstatsCard
            title="Cross-references"
            stats={detail.crossReferences.stats}
            note={detail.crossReferences.note}
          />
        </aside>
      </div>
    </div>
  );
}
