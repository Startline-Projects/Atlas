/**
 * Phase 13b-1 — Rich inline renderer for review content segments.
 * Handles text + hl-template (highlighted template-language phrases).
 *
 * Separate from dispute-rich.tsx — reviews have hl-template kind
 * with danger-tinted bg + dashed underline + native tooltip.
 */
import type { ReviewContentSegment } from '@/lib/mock-data/admin/review-profiles-data';

interface RichInlineProps {
  segments: ReviewContentSegment[];
}

export function RichInline({ segments }: RichInlineProps) {
  return (
    <>
      {segments.map((seg, idx) => {
        if (seg.kind === 'hl-template') {
          return (
            <span
              key={idx}
              title={seg.title}
              className="bg-[rgba(194,65,43,0.12)] border-b-[1.5px] border-dashed border-b-[var(--danger)] px-[2px] cursor-help"
            >
              {seg.text}
            </span>
          );
        }
        // kind === 'text'
        return <span key={idx}>{seg.text}</span>;
      })}
    </>
  );
}
