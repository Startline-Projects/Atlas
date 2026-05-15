'use client';

import { useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { USERS_DATA, STATUS_PILL_CONFIG } from '@/lib/mock-data/admin/users-data';
import type { CandidateUser, ClientUser, SpecialistUser, AdminUser, TabConfig } from '@/lib/mock-data/admin/users-data';

// ============================================================
// TYPE DEFINITIONS
// ============================================================
type TableRow = CandidateUser | ClientUser | SpecialistUser | AdminUser;

interface StatusPillProps {
  status: 'live' | 'pipeline' | 'suspended' | 'banned' | 'verified' | 'unverified' | 'on-track' | 'caseload-high' | 'on-break';
  label?: string;
}

// ============================================================
// STATUS PILL COMPONENT (Internal helper)
// ============================================================
function StatusPill({ status, label }: StatusPillProps) {
  const config = STATUS_PILL_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-[5px] pt-[3px] pr-[9px] pb-[3px] pl-[8px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap ${config.bg} ${config.text}`}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-currentColor flex-shrink-0" />
      {label || config.label}
    </span>
  );
}

// ============================================================
// ADMIN ROLE MAPPINGS (for Admins tab)
// ============================================================
const roleMiniStyles: Record<string, { pill: string; dot: string }> = {
  'operations': {
    pill: 'bg-[var(--color-ink)] text-[var(--color-paper)]',
    dot: 'bg-[var(--color-lime)]'
  },
  'super-admin': {
    pill: 'bg-[rgba(110,63,224,0.12)] text-[var(--color-super)]',
    dot: 'bg-[var(--color-super)]'
  },
  'trust-safety': {
    pill: 'bg-[var(--color-amber-bg)] text-[var(--color-amber)]',
    dot: 'bg-[var(--color-amber)]'
  },
  'finance': {
    pill: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
    dot: 'bg-[var(--color-success)]'
  },
  'compliance': {
    pill: 'bg-[var(--color-navy-bg)] text-[var(--color-navy)]',
    dot: 'bg-[var(--color-navy)]'
  },
};

const baseMiniPillClasses = 'inline-flex items-center gap-[6px] py-[3px] pl-[8px] pr-[10px] rounded-full font-mono text-[9.5px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap';
const baseMiniDotClasses = 'w-[5px] h-[5px] rounded-full flex-shrink-0';
const defaultMiniPill = 'bg-[var(--color-cream-deep)] text-[var(--color-ink-soft)]';
const defaultMiniDot = 'bg-[var(--color-ink-mute)]';

const roleDisplayMap: Record<string, string> = {
  'operations': 'Operations',
  'super-admin': 'Super Admin',
  'trust-safety': 'Trust & Safety',
  'finance': 'Finance',
  'compliance': 'Compliance',
};

// ============================================================
// USERS TABLE COMPONENT
// ============================================================
interface UsersTableProps {
  rows: TableRow[];
  tableConfig: TabConfig;
  selectedRows: Set<string>;
  onSelectionChange: (id: string, selected: boolean) => void;
  onSelectAll: (selectAll: boolean) => void;
  activeTab?: 'candidates' | 'clients' | 'specialists' | 'manager' | 'admins';
}

export function UsersTable({ rows, tableConfig, selectedRows, onSelectionChange, onSelectAll, activeTab }: UsersTableProps) {
  const router = useRouter();
  const totalCandidates = USERS_DATA.header.candidatesCount;
  const hasRows = rows && rows.length > 0;
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  // Sync header checkbox state (checked/indeterminate) with selectedRows
  useEffect(() => {
    if (headerCheckboxRef.current) {
      if (selectedRows.size === 0) {
        headerCheckboxRef.current.checked = false;
        headerCheckboxRef.current.indeterminate = false;
      } else if (selectedRows.size === rows.length) {
        headerCheckboxRef.current.checked = true;
        headerCheckboxRef.current.indeterminate = false;
      } else {
        headerCheckboxRef.current.checked = false;
        headerCheckboxRef.current.indeterminate = true;
      }
    }
  }, [selectedRows, rows.length]);

  const handleHeaderCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSelectAll(e.currentTarget.checked);
  };

  // Row click handler: navigate to candidate or client detail page (admin.html lines 26789-26824 pattern)
  const handleRowClick = (e: MouseEvent<HTMLDivElement>, rowId: string, row: TableRow) => {
    const target = e.target as HTMLElement;

    // Don't fire if click was on checkbox, action button, or any input/button
    if (target.closest('[data-row-select]') ||
        target.closest('[data-row-action]') ||
        target.closest('button') ||
        target.closest('input')) {
      return;
    }

    // Navigate for candidate or client rows
    if (activeTab === 'candidates' && 'hiresCount' in row && rowId.indexOf('cand-') === 0) {
      router.push(`/admin/users/candidates/${rowId}`);
    } else if (activeTab === 'clients' && 'spendCount' in row && rowId.indexOf('cl-') === 0) {
      router.push(`/admin/users/clients/${rowId}`);
    } else if (activeTab === 'specialists' && 'caseload' in row && rowId.indexOf('spec-') === 0) {
      router.push(`/admin/users/specialists/${rowId}`);
    } else if (activeTab === 'admins' && 'twoFa' in row && rowId.indexOf('admin-') === 0) {
      router.push(`/admin/users/admins/profile#${rowId}`, { scroll: false });
    }
  };

  return (
    <>
      {hasRows ? (
        <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-md)] overflow-hidden">
          {/* Scrollable table wrapper */}
          <div className="users-table-wrap">
            {/* Table Head */}
            <div
              className="grid items-center gap-[14px] px-[18px] py-[11px] bg-[var(--color-paper-deep)] border-b border-[var(--color-line-soft)] sticky top-0 z-[1]"
              style={{ gridTemplateColumns: tableConfig.gridCols }}
              role="row"
            >
              {/* Checkbox Header */}
              <div className="flex items-center justify-center">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  onChange={handleHeaderCheckboxChange}
                  aria-label="Select all rows"
                  data-select-all
                  className="w-[14px] h-[14px] cursor-pointer accent-[var(--color-ink)]"
                />
              </div>

              {/* Dynamic Column Headers */}
              {tableConfig.columns.map(col => (
                <div
                  key={col.id}
                  className={`font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--color-ink-mute)] font-semibold user-select-none ${col.sortable ? 'flex items-center gap-[4px] cursor-pointer transition-colors hover:text-[var(--color-ink)]' : ''}`}
                  role="columnheader"
                  data-sort={col.sortable ? col.id : undefined}
                >
                  {col.label}
                  {col.sortable && (
                    <span className="inline-block w-0 h-0 border-l-[3px_solid_transparent] border-r-[3px_solid_transparent] ml-[3px] opacity-0 transition-opacity" />
                  )}
                </div>
              ))}

              {/* Actions Header */}
              <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-[var(--color-ink-mute)] font-semibold user-select-none" role="columnheader" aria-label="Actions" />
            </div>

            {/* Table Body */}
            {rows.map((row, idx) => {
              const isCandidateRow = activeTab === 'candidates' && 'hiresCount' in row;
              const isClientRow = activeTab === 'clients' && 'spendCount' in row;
              const isSpecialistRow = activeTab === 'specialists' && 'caseload' in row;
              const isAdminRow = activeTab === 'admins' && 'twoFa' in row;
              return (
              <div
                key={row.id}
                onClick={(e) => handleRowClick(e, row.id, row)}
                className={`grid items-center gap-[14px] px-[18px] py-[12px] border-b border-dashed border-[var(--color-line-soft)] transition-colors duration-[120ms] ease text-[13px] relative last:border-b-0 ${isCandidateRow || isClientRow || isSpecialistRow || isAdminRow ? 'cursor-pointer' : ''} ${selectedRows.has(row.id) ? "bg-[rgba(214,242,77,0.10)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[var(--lime-deep)] selected" : 'hover:bg-[#FCF9F1]'}`}
                style={{ gridTemplateColumns: tableConfig.gridCols }}
                role="row"
                data-user-id={row.id}
              >
                {/* Checkbox Cell */}
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={(e) => onSelectionChange(row.id, e.target.checked)}
                    aria-label="Select row"
                    data-row-select
                    className="w-[14px] h-[14px] cursor-pointer accent-[var(--color-ink)]"
                  />
                </div>

                {/* Dynamic Row Cells */}
                {tableConfig.columns.map(col => {
                  switch (col.id) {
                    case 'name':
                      return (
                        <div key={col.id} className="flex items-center gap-[11px] min-w-0">
                          <div
                            className={`row-avatar av-${(idx % 12) + 1} w-[32px] h-[32px] rounded-full grid place-items-center font-display text-[12px] font-medium text-[var(--color-paper)] flex-shrink-0 tracking-[-0.01em]`}
                            aria-hidden="true"
                          >
                            {row.name
                              .split(' ')
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-semibold text-[var(--color-ink)] leading-[1.2] whitespace-nowrap overflow-hidden text-ellipsis">
                              {row.name}
                              {'isYou' in row && row.isYou && <span className="you-tag">YOU</span>}
                            </div>
                            <div className="font-mono text-[11px] text-[var(--color-ink-mute)] tracking-[0.01em] whitespace-nowrap overflow-hidden text-ellipsis mt-[2px]">
                              {row.email}
                            </div>
                          </div>
                        </div>
                      );
                    case 'country':
                      return 'flag' in row ? (
                        <div key={col.id} className="flex items-center gap-[7px] text-[var(--color-ink-soft)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                          <span className="text-[14px] flex-shrink-0 leading-[1]" aria-hidden="true">
                            {row.flag}
                          </span>
                          {row.country}
                        </div>
                      ) : null;
                    case 'category':
                      // Candidates-specific
                      return 'title' in row && !('caseload' in row) ? (
                        <div key={col.id} className="flex items-center gap-[7px] text-[var(--color-ink-soft)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                          {row.title}
                        </div>
                      ) : null;
                    case 'industry':
                      // Clients-specific
                      return 'industry' in row ? (
                        <div key={col.id} className="flex items-center gap-[7px] text-[var(--color-ink-soft)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                          {row.industry}
                        </div>
                      ) : null;
                    case 'status':
                      return 'status' in row ? (
                        <div key={col.id}>
                          <StatusPill status={row.status} />
                        </div>
                      ) : null;
                    case 'joined':
                      return 'joinedMonth' in row ? (
                        <div key={col.id} className="font-mono text-[11.5px] text-[var(--color-ink-mute)] tracking-[0.02em] whitespace-nowrap">
                          {row.joinedMonth}
                        </div>
                      ) : null;
                    case 'lastActive':
                      return 'lastActiveType' in row ? (
                        <div
                          key={col.id}
                          className={`font-mono text-[11.5px] tracking-[0.02em] whitespace-nowrap ${
                            row.lastActiveType === 'fresh'
                              ? 'text-[var(--color-success)] font-semibold'
                              : 'text-[var(--color-ink-mute)]'
                          }`}
                        >
                          {row.lastActive}
                        </div>
                      ) : null;
                    case 'hires':
                      // Candidates-specific
                      return 'hiresCount' in row ? (
                        <div key={col.id} className="flex flex-col gap-[1px]">
                          <span
                            className={`${
                              row.hiresStatus === 'completed'
                                ? 'text-[var(--color-ink)] font-semibold'
                                : 'text-[var(--color-ink-mute)] font-normal'
                            } text-[13px] [font-variant-numeric:tabular-nums]`}
                          >
                            {row.hiresCount}
                          </span>
                          <span className="font-mono text-[11px] text-[var(--color-ink-mute)] tracking-[0.02em]">
                            {row.hiresAmount}
                          </span>
                        </div>
                      ) : null;
                    case 'spend':
                      // Clients-specific
                      return 'spendCount' in row ? (
                        <div key={col.id} className="flex flex-col gap-[1px]">
                          <span
                            className={`${
                              row.spendStatus === 'completed'
                                ? 'text-[var(--color-ink)] font-semibold'
                                : 'text-[var(--color-ink-mute)] font-normal'
                            } text-[13px] [font-variant-numeric:tabular-nums]`}
                          >
                            {row.spendCount} hires
                          </span>
                          <span className="font-mono text-[11px] text-[var(--color-ink-mute)] tracking-[0.02em]">
                            {row.spendAmount}
                          </span>
                        </div>
                      ) : null;
                    case 'region':
                      // Specialists-specific
                      return 'region' in row ? (
                        <div key={col.id} className="text-[var(--color-ink-soft)]">
                          {row.region}
                        </div>
                      ) : null;
                    case 'caseload':
                      // Specialists-specific
                      return 'caseload' in row ? (
                        <div key={col.id} className="flex items-center gap-[7px]">
                          <strong className={
                            row.status === 'caseload-high'
                              ? 'text-[var(--color-amber)] font-semibold'
                              : 'text-[var(--color-ink)] font-semibold'
                          }>
                            {row.caseload}
                          </strong>
                          <span className="text-[var(--color-ink-soft)]">active</span>
                        </div>
                      ) : null;
                    case 'sla':
                      // Specialists-specific - SLA mini bar
                      return 'slaPercent' in row ? (
                        <div key={col.id} className="flex items-center gap-[8px]">
                          <div className="flex-1 min-w-[36px] h-[3px] bg-[var(--color-line-soft)] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-colors ${
                                row.status === 'caseload-high'
                                  ? 'bg-[var(--color-amber)]'
                                  : 'bg-[var(--color-success)]'
                              }`}
                              style={{ width: `${row.slaPercent}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-[var(--color-ink-mute)] tracking-[0.02em] min-w-fit">
                            {row.slaPercent}%
                          </span>
                        </div>
                      ) : null;
                    case 'reviewsDisputes':
                      // Specialists-specific
                      return 'reviewsCount' in row ? (
                        <div key={col.id} className="flex items-baseline gap-0">
                          <span className="font-mono text-[11px] font-semibold text-[var(--color-ink)]">
                            {row.reviewsCount}
                          </span>
                          <span className="font-mono text-[10px] text-[var(--color-ink-mute)] ml-[4px]">
                            REVIEWS
                          </span>
                          <span className="font-mono text-[11px] font-semibold text-[var(--color-ink)] ml-[12px]">
                            {row.disputesCount}
                          </span>
                          <span className="font-mono text-[10px] text-[var(--color-ink-mute)] ml-[4px]">
                            DISPUTES
                          </span>
                        </div>
                      ) : null;
                    case 'role':
                      // Admins-specific role pill
                      return 'role' in row && 'twoFa' in row ? (
                        <div key={col.id}>
                          {(() => {
                            const role = (row as any).role;
                            const styles = roleMiniStyles[role] || { pill: defaultMiniPill, dot: defaultMiniDot };
                            return (
                              <span className={`${baseMiniPillClasses} ${styles.pill}`}>
                                <span className={`${baseMiniDotClasses} ${styles.dot}`} />
                                {roleDisplayMap[role]}
                              </span>
                            );
                          })()}
                        </div>
                      ) : null;
                    case 'lastLogin':
                      // Admins-specific last login (also handles candidate lastActive)
                      if ('lastLogin' in row && 'twoFa' in row) {
                        return (
                          <div
                            key={col.id}
                            className={`font-mono text-[11.5px] tracking-[0.02em] whitespace-nowrap ${
                              (row as any).lastLogin.startsWith('Today')
                                ? 'text-[var(--color-success)] font-semibold'
                                : 'text-[var(--color-ink-mute)]'
                            }`}
                          >
                            {(row as any).lastLogin}
                          </div>
                        );
                      }
                      return null;
                    case '2fa':
                      // Admins-specific 2FA status
                      return 'twoFa' in row ? (
                        <div key={col.id} className="text-[13px]">
                          <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                            ✓ Enabled
                          </span>
                        </div>
                      ) : null;
                    case 'ips':
                      // Admins-specific IP count
                      return 'ipCount' in row ? (
                        <div key={col.id} className="text-[13px]">
                          <strong>{(row as any).ipCount}</strong> IPs
                        </div>
                      ) : null;
                    case 'actionsToday':
                      // Admins-specific actions today
                      return 'actionsToday' in row ? (
                        <div
                          key={col.id}
                          className={
                            (row as any).actionsTodayType === 'count'
                              ? 'text-[13px]'
                              : 'font-mono text-[11.5px] text-[var(--color-ink-mute)]'
                          }
                        >
                          {(row as any).actionsTodayType === 'count' ? (
                            <>
                              <strong>{(row as any).actionsToday}</strong> today
                            </>
                          ) : (
                            'none today'
                          )}
                        </div>
                      ) : null;
                    default:
                      return null;
                  }
                })}

                {/* Actions Cell */}
                <button
                  type="button"
                  aria-label="Row actions"
                  data-row-action={row.id}
                  className="w-[28px] h-[28px] grid place-items-center bg-transparent border-none rounded-full text-[var(--color-ink-mute)] cursor-pointer transition-[background,color] duration-[120ms] ease hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              </div>
            );
            })}
          </div>

          {/* Table Footer */}
          <div className="px-[18px] py-[12px] border-t border-[var(--color-line-soft)] flex items-center justify-between flex-wrap gap-[10px] text-[12px] text-[var(--color-ink-mute)] font-mono tracking-[0.02em]">
            <span>{tableConfig.pagination.text}</span>
            {tableConfig.pagination.buttons.length > 0 && (
              <div className="flex gap-[6px]">
                {tableConfig.pagination.buttons.map((btn) => (
                  <button
                    key={btn.action}
                    type="button"
                    aria-disabled={btn.disabled}
                    data-users-action={btn.action}
                    className={`px-[12px] py-[5px] font-body text-[12px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full transition-all duration-[150ms] ease ${
                      btn.disabled
                        ? 'text-[var(--color-ink-mute)] cursor-not-allowed opacity-50'
                        : 'text-[var(--color-ink-soft)] cursor-pointer hover:border-[var(--color-ink-mute)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[var(--color-paper)] border border-dashed border-[var(--color-line-strong)] rounded-[var(--radius-md)] px-[28px] py-[48px] text-center">
          <div className="w-[48px] h-[48px] mx-auto mb-[14px] rounded-full grid place-items-center bg-[var(--color-cream-deep)] text-[var(--color-ink-mute)]" aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h4 className="font-display text-[20px] font-medium tracking-[-0.01em] mb-[6px] text-[var(--color-ink)] [font-variation-settings:'opsz'_48]">
            No candidates match your filters
          </h4>
          <p className="text-[13px] text-[var(--color-ink-mute)] leading-[1.5] max-w-[380px] mx-auto">
            Try clearing some filters, or adjust your search query. The full directory of {totalCandidates.toLocaleString()} candidates is one click away.
          </p>
          <div className="mt-[16px] inline-flex gap-[8px]">
            <button
              type="button"
              className="py-[6px] px-[14px] font-body text-[12.5px] tracking-[0.08em] uppercase font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap bg-[var(--color-ink)] text-[var(--color-paper)] border border-[var(--color-ink)] hover:bg-black"
              data-users-action="clear-filters"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
