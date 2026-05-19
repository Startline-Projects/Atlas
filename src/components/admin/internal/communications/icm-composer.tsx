'use client';

/* admin.html lines 65835-65841 + CSS 31267-31288: composer input + Send button */

import { useState } from 'react';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';

interface IcmComposerProps {
  placeholder: string;
  sendLabel: string;
}

export function IcmComposer({ placeholder, sendLabel }: IcmComposerProps) {
  const [value, setValue] = useState('');
  const { showAction } = useAdminActionToast();

  const handleSend = () => {
    const trimmed = value.trim();
    showAction(trimmed ? `Message sent: "${trimmed.slice(0, 40)}…"` : 'Message sent — empty draft');
    setValue('');
  };

  return (
    <div className="border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)] py-[10px] px-[14px] grid grid-cols-[minmax(0,1fr)_auto] gap-[8px] items-center flex-shrink-0">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={placeholder}
        className="py-[9px] px-[12px] font-body text-[13px] bg-[var(--paper)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] outline-none focus:border-[var(--ink)]"
      />
      <button
        type="button"
        onClick={handleSend}
        className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        {sendLabel}
      </button>
    </div>
  );
}
