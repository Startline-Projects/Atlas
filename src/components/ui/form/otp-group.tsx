"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";

const LENGTH = 6;
const EMPTY = Array.from({ length: LENGTH }, () => "");

/**
 * Six single-digit boxes for an email verification code. Pasting the whole
 * code into any box fills the row; a full row submits on its own.
 */
export function OtpGroup({
  disabled,
  onFilled,
}: {
  disabled: boolean;
  /** Resolves false when the code was rejected, so the inputs can be cleared. */
  onFilled: (code: string) => Promise<boolean>;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState<string[]>(EMPTY);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  const submit = async (code: string) => {
    const accepted = await onFilled(code);
    if (!accepted) {
      setValues(EMPTY);
      refs.current[0]?.focus();
    }
  };

  const handleInput = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) {
      setValues(values.map((v, i) => (i === index ? "" : v)));
      return;
    }

    const next = [...values];
    for (let i = 0; i < digits.length && index + i < LENGTH; i += 1) {
      next[index + i] = digits[i]!;
    }
    setValues(next);

    const lastFilled = Math.min(index + digits.length, LENGTH - 1);
    refs.current[lastFilled]?.focus();

    if (next.every((v) => v !== "")) void submit(next.join(""));
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="mb-3.5 flex justify-between gap-2 max-[420px]:gap-1">
      {values.map((value, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : undefined}
          maxLength={LENGTH}
          disabled={disabled}
          aria-label={`Code digit ${i + 1}`}
          value={value}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={cn(
            "font-display text-ink focus:border-ink h-16 min-w-0 flex-1 rounded-md border bg-[#FFFDF7] text-center text-[30px] font-medium transition-all focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] focus:outline-none disabled:opacity-60",
            value ? "border-ink-soft" : "border-line",
          )}
          style={{ fontVariationSettings: '"opsz" 72' }}
        />
      ))}
    </div>
  );
}
