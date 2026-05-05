import type { PoolStatus } from "@/lib/mock-data/specialist/current-user";
import { cn } from "@/lib/utils/cn";

const POOL_DOT: Record<PoolStatus, string> = {
  Strong: "bg-success",
  Stable: "bg-success",
  Depleted: "bg-danger",
};

const POOL_LABEL: Record<PoolStatus, string> = {
  Strong: "Pool strong",
  Stable: "Pool stable",
  Depleted: "Pool depleted",
};

type SidebarProfileProps = {
  category: string;
  poolStatus: PoolStatus;
  poolLiveCount: number;
};

export function SidebarProfile({
  category,
  poolStatus,
  poolLiveCount,
}: SidebarProfileProps) {
  return (
    <div className="border-line-soft text-ink-mute mt-3 border-t px-2.5 pt-3 pb-1 text-xs max-md:hidden">
      <div className="text-ink-mute mb-1 font-mono text-[9.5px] tracking-[0.14em] uppercase">
        Your category
      </div>
      <div className="text-ink mb-2 text-[13px] font-medium">{category}</div>
      <div className="flex items-center gap-1.5 text-xs">
        <span
          aria-hidden="true"
          className={cn("inline-block h-1.5 w-1.5 rounded-full", POOL_DOT[poolStatus])}
        />
        <span>
          {POOL_LABEL[poolStatus]} · {poolLiveCount} live
        </span>
      </div>
    </div>
  );
}
