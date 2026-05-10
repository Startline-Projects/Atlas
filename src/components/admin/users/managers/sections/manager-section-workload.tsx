'use client';

import type {
  ManagerProfile,
  ManagerDualBlock,
  ManagerStatLine,
  ManagerAttentionRow,
} from '@/lib/mock-data/admin/manager-profiles-data';
import { cn } from '@/lib/utils/cn';

interface ManagerSectionWorkloadProps {
  profile: ManagerProfile;
}

// admin.html lines 19823, 19833 — attention-row SVG icons
function AttentionIconSvg({ iconType }: { iconType: ManagerAttentionRow['iconType'] }) {
  if (iconType === 'users') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    );
  }
  // info
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

// admin.html lines 8188-8252 — mgr-dual-block (own card per CSS)
function DualBlockView({ block }: { block: ManagerDualBlock }) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[20px] py-[18px]">
      {/* admin.html line 8194: h4 with title + pill */}
      <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mb-[14px] pb-[10px] border-b border-dashed border-[var(--line-soft)] flex items-center justify-between m-0">
        <span>{block.title}</span>
        <span
          className={cn(
            'font-mono text-[9px] tracking-[0.12em] py-[2px] px-[7px] rounded-[3px] font-semibold uppercase',
            block.pillVariant === 'lime'
              ? 'bg-[var(--lime)] text-[var(--ink)]'
              : 'bg-[var(--cream-deep)] text-[var(--ink-soft)]'
          )}
        >
          {block.pillLabel}
        </span>
      </h4>
      {/* admin.html line 8220: stats-stack */}
      <div className="flex flex-col gap-[14px]">
        {block.lines.map((line, idx) => (
          <StatLineView key={idx} line={line} />
        ))}
      </div>
    </div>
  );
}

// admin.html lines 8225-8252 — stat-line
function StatLineView({ line }: { line: ManagerStatLine }) {
  const valueColor =
    line.valueColor === 'success'
      ? 'var(--success)'
      : line.valueColor === 'warn'
        ? 'var(--amber)'
        : line.valueColor === 'danger'
          ? 'var(--danger)'
          : undefined;
  return (
    <div className="flex items-baseline justify-between gap-[8px] pb-[12px] border-b border-dashed border-[var(--line-soft)] last:border-b-0 last:pb-0">
      {/* admin.html line 8234: s-label */}
      <span className="text-[12.5px] text-[var(--ink-soft)]">{line.label}</span>
      <span className="inline-flex items-baseline">
        {/* admin.html line 8238: s-value */}
        <span
          className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink)] [font-variant-numeric:tabular-nums]"
          style={valueColor ? { color: valueColor } : undefined}
        >
          {line.value}
        </span>
        {/* admin.html line 8246: s-meta */}
        <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] ml-[8px]">
          {line.meta}
        </span>
      </span>
    </div>
  );
}

// admin.html lines 19821, 19831 — attention-row as <button> with onClick console.log
function AttentionRowButton({ row }: { row: ManagerAttentionRow }) {
  const isDanger = row.variant === 'danger';
  const timeColor =
    row.timeVariant === 'danger' ? 'text-[var(--danger)]' : 'text-[var(--amber)]';
  return (
    <button
      type="button"
      data-mgr-action={row.action}
      onClick={() => {
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-console
          console.log(`[manager-workload] ${row.action} clicked: "${row.text}"`);
        }
      }}
      className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-[12px] items-center w-full text-left px-[16px] py-[11px] border-b border-l-0 border-r-0 border-t-0 border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px] bg-transparent cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1]"
    >
      {/* admin.html line 8053: a-icon — 28x28 amber-bg / amber (or danger-bg / danger for .danger variant) */}
      <span
        className={cn(
          'w-[28px] h-[28px] rounded-full grid place-items-center flex-shrink-0',
          isDanger
            ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
            : 'bg-[var(--amber-bg)] text-[var(--amber)]'
        )}
        aria-hidden="true"
      >
        <AttentionIconSvg iconType={row.iconType} />
      </span>
      {/* admin.html lines 8063-8073: a-text + a-meta */}
      <div className="min-w-0">
        <div className="text-[var(--ink)] font-medium">{row.text}</div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
          {row.meta}
        </div>
      </div>
      {/* admin.html line 8074: a-time */}
      <span
        className={cn(
          'font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap font-semibold',
          timeColor
        )}
      >
        {row.time}
      </span>
    </button>
  );
}

export function ManagerSectionWorkload({ profile }: ManagerSectionWorkloadProps) {
  const workload = profile.workload;
  if (!workload) {
    return null;
  }

  const { sectionStatus, dualBlocks, attention } = workload;

  return (
    // admin.html line 19760: <section id="mgr-section-workload">
    <section
      id="mgr-section-workload"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px] first:border-t-0 first:pt-[12px]"
    >
      {/* Section header — admin.html lines 19761-19767 */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            02 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Workload &amp; team oversight
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

      {/* Block A — Dual workload split (admin.html lines 19770-19813) */}
      <div className="grid grid-cols-2 gap-[14px] mb-[14px] max-[880px]:grid-cols-1">
        {dualBlocks.map((block, idx) => (
          <DualBlockView key={idx} block={block} />
        ))}
      </div>

      {/* Block B — Attention list (admin.html lines 19815-19841) */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
        {/* admin.html line 19817: sp-assignment-head reused */}
        <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
          <span>{attention.title}</span>
          {/* admin.html line 19819: inline amber chip */}
          <span
            className="font-mono text-[10.5px] font-semibold tracking-[0.02em]"
            style={attention.countColor ? { color: attention.countColor } : undefined}
          >
            {attention.countLabel}
          </span>
        </div>
        {attention.rows.map((row, idx) => (
          <AttentionRowButton key={idx} row={row} />
        ))}
      </div>
    </section>
  );
}
