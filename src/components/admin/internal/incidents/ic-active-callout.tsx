'use client';

/* admin.html lines 64933-64982 + CSS 30320-30443: active-incident hero callout
   2px danger border + danger gradient bg + pulsing "ACTIVE INCIDENT" eyebrow
   head + 4-cell stats grid + foot */

import { useRouter } from 'next/navigation';
import type { IcActiveCallout } from '@/lib/mock-data/admin/internal-incidents-data';
import { IcSevBadge } from './ic-sev-badge';
import { IcStatusPill } from './ic-status-pill';
import { IcActiveStatCell } from './ic-active-stat';
import { useAdminActionToast } from '@/components/admin/shared/admin-action-toast';

interface IcActiveCalloutProps {
  callout: IcActiveCallout;
}

export function IcActiveCalloutCard({ callout }: IcActiveCalloutProps) {
  const router = useRouter();
  const { showAction } = useAdminActionToast();

  const handleFootAction = (label: string, href?: string) => {
    if (href) {
      router.push(href);
      return;
    }
    showAction(label);
  };

  return (
    <div
      className="bg-[linear-gradient(135deg,rgba(194,65,43,0.08),var(--paper))] border-[2px] border-[var(--danger)] rounded-[var(--r-md)] py-[18px] px-[22px] mb-[22px] relative"
    >
      {/* "ACTIVE INCIDENT" eyebrow (replaces ::before, identical styling) */}
      <span className="absolute top-[-1px] left-[18px] bg-[var(--danger)] text-[var(--paper)] font-mono text-[8.5px] tracking-[0.16em] font-bold py-[3px] pl-[11px] pr-[9px] rounded-b-[4px] animate-[pulse-fr_1.5s_ease-in-out_infinite]">
        ACTIVE INCIDENT
      </span>

      {/* Head: id row + title + summary */}
      <div className="flex items-start gap-[14px] mb-[14px] pt-[10px]">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[8px] mb-[6px] flex-wrap">
            <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--ink-soft)] font-bold">
              {callout.id}
            </span>
            <IcSevBadge sev={callout.sev} />
            <IcStatusPill status={callout.status} label={callout.statusLabel} />
            <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
              {callout.ageText}
            </span>
          </div>
          <h3 className="font-display text-[19px] font-medium tracking-[-0.015em] text-[var(--ink)] m-0 mb-[6px] leading-[1.25]">
            {callout.title}
          </h3>
          <div
            className="font-body text-[13.5px] text-[var(--ink-soft)] tracking-[-0.005em] leading-[1.55] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: callout.summaryHtml }}
          />
        </div>
      </div>

      {/* 4-cell active stats grid */}
      <div className="grid grid-cols-4 gap-0 bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-sm)] overflow-hidden mb-[12px] max-[720px]:grid-cols-2">
        {callout.stats.map((stat, idx) => (
          <IcActiveStatCell key={idx} stat={stat} />
        ))}
      </div>

      {/* Foot: meta + actions */}
      <div className="flex items-center justify-between gap-[10px] flex-wrap">
        <div
          className="font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] [&_strong]:text-[var(--ink)] [&_strong]:font-bold"
          dangerouslySetInnerHTML={{ __html: callout.footMetaHtml }}
        />
        <div className="inline-flex gap-[6px]">
          {callout.footActions.map((action, idx) => {
            const isPrimary = action.isPrimary;
            const btnClasses = isPrimary
              ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)] hover:border-[var(--ink-soft)]'
              : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]';
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleFootAction(action.label, action.href)}
                className={`inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase rounded-full border cursor-pointer transition-all whitespace-nowrap ${btnClasses}`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
