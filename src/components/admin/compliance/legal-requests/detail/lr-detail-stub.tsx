import Link from 'next/link';

interface LrDetailStubProps {
  id: string;
}

export function LrDetailStub({ id }: LrDetailStubProps) {
  return (
    <div className="scroll-mt-[120px]">
      {/* Breadcrumb */}
      <div className="mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
        <Link href="/admin/compliance/legal-requests" className="font-body text-[11px] text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer">
          Legal requests
        </Link>
      </div>

      {/* Stub card */}
      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[32px] text-center">
        <div className="max-w-[320px] mx-auto">
          <h1 className="font-display text-[20px] font-medium tracking-[-0.02em] text-[var(--ink)] mb-[8px]">{id}</h1>
          <p className="font-body text-[13px] text-[var(--ink-soft)] leading-[1.6] mb-[18px]">
            Full detail content for this legal request will be available in Stage 3 Pass B. For now, you can navigate back to the list or view the canonical request LR-2026-0023.
          </p>
          <Link
            href="/admin/compliance/legal-requests"
            className="inline-flex items-center gap-[6px] py-[8px] px-[16px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer transition-all hover:bg-[var(--ink-soft)]"
          >
            ← Back to list
          </Link>
        </div>
      </div>
    </div>
  );
}
