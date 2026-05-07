/**
 * Generic section-card chrome — eyebrow + title + desc + body. Each
 * panel composes 1-N of these.
 *
 * Per source CSS `.set-section-card` + `.set-section-head` (with
 * eyebrow / title / desc) and `.set-section-body`.
 *
 * Server Component.
 */

export function SettingsSectionCard({
  eyebrow,
  title,
  description,
  children,
  danger,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Apply the danger-zone visual treatment (red eyebrow, ink title). */
  danger?: boolean;
}) {
  return (
    <section className="bg-paper border-line rounded-xl border px-6 pt-5 pb-6 max-md:px-5">
      <header
        className={`border-line-soft mb-4 border-b pb-3.5 ${
          danger ? "border-b-danger" : ""
        }`}
      >
        <div
          className={`mb-1 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase ${
            danger ? "text-danger" : "text-ink-mute"
          }`}
        >
          {eyebrow}
        </div>
        <h2
          className="font-display m-0 mb-1 text-[20px] font-medium tracking-[-0.01em] text-ink"
          style={{ fontVariationSettings: '"opsz" 36' }}
        >
          {title}
        </h2>
        {description ? (
          <p className="m-0 text-[13px] leading-[1.45] text-ink-soft">
            {description}
          </p>
        ) : null}
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

/* ============================================================
   Field row helpers — used by Profile / Security panels
   ============================================================ */

export function SettingsField({
  label,
  helper,
  htmlFor,
  children,
  inline = false,
}: {
  label: string;
  helper?: string;
  htmlFor?: string;
  children: React.ReactNode;
  /** Render label inline with the control (settings rows like toggle items). */
  inline?: boolean;
}) {
  if (inline) {
    return (
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-medium text-ink">{label}</div>
          {helper ? (
            <div className="mt-0.5 text-[12px] leading-[1.45] text-ink-mute">
              {helper}
            </div>
          ) : null}
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-ink-mute"
      >
        {label}
      </label>
      {children}
      {helper ? (
        <div className="text-[11.5px] leading-[1.45] text-ink-mute">
          {helper}
        </div>
      ) : null}
    </div>
  );
}

export function SettingsTextInput({
  id,
  value,
  onChange,
  placeholder,
  readOnly,
  type = "text",
}: {
  id?: string;
  value: string;
  onChange?: (next: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  type?: "text" | "email";
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      placeholder={placeholder}
      className={`bg-cream border-line w-full rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-ink-mute focus:bg-paper ${
        readOnly ? "text-ink-mute cursor-default" : ""
      }`}
    />
  );
}

export function SettingsSelect<K extends string>({
  id,
  value,
  options,
  onChange,
}: {
  id?: string;
  value: K;
  options: ReadonlyArray<{ key: K; label: string }>;
  onChange: (next: K) => void;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as K)}
      className="bg-cream border-line w-full rounded-md border px-3 py-2 font-body text-[13px] text-ink outline-none transition-colors focus:border-ink-mute focus:bg-paper"
    >
      {options.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function SettingsTextarea({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  id?: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="bg-cream border-line w-full resize-y rounded-md border px-3 py-2 font-body text-[13px] leading-[1.5] text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-ink-mute focus:bg-paper"
    />
  );
}
