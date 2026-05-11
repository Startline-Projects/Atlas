/**
 * Phase 13b-2 — §04 Reports & Flags section.
 * Replaces ReviewSubPlaceholder for rev-section-flags when flagsData exists.
 *
 * admin.html markup: L37658-37715
 * admin.html CSS: L13830-13911
 */
import { cn } from '@/lib/utils/cn';
import type {
  ReviewFlagsData,
  ReviewFlagItem,
  ReviewSectionStatus,
} from '@/lib/mock-data/admin/review-profiles-data';

interface ReviewSubFlagsProps {
  data: ReviewFlagsData;
  sectionStatus: ReviewSectionStatus;
}

function statusPillClass(v: ReviewSectionStatus['statusVariant']): string {
  switch (v) {
    case 'warn': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'danger': return 'bg-[var(--danger-bg)] text-[var(--danger)]';
    case 'neutral': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'default':
    default: return 'bg-[var(--cream-deep)] text-[var(--ink-soft)]';
  }
}

// Flag kind → border-left color — L13845-13847
function flagBorderClass(kind: ReviewFlagItem['kind']): string {
  switch (kind) {
    case 'system': return 'border-l-[3px] border-l-[var(--super)]';
    case 'user': return 'border-l-[3px] border-l-[var(--amber)]';
    case 'resolved': return 'opacity-70 border-l-[3px] border-l-[var(--ink-mute)]';
  }
}

// Icon bg — L13848-13858
function flagIconClass(kind: ReviewFlagItem['kind']): string {
  switch (kind) {
    case 'system': return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    case 'user': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'resolved': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
  }
}

// Tag pill — L13873-13885
function flagTagClass(kind: ReviewFlagItem['kind']): string {
  switch (kind) {
    case 'system': return 'bg-[rgba(110,63,224,0.12)] text-[var(--super)]';
    case 'user': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'resolved': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
  }
}

// SVGs verbatim from admin.html L37671 + L37686
function FlagIcon({ svgType, kind }: { svgType: ReviewFlagItem['iconSvg']; kind: ReviewFlagItem['kind'] }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'w-[28px] h-[28px] rounded-full grid place-items-center flex-shrink-0',
        flagIconClass(kind)
      )}
    >
      {svgType === 'target' ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </span>
  );
}

function FlagItemCard({ item }: { item: ReviewFlagItem }) {
  return (
    <div
      className={cn(
        'bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)] py-[14px] px-[16px] grid grid-cols-[28px_1fr_auto] gap-[12px] items-start',
        flagBorderClass(item.kind)
      )}
    >
      <FlagIcon svgType={item.iconSvg} kind={item.kind} />

      {/* rfi-body — L13859 */}
      <div className="min-w-0">
        {/* rfi-head — L13860-13865 */}
        <div className="flex items-baseline gap-[8px] flex-wrap mb-[4px]">
          {/* rfi-source — L13867-13871 */}
          <span className="text-[13px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
            {item.source}
          </span>
          {/* rfi-tag — L13873-13885 */}
          <span
            className={cn(
              'font-mono text-[9px] tracking-[0.12em] uppercase py-[2px] px-[6px] rounded-[3px] font-bold',
              flagTagClass(item.kind)
            )}
          >
            {item.tag}
          </span>
          {/* rfi-time — L13886-13890 */}
          <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em]">
            {item.time}
          </span>
        </div>
        {/* rfi-reason — L13892-13895 */}
        <div className="text-[12.5px] text-[var(--ink-soft)] leading-[1.5]">
          {item.reason}
        </div>
      </div>

      {/* rfi-status — L13897-13904 */}
      <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--ink-mute)] font-semibold whitespace-nowrap">
        {item.status}
      </span>
    </div>
  );
}

export function ReviewSubFlags({ data, sectionStatus }: ReviewSubFlagsProps) {
  return (
    <section
      id="rev-section-flags"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      {/* cd-section-head */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            04 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Reports & flags
          </h2>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-[6px] font-mono text-[10px] tracking-[0.14em] uppercase font-semibold py-[3px] pl-[8px] pr-[9px] rounded-full before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current",
            statusPillClass(sectionStatus.statusVariant)
          )}
        >
          {sectionStatus.statusText}
        </span>
      </div>

      {/* rv-flag-list — L13830-13833 */}
      <div className="flex flex-col gap-[10px]">
        {data.items.map((item, idx) => (
          <FlagItemCard key={idx} item={item} />
        ))}
      </div>
    </section>
  );
}
