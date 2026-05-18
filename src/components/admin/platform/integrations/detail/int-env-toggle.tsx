'use client';

/* admin.html lines 61987-61990: .in-env-toggle — segmented Test/Production.
   Active button = bg-ink + text-paper by default.
   .danger variant only applies if fixture explicitly sets dangerActive flag. */

import { useState } from 'react';
import type { IntEnvOption } from '@/lib/mock-data/admin/integrations-data';

interface IntEnvToggleProps {
  options: IntEnvOption[];
  dangerActive?: boolean;
}

export function IntEnvToggle({ options, dangerActive = false }: IntEnvToggleProps) {
  const initial = options.find((o) => o.active)?.value ?? options[0]?.value ?? '';
  const [active, setActive] = useState<string>(initial);

  return (
    <div className="inline-flex bg-[var(--paper-deep)] border border-[var(--line)] rounded-[4px] p-[2px] gap-[1px]">
      {options.map((opt) => {
        const isActive = opt.value === active;
        const activeClasses = isActive
          ? dangerActive
            ? 'bg-[var(--danger)] text-[var(--paper)]'
            : 'bg-[var(--ink)] text-[var(--paper)]'
          : 'bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]';

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setActive(opt.value)}
            className={`py-[4px] px-[10px] font-mono text-[10.5px] font-bold tracking-[0.04em] border-0 rounded-[3px] cursor-pointer transition-colors ${activeClasses}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
