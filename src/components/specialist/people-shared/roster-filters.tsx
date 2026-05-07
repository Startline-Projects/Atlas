"use client";

import { Search } from "lucide-react";

export type SelectOption = { key: string; label: string };

export type RosterFilterSelectConfig = {
  /** Stable id, e.g. "tier" or "size". */
  id: string;
  ariaLabel: string;
  options: ReadonlyArray<SelectOption>;
};

type RosterFiltersProps = {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (v: string) => void;

  /** Up to 3 selects. The page picks values + handlers per select id. */
  selects: ReadonlyArray<{
    config: RosterFilterSelectConfig;
    value: string;
    onChange: (v: string) => void;
  }>;

  /** Right-side count chip — page formats it ("Showing 12 of 47"). */
  resultCountLabel: string;
};

export function RosterFilters({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  selects,
  resultCountLabel,
}: RosterFiltersProps) {
  return (
    <div className="border-line-soft bg-cream flex flex-wrap items-center gap-2.5 border-b px-6 py-3.5 sm:px-10">
      <label className="relative min-w-0 max-w-[380px] flex-1">
        <span className="sr-only">Search</span>
        <Search
          aria-hidden="true"
          className="text-ink-mute pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2"
          strokeWidth={1.4}
        />
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-line bg-paper text-ink placeholder:text-ink-mute focus:border-ink-soft w-full rounded-lg border py-2.5 pr-3.5 pl-9 text-[13px] outline-none"
        />
      </label>
      {selects.map(({ config, value, onChange }) => (
        <select
          key={config.id}
          aria-label={config.ariaLabel}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-line bg-paper text-ink hover:bg-cream-deep cursor-pointer appearance-none rounded-lg border bg-no-repeat py-2.5 pr-8 pl-3 text-[12.5px] transition-colors"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'><path d='m3 5 3 3 3-3' stroke='%236B6860' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
            backgroundPosition: "right 10px center",
          }}
        >
          {config.options.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
      <span className="flex-1" />
      <span className="text-ink-mute font-mono text-[11px] tracking-[0.06em]">
        {resultCountLabel}
      </span>
    </div>
  );
}
