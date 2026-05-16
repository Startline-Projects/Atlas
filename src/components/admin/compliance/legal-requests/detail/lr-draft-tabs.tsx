'use client';

import { useState } from 'react';

interface DraftTab {
  id: string;
  label: string;
  status?: string;
}

interface Paragraph {
  type: 'text' | 'clause';
  text: string;
}

interface LrDraftTabsProps {
  tabs: DraftTab[];
  activeTabId?: string;
  panelVersion: string;
  panelMeta: string;
  paragraphs: Paragraph[];
  batesRange: string;
}

export function LrDraftTabs({
  tabs,
  activeTabId: initialActiveTab = '',
  panelVersion,
  panelMeta,
  paragraphs,
  batesRange,
}: LrDraftTabsProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab || tabs[tabs.length - 1]?.id || '');

  return (
    <div className="relative bg-[var(--paper)] border-[1.5px] border-[var(--line)] rounded-[var(--r-md)] mb-[18px] overflow-hidden flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-b-[var(--line-soft)] bg-[var(--paper-deep)] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-[14px] py-[12px] text-center border-b-[2px] transition-colors font-body text-[12px] font-medium tracking-[-0.01em] cursor-pointer whitespace-nowrap min-w-fit ${
              activeTab === tab.id
                ? 'border-b-[var(--ink)] text-[var(--ink)]'
                : 'border-b-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]'
            }`}
          >
            {tab.label}
            {tab.status && (
              <div className="font-mono text-[9px] text-[var(--amber)] font-bold mt-[1px]">
                {tab.status}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="flex-1 p-[16px_20px] overflow-y-auto">
        {/* Version info */}
        <div className="mb-[14px] pb-[14px] border-b border-b-[var(--line-soft)]">
          <div className="font-body text-[12px] font-semibold text-[var(--ink)] mb-[2px]">
            {panelVersion}
          </div>
          <div
            className="font-mono text-[9.5px] text-[var(--ink-soft)] tracking-[0.02em]"
            dangerouslySetInnerHTML={{ __html: panelMeta }}
          />
        </div>

        {/* Paragraphs */}
        <div className="space-y-[12px] mb-[16px]">
          {paragraphs.map((para, idx) => (
            <div
              key={idx}
              className={`font-body text-[12px] leading-[1.6] ${
                para.type === 'clause'
                  ? 'pl-[16px] py-[10px] bg-[var(--paper-deep)] border-l-[3px] border-l-[var(--ink-soft)] text-[var(--ink)]'
                  : 'text-[var(--ink)]'
              }`}
              dangerouslySetInnerHTML={{ __html: para.text }}
            />
          ))}
        </div>

        {/* Draft footer with Bates range + action buttons */}
        <div className="flex items-center justify-between gap-[12px] p-[12px_18px] border-t border-t-[var(--line-soft)] bg-[var(--paper-deep)] flex-wrap">
          <div
            className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] leading-[1.5] [&_strong]:text-[var(--ink-soft)] [&_strong]:font-bold"
            dangerouslySetInnerHTML={{
              __html: '<strong>Bates range planned:</strong> VOR-000001 to VOR-002800 · <strong>5 categories</strong> · attachments A-C · production via SDNY secured FTP',
            }}
          />
          <div className="inline-flex gap-[6px]">
            <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all hover:bg-[var(--paper-deep)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]">
              Add counsel note
            </button>
            <button className="inline-flex items-center gap-[6px] py-[7px] px-[12px] font-mono text-[11px] font-bold tracking-[0.04em] uppercase bg-[var(--ink)] border border-[var(--ink)] rounded-full text-[var(--paper)] cursor-pointer transition-all hover:bg-[var(--ink-soft)]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Approve v3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
