'use client';

import { useState } from 'react';
import { useSignInState } from '@/lib/admin/signin-state-context';

type SignInState =
  | 'default'
  | '2fa'
  | 'session-confirm'
  | 'lockout'
  | 'routing'
  | 'wrong-password-1'
  | 'wrong-password-2'
  | 'no-account'
  | '2fa-wrong'
  | 'ip-blocked'
  | 'anomaly'
  | 'suspended'
  | 'password-expired';

type ViewTab = 'signin' | 'dashboard' | 'profile' | 'users' | 'candidate' | 'client' | 'specialist' | 'manager' | 'admins' | 'engagements' | 'engagement' | 'jobs' | 'job' | 'disputes' | 'dispute' | 'review';

interface AdminPreviewPanelProps {
  onShowTimeoutModal?: () => void;
}

const tabs: Array<{ id: ViewTab; label: string; isLocked?: boolean }> = [
  { id: 'signin', label: 'Signin' },
  { id: 'dashboard', label: 'Dash' },
  { id: 'profile', label: 'Profile' },
  { id: 'users', label: 'Users' },
  { id: 'candidate', label: 'Cand' },
  { id: 'client', label: 'Clnt' },
  { id: 'specialist', label: 'Spec' },
  { id: 'manager', label: 'Mgr' },
  { id: 'admins', label: 'Adm' },
  { id: 'engagements', label: 'Eng·List' },
  { id: 'engagement', label: 'Eng·Detail' },
  { id: 'jobs', label: 'Job·List' },
  { id: 'job', label: 'Job·Detail' },
  { id: 'disputes', label: 'Disp·List' },
  { id: 'dispute', label: 'Disp·Detail' },
  { id: 'review', label: 'Rev', isLocked: true },
];

const tabMetadata: Record<ViewTab, { step: number; name: string; startLine: number; endLine: number }> = {
  signin:       { step: 1, name: 'Sign In',             startLine: 12569, endLine: 13331 },
  dashboard:    { step: 2, name: 'Dashboard',           startLine: 13332, endLine: 13933 },
  profile:      { step: 3, name: 'Profile',             startLine: 13934, endLine: 14895 },
  users:        { step: 4, name: 'Users',               startLine: 14896, endLine: 15914 },
  candidate:    { step: 5, name: 'Candidate',           startLine: 15915, endLine: 17093 },
  client:       { step: 6, name: 'Client',              startLine: 17094, endLine: 18206 },
  specialist:   { step: 7, name: 'Specialist',          startLine: 18207, endLine: 19362 },
  manager:      { step: 8, name: 'Manager',             startLine: 19363, endLine: 20632 },
  admins:       { step: 9, name: 'Other Admins',        startLine: 20633, endLine: 21373 },
  engagements:  { step: 10, name: 'Engagements (List)', startLine: 21374, endLine: 22292 },
  engagement:   { step: 10, name: 'Engagement Detail',  startLine: 21374, endLine: 22292 },
  jobs:         { step: 11, name: 'Jobs (List)',        startLine: 22293, endLine: 23446 },
  job:          { step: 11, name: 'Job Detail',         startLine: 22293, endLine: 23446 },
  disputes:     { step: 12, name: 'Disputes (List)',    startLine: 23447, endLine: 24692 },
  dispute:      { step: 12, name: 'Dispute Detail',     startLine: 23447, endLine: 24692 },
  review:       { step: 13, name: 'Reviews',            startLine: 0, endLine: 0 }, /* Placeholder for locked tab */
};

const signinStates: { label: string; value: SignInState; group: string }[] = [
  { label: 'Default form', value: 'default', group: 'CORE FLOW' },
  { label: '2FA prompt', value: '2fa', group: 'CORE FLOW' },
  { label: 'Session confirm', value: 'session-confirm', group: 'CORE FLOW' },
  { label: 'Routing transition', value: 'routing', group: 'CORE FLOW' },

  { label: 'Wrong password (1/3)', value: 'wrong-password-1', group: 'ERRORS' },
  { label: 'Wrong password (2/3)', value: 'wrong-password-2', group: 'ERRORS' },
  { label: 'No admin account', value: 'no-account', group: 'ERRORS' },
  { label: '2FA wrong code', value: '2fa-wrong', group: 'ERRORS' },

  { label: 'Locked (3 attempts)', value: 'lockout', group: 'SECURITY STATES' },
  { label: 'IP not allowed', value: 'ip-blocked', group: 'SECURITY STATES' },
  { label: 'Anomaly login', value: 'anomaly', group: 'SECURITY STATES' },
  { label: 'Account suspended', value: 'suspended', group: 'SECURITY STATES' },
  { label: 'Password expired', value: 'password-expired', group: 'SECURITY STATES' },
];

export function AdminPreviewPanel({
  onShowTimeoutModal,
}: AdminPreviewPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<ViewTab>('signin');
  const { currentState, setCurrentState } = useSignInState();

  const signinGroups = Array.from(new Set(signinStates.map((s) => s.group)));

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
    <div className="fixed bottom-5 right-5 w-64 bg-[var(--color-ink)] border border-[rgba(251,248,242,0.1)] text-[var(--color-paper)] z-40 shadow-lg rounded-lg">
      {/* Header */}
      <div className="sticky top-0 bg-[var(--color-ink)] px-4 py-3 border-b border-[rgba(251,248,242,0.1)] flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.08em] uppercase font-semibold">Design Preview</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xs hover:text-[var(--color-amber)] transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Tab Strip */}
      <div className="flex flex-wrap gap-1 p-1 bg-[rgba(251,248,242,0.06)] border-b border-[rgba(251,248,242,0.1)] m-2 rounded-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => !tab.isLocked && setActiveTab(tab.id)}
            disabled={tab.isLocked}
            title={tab.isLocked ? 'Built in step 13+' : undefined}
            className={`px-2 py-1 text-[10px] uppercase font-mono rounded-sm transition-all ${
              activeTab === tab.id
                ? 'bg-[rgba(251,248,242,0.18)] text-[var(--color-paper)]'
                : 'text-[rgba(251,248,242,0.55)] hover:text-[var(--color-paper)] hover:bg-[rgba(251,248,242,0.04)]'
            } ${tab.isLocked ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body: Conditional Content */}
      <div className="p-3 max-h-[70vh] overflow-y-auto">
        {activeTab === 'signin' ? (
          <>
            {/* Sign-in State Groups */}
            {signinGroups.map((group) => (
              <div key={group}>
                {/* Group label */}
                <div className="px-3 py-2 text-xs font-mono tracking-[0.08em] uppercase text-[rgba(251,248,242,0.55)] font-semibold border-t border-[rgba(251,248,242,0.1)] first:border-t-0">
                  {group}
                </div>

                {/* State buttons */}
                <div className="space-y-0">
                  {signinStates
                    .filter((s) => s.group === group)
                    .map((state) => (
                      <button
                        key={state.value}
                        type="button"
                        onClick={() => setCurrentState(state.value)}
                        className={`w-full px-3 py-2 text-xs text-left font-mono tracking-[0.01em] transition-colors border-l-2 ${
                          currentState === state.value
                            ? 'bg-[rgba(251,248,242,0.12)] border-l-[var(--color-lime)] text-[var(--color-lime)]'
                            : 'border-l-transparent text-[rgba(251,248,242,0.55)] hover:bg-[rgba(251,248,242,0.06)] hover:text-[var(--color-paper)]'
                        }`}
                      >
                        + {state.label}
                      </button>
                    ))}
                </div>
              </div>
            ))}

            {/* Modal trigger */}
            <div>
              <div className="px-3 py-2 text-xs font-mono tracking-[0.08em] uppercase text-[rgba(251,248,242,0.55)] font-semibold border-t border-[rgba(251,248,242,0.1)]">
                MODALS
              </div>
              <button
                type="button"
                onClick={() => onShowTimeoutModal?.()}
                className="w-full px-3 py-2 text-xs text-left font-mono tracking-[0.01em] transition-colors border-l-2 border-l-transparent text-[rgba(251,248,242,0.55)] hover:bg-[rgba(251,248,242,0.06)] hover:text-[var(--color-paper)]"
              >
                + Session timeout warning
              </button>
            </div>

            {/* Current state footer */}
            <div className="px-3 py-2 text-[10px] text-[rgba(251,248,242,0.4)] border-t border-[rgba(251,248,242,0.1)] mt-2">
              <p className="font-mono">Current State:</p>
              <p className="text-[var(--color-lime)] font-semibold mt-1">{currentState}</p>
            </div>
          </>
        ) : (
          /* Placeholder for unbuilt tabs */
          <div className="p-3 bg-[rgba(251,248,242,0.04)] rounded border border-[rgba(251,248,242,0.1)]">
            <div className="font-mono text-xs uppercase tracking-wide mb-2">
              <strong className="text-[var(--color-paper)]">Step {tabMetadata[activeTab].step} — {tabMetadata[activeTab].name}</strong>
            </div>
            <p className="text-xs leading-relaxed text-[rgba(251,248,242,0.7)]">
              Not yet built in Next.js. Preview panel shows state buttons once implementation is complete.
            </p>
            <p className="text-[10px] text-[rgba(251,248,242,0.4)] mt-2">
              Reference: admin.html lines {tabMetadata[activeTab].startLine}–{tabMetadata[activeTab].endLine}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
