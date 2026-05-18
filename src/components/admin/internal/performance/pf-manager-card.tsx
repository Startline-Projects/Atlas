/* admin.html lines 64079-64131: large manager spotlight card — super-gradient head (avatar + identity + rating A) + 5-metric grid + paper-deep notes block */

import type { PfManagerData, PfManagerMetric } from '@/lib/mock-data/admin/performance-data';

interface PfManagerCardProps {
  manager: PfManagerData;
}

export function PfManagerCard({ manager }: PfManagerCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[22px]">
      {/* Head */}
      <div className="flex items-center gap-[14px] py-[18px] px-[22px] bg-gradient-to-br from-[rgba(110,63,224,0.04)] to-[var(--paper)] border-b border-b-[var(--line-soft)]">
        <div
          className="w-[56px] h-[56px] rounded-full grid place-items-center font-display text-[22px] font-medium text-[var(--paper)] flex-shrink-0 tracking-[-0.02em]"
          style={{ background: 'linear-gradient(135deg, var(--super), #3D2B5A)' }}
        >
          {manager.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[3px]">
            {manager.eyebrow}
          </div>
          <h3 className="font-display text-[20px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 mb-[3px] leading-[1.2]">
            {manager.name}
          </h3>
          <div
            className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: manager.metaHtml }}
          />
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-display text-[36px] font-medium text-[var(--success)] tracking-[-0.03em] leading-[1] tabular-nums">
            {manager.ratingValue}
          </div>
          <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--ink-mute)] font-bold mt-[4px]">
            {manager.ratingLabel}
          </div>
        </div>
      </div>

      {/* Metrics 5-col grid */}
      <div className="grid grid-cols-5 gap-0 border-b border-b-[var(--line-soft)] max-[980px]:grid-cols-2 max-[480px]:grid-cols-1">
        {manager.metrics.map((metric, idx) => (
          <ManagerMetricCell key={idx} metric={metric} />
        ))}
      </div>

      {/* Notes footer */}
      <div
        className="py-[14px] px-[22px] bg-[var(--paper-deep)] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.6] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: manager.notesHtml }}
      />
    </div>
  );
}

function ManagerMetricCell({ metric }: { metric: PfManagerMetric }) {
  const valueColor =
    metric.valueVariant === 'success'
      ? 'text-[var(--success)]'
      : metric.valueVariant === 'warn'
      ? 'text-[var(--amber)]'
      : metric.valueVariant === 'danger'
      ? 'text-[var(--danger)]'
      : 'text-[var(--ink)]';

  const trendColor =
    metric.trend?.direction === 'up'
      ? 'text-[var(--success)]'
      : metric.trend?.direction === 'down'
      ? 'text-[var(--danger)]'
      : 'text-[var(--ink-mute)]';

  return (
    <div className="py-[14px] px-[18px] border-r border-r-[var(--line-soft)] last:border-r-0 max-[980px]:[&:nth-child(2n)]:border-r-0 max-[980px]:[&:nth-child(-n+3)]:border-b max-[980px]:[&:nth-child(-n+3)]:border-b-[var(--line-soft)] max-[480px]:!border-r-0 max-[480px]:border-b max-[480px]:border-b-[var(--line-soft)] max-[480px]:last:border-b-0">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
        {metric.label}
      </div>
      <div className={`font-display text-[22px] font-medium tracking-[-0.02em] leading-[1] tabular-nums ${valueColor}`}>
        {metric.value}
        {metric.suffix && (
          <span className="text-[12px] text-[var(--ink-mute)] ml-[3px]">{metric.suffix}</span>
        )}
      </div>
      <div
        className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[4px] leading-[1.5] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: metric.metaHtml }}
      />
      {metric.trend && (
        <div className={`inline-flex items-center gap-[3px] mt-[4px] font-mono text-[10px] font-bold tracking-[0.04em] ${trendColor}`}>
          {metric.trend.label}
        </div>
      )}
    </div>
  );
}
