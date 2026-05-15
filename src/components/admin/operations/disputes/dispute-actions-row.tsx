'use client';

import { cn } from '@/lib/utils/cn';

interface DisputeActionsRowProps {
  disputeId: string;
}

type ActionVariant = 'default' | 'lime' | 'warn' | 'danger';

interface ActionConfig {
  key: string;
  label: string;
  variant: ActionVariant;
  icon: React.ReactNode;
}

const ACTIONS_BEFORE: ActionConfig[] = [
  {
    key: 'message-all-parties', label: 'Message all parties', variant: 'lime',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    key: 'override-specialist', label: 'Override specialist decision', variant: 'warn',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 9-9" />
        <polyline points="3 4 3 10 9 10" />
      </svg>
    ),
  },
  {
    key: 'make-admin-decision', label: 'Make admin decision', variant: 'warn',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 6h18M6 12h12M10 18h4" />
      </svg>
    ),
  },
  {
    key: 'refund-parties', label: 'Refund parties', variant: 'default',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const ACTIONS_AFTER: ActionConfig[] = [
  {
    key: 'flag-trust-safety', label: 'Flag for Trust & Safety', variant: 'warn',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
  },
  {
    key: 'suspend-party', label: 'Suspend a party', variant: 'danger',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
];

function variantClass(variant: ActionVariant): string {
  switch (variant) {
    case 'lime':
      return 'bg-[var(--lime)] border-[var(--lime)] text-[var(--ink)] hover:bg-[var(--lime-deep)] hover:border-[var(--lime-deep)] [&>svg]:text-[var(--ink)]';
    case 'warn':
      return 'bg-[var(--paper)] text-[var(--amber)] border-[rgba(232,118,58,0.3)] hover:bg-[var(--amber-bg)] hover:text-[var(--amber)] hover:border-[var(--amber)] [&>svg]:text-[var(--amber)]';
    case 'danger':
      return 'bg-[var(--paper)] text-[var(--danger)] border-[rgba(194,65,43,0.3)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] hover:border-[var(--danger)] [&>svg]:text-[var(--danger)]';
    case 'default':
    default:
      return 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] [&>svg]:text-[var(--ink-mute)] hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)] hover:[&>svg]:text-[var(--ink)]';
  }
}

function ActionButton({ action, disputeId }: { action: ActionConfig; disputeId: string }) {
  return (
    <button
      type="button"
      data-disp-action={action.key}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log(`[dispute-action] ${action.key} for ${disputeId}`);
      }}
      className={cn(
        'inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium border rounded-full cursor-pointer transition-all duration-150 ease whitespace-nowrap [&>svg]:flex-shrink-0 [&>svg]:transition-colors [&>svg]:duration-150',
        variantClass(action.variant)
      )}
    >
      {action.icon}
      {action.label}
    </button>
  );
}

export function DisputeActionsRow({ disputeId }: DisputeActionsRowProps) {
  return (
    <div className="flex flex-wrap gap-[8px] items-center mb-[22px] py-[14px] px-[18px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)]">
      <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mr-[8px]">
        ADMIN ACTIONS
      </span>
      {ACTIONS_BEFORE.map((action) => (
        <ActionButton key={action.key} action={action} disputeId={disputeId} />
      ))}
      <div aria-hidden="true" className="w-[1px] bg-[var(--line-soft)] my-[4px] mx-[6px] self-stretch" />
      {ACTIONS_AFTER.map((action) => (
        <ActionButton key={action.key} action={action} disputeId={disputeId} />
      ))}
    </div>
  );
}
