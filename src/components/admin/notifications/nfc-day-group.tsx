/* admin.html lines 67161-67386 + CSS 32134-32168: date-bucket container with dashed-head + rounded card list */

import type { NfcDayGroup as NfcDayGroupData } from '@/lib/mock-data/admin/notifications-data';
import { NfcRow } from './nfc-row';

interface NfcDayGroupProps {
  group: NfcDayGroupData;
}

export function NfcDayGroup({ group }: NfcDayGroupProps) {
  return (
    <div className="mb-[12px] last:mb-0">
      <div className="flex items-center justify-between py-[12px] pb-[8px] border-b border-b-dashed border-b-[var(--line)] mb-0">
        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ink-mute)] font-bold">
          {group.label}
        </div>
        <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em] font-semibold">
          {group.countMeta}
        </div>
      </div>
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] overflow-hidden mt-[8px]">
        {group.rows.map((row) => (
          <NfcRow key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
}
