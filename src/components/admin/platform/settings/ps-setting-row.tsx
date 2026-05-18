import type { PsSetting } from '@/lib/mock-data/admin/platform-settings-data';

interface PsSettingRowProps {
  setting: PsSetting;
}

export function PsSettingRow({ setting }: PsSettingRowProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_200px_160px_110px] gap-[18px] items-center py-[14px] px-[22px] border-b border-b-[var(--line-soft)] last:border-b-0 hover:bg-[var(--paper-deep)] transition-colors max-[1080px]:grid-cols-[minmax(0,1fr)_160px_110px] max-[1080px]:gap-[14px] max-[720px]:grid-cols-1 max-[720px]:gap-[8px] max-[720px]:px-[18px]">
      {/* COL-PS-NAME */}
      <div className="min-w-0">
        <div className="text-[13.5px] font-bold text-[var(--ink)] tracking-[-0.01em] mb-[3px] leading-[1.3]">
          {setting.title}
          <span className="ml-[6px] inline-block font-mono text-[9.5px] font-semibold tracking-[0.04em] text-[var(--ink-mute)] bg-[var(--paper-deep)] border border-[var(--line-soft)] py-[1px] px-[6px] rounded-[3px]">
            {setting.key}
          </span>
        </div>
        <div
          className="font-body text-[12px] text-[var(--ink-soft)] leading-[1.5] tracking-[-0.005em] max-w-[580px] [&_strong]:text-[var(--ink)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold"
          dangerouslySetInnerHTML={{ __html: setting.descriptionHtml }}
        />
      </div>

      {/* COL-PS-VALUE */}
      <div className="font-mono text-[12.5px] font-bold text-[var(--ink)] tracking-[0.02em] leading-[1.4] tabular-nums">
        {setting.value}
        {setting.valueSuffix && (
          <span className="ml-[4px] font-mono text-[10.5px] font-medium text-[var(--ink-mute)] tracking-[0.04em]">
            {setting.valueSuffix}
          </span>
        )}
        {setting.valueBadge === 'default' && (
          <span className="inline-block ml-[6px] font-mono text-[8.5px] tracking-[0.1em] uppercase font-bold py-[1px] px-[6px] bg-[var(--paper-deep)] text-[var(--ink-mute)] rounded-[3px]">
            Default
          </span>
        )}
        {setting.valueBadge === 'modified' && (
          <span className="inline-block ml-[6px] font-mono text-[8.5px] tracking-[0.1em] uppercase font-bold py-[1px] px-[6px] bg-[var(--amber-bg)] text-[var(--amber)] rounded-[3px]">
            Modified
          </span>
        )}
      </div>

      {/* COL-PS-META */}
      <div
        className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.55] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold [&_a]:text-[var(--super)] [&_a]:underline [&_a]:font-bold max-[1080px]:hidden"
        dangerouslySetInnerHTML={{ __html: setting.metaHtml }}
      />

      {/* COL-PS-ACTION */}
      <div className="justify-self-end">
        <button
          type="button"
          className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full bg-[var(--paper)] border border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] cursor-pointer transition-all whitespace-nowrap"
        >
          {setting.actionLabel || 'Modify'}
        </button>
      </div>
    </div>
  );
}
