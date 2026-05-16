interface RsStatusPaneProps {
  text: {
    title: string;
    description: string;
  };
}

export function RsStatusPane({ text }: RsStatusPaneProps) {
  return (
    <div
      data-rs-view-pane="status"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[28px] px-[22px] text-center"
    >
      <div className="font-display text-[17px] font-medium text-[var(--ink)] tracking-[-0.01em] mb-[6px]">
        {text.title}
      </div>
      <div className="font-mono text-[11.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.6] max-w-[480px] mx-auto">
        {text.description}
      </div>
    </div>
  );
}
