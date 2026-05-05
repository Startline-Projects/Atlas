/**
 * The dark "Atlas Internal · Restricted access · All sign-ins logged"
 * ribbon that sits above every Specialist surface (auth + console).
 * Mirrored from `specialist (12).html` lines 13186–13195.
 */
export function StaffRibbon() {
  return (
    <div
      role="banner"
      aria-label="Internal access notice"
      className="bg-ink relative z-[5] flex items-center justify-center gap-3.5 px-6 py-2.5 text-center font-mono text-[10.5px] tracking-[0.14em] uppercase text-paper/80 max-sm:gap-2.5 max-sm:px-4 max-sm:py-2 max-sm:text-[9.5px]"
    >
      <span
        aria-hidden="true"
        className="bg-lime inline-block h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full"
      />
      <strong className="text-paper font-medium tracking-[0.16em]">
        Atlas Internal
      </strong>
      <span
        aria-hidden="true"
        className="bg-paper/20 inline-block h-2.5 w-px max-sm:hidden"
      />
      <span className="max-sm:hidden">Restricted access</span>
      <span aria-hidden="true" className="bg-paper/20 inline-block h-2.5 w-px" />
      <span>All sign-ins are logged for audit</span>
    </div>
  );
}
