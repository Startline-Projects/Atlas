'use client';

import { cn } from '@/lib/utils/cn';

interface JobActionsRowProps {
  jobId: string;
}

type ActionVariant = 'default' | 'lime' | 'warn' | 'danger';

interface ActionConfig {
  key: string;
  label: string;
  variant: ActionVariant;
  icon: React.ReactNode;
}

// admin.html lines 22668-22692
const ACTIONS_BEFORE: ActionConfig[] = [
  {
    key: 'message-client', label: 'Message client', variant: 'lime',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    key: 'force-shortlist', label: 'Force shortlist', variant: 'default',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    key: 'edit-job', label: 'Edit posting', variant: 'default',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    key: 'investigate', label: 'Investigate', variant: 'warn',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
];

const ACTIONS_AFTER: ActionConfig[] = [
  {
    key: 'pause', label: 'Pause', variant: 'warn',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
      </svg>
    ),
  },
  {
    key: 'close', label: 'Close', variant: 'danger',
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

function ActionButton({ action, jobId }: { action: ActionConfig; jobId: string }) {
  return (
    <button
      type="button"
      data-job-action={action.key}
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log(`[job-action] ${action.key} clicked for ${jobId}`);
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

export function JobActionsRow({ jobId }: JobActionsRowProps) {
  return (
    // admin.html line 22666: .eng-actions-row reused
    <div className="flex flex-wrap gap-[8px] items-center mb-[22px] py-[14px] px-[18px] bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)]">
      <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-semibold mr-[8px]">
        JOB ACTIONS
      </span>
      {ACTIONS_BEFORE.map((action) => (
        <ActionButton key={action.key} action={action} jobId={jobId} />
      ))}
      <div aria-hidden="true" className="w-[1px] bg-[var(--line-soft)] my-[4px] mx-[6px] self-stretch" />
      {ACTIONS_AFTER.map((action) => (
        <ActionButton key={action.key} action={action} jobId={jobId} />
      ))}
    </div>
  );
}
