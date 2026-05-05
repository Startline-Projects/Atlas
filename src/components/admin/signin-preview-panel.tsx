'use client';

import { useState } from 'react';

type PreviewState =
  | 'default'
  | '2fa'
  | 'session-confirm'
  | 'routing'
  | 'wrong-password-1'
  | 'wrong-password-2'
  | 'no-account'
  | '2fa-wrong'
  | 'locked'
  | 'ip-blocked'
  | 'anomaly'
  | 'suspended'
  | 'password-expired'
  | 'session-timeout';

interface PreviewPanelProps {
  onStateChange: (state: PreviewState) => void;
  currentState: PreviewState;
}

export function SignInPreviewPanel({ onStateChange, currentState }: PreviewPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const states: { label: string; value: PreviewState; group: string }[] = [
    { label: 'Default form', value: 'default', group: 'CORE FLOW' },
    { label: '2FA prompt', value: '2fa', group: 'CORE FLOW' },
    { label: 'Session confirm', value: 'session-confirm', group: 'CORE FLOW' },
    { label: 'Routing transition', value: 'routing', group: 'CORE FLOW' },

    { label: 'Wrong password (1/3)', value: 'wrong-password-1', group: 'ERRORS' },
    { label: 'Wrong password (2/3)', value: 'wrong-password-2', group: 'ERRORS' },
    { label: 'No admin account', value: 'no-account', group: 'ERRORS' },
    { label: '2FA wrong code', value: '2fa-wrong', group: 'ERRORS' },

    { label: 'Locked (3 attempts)', value: 'locked', group: 'SECURITY STATES' },
    { label: 'IP not allowed', value: 'ip-blocked', group: 'SECURITY STATES' },
    { label: 'Anomaly login', value: 'anomaly', group: 'SECURITY STATES' },
    { label: 'Account suspended', value: 'suspended', group: 'SECURITY STATES' },
    { label: 'Password expired', value: 'password-expired', group: 'SECURITY STATES' },

    { label: 'Session timeout warning', value: 'session-timeout', group: 'MODALS' },
  ];

  const groups = Array.from(new Set(states.map(s => s.group)));

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 px-3 py-2 bg-[var(--color-ink)] text-[var(--color-paper)] text-xs font-mono tracking-[0.08em] uppercase rounded hover:bg-black transition-colors"
      >
        Preview
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 w-64 h-screen bg-[#1a1a1a] border-l border-[#333] text-white overflow-y-auto z-40 shadow-lg">
      {/* Header */}
      <div className="sticky top-0 bg-[#000] px-4 py-3 border-b border-[#333] flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.08em] uppercase font-semibold">Design Preview</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xs hover:text-[var(--color-amber)] transition-colors"
        >
          ✕
        </button>
      </div>

      {/* State groups */}
      <div className="p-0">
        {groups.map((group) => (
          <div key={group}>
            {/* Group label */}
            <div className="px-4 py-3 text-xs font-mono tracking-[0.08em] uppercase text-[#888] font-semibold border-t border-[#222]">
              {group}
            </div>

            {/* State buttons */}
            <div className="space-y-0">
              {states
                .filter((s) => s.group === group)
                .map((state) => (
                  <button
                    key={state.value}
                    onClick={() => onStateChange(state.value)}
                    className={`w-full px-4 py-2.5 text-xs text-left font-mono tracking-[0.01em] transition-colors border-l-2 ${
                      currentState === state.value
                        ? 'bg-[#222] border-l-[var(--color-lime)] text-[var(--color-lime)]'
                        : 'border-l-transparent text-[#ccc] hover:bg-[#111] hover:text-white'
                    }`}
                  >
                    + {state.label}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="px-4 py-3 text-[10px] text-[#666] border-t border-[#222] mt-4">
        <p className="font-mono">Current State:</p>
        <p className="text-[var(--color-lime)] font-semibold mt-1">{currentState}</p>
      </div>
    </div>
  );
}
