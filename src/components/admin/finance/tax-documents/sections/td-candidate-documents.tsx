'use client';

import { useState } from 'react';
import { candidateDocumentsHeader, candidateFilterChips, candidateDocRows } from '@/lib/mock-data/admin/tax-documents-data';
import { TaxFormChip } from '../tax-form-chip';

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  generated: { bg: 'bg-[var(--cream-deep)]', text: 'text-[var(--ink-soft)]' },
  efiled: { bg: 'bg-[rgba(46,125,84,0.10)]', text: 'text-[var(--success)]' },
  sent: { bg: 'bg-[rgba(110,63,224,0.10)]', text: 'text-[var(--super)]' },
  'needs-action': { bg: 'bg-[var(--danger-bg)]', text: 'text-[var(--danger)]' },
  renewal: { bg: 'bg-[var(--amber-bg)]', text: 'text-[var(--amber)]' },
  suspended: { bg: 'bg-[var(--amber-bg)]', text: 'text-[var(--amber)]' },
};

const DEADLINE_VARIANT: Record<string, string> = {
  met: 'text-[var(--success)]',
  warn: 'text-[var(--amber)]',
  danger: 'text-[var(--danger)]',
};

export function TdCandidateDocuments() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section id="td-section-documents" className="scroll-mt-[120px] mb-[28px]">
      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] text-[var(--ink)] mb-[4px] leading-[1.2]">
            {candidateDocumentsHeader.title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {candidateDocumentsHeader.meta}
          </div>
        </div>
        <div className="inline-flex gap-[8px]">
          <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filters
          </button>
          <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Search
          </button>
        </div>
      </div>

      <div className="inline-flex gap-[6px] flex-wrap mb-[12px]">
        {candidateFilterChips.map((chip) => {
          const active = activeFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`inline-flex items-center gap-[6px] py-[6px] px-[12px] font-body text-[12px] rounded-full cursor-pointer tracking-[-0.005em] transition-all ${active ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] font-semibold' : 'bg-[var(--paper-deep)] text-[var(--ink-mute)] border border-[var(--line)] font-medium hover:text-[var(--ink)] hover:border-[var(--line-strong)]'}`}
            >
              {chip.label}
              <span className={`font-mono text-[9.5px] py-[1px] px-[5px] rounded-[3px] font-semibold tracking-[0.04em] ${active ? 'bg-[rgba(251,248,242,0.18)] text-[var(--paper)]' : 'bg-[var(--cream-deep)] text-[var(--ink-mute)]'}`}>
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_50px_minmax(0,1fr)_130px_120px_130px_50px] gap-[10px] items-center p-[12px_18px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          <div>Candidate</div>
          <div>Country</div>
          <div>Form type</div>
          <div>Status</div>
          <div className="text-right">Earned 2025</div>
          <div>Deadline</div>
          <div></div>
        </div>

        {candidateDocRows.map((row) => {
          const ss = STATUS_STYLES[row.status] || { bg: 'bg-[var(--cream-deep)]', text: 'text-[var(--ink-soft)]' };
          const dv = row.deadlineVariant ? DEADLINE_VARIANT[row.deadlineVariant] : 'text-[var(--ink-soft)]';
          const rowBg = row.rowVariant === 'blocked' ? 'bg-[rgba(194,65,43,0.025)]' : row.rowVariant === 'warn' ? 'bg-[rgba(232,118,58,0.03)]' : '';
          const stripColor = row.rowVariant === 'blocked' ? 'bg-[var(--danger)]' : row.rowVariant === 'warn' ? 'bg-[var(--amber)]' : '';

          return (
            <div
              key={row.id}
              className={`relative grid grid-cols-[minmax(0,1fr)_50px_minmax(0,1fr)_130px_120px_130px_50px] gap-[10px] items-center p-[12px_18px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)] ${rowBg}`}
            >
              {row.rowVariant && (
                <span className={`absolute left-0 top-0 bottom-0 w-[3px] ${stripColor}`} />
              )}

              <div className="flex items-center gap-[10px] min-w-0">
                <div
                  className="w-[28px] h-[28px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium flex-shrink-0"
                  style={{ background: row.flagBg && !row.flagBg.includes('gradient') ? `linear-gradient(135deg, #6E4F8B, #3D2B4E)` : 'linear-gradient(135deg, #6E4F8B, #3D2B4E)' }}
                >
                  {row.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] truncate">{row.candidate}</div>
                  <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px] truncate">{row.id} · {row.country.toLowerCase()}</div>
                </div>
              </div>

              <div>
                <span
                  className="inline-block font-mono text-[9.5px] font-bold tracking-[0.06em] py-[3px] px-[7px] rounded-[3px] text-center min-w-[28px]"
                  style={{
                    background: row.flagBg || 'var(--ink)',
                    color: row.flagColor || 'var(--paper)',
                    border: row.flagBorder || 'none',
                  }}
                >
                  {row.country.slice(0, 2).toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-[4px] flex-wrap">
                {row.formChips.map((chip, idx) => (
                  <TaxFormChip key={idx} variant={chip} />
                ))}
              </div>

              <div>
                <span className={`inline-flex items-center font-mono text-[10px] font-bold tracking-[0.06em] uppercase py-[3px] px-[8px] rounded-[3px] ${ss.bg} ${ss.text}`}>
                  {row.statusText}
                </span>
              </div>

              <div className="font-display text-[13.5px] font-medium text-[var(--ink)] tracking-[-0.01em] tabular-nums text-right">
                {row.earned}<span className="font-mono text-[9.5px] font-bold text-[var(--ink-mute)] tracking-[0.06em] ml-[3px]">USD</span>
              </div>

              <div className={`font-mono text-[11px] tracking-[0.02em] font-semibold tabular-nums ${dv}`}>
                {row.deadlineVariant === 'met' && <span className="mr-[2px]">✓ </span>}{row.deadline}
                <span className="block text-[9.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em] mt-[2px]">{row.deadlineRel}</span>
              </div>

              <div className="flex justify-end">
                <button className="w-[28px] h-[28px] border border-[var(--line)] bg-[var(--paper)] rounded-full grid place-items-center text-[var(--ink-mute)] hover:bg-[var(--paper-deep)] cursor-pointer transition-colors" aria-label="Open">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">10 of 487 shown · canonical sample · sorted by action-priority then alphabetical</span>
        <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
          Load more (477 remaining) →
        </button>
      </div>
    </section>
  );
}
