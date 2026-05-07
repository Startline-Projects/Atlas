import { FilterChip } from '@/lib/mock-data/admin/users-data';
import { ChevronDownIcon } from '@/components/ui/icons';

interface UsersToolbarProps {
  filters: FilterChip[];
  searchPlaceholder?: string;
  exportLabel?: string;
  primaryCta?: {
    label: string;
    action: string;
    variant?: 'primary';
  };
}

export function UsersToolbar({ filters, searchPlaceholder = 'Search candidates by name, email, or ID…', exportLabel = 'Export CSV', primaryCta }: UsersToolbarProps) {
  return (
    <div className="flex items-center gap-[10px] mb-[12px] flex-wrap">
      {/* Search Input */}
      <div className="relative flex-grow-0 flex-shrink basis-[320px] min-w-[200px]">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[var(--color-ink-mute)] pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder={searchPlaceholder}
          aria-label="Search"
          className="w-full px-[14px] py-[8px] pl-[34px] text-[13px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[999px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-mute)] placeholder:opacity-70 transition-all duration-150 ease focus:outline-none focus:border-[var(--color-ink)] focus:bg-white"
          readOnly
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-[6px]">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className="inline-flex items-center gap-[6px] pt-[7px] pb-[7px] pl-[14px] pr-[12px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[999px] text-[12.5px] text-[var(--color-ink-soft)] cursor-pointer transition-all duration-150 ease hover:border-[var(--color-ink-mute)] hover:text-[var(--color-ink)]"
            data-filter-trigger={filter.trigger}
          >
            {filter.activeValue ? (
              <>
                <span className="text-[var(--color-ink-mute)] font-medium leading-none">
                  {filter.label}
                </span>
                <span className="font-semibold leading-none">{filter.activeValue}</span>
              </>
            ) : (
              <span className="leading-none">{filter.label}</span>
            )}
            <ChevronDownIcon className="w-[9px] h-[9px] text-[var(--color-ink-mute)] transition-colors duration-150 ease group-hover:text-inherit" />
          </button>
        ))}
      </div>

      {/* Export Button + Primary CTA */}
      <div className="flex gap-[6px] ml-auto">
        {exportLabel && (
          <button
            type="button"
            className="inline-flex items-center gap-[6px] pt-[7px] pb-[7px] pl-[12px] pr-[14px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[999px] text-[12.5px] font-medium text-[var(--color-ink)] cursor-pointer transition-all duration-150 ease hover:bg-[var(--color-cream-deep)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
            data-users-action="export"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {exportLabel}
          </button>
        )}
        {primaryCta && (
          <button
            type="button"
            className={`inline-flex items-center gap-[6px] pt-[7px] pb-[7px] pl-[12px] pr-[14px] rounded-[999px] text-[12.5px] font-medium cursor-pointer transition-all duration-150 ease ${
              primaryCta.variant === 'primary'
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border border-[var(--color-ink)] hover:bg-[var(--color-ink-deep)] hover:border-[var(--color-ink-deep)]'
                : 'bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] hover:border-[var(--color-ink)]'
            }`}
            data-users-action={primaryCta.action}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {primaryCta.label}
          </button>
        )}
      </div>
    </div>
  );
}
