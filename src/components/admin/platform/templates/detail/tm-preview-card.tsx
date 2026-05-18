/* admin.html lines 63049-63079: preview card — head + tm-preview-body containing mock email render.
   Email mock: 600px-max paper card with gradient header / logo / 21px display subject / 14.5px body with strong + indented list / dark CTA / paper-deep mono footer. */

import type { TmPreviewCardData } from '@/lib/mock-data/admin/templates-data';

interface TmPreviewCardProps {
  data: TmPreviewCardData;
}

export function TmPreviewCard({ data }: TmPreviewCardProps) {
  const { preview } = data;
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden flex flex-col">
      {/* Preview head */}
      <div className="flex items-center justify-between gap-[10px] py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex-wrap">
        <h3 className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {data.headTitle}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {data.headMeta}
        </div>
      </div>

      {/* Preview body — cream backdrop with centered email mock */}
      <div className="flex-1 p-0 bg-[var(--cream)] overflow-hidden">
        <div className="max-w-[600px] mx-auto my-[16px] bg-[var(--paper)] border border-[var(--line)] rounded-[6px] overflow-hidden font-body text-[var(--ink)]">
          {/* Header */}
          <div className="pt-[28px] px-[32px] pb-[20px] bg-gradient-to-b from-[var(--paper)] to-[var(--paper-deep)] border-b border-b-[var(--line-soft)] text-center">
            <div className="inline-block font-display text-[22px] font-medium text-[var(--ink)] tracking-[-0.025em]">
              {preview.logo}
            </div>
          </div>

          {/* Subject */}
          <div className="pt-[24px] px-[32px] pb-[4px] font-display text-[21px] font-medium tracking-[-0.02em] leading-[1.25] text-[var(--ink)]">
            {preview.subject}
          </div>

          {/* Body — rendered with sample data */}
          <div
            className="pt-[12px] px-[32px] pb-[28px] font-body text-[14.5px] leading-[1.65] text-[var(--ink-soft)] tracking-[-0.005em] [&_p]:m-0 [&_p]:mb-[14px] [&_p_strong]:text-[var(--ink)] [&_p_strong]:font-semibold [&_[data-indent]]:ml-[8px] [&_[data-italic]]:italic [&_[data-italic]]:text-[12px] [&_[data-italic]]:text-[var(--ink-mute)] [&_[data-italic]]:mt-[18px] [&_a]:text-[var(--ink-mute)] [&_a]:underline [&_a]:cursor-pointer"
            dangerouslySetInnerHTML={{ __html: preview.bodyHtml }}
          />

          {/* CTA button — anchor styled as button */}
          <div className="px-[32px]">
            <a
              className="inline-block my-[14px] py-[11px] px-[22px] bg-[var(--ink)] text-[var(--paper)] rounded-[6px] font-body text-[14px] font-semibold no-underline tracking-[-0.01em] cursor-pointer"
            >
              {preview.ctaLabel}
            </a>
          </div>

          {/* Body-resume after CTA (footer paragraphs in fixture) */}
          <div
            className="pt-[0px] px-[32px] pb-[20px] font-body text-[14.5px] leading-[1.65] text-[var(--ink-soft)] tracking-[-0.005em] [&_p]:m-0 [&_p]:mb-[14px] [&_p_strong]:text-[var(--ink)] [&_p_strong]:font-semibold [&_[data-italic]]:italic [&_[data-italic]]:text-[12px] [&_[data-italic]]:text-[var(--ink-mute)] [&_[data-italic]]:mt-[18px] [&_a]:text-[var(--ink-mute)] [&_a]:underline [&_a]:cursor-pointer"
            dangerouslySetInnerHTML={{ __html: preview.footerHtml }}
          />

          {/* Email footer */}
          <div className="py-[20px] px-[32px] bg-[var(--paper-deep)] border-t border-t-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] text-center [&_a]:text-[var(--ink-mute)] [&_a]:underline [&_a]:cursor-pointer">
            Sent by Atlas (Staffva LLC · Michigan, USA) · SendGrid<br />
            You&apos;re receiving this because you applied to Atlas.<br />
            <a>unsubscribe</a> · <a>manage preferences</a>
          </div>
        </div>
      </div>
    </div>
  );
}
