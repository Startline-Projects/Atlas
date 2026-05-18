/* admin.html lines 62878-62922: editor card — head (EN canonical + teh-meta) + N fields.
   Body field uses data-tm-liquid + data-tm-tag attribute spans for Liquid syntax highlighting. */

import type { TmEditorCardData, TmField } from '@/lib/mock-data/admin/templates-data';

interface TmEditorCardProps {
  editor: TmEditorCardData;
}

export function TmEditorCard({ editor }: TmEditorCardProps) {
  return (
    <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden flex flex-col">
      {/* Editor head */}
      <div className="flex items-center justify-between gap-[10px] py-[10px] px-[16px] bg-[var(--paper-deep)] border-b border-b-[var(--line-soft)] flex-wrap">
        <h3 className="font-display text-[13.5px] font-medium tracking-[-0.01em] text-[var(--ink)] m-0">
          {editor.headTitle}
        </h3>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {editor.headMeta}
        </div>
      </div>

      {/* Field rows */}
      {editor.fields.map((field, idx) => (
        <FieldRow key={idx} field={field} />
      ))}
    </div>
  );
}

function FieldRow({ field }: { field: TmField }) {
  return (
    <div className="py-[14px] px-[16px] border-b border-b-[var(--line-soft)] last:border-b-0">
      <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold mb-[6px]">
        {field.label}
      </div>
      {field.kind === 'input' ? (
        <input
          type="text"
          defaultValue={field.valueHtml}
          className="w-full py-[8px] px-[10px] font-body text-[13px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--ink)]"
        />
      ) : (
        <div
          className="font-mono text-[12px] leading-[1.65] tracking-[0.01em] text-[var(--ink)] whitespace-pre-wrap py-[12px] px-[14px] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[4px] min-h-[220px] [&_[data-tm-liquid]]:text-[var(--super)] [&_[data-tm-liquid]]:font-bold [&_[data-tm-liquid]]:bg-[rgba(110,63,224,0.08)] [&_[data-tm-liquid]]:py-[1px] [&_[data-tm-liquid]]:px-[3px] [&_[data-tm-liquid]]:rounded-[3px] [&_[data-tm-tag]]:text-[var(--danger)] [&_[data-tm-tag]]:font-bold [&_a]:text-[var(--super)] [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: field.valueHtml }}
        />
      )}
    </div>
  );
}
