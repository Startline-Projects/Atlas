'use client';

/**
 * Phase 13b-2 — §03 Pattern Detection section.
 * LARGEST section — 5 nested patterns: head/summary, cluster timeline,
 * similarity heat grid, detection signals, AI recommendation.
 *
 * admin.html markup: L37463-37653
 * admin.html CSS: L13484-13828
 */
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type {
  ReviewPatternData,
  ReviewClusterItem,
  SimilarityCell,
  SimilarityCaptionSegment,
  PatternSignal,
  ReviewPatternSummarySegment,
  ReviewSectionStatus,
} from '@/lib/mock-data/admin/review-profiles-data';

interface ReviewSubPatternProps {
  data: ReviewPatternData;
  sectionStatus: ReviewSectionStatus;
  reviewId: string;
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

// Severity-driven styles — L13484-13562
function severityBorder(s: ReviewPatternData['severity']): string {
  switch (s) {
    case 'high': return 'border-[1.5px] border-[var(--danger)] shadow-[0_0_0_4px_rgba(194,65,43,0.06)]';
    case 'medium': return 'border-[1.5px] border-[var(--amber)] shadow-[0_0_0_4px_rgba(232,118,58,0.06)]';
    case 'low': return 'border-[1.5px] border-[var(--line-strong)] shadow-none';
  }
}
function severityHeadBg(s: ReviewPatternData['severity']): string {
  switch (s) {
    case 'high': return 'bg-[linear-gradient(to_bottom,rgba(194,65,43,0.10),rgba(194,65,43,0.04))]';
    case 'medium': return 'bg-[linear-gradient(to_bottom,rgba(232,118,58,0.10),rgba(232,118,58,0.04))]';
    case 'low': return 'bg-[var(--paper-deep)]';
  }
}
function severityIconBg(s: ReviewPatternData['severity']): string {
  switch (s) {
    case 'high': return 'bg-[var(--danger)]';
    case 'medium': return 'bg-[var(--amber)]';
    case 'low': return 'bg-[var(--ink-mute)]';
  }
}
function severityFillBg(s: ReviewPatternData['severity']): string {
  switch (s) {
    case 'high': return 'bg-[var(--danger)]';
    case 'medium': return 'bg-[var(--amber)]';
    case 'low': return 'bg-[var(--ink-mute)]';
  }
}

// Similarity cell variant — L13697-13741
function cellClass(v: SimilarityCell['variant']): string {
  switch (v) {
    case 'head': return 'bg-[var(--paper-deep)] text-[9.5px] tracking-[0.06em] text-[var(--ink-mute)] font-bold';
    case 'row-label': return 'bg-[var(--cream-deep)] text-[9.5px] tracking-[0.04em] text-[var(--ink-mute)] font-bold grid place-items-center';
    case 'diag': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'heat-low': return 'bg-[var(--success-bg)] text-[var(--success)]';
    case 'heat-mid': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'heat-high': return 'bg-[var(--danger-bg)] text-[var(--danger)] font-bold';
    case 'heat-xhigh': return 'bg-[var(--danger)] text-[var(--paper)] font-bold';
    default: return 'bg-[var(--paper-deep)] text-[var(--ink-soft)]';
  }
}

// Signal icon variant — L13758-13776
function signalIconClass(v: PatternSignal['iconVariant']): string {
  switch (v) {
    case 'warn': return 'bg-[var(--amber-bg)] text-[var(--amber)]';
    case 'neutral': return 'bg-[var(--cream-deep)] text-[var(--ink-mute)]';
    case 'default':
    default: return 'bg-[var(--danger-bg)] text-[var(--danger)]';
  }
}

function SummarySegments({ segments }: { segments: ReviewPatternSummarySegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.kind === 'strong') return <strong key={i} className="font-semibold">{seg.text}</strong>;
        if (seg.kind === 'mono') return <span key={i} className="font-mono text-[12.5px] text-[var(--ink-soft)]">{seg.text}</span>;
        return <span key={i}>{seg.text}</span>;
      })}
    </>
  );
}

function ClusterItemCard({ item }: { item: ReviewClusterItem }) {
  const dotClass = cn(
    'w-[24px] h-[24px] rounded-full grid place-items-center font-mono text-[10px] font-bold mb-[8px] flex-shrink-0',
    item.variant === 'danger'
      ? 'bg-[var(--danger)] border-2 border-[var(--danger)] text-[var(--paper)]'
      : 'bg-[var(--amber)] border-2 border-[var(--amber)] text-[var(--paper)]',
    item.current
      ? 'shadow-[0_0_0_4px_var(--paper),0_0_0_6px_var(--ink)]'
      : 'shadow-[0_0_0_4px_var(--paper)]'
  );

  const content = (
    <>
      <div className={dotClass}>{item.index}</div>
      <div className="font-mono text-[10px] font-semibold text-[var(--ink-soft)] tracking-[0.02em] mb-[2px]">
        {item.atlasId}
      </div>
      <div
        className={cn(
          'text-[11.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] leading-[1.25] whitespace-nowrap max-w-full overflow-hidden text-ellipsis',
          item.current && 'underline decoration-[1.5px] underline-offset-[3px]'
        )}
      >
        {item.target}
      </div>
      <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] leading-[1.4]">
        {item.meta}
      </div>
      <div className="mt-[4px] inline-flex gap-[1px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            aria-hidden="true"
            className={cn(
              'text-[10px] leading-none',
              star <= Math.round(item.rating) ? 'text-[var(--danger)]' : 'text-[var(--line-strong)]'
            )}
          >
            ★
          </span>
        ))}
      </div>
    </>
  );

  if (item.current || !item.reviewId) {
    return (
      <div className="flex flex-col items-center text-center">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/admin/operations/reviews/${item.reviewId}`}
      data-rev-action="open-cluster-rev"
      data-rev-cluster-id={item.reviewId}
      className="flex flex-col items-center text-center cursor-pointer transition-transform duration-[120ms] ease hover:-translate-y-[1px] no-underline text-inherit"
    >
      {content}
    </Link>
  );
}

function CaptionSegments({ segments }: { segments: SimilarityCaptionSegment[] }) {
  return (
    <p className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] mt-[10px] leading-[1.5] m-0">
      {segments.map((seg, i) => {
        const colorClass = seg.color === 'success' ? 'text-[var(--success)]'
          : seg.color === 'amber' ? 'text-[var(--amber)]'
          : seg.color === 'danger' ? 'text-[var(--danger)]'
          : undefined;
        if (colorClass) {
          return (
            <span key={i} className={cn(colorClass, seg.bold && 'font-bold')}>
              {seg.text}
            </span>
          );
        }
        return <span key={i}>{seg.text}</span>;
      })}
    </p>
  );
}

export function ReviewSubPattern({ data, sectionStatus, reviewId }: ReviewSubPatternProps) {
  return (
    <section
      id="rev-section-pattern"
      className="py-[36px] border-t border-[var(--line)] scroll-mt-[80px] [&:first-child]:border-t-0 [&:first-child]:pt-[12px]"
    >
      {/* cd-section-head */}
      <div className="flex items-baseline justify-between gap-[16px] mb-[22px] flex-wrap">
        <div className="flex items-baseline gap-[14px] min-w-0">
          <span className="font-mono text-[10.5px] tracking-[0.14em] text-[var(--ink-mute)] font-medium">
            03 · 06
          </span>
          <h2 className="font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1] [font-variation-settings:'opsz'_96] m-0">
            Pattern detection
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

      {/* rv-pattern-card — L13484-13498 */}
      <div
        data-severity={data.severity}
        className={cn(
          'bg-[var(--paper)] rounded-[var(--r-md)] overflow-hidden relative',
          severityBorder(data.severity)
        )}
      >
        {/* rv-pattern-head — L13500-13562 */}
        <div
          className={cn(
            'py-[16px] px-[22px] border-b border-[var(--line)] flex items-center justify-between flex-wrap gap-[10px]',
            severityHeadBg(data.severity)
          )}
        >
          {/* rph-title — L13516-13524 */}
          <div className="font-display text-[16px] font-medium inline-flex items-center gap-[10px] text-[var(--ink)] tracking-[-0.01em]">
            {/* rph-icon — L13526-13538 */}
            <span
              aria-hidden="true"
              className={cn(
                'w-[28px] h-[28px] rounded-full text-[var(--paper)] grid place-items-center text-[14px] font-bold flex-shrink-0',
                severityIconBg(data.severity)
              )}
            >
              !
            </span>
            {data.headTitle}
          </div>

          {/* rph-confidence — L13539-13562 */}
          <div className="inline-flex items-center gap-[8px] font-mono text-[11px] tracking-[0.02em] text-[var(--ink-soft)]">
            AI confidence
            <div
              className="w-[80px] h-[6px] rounded-full bg-[rgba(14,14,12,0.08)] overflow-hidden relative"
              aria-label={`${data.confidence}% confidence`}
            >
              <div
                className={cn('h-full rounded-full', severityFillBg(data.severity))}
                style={{ width: `${data.confidence}%` }}
              />
            </div>
            <strong className="font-bold text-[var(--danger)]">{data.confidence}%</strong>
          </div>
        </div>

        {/* rv-pattern-summary — L13564-13573 */}
        <div className="py-[16px] px-[22px] bg-[var(--paper)] border-b border-dashed border-[var(--line-soft)] text-[13.5px] text-[var(--ink)] leading-[1.55]">
          <p className="m-0">
            <SummarySegments segments={data.summarySegments} />
          </p>
        </div>

        {/* rv-cluster-section — L13576-13587 */}
        <div className="py-[18px] px-[22px] border-b border-dashed border-[var(--line-soft)]">
          {/* rcs-label */}
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[14px]">
            {data.clusterLabel}
          </div>

          {/* rv-cluster-timeline — L13589-13601 */}
          <div className="relative pt-[4px] pb-[24px] before:content-[''] before:absolute before:left-[12px] before:right-[12px] before:top-[16px] before:h-[2px] before:bg-[var(--line)] before:z-0">
            {/* rv-cluster-items — L13602-13609 */}
            <div className="grid grid-cols-4 gap-[8px] relative z-[1] max-[720px]:grid-cols-2">
              {data.clusterItems.map((item) => (
                <ClusterItemCard key={item.index} item={item} />
              ))}
            </div>
          </div>

          {/* Similarity section — L37542 */}
          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold mb-[14px] mt-[18px]">
            {data.similarityLabel}
          </div>

          {/* rv-similarity-grid — L13687-13741 */}
          <div
            className="grid grid-cols-[70px_repeat(4,1fr)] gap-[2px] bg-[var(--line-soft)] p-[2px] rounded-[6px] font-mono text-[10.5px]"
            aria-label="Similarity matrix"
          >
            {/* Header row */}
            <div className={cn('py-[8px] px-[6px] text-center font-semibold tracking-[0.02em]', cellClass('head'))} />
            {data.similarityHeaders.map((h) => (
              <div key={h} className={cn('py-[8px] px-[6px] text-center font-semibold tracking-[0.02em]', cellClass('head'))}>
                {h}
              </div>
            ))}
            {/* Data rows */}
            {data.similarityRows.map((row) => (
              <div key={row.label} className="contents">
                <div className={cn('py-[8px] px-[6px] text-center font-semibold tracking-[0.02em]', cellClass('row-label'))}>
                  {row.label}
                </div>
                {row.cells.map((cell, ci) => (
                  <div
                    key={ci}
                    className={cn('py-[8px] px-[6px] text-center font-semibold tracking-[0.02em]', cellClass(cell.variant))}
                  >
                    {cell.value}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Caption — L37574 */}
          <CaptionSegments segments={data.captionSegments} />
        </div>

        {/* rv-pattern-signals — L13744-13791 */}
        <div className="py-[18px] px-[22px] grid grid-cols-2 gap-y-[12px] gap-x-[24px] border-b border-dashed border-[var(--line-soft)] max-[720px]:grid-cols-1">
          {data.signals.map((signal, idx) => (
            <div key={idx} className="grid grid-cols-[22px_1fr] gap-[10px] items-start">
              <span
                aria-hidden="true"
                className={cn(
                  'w-[22px] h-[22px] rounded-full grid place-items-center flex-shrink-0 text-[11px] font-bold',
                  signalIconClass(signal.iconVariant)
                )}
              >
                {signal.iconChar}
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] mb-[2px] leading-[1.35]">
                  {signal.label}
                </div>
                <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5]">
                  {signal.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* rv-pattern-recommend — L13795-13828 */}
        <div className="py-[16px] px-[22px] bg-[var(--cream-deep)] flex gap-[14px] items-center flex-wrap justify-between">
          <div className="min-w-0">
            {/* rpr-label — L13805-13812 */}
            <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mb-[4px]">
              Recommended action
            </div>
            {/* rpr-action — L13814-13822 */}
            <div className="text-[13.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] leading-[1.4]">
              <strong className="text-[var(--danger)]">{data.recommendation.strongParts[0]}</strong>
              {data.recommendation.plainParts[0]}
              <strong className="text-[var(--danger)]">{data.recommendation.strongParts[1]}</strong>
              {data.recommendation.plainParts[1]}
              {' '}
              <em className="italic text-[var(--ink-soft)] font-medium">{data.recommendation.emPart}</em>
            </div>
          </div>
          {/* rpr-buttons — L13823-13827 */}
          <div className="inline-flex gap-[8px] flex-wrap">
            <button
              type="button"
              data-rev-action={data.recommendation.deferActionKey}
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log(`[review-action] ${data.recommendation.deferActionKey} for ${reviewId}`);
              }}
              className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(232,118,58,0.3)] rounded-full text-[var(--amber)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:bg-[var(--amber-bg)] hover:text-[var(--amber)] hover:border-[var(--amber)]"
            >
              {data.recommendation.deferLabel}
            </button>
            <button
              type="button"
              data-rev-action={data.recommendation.applyActionKey}
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log(`[review-action] ${data.recommendation.applyActionKey} for ${reviewId}`);
              }}
              className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[rgba(194,65,43,0.3)] rounded-full text-[var(--danger)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] hover:border-[var(--danger)]"
            >
              {data.recommendation.applyLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
