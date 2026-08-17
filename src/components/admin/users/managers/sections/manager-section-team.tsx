'use client';

import Link from 'next/link';
import type {
  ManagerProfile,
  ManagedSpecialistCard,
  ManagerAssignmentRow,
  ManagerAssignmentList,
  TeamDotVariant,
} from '@/lib/mock-data/admin/manager-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ManagerSectionTeamProps {
  profile: ManagerProfile;
}

// admin.html lines 4688-4699: 12 av-N gradient variants (mirror Phase 7f)
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

// admin.html lines 8310-8318 — t-dot variants
function dotVariantClass(variant: TeamDotVariant): string {
  switch (variant) {
    case 'warn':
      return 'bg-[var(--amber)]';
    case 'danger':
      return 'bg-[var(--danger)]';
    case 'muted':
      return 'bg-[var(--ink-mute)]';
    default:
      return 'bg-[var(--success)]';
  }
}

// admin.html lines 8264-8318 — mgr-team-card as Next.js Link
function TeamCard({ card }: { card: ManagedSpecialistCard }) {
  return (
    <Link
      href={`/admin/users/specialists/${card.id}`}
      data-mgr-action="open-specialist"
      data-spec-id={card.id}
      className="grid grid-cols-[auto_minmax(0,1fr)] gap-[10px] items-center p-[10px] rounded-[var(--r-sm)] bg-[var(--paper-deep)] cursor-pointer transition-[background-color,transform] duration-[120ms] ease no-underline hover:bg-[var(--cream-deep)] hover:-translate-y-[1px]"
    >
      {/* admin.html line 8280: t-avatar 32x32 with gradient via inline style */}
      <div
        className="w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[11px] text-[var(--paper)] font-medium flex-shrink-0"
        style={{ background: card.avatarGradient }}
        aria-hidden="true"
      >
        {card.initials}
      </div>
      <div className="min-w-0">
        {/* admin.html line 8291: t-name */}
        <div className="text-[12.5px] font-semibold text-[var(--ink)] leading-[1.2] whitespace-nowrap overflow-hidden text-ellipsis">
          {card.name}
        </div>
        {/* admin.html line 8300: t-meta with t-dot */}
        <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px] flex items-center gap-[4px]">
          <span
            className={cn('w-[6px] h-[6px] rounded-full flex-shrink-0', dotVariantClass(card.dotVariant))}
            aria-hidden="true"
          />
          {card.meta}
        </div>
      </div>
    </Link>
  );
}

// admin.html lines 7665-7712 — sp-assignment-row as <button> (mirror Phase 7f, no Link since these are mgr's personal pipeline with fictional names)
function AssignmentRowButton({ row, sectionLabel }: { row: ManagerAssignmentRow; sectionLabel: string }) {
  const statusPillClass =
    row.statusVariant === 'warn'
      ? 'bg-[var(--amber-bg)] text-[var(--amber)]'
      : row.statusVariant === 'neutral'
        ? 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
        : 'bg-[var(--success-bg)] text-[var(--success)]';
  return (
    <button
      type="button"
      data-mgr-action={row.action}
      onClick={() => {
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-console
          console.log(`[manager-team] ${sectionLabel} row clicked: ${row.action} — "${row.name}"`);
        }
      }}
      className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[12px] items-center w-full text-left px-[16px] py-[10px] border-b border-l-0 border-r-0 border-t-0 border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px] bg-transparent cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1]"
    >
      <span
        className="w-[28px] h-[28px] rounded-full grid place-items-center font-display text-[11px] font-medium text-[var(--paper)] flex-shrink-0 tracking-[-0.01em]"
        style={{ background: AVATAR_GRADIENTS[row.avatar] }}
        aria-hidden="true"
      >
        {row.initials}
      </span>
      <div className="min-w-0">
        <div className="font-semibold text-[var(--ink)] whitespace-nowrap overflow-hidden text-ellipsis">{row.name}</div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[1px] whitespace-nowrap overflow-hidden text-ellipsis">
          {row.meta}
        </div>
      </div>
      <span className={cn('font-mono text-[9px] tracking-[0.1em] uppercase font-semibold py-[2px] px-[7px] rounded-[3px] whitespace-nowrap', statusPillClass)}>
        {row.statusLabel}
      </span>
    </button>
  );
}

function AssignmentListCard({ list, sectionLabel }: { list: ManagerAssignmentList; sectionLabel: string }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* admin.html line 7633: sp-assignment-head */}
      <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
        <span>{list.title}</span>
        <button
          type="button"
          data-mgr-action={list.viewAllAction}
          onClick={() => {
            if (typeof window !== 'undefined') {
              // eslint-disable-next-line no-console
              console.log(`[manager-team] view-all clicked: ${list.viewAllAction}`);
            }
          }}
          className="font-body text-[11.5px] text-[var(--ink-soft)] normal-case tracking-normal font-medium bg-transparent border-0 cursor-pointer py-[4px] px-[8px] rounded-full transition-colors duration-[150ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
        >
          {list.viewAllLabel}
        </button>
      </div>
      {list.rows.map((row, idx) => (
        <AssignmentRowButton key={idx} row={row} sectionLabel={sectionLabel} />
      ))}
    </div>
  );
}

export function ManagerSectionTeam({ profile }: ManagerSectionTeamProps) {
  const team = profile.team;
  if (!team) {
    return null;
  }

  const { sectionStatus, teamGrid, personalCandidates, personalClients } = team;

  return (
    // admin.html line 19929: <section id="mgr-section-team">
    <section
      id="mgr-section-team"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section header — admin.html lines 19930-19936 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            04 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Team &amp; assignments
          </h2>
        </div>
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

      {/* Block A — Team grid (admin.html lines 19938-20023) */}
      <div className="mb-[14px]">
        {/* admin.html line 19940: header with inline overrides — flatten bottom radius to merge with grid below */}
        <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border border-[var(--line)] border-b-0 rounded-t-[var(--r-md)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
          <span>{teamGrid.title}</span>
          <button
            type="button"
            data-mgr-action={teamGrid.viewAllAction}
            onClick={() => {
              if (typeof window !== 'undefined') {
                // eslint-disable-next-line no-console
                console.log(`[manager-team] ${teamGrid.viewAllAction} clicked`);
              }
            }}
            className="font-body text-[11.5px] text-[var(--ink-soft)] normal-case tracking-normal font-medium bg-transparent border-0 cursor-pointer py-[4px] px-[8px] rounded-full transition-colors duration-[150ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
          >
            {teamGrid.viewAllLabel}
          </button>
        </div>
        {/* admin.html line 19944: mgr-team-grid with border-top: 0 + flat top radius via inline overrides */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[8px] bg-[var(--paper)] border border-[var(--line)] border-t-0 rounded-b-[var(--r-md)] p-[14px]">
          {teamGrid.cards.map((card) => (
            <TeamCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* Block B — Personal candidates + clients dual lists (admin.html lines 20025-20120) */}
      <div className="grid grid-cols-2 gap-[14px] max-[880px]:grid-cols-1">
        <AssignmentListCard list={personalCandidates} sectionLabel="personal-candidates" />
        <AssignmentListCard list={personalClients} sectionLabel="personal-clients" />
      </div>
    </section>
  );
}
