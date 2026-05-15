import { insightsData } from '@/lib/mock-data/admin/refunds-data';

export function RefundInsights() {
  const d = insightsData;

  return (
    <div className="mt-[14px] py-[14px] px-[18px] bg-[var(--lime-bg)] border border-[rgba(74,109,65,0.25)] border-l-[3px] border-l-[var(--lime-deep)] rounded-[var(--r-sm)]">
      <h4 className="font-display text-[14px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
        {d.title}
      </h4>
      <ul className="flex flex-col gap-[5px] font-mono text-[11px] text-[var(--ink-soft)] tracking-[0.02em] leading-[1.55] list-none m-0 p-0">
        {d.items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-[8px]">
            <span className="text-[var(--lime-deep)] font-bold flex-shrink-0">→</span>
            <span>
              <strong className="text-[var(--ink)] font-bold">{item.bold}</strong>
              {item.text}
              {item.linkText && (
                <>
                  {' · '}
                  <a className="text-[var(--ink)] underline font-semibold cursor-pointer">
                    {item.linkText}
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
