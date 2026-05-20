/* admin.html .rt-live-pulse — CSS 33220-33240. Small success "Live" badge with a pulsing dot
   (::before → rendered here as an explicit child span using the rts-pulse-live keyframe owned
   by RtStatusPill's <style> tag). Used in channel-card heads + §03 Dashboard surface cell. */

export function RtLivePulse() {
  return (
    <span className="inline-flex items-center gap-[4px] py-[1px] px-[6px] font-mono text-[8.5px] font-bold tracking-[0.08em] uppercase rounded-[3px] bg-[var(--success-bg)] text-[var(--success)]">
      <span className="w-[5px] h-[5px] rounded-full bg-[var(--success)] animate-[rts-pulse-live_2s_ease-in-out_infinite]" />
      Live
    </span>
  );
}
