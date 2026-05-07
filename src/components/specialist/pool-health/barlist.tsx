/**
 * Coverage / Geographic distribution — horizontal bar list. Each row:
 * label (flag + country) / track + fill / count.
 *
 * Bar widths driven by inline `width: <pct>%` per `--w` CSS pattern.
 *
 * Server Component.
 */

import { PhCard } from "./ph-card";
import type { PoolHealthSnapshot } from "@/lib/mock-data/specialist/pool-health";

export function Barlist({
  geographic,
  others,
}: {
  geographic: PoolHealthSnapshot["geographic"];
  others: PoolHealthSnapshot["geographicOthers"];
}) {
  return (
    <PhCard label="Coverage" title="Geographic distribution" span={6}>
      <div className="flex flex-col gap-2.5">
        {geographic.map((row) => (
          <BarRow
            key={row.countryName}
            flag={row.countryFlag}
            label={row.countryName}
            count={row.count}
            widthPct={row.widthPct}
          />
        ))}
        <BarRow
          flag="🌍"
          label={others.label}
          count={others.count}
          widthPct={others.widthPct}
          dim
        />
      </div>
    </PhCard>
  );
}

function BarRow({
  flag,
  label,
  count,
  widthPct,
  dim = false,
}: {
  flag: string;
  label: string;
  count: number;
  widthPct: number;
  dim?: boolean;
}) {
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)_auto] items-center gap-3 text-[12px]">
      <div className="flex items-center gap-1.5 whitespace-nowrap text-ink-soft">
        <span className="text-[13px]" aria-hidden="true">
          {flag}
        </span>
        <span>{label}</span>
      </div>
      <div className="bg-cream-deep relative h-2 overflow-hidden rounded-[4px]">
        <div
          className={`h-full rounded-[4px] transition-[width] duration-500 ${
            dim ? "bg-ink-mute" : "bg-ink"
          }`}
          style={{ width: `${Math.min(100, Math.max(0, widthPct))}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="font-mono text-[11.5px] whitespace-nowrap text-ink-soft tabular-nums">
        {count}
      </span>
    </div>
  );
}
