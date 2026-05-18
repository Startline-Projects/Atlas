/* admin.html lines 62263-62322: linked features — 5 cross-link rows with icon + name + meta + step badge */

import type { IntLinkedFeature } from '@/lib/mock-data/admin/integrations-data';

interface IntLinkedFeaturesProps {
  features: IntLinkedFeature[];
}

export function IntLinkedFeatures({ features }: IntLinkedFeaturesProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      <div className="flex flex-col">
        {features.map((feature, idx) => (
          <LinkedFeatureRow key={idx} feature={feature} />
        ))}
      </div>
    </div>
  );
}

function LinkedFeatureRow({ feature }: { feature: IntLinkedFeature }) {
  return (
    <div className="grid grid-cols-[28px_minmax(0,1fr)_auto] gap-[12px] items-center py-[12px] px-[18px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer hover:bg-[var(--paper-deep)] transition-colors">
      <div className="w-[28px] h-[28px] rounded-[6px] bg-[var(--paper-deep)] border border-[var(--line)] grid place-items-center text-[var(--ink-soft)] flex-shrink-0">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: feature.iconSvg }}
        />
      </div>
      <div className="min-w-0">
        <div className="text-[13px] font-bold text-[var(--ink)] tracking-[-0.01em]">{feature.name}</div>
        <div
          className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold [&_a]:cursor-pointer"
          dangerouslySetInnerHTML={{ __html: feature.metaHtml }}
        />
      </div>
      <span className="font-mono text-[10px] font-bold text-[var(--super)] tracking-[0.04em] bg-[rgba(110,63,224,0.06)] py-[2px] px-[7px] rounded-[3px]">
        {feature.stepLabel}
      </span>
    </div>
  );
}
