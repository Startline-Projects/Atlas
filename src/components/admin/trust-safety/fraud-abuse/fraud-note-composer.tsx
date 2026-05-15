/**
 * Phase 15c — Note composer (NEW PRIMITIVE, 'use client').
 *
 * admin.html CSS: .fr-note.you + .fr-note-composer (L16432, L16480-16513)
 * admin.html markup: L40174-40187
 *
 * 4th item of fr-notes-list. .you variant: border-left super + bg rgba(110,63,224,0.03).
 * Uncontrolled textarea + ref + console.log save stub (Option A from CHECK).
 */
'use client';

import { useRef } from 'react';
import type { FraudNoteComposerData } from '@/lib/mock-data/admin/fraud-alerts-data';

interface FraudNoteComposerProps {
  config: FraudNoteComposerData;
}

export function FraudNoteComposer({ config }: FraudNoteComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    const value = textareaRef.current?.value ?? '';
    console.log('[fraud-save-note]', value);
    if (textareaRef.current) textareaRef.current.value = '';
  };

  return (
    <div className="py-[14px] px-[16px] bg-[rgba(110,63,224,0.03)] border border-[var(--line-soft)] rounded-[var(--r-sm)] border-l-[3px] border-l-[var(--super)]">
      {/* Note head */}
      <div className="flex items-center gap-[10px] mb-[8px]">
        <div
          className="w-[24px] h-[24px] rounded-full grid place-items-center flex-shrink-0 font-display text-[9px] text-[var(--paper)] font-medium"
          style={{ background: config.authorAvatarGradient }}
        >
          {config.authorInitials}
        </div>
        <span className="text-[12.5px] font-bold text-[var(--ink)] tracking-[-0.01em]">
          {config.authorLabel}
        </span>
        <span className="font-mono text-[9px] tracking-[0.06em] uppercase text-[var(--ink-mute)] bg-[var(--cream-deep)] py-[2px] px-[5px] rounded-[3px] font-bold">
          {config.roleLabel}
        </span>
      </div>

      {/* Composer wrapper */}
      <div className="mt-[12px] py-[12px] px-[14px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)]">
        <textarea
          ref={textareaRef}
          defaultValue=""
          placeholder={config.placeholder}
          data-fraud-action="note-input"
          aria-label="Add investigation note"
          className="w-full min-h-[60px] font-body text-[13px] text-[var(--ink)] bg-transparent border-0 resize-y outline-none tracking-[-0.005em] leading-[1.5] placeholder:text-[var(--ink-mute)]"
        />

        {/* Footer */}
        <div className="flex justify-between items-center gap-[12px] mt-[8px] pt-[8px] border-t border-dashed border-[var(--line-soft)] font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] flex-wrap">
          <span>{config.footerLeftText}</span>
          <button
            type="button"
            data-fraud-action="save-note"
            onClick={handleSave}
            className="inline-flex items-center font-body font-medium bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] rounded-full cursor-pointer whitespace-nowrap transition-all duration-150 ease hover:bg-black"
            style={{ padding: '5px 12px', fontSize: '11.5px' }}
          >
            {config.saveButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
