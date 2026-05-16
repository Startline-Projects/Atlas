import Link from 'next/link';
import { LrSourceBadge } from './legal-requests-source-badge';
import { LrTypeBadge } from './legal-requests-type-badge';

type SourceVariant = 'court' | 'regulator' | 'agency';
type TypeVariant = 'subpoena' | 'court-order' | 'regulatory' | 'foia' | 'preservation';

export function LegalRequestsTable() {
  const rows: Array<{
    id: string;
    refGag: boolean;
    source: { variant: SourceVariant; label: string; svgPath: string };
    type: { variant: TypeVariant; label: string };
    subject: { title: string; meta: string };
    deadline: { date: string; rel: string; variant: 'urgent' | 'warn' | 'met' };
    status: { label: string; variant: 'lr-under-review' | 'lr-acknowledged' | 'lr-responded' | 'lr-closed' };
    rowVariant?: 'urgent' | 'warn';
  }> = [
    {
      id: 'LR-2026-0023',
      refGag: true,
      source: { variant: 'court', label: 'SDNY', svgPath: 'M3 21h18M5 21V10l7-7 7 7v11M9 21V13h6v8' },
      type: { variant: 'subpoena', label: 'Subpoena Grand Jury' },
      subject: { title: 'Vorona Capital + 4 linked entities', meta: 'cl-167 + ring · criminal investigation · FA-2026-0042' },
      deadline: { date: 'May 25', rel: '14d remaining', variant: 'urgent' },
      status: { label: 'Under review', variant: 'lr-under-review' },
      rowVariant: 'urgent',
    },
    {
      id: 'LR-2026-0022',
      refGag: false,
      source: { variant: 'regulator', label: 'FTC Bureau', svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
      type: { variant: 'regulatory', label: 'Regulatory inquiry' },
      subject: { title: 'Platform-wide fraud-rate metrics & mitigation', meta: 'post-Vorona ring · benchmarking analysis' },
      deadline: { date: 'Jun 15', rel: '35d remaining', variant: 'warn' },
      status: { label: 'Under review', variant: 'lr-under-review' },
      rowVariant: 'warn',
    },
    {
      id: 'LR-2026-0021',
      refGag: false,
      source: { variant: 'regulator', label: 'California AG · Privacy Unit', svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
      type: { variant: 'regulatory', label: 'CCPA compliance audit' },
      subject: { title: 'CCPA / CPRA compliance posture · DSAR handling', meta: 'scope: privacy policy & processes review' },
      deadline: { date: 'Jul 20', rel: '70d remaining', variant: 'met' },
      status: { label: 'Under review', variant: 'lr-under-review' },
    },
    {
      id: 'LR-2026-0020',
      refGag: false,
      source: { variant: 'agency', label: 'Finanzamt München · DE', svgPath: 'M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z' },
      type: { variant: 'regulatory', label: 'Tax records request' },
      subject: { title: 'Studio Berlin GmbH invoicing & tax withholding', meta: 'scope: 2024-2026 records' },
      deadline: { date: 'Jun 30', rel: '50d remaining', variant: 'met' },
      status: { label: 'Acknowledged', variant: 'lr-acknowledged' },
    },
    {
      id: 'LR-2026-0019',
      refGag: true,
      source: { variant: 'court', label: 'US District Court · ED MI', svgPath: 'M3 21h18M5 21V10l7-7 7 7v11M9 21V13h6v8' },
      type: { variant: 'preservation', label: 'Preservation order' },
      subject: { title: 'A2Z Solutions Ltd · marketplace records', meta: 'scope: engagement contracts & comms · 1y' },
      deadline: { date: 'Jul 5', rel: '55d remaining', variant: 'warn' },
      status: { label: 'Responded', variant: 'lr-responded' },
    },
    {
      id: 'LR-2026-0018',
      refGag: false,
      source: { variant: 'agency', label: 'MI Dept of Labor', svgPath: 'M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z' },
      type: { variant: 'foia', label: 'Records request' },
      subject: { title: 'Worker-classification policies & training', meta: 'scope: gig marketplace talent classification' },
      deadline: { date: 'May 30', rel: '19d remaining', variant: 'met' },
      status: { label: 'Responded', variant: 'lr-responded' },
    },
    {
      id: 'LR-2026-0017',
      refGag: false,
      source: { variant: 'regulator', label: 'UK ICO', svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
      type: { variant: 'regulatory', label: 'GDPR breach follow-up' },
      subject: { title: 'SI-2026-0014 breach · remediation verification', meta: 'scope: user notification effectiveness review' },
      deadline: { date: 'May 9', rel: 'closed Apr 30', variant: 'met' },
      status: { label: 'Closed', variant: 'lr-closed' },
    },
    {
      id: 'LR-2026-0016',
      refGag: false,
      source: { variant: 'agency', label: 'NLRB Region 7', svgPath: 'M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z' },
      type: { variant: 'regulatory', label: 'Inquiry · gig classification' },
      subject: { title: 'Talent marketplace · contractor status', meta: 'scope: classification framework & practices' },
      deadline: { date: 'Apr 20', rel: 'closed Apr 18', variant: 'met' },
      status: { label: 'Closed', variant: 'lr-closed' },
    },
    {
      id: 'LR-2026-0015',
      refGag: false,
      source: { variant: 'agency', label: 'MIT Sloan', svgPath: 'M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z' },
      type: { variant: 'foia', label: 'Records request' },
      subject: { title: 'Aggregate pricing & engagement metrics', meta: 'scope: marketplace economics research' },
      deadline: { date: 'Apr 15', rel: 'closed Apr 12', variant: 'met' },
      status: { label: 'Closed', variant: 'lr-closed' },
    },
  ];

  const statusStyles: Record<string, { bg: string; text: string }> = {
    'lr-under-review': { bg: 'bg-[var(--amber-bg)]', text: 'text-[var(--amber)]' },
    'lr-acknowledged': { bg: 'bg-[var(--cream-deep)]', text: 'text-[var(--ink-soft)]' },
    'lr-responded': { bg: 'bg-[rgba(110,63,224,0.10)]', text: 'text-[var(--super)]' },
    'lr-closed': { bg: 'bg-[var(--success-bg)]', text: 'text-[var(--success)]' },
  };

  return (
    <>
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mb-[14px]">
        {/* Table head */}
        <div className="grid grid-cols-[110px_180px_140px_minmax(0,1fr)_130px_140px_44px] gap-[14px] items-center p-[12px_18px] bg-[var(--paper-deep)] border-b border-b-[var(--line)] font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold max-[1280px]:grid-cols-[100px_170px_130px_minmax(0,1fr)_120px_120px] max-[980px]:grid-cols-[100px_minmax(0,1fr)_110px_110px] max-[720px]:grid-cols-[100px_minmax(0,1fr)]">
          <div>Ref</div>
          <div className="max-[1280px]:hidden">Source</div>
          <div className="max-[980px]:hidden">Type</div>
          <div>Subject</div>
          <div className="max-[980px]:hidden">Deadline</div>
          <div className="max-[1280px]:hidden">Status</div>
          <div className="max-[720px]:hidden"></div>
        </div>

        {/* Table rows */}
        {rows.map((row) => {
          const ss = statusStyles[row.status.variant] || { bg: 'bg-[var(--cream-deep)]', text: 'text-[var(--ink-soft)]' };
          const rowBg = row.rowVariant === 'urgent' ? 'bg-[rgba(194,65,43,0.025)]' : row.rowVariant === 'warn' ? 'bg-[rgba(232,118,58,0.025)]' : '';
          const stripColor = row.rowVariant === 'urgent' ? 'bg-[var(--danger)]' : row.rowVariant === 'warn' ? 'bg-[var(--amber)]' : '';

          return (
            <Link
              key={row.id}
              href={`/admin/compliance/legal-requests/${row.id}`}
              className={`relative grid grid-cols-[110px_180px_140px_minmax(0,1fr)_130px_140px_44px] gap-[14px] items-center p-[12px_18px] border-b border-b-[var(--line-soft)] last:border-b-0 cursor-pointer transition-colors hover:bg-[var(--paper-deep)] max-[1280px]:grid-cols-[100px_170px_130px_minmax(0,1fr)_120px_120px] max-[980px]:grid-cols-[100px_minmax(0,1fr)_110px_110px] max-[720px]:grid-cols-[100px_minmax(0,1fr)] ${rowBg}`}
            >
            {row.rowVariant && <span className={`absolute left-0 top-0 bottom-0 w-[3px] ${stripColor}`} />}

            {/* col-ref */}
            <div className="flex flex-col gap-[2px] min-w-0">
              <div className="font-mono text-[11px] font-bold text-[var(--ink-soft)] tracking-[0.02em]">
                {row.id}
              </div>
              {row.refGag && (
                <span className="inline-block mt-[4px] py-[1px] px-[5px] text-[8.5px] tracking-[0.12em] uppercase font-bold bg-[var(--danger)] text-[var(--paper)] rounded-[3px] w-fit">
                  Gag
                </span>
              )}
            </div>

            {/* col-source */}
            <div className="min-w-0 max-[1280px]:hidden">
              <LrSourceBadge variant={row.source.variant} label={row.source.label} svgPath={row.source.svgPath} />
            </div>

            {/* col-type */}
            <div className="min-w-0 max-[980px]:hidden">
              <LrTypeBadge variant={row.type.variant} label={row.type.label} />
            </div>

            {/* col-subject */}
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold text-[var(--ink)] tracking-[-0.01em] leading-[1.4] truncate">
                {row.subject.title}
              </div>
              <div className="font-mono text-[10px] text-[var(--ink-mute)] font-medium tracking-[0.02em] mt-[2px] truncate">
                {row.subject.meta}
              </div>
            </div>

            {/* col-deadline */}
            <div className="max-[980px]:hidden">
              <div className={`font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] font-semibold tabular-nums ${
                row.deadline.variant === 'urgent'
                  ? 'text-[var(--danger)]'
                  : row.deadline.variant === 'warn'
                    ? 'text-[var(--amber)]'
                    : 'text-[var(--success)]'
              }`}>
                {row.deadline.variant === 'met' && '✓ '}
                {row.deadline.date}
              </div>
              <div className={`text-[9.5px] font-medium tracking-[0.04em] mt-[2px] ${
                row.deadline.variant === 'urgent'
                  ? 'text-[var(--danger)] font-bold'
                  : row.deadline.variant === 'warn'
                    ? 'text-[var(--amber)]'
                    : 'text-[var(--ink-mute)]'
              }`}>
                {row.deadline.rel}
              </div>
            </div>

            {/* col-status */}
            <div className="max-[1280px]:hidden">
              <span className={`inline-flex items-center font-mono text-[10px] font-bold tracking-[0.06em] uppercase py-[3px] px-[8px] rounded-[3px] ${ss.bg} ${ss.text}`}>
                {row.status.label}
              </span>
            </div>

            {/* col-actions */}
            <div className="flex justify-end max-[720px]:hidden">
              <button className="w-[28px] h-[28px] border border-[var(--line)] bg-[var(--paper)] rounded-full grid place-items-center text-[var(--ink-mute)] hover:bg-[var(--paper-deep)] cursor-pointer transition-colors" aria-label="Open">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </Link>
        );
      })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-[14px] flex-wrap gap-[12px]">
        <span className="font-mono text-[11px] text-[var(--ink-mute)] tracking-[0.02em]">
          9 of 31 shown · canonical sample · YTD · sorted by most recent activity
        </span>
        <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
          Load older (22 remaining) →
        </button>
      </div>
    </>
  );
}
