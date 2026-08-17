/**
 * Phase 15a — Fraud alert actions row.
 *
 * admin.html: Hero action buttons + More dropdown.
 * Client component — holds More dropdown open state.
 */
'use client';

import { useState, useRef, useEffect } from 'react';
import type { FraudAlertProfile } from '@/lib/mock-data/admin/fraud-alerts-data';

interface FraudActionsRowProps {
  alert: FraudAlertProfile;
}

export function FraudActionsRow({ alert }: FraudActionsRowProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moreOpen) return;
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [moreOpen]);

  return (
    <div className="flex items-center gap-[8px] mb-[24px] flex-wrap">
      {alert.actions.map((action) => (
        <button
          key={action.key}
          type="button"
          data-fraud-action={action.key}
          onClick={() => console.log('[fraud-action]', action.key)}
          className={`inline-flex items-center gap-[6px] py-[8px] pl-[14px] pr-[16px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer whitespace-nowrap transition-all duration-150 ease ${
            action.variant === 'primary'
              ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-black'
              : action.variant === 'danger'
                ? 'bg-[var(--danger)] text-white border-[var(--danger)] hover:bg-[#b53a2e]'
                : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]'
          }`}
        >
          {action.label}
        </button>
      ))}

      {/* More dropdown */}
      <div className="relative" ref={moreRef}>
        <button
          type="button"
          onClick={() => setMoreOpen((p) => !p)}
          className="inline-flex items-center justify-center w-[34px] h-[34px] bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-mute)] cursor-pointer transition-all duration-150 ease hover:border-[var(--ink)] hover:text-[var(--ink)]"
          aria-label="More actions"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
        {moreOpen && (
          <div className="absolute top-full right-0 mt-[4px] w-[200px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] shadow-[0_8px_24px_rgba(14,14,12,0.12)] z-20 py-[4px]">
            {alert.moreActions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  console.log('[fraud-more]', label);
                  setMoreOpen(false);
                }}
                className="w-full text-left py-[8px] px-[14px] font-body text-[12.5px] text-[var(--ink-soft)] hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
