interface RsPaneStubProps {
  id: string;
  label: string;
  description: string;
}

export function RsPaneStub({ id, label, description }: RsPaneStubProps) {
  return (
    <div data-rs-view-pane={id} hidden>
      <div
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-md)',
          padding: '28px 22px',
          textAlign: 'center',
        } as React.CSSProperties}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
            marginBottom: '6px',
          } as React.CSSProperties}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11.5px',
            color: 'var(--ink-mute)',
            letterSpacing: '0.02em',
            lineHeight: '1.6',
            maxWidth: '480px',
            margin: '0 auto',
          } as React.CSSProperties}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
