import { USERS_DATA } from '@/lib/mock-data/admin/users-data';

export function UsersHeader() {
  const header = USERS_DATA.header;

  return (
    <header className="mb-[22px] pb-[22px] border-b border-[var(--color-line)]">
      {/* Eyebrow */}
      <div className="flex items-center gap-2 mb-[10px] font-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--color-ink-mute)]">
        <span>/admin/users</span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span className="inline-flex items-center gap-[5px] text-[var(--color-amber)] font-semibold">
          <span
            className="w-[5px] h-[5px] rounded-full bg-[var(--color-amber)] animate-pulse-soft"
            aria-hidden="true"
          />
          Live
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display text-[clamp(28px,4vw,38px)] font-medium text-[var(--color-ink)] leading-[1.05] mb-[10px]">
        All users on <span className="italic font-display">Atlas.</span>
      </h1>

      {/* Meta counts */}
      <div className="font-mono text-[12.5px] text-[var(--color-ink-mute)] flex flex-wrap gap-[4px_14px]">
        <span>
          <strong className="text-[var(--color-ink)] font-semibold">
            {header.totalAccounts.toLocaleString()}
          </strong>{' '}
          total accounts
        </span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span>
          <strong className="text-[var(--color-ink)] font-semibold">
            {header.candidatesCount.toLocaleString()}
          </strong>{' '}
          candidates
        </span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span>
          <strong className="text-[var(--color-ink)] font-semibold">
            {header.clientsCount.toLocaleString()}
          </strong>{' '}
          clients
        </span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span>
          <strong className="text-[var(--color-ink)] font-semibold">
            {header.specialistsCount}
          </strong>{' '}
          specialists
        </span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span>
          <strong className="text-[var(--color-ink)] font-semibold">
            {header.managersCount}
          </strong>{' '}
          manager
        </span>
        <span className="text-[var(--color-line-strong)]">·</span>
        <span>
          <strong className="text-[var(--color-ink)] font-semibold">
            {header.adminsCount}
          </strong>{' '}
          admins
        </span>
      </div>
    </header>
  );
}
