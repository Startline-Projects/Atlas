import { filingCalendarHeader, calendarMarkers, calendarTodayMarker, calendarLegend } from '@/lib/mock-data/admin/tax-documents-data';

const DOT_CLASSES: Record<string, string> = {
  done: 'bg-[var(--success)] border-[var(--success)]',
  upcoming: 'bg-[var(--paper)] border-[var(--super)]',
  future: 'bg-[var(--paper)] border-dashed border-[var(--ink-mute)]',
  urgent: 'bg-[var(--danger)] border-[var(--danger)]',
  due: 'bg-[var(--amber)] border-[var(--amber)]',
};

const DATE_TEXT_COLOR: Record<string, string> = {
  done: 'text-[var(--ink)]',
  upcoming: 'text-[var(--super)]',
  future: 'text-[var(--ink)]',
  urgent: 'text-[var(--danger)]',
  due: 'text-[var(--amber)]',
};

const LEGEND_DOT_CLASSES: Record<string, string> = {
  done: 'bg-[var(--success)]',
  due: 'bg-[var(--amber)]',
  urgent: 'bg-[var(--danger)]',
  upcoming: 'bg-[var(--paper)] border-2 border-[var(--super)]',
  future: 'bg-[var(--paper)] border-2 border-dashed border-[var(--ink-mute)]',
};

export function TdFilingCalendar() {
  return (
    <section id="td-section-calendar" className="scroll-mt-[120px] mb-[28px]">
      <style>{`
        @keyframes tcl-pulse-fr {
          0%, 100% { box-shadow: 0 0 0 2px var(--amber), 0 0 0 6px rgba(232,118,58,0.4); }
          50% { box-shadow: 0 0 0 2px var(--amber), 0 0 0 10px rgba(232,118,58,0); }
        }
        .tcl-today {
          animation: tcl-pulse-fr 1.8s ease-in-out infinite;
        }
      `}</style>

      <div className="flex items-end justify-between gap-[12px] flex-wrap mb-[14px] pb-[12px] border-b border-b-[var(--line)]">
        <div>
          <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] text-[var(--ink)] mb-[4px] leading-[1.2]">
            {filingCalendarHeader.title}
          </h2>
          <div className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.04em]">
            {filingCalendarHeader.meta}
          </div>
        </div>
      </div>

      <div className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] p-[22px_24px] overflow-x-auto">
        <div className="relative min-w-[700px] pt-[110px] pb-[20px]">
          <div className="relative h-[4px] bg-[var(--line)] rounded-full mx-[24px]">
            <div className="absolute top-0 left-0 h-full bg-[var(--ink)] rounded-full" style={{ width: '35%' }} />
            <div
              className="tcl-today absolute top-1/2 w-[14px] h-[14px] rounded-full bg-[var(--amber)] border-[3px] border-[var(--paper)] z-[2]"
              style={{ left: '35%', transform: 'translate(-50%, -50%)' }}
            />
          </div>

          {calendarMarkers.map((marker) => (
            <div
              key={marker.date}
              className="absolute text-center min-w-[80px]"
              style={{ left: `${marker.position}%`, top: '0', transform: 'translateX(-50%)', width: '130px', marginLeft: '-65px', paddingLeft: '65px' }}
            >
              <div className={`w-[12px] h-[12px] rounded-full border-2 mx-auto mb-[8px] ${DOT_CLASSES[marker.variant]}`}>
                {marker.variant === 'done' && (
                  <span className="block text-[8px] text-[var(--paper)] font-bold leading-[8px] -mt-[1px]">✓</span>
                )}
              </div>
              <div className="font-mono text-[9.5px] text-[var(--ink-mute)] tracking-[0.04em] leading-[1.4]">
                <span className={`block text-[11px] font-bold tracking-[0.06em] uppercase mb-[2px] ${DATE_TEXT_COLOR[marker.variant]}`}>
                  {marker.date}
                </span>
                {marker.label.split('\n').map((line, i) => {
                  const isBold = line.startsWith('**') && line.endsWith('**');
                  const text = line.replace(/\*\*/g, '');
                  return isBold
                    ? <strong key={i} className="block text-[var(--ink)] font-bold">{text}</strong>
                    : <span key={i} className="block">{text}</span>;
                })}
              </div>
            </div>
          ))}

          <div
            className="absolute text-center"
            style={{ left: `${calendarTodayMarker.position}%`, top: '60px', transform: 'translateX(-50%)', width: '130px' }}
          >
            <div className="font-mono text-[9.5px] tracking-[0.04em] leading-[1.4] text-[var(--amber)] font-bold">
              <span className="block text-[11px] tracking-[0.06em] uppercase mb-[2px] text-[var(--amber)]">
                {calendarTodayMarker.date}
              </span>
              {calendarTodayMarker.label.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-[16px] mt-[28px] pt-[16px] border-t border-dashed border-t-[var(--line-soft)] flex-wrap font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.04em]">
          {calendarLegend.map((item) => (
            <span key={item.variant} className="inline-flex items-center gap-[5px]">
              <span className={`w-[8px] h-[8px] rounded-full ${LEGEND_DOT_CLASSES[item.variant]}`} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
