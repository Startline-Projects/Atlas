'use client';

import { cn } from '@/lib/utils/cn';

interface ReviewActionsRowProps {
  reviewId: string;
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
    key: 'approve', label: 'Approve (live)', variant: 'default',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    key: 'remove', label: 'Remove with reason', variant: 'danger',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    key: 'remove-cluster', label: 'Remove all 4 in cluster', variant: 'warn',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
      </svg>
    ),
  },
];

const ACTIONS_MIDDLE: ActionConfig[] = [
  {
    key: 'add-note', label: 'Add platform note', variant: 'default',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    key: 'notify-reviewee', label: 'Notify reviewee', variant: 'lime',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

const ACTIONS_AFTER: ActionConfig[] = [
  {
    key: 'suspend-reviewer', label: 'Suspend reviewer', variant: 'warn',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  {
    key: 'flag-ts', label: 'Escalate to Trust & Safety', variant: 'danger',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="22" x2="4" y2="15" />
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
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

function ActionButton({ action, reviewId }: { action: ActionConfig; reviewId: string }) {
  return (
    <button
      type="button"
      data-rev-action={action.key}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log(`[review-action] ${action.key} for ${reviewId}`);
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

export function ReviewActionsRow({ reviewId }: ReviewActionsRowProps) {
  return (
    <div className="flex flex-wrap gap-[8px] items-center mb-[22px] py-[14px] px-[18px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)]">
      <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mr-[8px]">
        MODERATION ACTIONS
      </span>
      {ACTIONS_BEFORE.map((a) => <ActionButton key={a.key} action={a} reviewId={reviewId} />)}
      <div aria-hidden="true" className="w-[1px] bg-[var(--line-soft)] my-[4px] mx-[6px] self-stretch" />
      {ACTIONS_MIDDLE.map((a) => <ActionButton key={a.key} action={a} reviewId={reviewId} />)}
      <div aria-hidden="true" className="w-[1px] bg-[var(--line-soft)] my-[4px] mx-[6px] self-stretch" />
      {ACTIONS_AFTER.map((a) => <ActionButton key={a.key} action={a} reviewId={reviewId} />)}
    </div>
  );
}
