'use client';

import type { SpecialistProfile } from '@/lib/mock-data/admin/specialist-profiles-data';
import { cn } from '@/lib/utils/cn';

interface SpecialistSectionWorkloadProps {
  profile: SpecialistProfile;
}

// Type aliases derived from SpecialistProfile to avoid re-importing private interfaces
type Workload = NonNullable<SpecialistProfile['workload']>;
type Tile = Workload['tiles'][number];
type Capacity = Workload['capacity'];
type AttentionRow = NonNullable<Workload['attention']>['rows'][number];

// admin.html lines 18677, 18687, 18697 — info / clock SVG icons
function AttentionIcon({ iconType }: { iconType: 'info' | 'clock' }) {
  if (iconType === 'info') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }
  // clock
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

// admin.html lines 18625-18654 — workload tile (cd-fin-card pattern from Phase 6j with inline value styles)
function WorkloadTileView({ tile }: { tile: Tile }) {
  return (
    // admin.html line 18625: cd-fin-card frame
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* admin.html line 18626: card-head */}
      <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
        <span>{tile.label}</span>
        <span
          className="font-mono text-[10.5px] text-[var(--ink-soft)] normal-case tracking-normal"
          style={tile.metaColor ? { color: tile.metaColor } : undefined}
        >
          {tile.meta}
        </span>
      </div>
      {/* admin.html line 18630: tile body with inline px:18 py:16 */}
      <div className="px-[18px] py-[16px]">
        {/* admin.html line 18631: value (font-display 28px) */}
        <div
          className="font-display text-[28px] font-medium tracking-[-0.02em] leading-none text-[var(--ink)] [font-variant-numeric:tabular-nums]"
          style={tile.valueColor ? { color: tile.valueColor } : undefined}
        >
          {tile.value}
        </div>
        {/* admin.html line 18632: detail (mono 11px mute) */}
        <div className="font-mono text-[11px] text-[var(--ink-mute)] mt-[4px] tracking-[0.02em]">
          {tile.detail}
        </div>
      </div>
    </div>
  );
}

// admin.html lines 18657-18668 — capacity utilization bar
function CapacityBarView({ capacity }: { capacity: Capacity }) {
  // admin.html line 7572: .pct base; lines 7580-7581: .warn / .danger variants
  const pctColorClass =
    capacity.pctVariant === 'warn'
      ? 'text-[var(--amber)]'
      : capacity.pctVariant === 'danger'
        ? 'text-[var(--danger)]'
        : 'text-[var(--ink)]';

  // admin.html lines 7592, 7596, 7597: fill gradient by variant
  const fillBackground =
    capacity.fillVariant === 'warn'
      ? 'linear-gradient(90deg, var(--lime) 0%, var(--amber) 100%)'
      : capacity.fillVariant === 'danger'
        ? 'linear-gradient(90deg, var(--amber) 0%, var(--danger) 100%)'
        : 'linear-gradient(90deg, var(--success) 0%, var(--lime) 100%)';

  return (
    // admin.html line 18658: sp-capacity wrapper
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] px-[20px] py-[16px] mb-[14px]">
      {/* admin.html line 18659: sp-capacity-head */}
      <div className="flex items-baseline justify-between mb-[12px] flex-wrap gap-[8px]">
        {/* admin.html line 18660: h4 */}
        <h4 className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold m-0">
          Capacity utilization
        </h4>
        {/* admin.html line 18661: .pct */}
        <span className={cn('font-display text-[24px] font-medium tracking-[-0.02em] leading-none [font-variant-numeric:tabular-nums]', pctColorClass)}>
          {capacity.pct}
        </span>
      </div>
      {/* admin.html line 18663: sp-capacity-track */}
      <div className="h-[10px] bg-[var(--cream-deep)] rounded-full overflow-hidden relative mb-[8px]">
        {/* admin.html line 18664: sp-capacity-fill (variant-driven gradient + inline width clamped to 100%) */}
        <div
          className="h-full rounded-full transition-[width] duration-[400ms] ease"
          style={{
            width: `${capacity.fillWidthPct}%`,
            maxWidth: '100%',
            background: fillBackground,
          }}
        />
        {/* admin.html line 18665: sp-capacity-target (vertical tick) */}
        <div
          className="absolute top-[-2px] bottom-[-2px] w-[2px] bg-[var(--ink)] rounded-[1px]"
          style={{ left: `${capacity.targetLeftPct}%` }}
        >
          {/* admin.html lines 7605-7611: ::after "TARGET" label as child span */}
          <span className="absolute top-[-16px] left-1/2 -translate-x-1/2 font-mono text-[8.5px] tracking-[0.12em] text-[var(--ink)] font-semibold whitespace-nowrap">
            TARGET
          </span>
        </div>
      </div>
      {/* admin.html line 18667: sp-capacity-meta */}
      <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
        {capacity.meta}
      </div>
    </div>
  );
}

// admin.html lines 18676-18705 — attention row as button (per Perfection Directive item 10)
function AttentionRowButton({ row }: { row: AttentionRow }) {
  const isDanger = row.variant === 'danger';
  return (
    <button
      type="button"
      data-sp-action={row.action}
      onClick={() => {
        // Phase 7X will wire up open-dispute / open-review modals
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-console
          console.log(`[specialist-workload] attention-row clicked: ${row.action} — "${row.text}"`);
        }
      }}
      className="grid grid-cols-[auto_1fr_auto] gap-[12px] items-center w-full text-left px-[16px] py-[11px] border-b border-l-0 border-r-0 border-t-0 border-dashed border-[var(--line-soft)] last:border-b-0 text-[12.5px] bg-transparent cursor-pointer transition-colors duration-[120ms] ease hover:bg-[#FCF9F1]"
    >
      {/* admin.html line 18677: a-icon (28x28 circle, amber-bg / danger-bg by variant) */}
      <span
        className={cn(
          'w-[28px] h-[28px] rounded-full grid place-items-center flex-shrink-0',
          isDanger
            ? 'bg-[var(--danger-bg)] text-[var(--danger)]'
            : 'bg-[var(--amber-bg)] text-[var(--amber)]'
        )}
        aria-hidden="true"
      >
        <AttentionIcon iconType={row.iconType} />
      </span>
      {/* admin.html lines 18680-18683: a-text + a-meta */}
      <div className="min-w-0">
        <div className="text-[var(--ink)] font-medium">{row.text}</div>
        <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
          {row.meta}
        </div>
      </div>
      {/* admin.html line 18684: a-time (amber default / danger variant) */}
      <span
        className={cn(
          'font-mono text-[10.5px] tracking-[0.02em] whitespace-nowrap font-semibold',
          isDanger ? 'text-[var(--danger)]' : 'text-[var(--amber)]'
        )}
      >
        {row.time}
      </span>
    </button>
  );
}

// ============================================================
// MAIN COMPONENT — SpecialistSectionWorkload
// ============================================================

export function SpecialistSectionWorkload({ profile }: SpecialistSectionWorkloadProps) {
  const workload = profile.workload;
  if (!workload) {
    return null;
  }

  const { sectionStatus, tiles, capacity, attention, emptyAttention } = workload;

  return (
    // admin.html line 18614: <section id="sp-section-workload">
    <section
      id="sp-section-workload"
      className="border-t border-[var(--line)] py-[36px] scroll-mt-[80px]"
    >
      {/* admin.html line 18615: cd-section-head */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            02 · 08
          </span>
          <h2 className="font-display [font-variation-settings:'opsz'_96] text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
            Workload &amp; caseload
          </h2>
        </div>
        {/* admin.html line 18620: status pill */}
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

      {/* Block A — Workload tile grid (admin.html lines 18624-18655) */}
      <div className="grid grid-cols-3 gap-[12px] mb-[14px] max-[720px]:grid-cols-1">
        {tiles.map((tile, idx) => (
          <WorkloadTileView key={idx} tile={tile} />
        ))}
      </div>

      {/* Block B — Capacity utilization bar (admin.html lines 18657-18668) */}
      <CapacityBarView capacity={capacity} />

      {/* Block C — Attention list (admin.html lines 18670-18706) — omitted entirely for inactive specialists */}
      {attention && (
        <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
          {/* admin.html line 18672: sp-assignment-head (reused list header pattern) */}
          <div className="flex items-center justify-between px-[16px] py-[11px] bg-[var(--paper-deep)] border-b border-[var(--line-soft)] font-mono text-[10.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold">
            <span>{attention.title}</span>
            <span
              className="font-mono text-[10.5px] font-semibold tracking-[0.02em]"
              style={attention.countColor ? { color: attention.countColor } : undefined}
            >
              {attention.countLabel}
            </span>
          </div>
          {/* admin.html lines 18676-18705: attention rows */}
          {attention.rows.map((row, idx) => (
            <AttentionRowButton key={idx} row={row} />
          ))}
        </div>
      )}

      {/* Empty state — for active on-track specialists with 0 attention items */}
      {!attention && emptyAttention && (
        <div className="bg-[var(--paper)] border border-dashed border-[var(--line)] rounded-[var(--r-md)] p-[40px] text-center">
          <div className="font-display [font-variation-settings:'opsz'_48] text-[18px] font-medium text-[var(--ink)] mb-[6px]">
            {emptyAttention.title}
          </div>
          <div className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.06em]">
            {emptyAttention.detail}
          </div>
        </div>
      )}
    </section>
  );
}
