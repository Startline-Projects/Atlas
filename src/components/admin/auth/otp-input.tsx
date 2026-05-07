'use client';

import { useRef, useState } from 'react';

interface OTPInputProps {
  onComplete: (code: string) => void;
  onError?: () => void;
}

export function OTPInput({ onComplete, onError }: OTPInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [values, setValues] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);
    setError(false);

    if (newValues[index] && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newValues.every(v => v)) {
      setTimeout(() => onComplete(newValues.join('')), 0);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newValues = data.split('').concat(Array(6).fill('')).slice(0, 6);
    setValues(newValues);

    if (data.length === 6) {
      onComplete(data);
    } else if (data.length > 0) {
      const focusIndex = Math.min(data.length, 5);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div>
      <div className="flex justify-between gap-2">
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            aria-label={`Digit ${index + 1}`}
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            className={`w-full h-[60px] text-center font-display text-[28px] font-medium text-[var(--ink)] bg-[#FFFDF7] border border-[var(--line)] rounded-[var(--r-md)] transition-all focus:outline-none ${
              error
                ? 'border-[var(--danger)] bg-[var(--danger-bg)] text-[var(--danger)] animate-shake'
                : 'focus:border-[var(--ink)] focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)]'
            } ${value ? 'border-[var(--ink-soft)]' : ''}`}
          />
        ))}
      </div>
      {error && (
        <div className="flex items-start gap-2 mt-4 text-sm text-[var(--danger)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>That code didn't match. Try the latest 6 digits in your authenticator.</span>
        </div>
      )}
    </div>
  );
}
