"use client";

import { cn } from "@/lib/utils/cn";
import { Search } from "lucide-react";

export type ColumnDef = {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  className?: string;
};

type RosterTableProps<T extends { id: string }> = {
  columns: ReadonlyArray<ColumnDef>;
  rows: ReadonlyArray<T>;
  selectedIds: ReadonlySet<string>;
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  /** All current rows are selected. */
  allSelected: boolean;
  /** Some but not all selected. */
  someSelected: boolean;
  /** Per-row content callback. */
  renderRow: (row: T, isSelected: boolean) => React.ReactNode;
  /** Click handler for opening the sheet. */
  onRowOpen: (id: string) => void;
  /** Empty-state shown when rows.length === 0. */
  empty: { title: string; subtitle: string };
};

export function RosterTable<T extends { id: string }>({
  columns,
  rows,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  allSelected,
  someSelected,
  renderRow,
  onRowOpen,
  empty,
}: RosterTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="bg-cream flex-1 px-6 pt-[18px] pb-20 sm:px-10">
        <div className="text-ink-mute py-15 px-5 text-center">
          <div
            className="bg-cream-deep text-ink-mute mx-auto mb-3.5 grid h-12 w-12 place-items-center rounded-full"
            aria-hidden="true"
          >
            <Search className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <h4 className="font-display text-ink m-0 mb-1.5 text-[18px] font-normal">
            {empty.title}
          </h4>
          <p className="text-ink-mute m-0 text-[13px]">{empty.subtitle}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-cream flex-1 px-6 pt-[18px] pb-20 sm:px-10">
      <div className="bg-paper border-line overflow-hidden rounded-md border">
        <table className="font-body w-full border-separate border-spacing-0 text-[13px]">
          <thead>
            <tr>
              <th
                scope="col"
                className="bg-cream-deep text-ink-mute border-line w-10 border-b py-2.5 pr-1.5 pl-4 text-left font-mono text-[9.5px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase"
              >
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={onToggleAll}
                  ariaLabel="Select all"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "bg-cream-deep text-ink-mute border-line border-b px-3 py-2.5 font-mono text-[9.5px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.align !== "right" && col.align !== "center" && "text-left",
                    col.className,
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isSelected = selectedIds.has(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => onRowOpen(row.id)}
                  className={cn(
                    "border-line-soft hover:bg-cream cursor-pointer transition-colors [&_td]:border-line-soft [&_td]:border-b [&_td]:py-3 [&_td]:px-3 [&_td]:align-middle last:[&_td]:border-b-0",
                    isSelected &&
                      "bg-[rgba(214,242,77,0.08)] hover:bg-[rgba(214,242,77,0.14)]",
                  )}
                >
                  <td
                    className="text-ink-soft pl-4 pr-1.5 align-middle"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelect(row.id);
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onToggleSelect(row.id)}
                      ariaLabel={`Select row ${row.id}`}
                    />
                  </td>
                  {renderRow(row, isSelected)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  ariaLabel: string;
}) {
  return (
    <label
      className="inline-flex cursor-pointer items-center select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={onChange}
        aria-label={ariaLabel}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
      <span
        aria-hidden="true"
        className={cn(
          "border-line bg-paper grid h-4 w-4 place-items-center rounded-[4px] border-[1.5px] transition-colors",
          (checked || indeterminate) && "bg-ink border-ink",
        )}
      >
        {checked ? (
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5">
            <path
              d="m2 5 2 2 4-5"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        ) : indeterminate ? (
          <span className="h-px w-2 bg-white" />
        ) : null}
      </span>
    </label>
  );
}
