'use client';

import type { FormEvent } from 'react';
import type { AdminCreateFormFields } from '@/lib/mock-data/admin/admin-profiles-data';
import { ADMIN_ROLE_OPTIONS } from '@/lib/mock-data/admin/admin-profiles-data';

interface AdminCreateFormProps {
  fields: AdminCreateFormFields;
  onFieldChange: <K extends keyof AdminCreateFormFields>(key: K, value: AdminCreateFormFields[K]) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onClose: () => void;
}

// admin.html lines 9188-9213 — input/select/textarea base + textarea overrides
const fieldBase =
  'font-body text-[13px] text-[var(--ink)] bg-[var(--paper-deep)] border border-[var(--line)] rounded-[var(--r-sm)] py-[9px] px-[12px] outline-none transition-[border-color,background] duration-[120ms] ease focus:border-[var(--ink)] focus:bg-[var(--paper)]';

export function AdminCreateForm({ fields, onFieldChange, onSubmit, onCancel, onClose }: AdminCreateFormProps) {
  return (
    // admin.html line 21303: <section class="adm-create-form"> — single unified card
    // Wrapping in <form> so HTML5 validation + Enter-key submit work natively.
    <form
      onSubmit={onSubmit}
      id="admCreateForm"
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[var(--r-md)] py-[24px] px-[26px] mt-[14px] relative"
    >
      {/* admin.html line 21304: form-head */}
      <div className="flex items-baseline justify-between gap-[12px] mb-[18px] pb-[14px] border-b border-dashed border-[var(--line-soft)] flex-wrap">
        <h3 className="font-display text-[19px] font-medium tracking-[-0.01em] m-0 flex items-center gap-[10px]">
          {/* admin.html line 21306: user-plus SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          Create new admin
          {/* super-only-badge with positional override (margin-left:0, vertical-align:0) per CSS line 9138 */}
          <span
            className="inline-flex items-center gap-[4px] font-mono text-[8.5px] tracking-[0.12em] bg-[rgba(110,63,224,0.12)] text-[var(--super)] py-[1px] px-[6px] rounded-[3px] font-semibold"
            style={{ marginLeft: 0, verticalAlign: 0 }}
          >
            SUPER ADMIN ONLY
          </span>
        </h3>
        {/* admin.html line 21310: form-close × button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          data-adm-action="close-create-form"
          className="bg-transparent border-0 text-[var(--ink-mute)] cursor-pointer text-[18px] leading-[1] p-[4px] rounded-full w-[28px] h-[28px] grid place-items-center transition-[background,color] duration-[120ms] ease hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
        >
          ×
        </button>
      </div>

      {/* admin.html line 21313: adm-create-grid 2-col */}
      <div className="grid grid-cols-2 gap-y-[14px] gap-x-[18px] max-[720px]:grid-cols-1">
        {/* Full name */}
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="newAdmName" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold flex items-center gap-[6px]">
            Full name <span className="text-[var(--danger)]">*</span>
          </label>
          <input
            type="text"
            id="newAdmName"
            value={fields.fullName}
            onChange={(e) => onFieldChange('fullName', e.target.value)}
            placeholder="e.g. Karim Hassan"
            autoComplete="off"
            required
            className={fieldBase}
          />
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
            Will appear on audit logs and Manager-tier reviews
          </div>
        </div>

        {/* Work email */}
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="newAdmEmail" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold flex items-center gap-[6px]">
            Work email <span className="text-[var(--danger)]">*</span>
          </label>
          <input
            type="email"
            id="newAdmEmail"
            value={fields.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            placeholder="karim.h@atlas.example"
            autoComplete="off"
            required
            className={fieldBase}
          />
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
            Must be on the @atlas.example domain · invitation sent here
          </div>
        </div>

        {/* Role */}
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="newAdmRole" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold flex items-center gap-[6px]">
            Role <span className="text-[var(--danger)]">*</span>
          </label>
          <select
            id="newAdmRole"
            value={fields.role}
            onChange={(e) => onFieldChange('role', e.target.value as AdminCreateFormFields['role'])}
            required
            className={fieldBase}
          >
            <option value="">Select a role…</option>
            {ADMIN_ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
            Permissions auto-applied per Atlas role hierarchy
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-[5px]">
          <label htmlFor="newAdmPhone" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold flex items-center gap-[6px]">
            Phone{' '}
            <span className="font-body normal-case tracking-[0] font-normal text-[var(--ink-mute)] text-[11px]">
              (optional)
            </span>
          </label>
          <input
            type="text"
            id="newAdmPhone"
            value={fields.phone}
            onChange={(e) => onFieldChange('phone', e.target.value)}
            placeholder="+234 808 …"
            autoComplete="off"
            className={fieldBase}
          />
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
            Used for SMS-based 2FA fallback only
          </div>
        </div>

        {/* IP allowlist — field-full (col-span-full) */}
        <div className="flex flex-col gap-[5px] col-span-full">
          <label htmlFor="newAdmIPs" className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--ink-mute)] font-semibold flex items-center gap-[6px]">
            IP allowlist{' '}
            <span className="font-body normal-case tracking-[0] font-normal text-[var(--ink-mute)] text-[11px]">
              (optional · comma-separated)
            </span>
          </label>
          <textarea
            id="newAdmIPs"
            value={fields.ipAllowlist}
            onChange={(e) => onFieldChange('ipAllowlist', e.target.value)}
            placeholder={'102.89.41.214, 102.89.41.220\nLeave blank to allow setup from any IP for first sign-in'}
            // base font/size overridden for textarea per admin.html line 9208
            className={`${fieldBase} resize-y min-h-[60px] font-mono text-[11.5px]`}
          />
          <div className="font-mono text-[10px] text-[var(--ink-mute)] tracking-[0.02em] mt-[2px]">
            Admin will be locked to these IPs after first 2FA enrollment · can be modified later
          </div>
        </div>
      </div>

      {/* admin.html line 21353: adm-create-foot */}
      <div className="flex items-center justify-between flex-wrap gap-[12px] mt-[18px] pt-[16px] border-t border-dashed border-[var(--line-soft)]">
        <span className="font-mono text-[10.5px] text-[var(--ink-mute)] tracking-[0.02em] flex-[1_1_200px]">
          📧 Invitation email will be sent to the address above. New admin must set password and enroll 2FA before first sign-in.
        </span>
        <div className="inline-flex gap-[10px]">
          {/* Cancel button — default cd-action-btn style */}
          <button
            type="button"
            onClick={onCancel}
            data-adm-action="cancel-create"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--paper)] border border-[var(--line)] rounded-full text-[var(--ink-soft)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:border-[var(--ink)] hover:text-[var(--ink)] hover:bg-[var(--cream-deep)]"
          >
            Cancel
          </button>
          {/* Send invitation — cd-action-btn.lime variant */}
          <button
            type="submit"
            data-adm-action="send-invitation"
            className="inline-flex items-center gap-[6px] py-[8px] pl-[12px] pr-[14px] font-body text-[12.5px] font-medium bg-[var(--lime)] border border-[var(--lime)] rounded-full text-[var(--ink)] cursor-pointer transition-all duration-150 ease whitespace-nowrap hover:bg-[var(--lime-deep)] hover:border-[var(--lime-deep)] [&>svg]:flex-shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send invitation
          </button>
        </div>
      </div>
    </form>
  );
}
