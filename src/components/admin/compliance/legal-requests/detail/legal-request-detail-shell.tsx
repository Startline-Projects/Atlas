import Link from 'next/link';
import type { LegalRequestDetail } from '@/lib/mock-data/admin/legal-requests-data';
import { LrGagBanner } from './lr-gag-banner';
import { LrActionCard } from './lr-action-card';
import { LrDocCard } from './lr-doc-card';
import { LrSubjectTree } from './lr-subject-tree';
import { LrDraftTabs } from './lr-draft-tabs';
import { LrAuditChain } from './lr-audit-chain';
import { LrNotesSection } from './lr-notes-section';
import { LrCountdownCard } from './lr-countdown-card';
import { LrCounselCard } from './lr-counsel-card';
import { LrQuickstatsCard } from './lr-quickstats-card';
import { LrHeroMoreMenu } from './lr-hero-more-menu';

interface LegalRequestDetailShellProps {
  detail: LegalRequestDetail;
}

export function LegalRequestDetailShell({ detail }: LegalRequestDetailShellProps) {
  return (
    <div className="max-w-[1320px] mx-auto pt-[22px] px-[32px] pb-[64px] max-[720px]:pt-[18px] max-[720px]:px-[18px] max-[720px]:pb-[48px]">
      {/* fr-breadcrumb */}
      <div className="inline-flex items-center gap-[6px] font-mono text-[11px] tracking-[0.02em] text-[var(--ink-mute)] mb-[18px] flex-wrap">
        <Link href="/admin/compliance/legal-requests" className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]">
          Legal requests
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <Link href="/admin/compliance/legal-requests" className="text-[var(--ink-mute)] no-underline hover:text-[var(--ink)] cursor-pointer transition-colors duration-[120ms]">
          Subpoenas
        </Link>
        <span className="text-[var(--ink-mute)] opacity-50">›</span>
        <span className="text-[var(--ink)] font-semibold">LR-2026-0023 · SDNY · Vorona Capital</span>
      </div>

      {/* fr-hero.high */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[24px_28px] mb-[18px] relative overflow-hidden">
        <span className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--danger)]" />

        {/* fr-hero-top */}
        <div className="flex items-start justify-between gap-[20px] flex-wrap mb-[18px]">
          {/* LEFT: id-row + title + subtitle */}
          <div className="flex-1 min-w-0">
            {/* fr-hero-id-row */}
            <div className="flex items-center gap-[10px] flex-wrap mb-[6px]">
              <span className="font-mono text-[12px] font-bold tracking-[0.06em] text-[var(--ink)]">LR-2026-0023</span>
              <span className="inline-block py-[3px] px-[8px] rounded-[3px] bg-[var(--amber-bg)] text-[var(--amber)] font-mono text-[9.5px] font-bold tracking-[0.06em] uppercase">
                Under review
              </span>
              <span className="inline-flex items-center gap-[5px] py-[3px] px-[8px] font-mono text-[10px] font-bold tracking-[0.04em] rounded-[4px] bg-[var(--danger-bg)] text-[var(--danger)] border border-[rgba(194,65,43,0.3)] whitespace-nowrap">
                Grand Jury Subpoena
              </span>
              <span className="inline-flex items-center gap-[6px] py-[3px] px-[9px] font-mono text-[10.5px] font-semibold tracking-[0.04em] rounded-[4px] bg-[var(--paper-deep)] text-[var(--danger)] border border-[rgba(194,65,43,0.3)] whitespace-nowrap">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--danger)] flex-shrink-0">
                  <path d="M3 21h18M5 21V10l7-7 7 7v11M9 21V13h6v8" />
                </svg>
                US District Court · SDNY
              </span>
            </div>
            <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] mb-[10px]">
              Received May 4 · 7d ago · case 1:26-cr-00284-AKH
            </div>

            {/* fr-hero-title */}
            <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] text-[var(--ink)] leading-[1.2] mb-[10px]">
              Grand jury subpoena re: Vorona Capital + 4 linked entities — criminal investigation
            </h1>

            {/* fr-hero-subtitle */}
            <div className="font-body text-[13px] text-[var(--ink-soft)] leading-[1.65] tracking-[-0.005em]" dangerouslySetInnerHTML={{__html: detail.hero.subtitle}} />
          </div>

          {/* RIGHT: fr-hero-actions */}
          <div className="inline-flex items-center gap-[8px] flex-wrap flex-shrink-0 max-[980px]:flex-wrap">
            <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--amber-bg)] border border-[var(--amber)] rounded-full text-[var(--amber)] cursor-pointer transition-all hover:bg-[var(--amber)] hover:text-[var(--paper)] whitespace-nowrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Reassign counsel
            </button>
            <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] whitespace-nowrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Open draft
            </button>
            <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer transition-all hover:bg-[var(--ink-soft)] whitespace-nowrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Submit response
            </button>
            <LrHeroMoreMenu />
          </div>
        </div>

        {/* fr-hero-stats */}
        <div className="grid grid-cols-4 gap-[14px] pt-[18px] border-t border-dashed border-t-[var(--line-soft)] max-[980px]:grid-cols-2 max-[720px]:grid-cols-1">
          <div className="flex flex-col gap-[4px]">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">Deadline</div>
            <div className="font-display text-[18px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--amber)]">May 25</div>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">14d remaining · 50% elapsed</div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">Issuing AUSA</div>
            <div className="font-display text-[18px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--ink)]">Sarah Chen</div>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">SDNY · criminal division</div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">Atlas counsel</div>
            <div className="font-display text-[18px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--ink)]">Cooley LLP</div>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">Michael Reeves · partner</div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">Records sought</div>
            <div className="font-display text-[18px] font-medium tracking-[-0.01em] leading-none tabular-nums text-[var(--ink)]">5 categories</div>
            <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] mt-[2px]">scope locked · all sub-§ confirmed</div>
          </div>
        </div>
      </div>

      {/* Gag banner */}
      {detail.gagBanner.title && <LrGagBanner title={detail.gagBanner.title} detail={detail.gagBanner.detail} daysRemaining={detail.gagBanner.daysRemaining} expirationDate={detail.gagBanner.expirationDate} />}

      {/* fr-body — 2-col grid */}
      <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-[24px] items-start max-[1100px]:grid-cols-1">
        {/* fr-main */}
        <main className="min-w-0">
          {detail.actionCard.heading && <LrActionCard eyebrow={detail.actionCard.eyebrow} heading={detail.actionCard.heading} cells={detail.actionCard.cells} />}

          {/* §01 Document */}
          <section id="lr-section-document" className="mb-[28px]">
            <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <div className="flex items-baseline gap-[12px]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">01</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Original document</h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">subpoena filed under seal · 12 pages · signed by AUSA Sarah Chen · received via SDNY Service Department</div>
                </div>
              </div>
              <button className="inline-flex items-center gap-[6px] py-[6px] px-[10px] font-mono text-[10px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] hover:border-[var(--line-strong)] flex-shrink-0 whitespace-nowrap">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Open full PDF
              </button>
            </div>
            {detail.docCard.filename && <LrDocCard filename={detail.docCard.filename} pages={detail.docCard.pages} filesize={detail.docCard.filesize} meta={detail.docCard.meta} sealText={detail.docCard.sealText} courtName={detail.docCard.courtName} jurisdiction={detail.docCard.jurisdiction} caseNumber={detail.docCard.caseNumber} title={detail.docCard.title} bodyText={detail.docCard.bodyText} />}
          </section>

          {/* §02 Subject */}
          <section id="lr-section-subject" className="mb-[28px]">
            <div className="flex items-baseline gap-[12px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">02</span>
              <div>
                <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Subject &amp; record scope</h2>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">5 entities named · 5 record categories · scope locked at intake · counsel-confirmed</div>
              </div>
            </div>
            <LrSubjectTree {...detail.subjectTree} />
          </section>

          {/* §03 Draft */}
          <section id="lr-section-draft" className="mb-[28px]">
            <div className="flex items-start justify-between gap-[16px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <div className="flex items-baseline gap-[12px]">
                <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">03</span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Response draft</h2>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">3 versions · counsel-drafted · v3 current · all versions preserved for legal record</div>
                </div>
              </div>
              <button className="inline-flex items-center gap-[6px] py-[6px] px-[10px] font-mono text-[10px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:text-[var(--ink)] hover:border-[var(--line-strong)] flex-shrink-0 whitespace-nowrap">
                Open editor
              </button>
            </div>
            <LrDraftTabs tabs={detail.draftTabs} activeTabId="v3" panelVersion={detail.draftPanel.version} panelMeta={detail.draftPanel.meta} paragraphs={detail.draftPanel.paragraphs} batesRange={detail.draftPanel.batesRange} />
          </section>

          {/* §04 Timeline */}
          <section id="lr-section-timeline" className="mb-[28px]">
            <div className="flex items-baseline gap-[12px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">04</span>
              <div>
                <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Action timeline</h2>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">chronological log of every action taken on this matter · timestamps in UTC · audit-locked</div>
              </div>
            </div>
            <LrAuditChain entries={detail.auditChain} />
          </section>

          {/* §05 Notes */}
          <section id="lr-section-notes">
            <div className="flex items-baseline gap-[12px] mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
              <span className="font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[var(--ink-mute)]">05</span>
              <div>
                <h2 className="font-display text-[18px] font-medium tracking-[-0.015em] text-[var(--ink)] mb-[3px] leading-[1.2]">Internal legal notes</h2>
                <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.5]">privileged work product · attorney-client communications · admin-only · do NOT export with response</div>
              </div>
            </div>
            <LrNotesSection notes={detail.notes} />
          </section>
        </main>

        {/* fr-rail */}
        <aside
          className="self-start sticky top-[88px] flex flex-col gap-[14px] max-[1100px]:static"
        >
          <LrCountdownCard eyebrow={detail.countdown.eyebrow} label={detail.countdown.label} cells={[{value: detail.countdown.days, label: 'Days'}, {value: detail.countdown.hours, label: 'Hours'}, {value: detail.countdown.minutes, label: 'Minutes'}]} barFillPct={detail.countdown.barFillPct} meta={detail.countdown.meta} variant="urgent" />
          <LrCounselCard {...detail.counsel} />
          <LrQuickstatsCard title="At a glance" stats={detail.quickstats1} />
          <LrQuickstatsCard title="Related items" stats={detail.quickstats2} note="Stripe + Wise have received parallel subpoenas (separate matters) per SDNY's standard practice. Coordination via Cooley." />
        </aside>
      </div>
    </div>
  );
}
