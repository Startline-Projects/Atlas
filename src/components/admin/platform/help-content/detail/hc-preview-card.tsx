/* admin.html lines 63882-63932: public preview card — head + cream-backdrop body wrapping the public-site mock frame */

import { HcPublicFrame } from './hc-public-frame';
import type { HcPublicPreviewData } from '@/lib/mock-data/admin/help-content-data';

interface HcPreviewCardProps {
  preview: HcPublicPreviewData;
}

export function HcPreviewCard({ preview }: HcPreviewCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden">
      {/* Preview head */}
      <div className="flex items-center justify-between gap-[10px] py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex-wrap">
        <h3 className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {preview.headTitle}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {preview.headMeta}
        </div>
      </div>

      {/* Preview body — cream backdrop */}
      <div className="bg-[var(--cream)] p-0">
        <HcPublicFrame preview={preview} />
      </div>
    </div>
  );
}
