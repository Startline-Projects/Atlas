/**
 * Phase 14d — Custom Report Builder (the novel piece).
 *
 * admin.html markup: L38842-39160
 * admin.html CSS: L14803-15401
 *
 * Sits as a sibling of all 5 tab-content divs inside .rep-wrap — visible
 * regardless of active tab.
 */
import { cn } from '@/lib/utils/cn';
import { TemplateIcon, ToolbarIcon } from './builder/reports-builder-icons';
import { ReportsBuilderSources } from './builder/reports-builder-sources';
import { ReportsBuilderCanvas } from './builder/reports-builder-canvas';
import { ReportsBuilderPreview } from './builder/reports-builder-preview';
import { ReportsBuilderFoot } from './builder/reports-builder-foot';
import type { ReportsCustomBuilder } from '@/lib/mock-data/admin/reports-analytics-data';

interface ReportsCustomBuilderProps {
  data: ReportsCustomBuilder;
}

export function ReportsCustomBuilderEl({ data }: ReportsCustomBuilderProps) {
  return (
    // Outer wrapper — admin.html L38842 inline styles
    <div className="mt-[36px] pt-[28px] border-t border-[var(--line)]">
      {/* Section head — uses .rep-section-head pattern (CSS L14340-14361) */}
      <div className="flex items-end justify-between gap-[14px] flex-wrap mb-[14px]">
        <div className="min-w-0">
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] leading-[1.15] m-0 mb-[4px] text-[var(--ink)]">
            {data.sectionHead.title}
          </h2>
          <div className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--ink-mute)]">
            {data.sectionHead.meta}
          </div>
        </div>
      </div>

      {/* Saved templates strip — CSS L15355-15401 */}
      <div className="flex gap-[10px] mb-[14px] flex-wrap items-center">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-bold mr-[4px]">
          Recent / saved templates
        </span>
        {data.templates.map((t) => (
          <button
            key={t.id}
            type="button"
            data-rep-action="load-template"
            data-template-id={t.id}
            onClick={() => console.log('[rb-action] load-template', t.id)}
            className="inline-flex items-center gap-[6px] py-[6px] px-[12px] bg-[var(--paper)] border border-[var(--line)] rounded-full font-body text-[12px] font-medium text-[var(--ink-soft)] tracking-[-0.005em] cursor-pointer transition-all duration-[120ms] ease hover:border-[var(--ink)] hover:text-[var(--ink)] [&_.tch-svg]:text-[var(--ink-mute)] hover:[&_.tch-svg]:text-[var(--ink)]"
          >
            <span className="tch-svg inline-flex">
              <TemplateIcon icon={t.iconKey} />
            </span>
            {t.label}
            <span className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em]">
              {t.cadenceMeta}
            </span>
          </button>
        ))}
      </div>

      {/* Builder card — CSS L14803-14817 */}
      <div className="relative bg-[var(--paper)] border-[1.5px] border-[var(--ink)] rounded-[var(--r-md)] overflow-hidden mt-[8px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-[var(--ink)]">
        {/* Toolbar — CSS L14820-14869 */}
        <div className="flex items-center justify-between gap-[14px] py-[14px] px-[22px] bg-[linear-gradient(to_bottom,rgba(14,14,12,0.04),rgba(14,14,12,0.01))] border-b border-[var(--line)] flex-wrap">
          <div className="flex items-center gap-[12px] flex-1 min-w-0">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold py-[3px] px-[7px] bg-[var(--cream-deep)] rounded-[3px]">
              {data.toolbar.eyebrow}
            </span>
            <input
              type="text"
              defaultValue={data.toolbar.nameInputDefault}
              aria-label="Report name"
              className="font-display text-[18px] font-medium text-[var(--ink)] tracking-[-0.02em] bg-transparent border-0 border-b-[1.5px] border-b-dashed border-b-transparent py-[4px] px-[6px] -ml-[6px] flex-1 min-w-0 outline-none transition-[border-color,background] duration-[120ms] ease hover:border-b-[var(--line)] focus:border-b-[var(--ink)] focus:bg-[rgba(14,14,12,0.02)]"
            />
          </div>
          <div className="inline-flex gap-[8px]">
            {data.toolbar.actions.map((a) => (
              <button
                key={a.key}
                type="button"
                data-rep-action={`builder-${a.key}`}
                onClick={() => console.log('[rb-action] builder', a.key)}
                className={cn(
                  'inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer whitespace-nowrap transition-all duration-150 ease',
                  a.variant === 'primary'
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] [&_svg]:text-[var(--paper)] hover:bg-black'
                    : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] [&_svg]:text-[var(--ink-mute)] hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] hover:[&_svg]:text-[var(--ink)]'
                )}
              >
                {a.iconKey && <ToolbarIcon icon={a.iconKey} />}
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-col grid — CSS L14872-14885 */}
        <div className="grid grid-cols-[220px_1fr_1fr] border-b border-[var(--line)] max-[1080px]:grid-cols-[200px_1fr] max-[720px]:grid-cols-1">
          <ReportsBuilderSources groups={data.sources} />
          <ReportsBuilderCanvas data={data.canvas} />
          <ReportsBuilderPreview data={data.preview} />
        </div>

        <ReportsBuilderFoot data={data.foot} />
      </div>
    </div>
  );
}
