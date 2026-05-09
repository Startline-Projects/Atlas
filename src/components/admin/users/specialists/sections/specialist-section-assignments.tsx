'use client';

import Link from 'next/link';
import type { SpecialistProfile } from '@/lib/mock-data/admin/specialist-profiles-data';
import { cn } from '@/lib/utils/cn';

interface SpecialistSectionAssignmentsProps {
  profile: SpecialistProfile;
}

type Assignments = NonNullable<SpecialistProfile['assignments']>;
type AssignmentList = NonNullable<Assignments['candidates']>;
type AssignmentRow = AssignmentList['rows'][number];

// admin.html lines 4688-4699: 12 avatar gradient variants (av-1..av-12)
const AVATAR_GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(135deg, #D9A77F, #8B5A3C)',
  2: 'linear-gradient(135deg, #7BA8D9, #3F6CA1)',
  3: 'linear-gradient(135deg, #B89BD6, #6E3FE0)',
  4: 'linear-gradient(135deg, #C7CFA8, #6B8E23)',
  5: 'linear-gradient(135deg, #E8B4B8, #8B5A6F)',
  6: 'linear-gradient(135deg, #F0CC4F, #B8911E)',
  7: 'linear-gradient(135deg, #9CC9C2, #4D8A82)',
  8: 'linear-gradient(135deg, #DCA294, #8B4F47)',
  9: 'linear-gradient(135deg, #A4B5D8, #4D6699)',
  10: 'linear-gradient(135deg, #C9B8A4, #7A6B57)',
  11: 'linear-gradient(135deg, #DD9F70, #8B5C3C)',
  12: 'linear-gradient(135deg, #B5C7A8, #5C7A4D)',
};

// admin.html lines 7699-7712: a-status default = success-bg, warn = amber-bg, neutral = cream-deep
function statusPillClass(variant: AssignmentRow['statusVariant']): string {
  switch (variant) {
    case 'warn':
      return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'neutral':
      return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
    default:
      return 'bg-[var(--success-bg)] text-[var(--success)]';
  }
}

// Shared row className — applied to both <Link> (resolvable id) and <button> (fictional fallback)
// admin.html lines 7665-7712: assignment row — grid auto/1fr/auto, dashed bottom, hover #FCF9F1
const ROW_CLASSNAME =
  'grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[12px] items-center w-full text-left px-[16px] py-[10px] border-b border-l-0 border-r-0 border-t-0 border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px] bg-transparent cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1] no-underline text-inherit';

function AssignmentRowButton({ row }: { row: AssignmentRow }) {
  // Compute href when row.id resolves to an existing detail page (Steps 5/6 routes).
  const href =
    row.id && row.action === 'open-candidate'
      ? `/admin/users/candidates/${row.id}`
      : row.id && row.action === 'open-client'
        ? `/admin/users/clients/${row.id}`
        : null;

  // Inner row content — identical for both Link and button paths
  const inner = (
    <>
      {/* admin.html line 18799: row-avatar (28x28 in row context, font 11px) */}
      <span
        className="w-[28px] h-[28px] rounded-full grid place-items-center font-display text-[11px] font-medium text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
        style={{ background: AVATAR_GRADIENTS[row.avatar] }}
        aria-hidden="true"
      >
        {row.initials}
      </span>
      {/* admin.html lines 18800-18803: a-name + a-meta */}
      <div className="min-w-0">
        <div className="font-semibold text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis">
          {row.name}
        </div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px] whitespace-nowrap overflow-hidden text-ellipsis">
          {row.meta}
        </div>
      </div>
      {/* admin.html line 18804: a-status pill */}
      <span
        className={cn(
          'font-mono text-[9px] tracking-[0.1em] uppercase font-semibold py-[2px] px-[7px] rounded-[3px] whitespace-nowrap',
          statusPillClass(row.statusVariant)
        )}
      >
        {row.statusLabel}
      </span>
    </>
  );

  // When id resolves to existing detail page → Next.js <Link> (prefetches on hover, client-side nav)
  if (href) {
    return (
      <Link
        href={href}
        data-sp-action={row.action}
        {...(row.action === 'open-candidate' ? { 'data-cand-id': row.id } : {})}
        {...(row.action === 'open-client' ? { 'data-cl-id': row.id } : {})}
        className={ROW_CLASSNAME}
      >
        {inner}
      </Link>
    );
  }

  // No resolvable id — fictional fixture row. Graceful degradation to button + console.log.
  return (
    <button
      type="button"
      data-sp-action={row.action}
      onClick={() => {
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-console
          console.log(`[specialist-assignments] row clicked: ${row.action} — "${row.name}"`);
        }
      }}
      className={ROW_CLASSNAME}
    >
      {inner}
    </button>
  );
}

// admin.html lines 18793-18838 — assignment list card (head + rows)
function AssignmentListCard({ list }: { list: AssignmentList }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* admin.html line 18794: sp-assignment-head */}
      <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
        <span>{list.title}</span>
        {/* admin.html line 18796: view-all button */}
        <button
          type="button"
          data-sp-action={list.viewAllAction}
          onClick={() => {
            if (typeof window !== 'undefined') {
              // eslint-disable-next-line no-console
              console.log(`[specialist-assignments] view-all clicked: ${list.viewAllAction}`);
            }
          }}
          className="font-body text-[11.5px] text-[var(--ink-soft)] normal-case tracking-normal font-medium bg-transparent border-0 cursor-pointer py-[4px] px-[8px] rounded-full transition-colors duration-[150ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
        >
          {list.viewAllLabel}
        </button>
      </div>
      {/* Rows */}
      {list.rows.map((row, idx) => (
        <AssignmentRowButton key={idx} row={row} />
      ))}
    </div>
  );
}

export function SpecialistSectionAssignments({ profile }: SpecialistSectionAssignmentsProps) {
  const assignments = profile.assignments;
  if (!assignments) {
    return null;
  }

  const { sectionStatus, candidates, clients, emptyState } = assignments;
  const hasLists = Boolean(candidates || clients);

  return (
    // admin.html line 18782: <section id="sp-section-assignments">
    <section
      id="sp-section-assignments"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px]"
    >
      {/* Section header — admin.html lines 18783-18789 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            04 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Candidates &amp; clients assigned
          </h2>
        </div>
        {/* admin.html line 18788: cd-section-status (default = ink-mute, neutral = cream-deep) */}
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold pt-[3px] pb-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[currentColor]",
            sectionStatus.variant === 'warn'
              ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
              : sectionStatus.variant === 'danger'
                ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
                : sectionStatus.variant === 'neutral'
                  ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
                  : 'bg-[var(--success-bg)] text-[var(--success)]'
          )}
        >
          {sectionStatus.label}
        </span>
      </div>

      {hasLists ? (
        // admin.html line 18791: 2-col grid (1fr 1fr, gap 14px)
        <div className="grid grid-cols-2 gap-[14px] max-[720px]:grid-cols-1">
          {candidates && <AssignmentListCard list={candidates} />}
          {clients && <AssignmentListCard list={clients} />}
        </div>
      ) : emptyState ? (
        // Inactive specialists — empty state
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
          <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--ink)] mb-[6px]">
            {emptyState.title}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
            {emptyState.detail}
          </div>
        </div>
      ) : null}
    </section>
  );
}
