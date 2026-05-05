'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircleIcon, AlertTriangleIcon, ArrowLeftIcon, ArrowRightIcon, CheckShieldIcon, LockIcon, MailIcon, ShieldIcon } from '@/components/ui/icons';
import { OTPInput } from './otp-input';
import { TimeoutModal } from './timeout-modal';

type SignInState =
  | 'default'
  | '2fa'
  | 'session-confirm'
  | 'lockout'
  | 'routing'
  | 'wrong-password-1'
  | 'wrong-password-2'
  | 'no-account'
  | '2fa-wrong'
  | 'ip-blocked'
  | 'anomaly'
  | 'suspended'
  | 'password-expired';

export function SignInForm() {
  const router = useRouter();
  const [currentState, setCurrentState] = useState<SignInState>('default');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaVerifying, setCaptchaVerifying] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);

    // Fake validation - accept any email/password combo
    if (!email || !password) {
      setIsLoading(false);
      if (!email) setEmailError('Email is required');
      if (!password) setPasswordError('Password is required');
      return;
    }

    // Simulate credential verification delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Move to 2FA state (no actual auth backend)
    setCurrentState('2fa');
    setIsLoading(false);
  };

  const handleOTPComplete = async (code: string) => {
    // Fake OTP validation - accept any 6 digits
    if (code.length === 6) {
      setCurrentState('session-confirm');
    }
  };

  const handleConfirmSession = async () => {
    setCurrentState('routing');
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/admin/dashboard');
  };


  const handleBackTo2FA = () => {
    setCurrentState('default');
  };

  const handleCaptchaChange = async () => {
    if (!captchaChecked) {
      setCaptchaVerifying(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setCaptchaVerifying(false);
      setCaptchaChecked(true);
    } else {
      setCaptchaChecked(false);
    }
  };

  const isFormValid = email && password && captchaChecked && !isLoading;

  const handlePreviewStateChange = (state: SignInState) => {
    setCurrentState(state);
    setAttempts(0);
  };

  return (
    <>
      {/* Admin nav */}
      <nav className="sticky top-0 z-50 bg-[rgba(243,238,227,0.84)] backdrop-blur-[12px] border-b border-[var(--color-line)]">
        <div className="flex items-center justify-between px-8 py-4 max-w-[1340px] mx-auto gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] bg-[var(--color-ink)] rounded-full relative flex-shrink-0 flex items-center justify-center">
              <div className="w-[14px] h-[14px] rounded-full bg-[var(--color-lime)]"></div>
            </div>
            <span className="font-display text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">Atlas</span>
            <span className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-[var(--color-ink)] bg-[var(--color-paper)] px-[7px] py-[3px] border border-[var(--color-line)] rounded-sm font-semibold text-center">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[var(--color-paper)] border border-[var(--color-line)] rounded-full text-[11px] text-[var(--color-ink-soft)] font-mono tracking-[0.12em] uppercase font-medium">
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-[var(--color-danger)] animate-pulse flex-shrink-0"></span>
              Restricted
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="relative z-1 px-8 py-12 pb-24">
        <div className="max-w-[480px] mx-auto">
          {/* Header */}
          <header className="text-center mb-7 pt-2">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[var(--color-restricted)] font-semibold mb-5.5">
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-[var(--color-restricted)] shadow-[0_0_0_3px_rgba(139,26,26,0.16)]"></span>
              Restricted · Atlas Admin
            </span>
            <h1 className="font-display text-[clamp(44px,6vw,64px)] font-medium tracking-[-0.025em] leading-[1.02] mb-4">
              Admin <span className="font-display italic tracking-[-0.025em]">access.</span>
            </h1>
            <p className="text-[15.5px] text-[var(--color-ink-soft)] leading-[1.55] max-w-[380px] mx-auto">
              Authorized administrators only. <strong className="text-[var(--color-ink)] font-semibold">Every action is logged</strong> and reviewable.
            </p>
          </header>

          {/* Sign-in card */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-line)] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] relative overflow-hidden min-h-[520px] flex flex-col">
            {/* Security ribbon */}
            <div className={`flex items-center gap-2.5 px-5.5 py-3 text-[var(--color-paper)] text-xs font-mono tracking-[0.04em] border-b relative before:absolute before:top-0 before:left-0 before:right-0 before:h-1 ${
              ['locked', 'ip-blocked', 'anomaly', 'suspended'].includes(currentState)
                ? 'bg-[#8B1A1A] border-[#8B1A1A] before:bg-gradient-to-r before:from-[var(--color-danger)] before:to-[#8B1A1A]'
                : 'bg-[var(--color-ink)] border-[var(--color-ink)] before:bg-gradient-to-r before:from-[var(--color-danger)] before:via-[var(--color-amber)] before:to-[var(--color-lime)]'
            }`}>
              <ShieldIcon className="flex-shrink-0 opacity-80" />
              <span className="leading-[1.4]">This is a restricted interface. Unauthorized access is <strong className="text-[var(--color-lime)] font-semibold">logged and reported</strong>.</span>
            </div>

            {/* Card body - states */}
            <div className="px-9 py-7 flex-1 flex flex-col">
              {/* DEFAULT STATE */}
              {currentState === 'default' && (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <h2 className="font-display text-[21px] font-medium tracking-[-0.01em] mb-1">Sign in to continue</h2>
                  <p className="text-[13.5px] text-[var(--color-ink-mute)] mb-5.5 leading-[1.5]">
                    Enter your admin credentials. After your password, you'll verify with two-factor authentication.
                  </p>

                  {/* Email field */}
                  <div className="mb-4.5">
                    <label className="flex items-center justify-between mb-1.75 text-[12.5px] font-medium text-[var(--color-ink-soft)] tracking-[0.005em]">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      placeholder="you@atlas.example"
                      autoComplete="username"
                      className={`w-full px-3.5 py-3 text-[14.5px] bg-[#FFFDF7] border rounded-[var(--radius-md)] text-[var(--color-ink)] transition-all focus:outline-none focus:border-[var(--color-ink)] focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] placeholder:text-[var(--color-ink-mute)] placeholder:opacity-60 ${
                        emailError ? 'border-[var(--color-danger)] bg-[var(--color-danger-bg)]' : 'border-[var(--color-line)] hover:border-[var(--color-line-strong)]'
                      }`}
                    />
                    {emailError && (
                      <div className="flex items-start gap-1.5 mt-2 text-[12.5px] text-[var(--color-danger)] leading-[1.45]">
                        <AlertCircleIcon className="flex-shrink-0 mt-0.5" />
                        <span>{emailError}</span>
                      </div>
                    )}
                  </div>

                  {/* Password field */}
                  <div className="mb-4.5">
                    <label className="flex items-center justify-between mb-1.75 text-[12.5px] font-medium text-[var(--color-ink-soft)] tracking-[0.005em]">
                      Password
                      <button type="button" className="text-[12.5px] text-[var(--color-ink-mute)] font-normal transition-colors hover:text-[var(--color-ink)]">
                        Forgot password?
                      </button>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="••••••••••"
                        autoComplete="current-password"
                        className={`w-full px-3.5 py-3 text-[14.5px] bg-[#FFFDF7] border rounded-[var(--radius-md)] text-[var(--color-ink)] transition-all focus:outline-none focus:border-[var(--color-ink)] focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)] placeholder:text-[var(--color-ink-mute)] placeholder:opacity-60 pr-[76px] ${
                          passwordError ? 'border-[var(--color-danger)] bg-[var(--color-danger-bg)]' : 'border-[var(--color-line)] hover:border-[var(--color-line-strong)]'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-ink-mute)] px-2.5 py-1.5 rounded-[var(--radius-sm)] transition-all hover:bg-[var(--color-cream-deep)] hover:text-[var(--color-ink)]"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {passwordError && (
                      <div className="flex items-start gap-1.5 mt-2 text-[12.5px] text-[var(--color-danger)] leading-[1.45]">
                        <AlertCircleIcon className="flex-shrink-0 mt-0.5" />
                        <span>{passwordError}</span>
                      </div>
                    )}
                    {attempts > 0 && (
                      <div className="flex items-start gap-2 mt-2.5 px-3 py-2.25 bg-[var(--color-amber-bg)] border border-[#F0BB95] rounded-[var(--radius-md)] text-[12.5px] text-[var(--color-ink-soft)] leading-[1.45]">
                        <AlertTriangleIcon className="flex-shrink-0 mt-0.5 text-[var(--color-amber)]" />
                        <span><strong className="text-[var(--color-ink)] font-semibold">{attempts} of 3 attempts used.</strong> After 3 failed attempts, this admin account will be locked for 30 minutes.</span>
                      </div>
                    )}
                  </div>

                  {/* CAPTCHA */}
                  <div className={`mt-1 mb-5.5 flex items-center justify-between gap-3 px-4 py-3.5 border rounded-[var(--radius-md)] transition-all ${
                    captchaChecked ? 'bg-[var(--color-success-bg)] border-[#B6D6C2]' : captchaVerifying ? 'bg-[#FCFAF2] border-[var(--color-line)]' : 'bg-[#FCFAF2] border-[var(--color-line)]'
                  }`}>
                    <label className="flex items-center gap-3 cursor-pointer user-select-none">
                      <input type="checkbox" onChange={handleCaptchaChange} checked={captchaChecked} className="sr-only" />
                      <div className={`w-5.5 h-5.5 border-[1.5px] rounded flex items-center justify-center flex-shrink-0 transition-all relative ${
                        captchaChecked
                          ? 'bg-[var(--color-success)] border-[var(--color-success)]'
                          : captchaVerifying
                            ? 'border-[var(--color-ink-mute)] bg-white'
                            : 'bg-white border-[var(--color-line-strong)]'
                      }`}>
                        {captchaChecked && !captchaVerifying && (
                          <svg width="11" height="6" viewBox="0 0 11 6" className="text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M1 3L3 5L9 1" />
                          </svg>
                        )}
                        {captchaVerifying && (
                          <div className="w-3 h-3 border-2 border-[var(--color-line-strong)] border-t-[var(--color-ink)] rounded-full animate-spin"></div>
                        )}
                      </div>
                      <span className={`text-[14px] font-medium transition-colors ${captchaChecked ? 'text-[var(--color-success)]' : 'text-[var(--color-ink)]'}`}>
                        {captchaChecked ? 'You\'re verified' : 'Verify you\'re human'}
                      </span>
                    </label>
                    <div className="flex items-center gap-2.25 flex-shrink-0">
                      <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[var(--color-ink)] to-[var(--color-ink-soft)] flex items-center justify-center text-[var(--color-lime)] font-display text-sm font-medium tracking-[-0.02em]">
                        A
                      </div>
                      <div className="flex flex-col font-mono text-[9px] tracking-[0.08em] uppercase text-[var(--color-ink-mute)] leading-[1.4]">
                        <strong className="text-[var(--color-ink-soft)] font-semibold">Atlas Verify</strong>
                        <span>Privacy · Terms</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full px-5 py-3.75 rounded-[var(--radius-md)] text-[14.5px] font-semibold tracking-[0.005em] flex items-center justify-center gap-2.5 transition-all ${
                      isFormValid
                        ? 'bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-black active:translate-y-0.5'
                        : 'bg-[var(--color-cream-deep)] text-[var(--color-ink-mute)] cursor-not-allowed'
                    }`}
                  >
                    {!isLoading ? (
                      <>
                        <span>Continue to verification</span>
                        <ArrowRightIcon />
                      </>
                    ) : (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-[rgba(251,248,242,0.25)] border-t-[var(--color-paper)] rounded-full animate-spin"></div>
                        <span>Verifying credentials…</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* 2FA STATE */}
              {currentState === '2fa' && (
                <div className="text-center flex-1 flex flex-col">
                  <button
                    onClick={handleBackTo2FA}
                    className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-ink-mute)] mb-4.5 px-2 py-1 rounded-[var(--radius-sm)] transition-all hover:text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] self-start -ml-1.5"
                  >
                    <ArrowLeftIcon />
                    Back
                  </button>

                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(214,242,77,0.35)] to-[rgba(46,125,84,0.18)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <LockIcon className="w-7 h-7 text-[var(--color-ink)]" />
                  </div>

                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    Two-factor verification
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-6">
                    Open your authenticator app and enter the 6-digit code for <strong className="text-[var(--color-ink)] font-semibold">{email}</strong>.
                  </p>

                  <OTPInput onComplete={handleOTPComplete} />

                  <div className="flex items-center justify-center gap-3.5 text-[12.5px] text-[var(--color-ink-mute)] mt-4 mb-1.5">
                    <button type="button" className="text-[var(--color-ink-soft)] border-b border-dotted border-[var(--color-line-strong)] pb-0.5 transition-all hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]">
                      Use a backup code
                    </button>
                    <span className="text-[var(--color-line)]">·</span>
                    <a href="mailto:support@atlas.example" className="text-[var(--color-ink-soft)] border-b border-dotted border-[var(--color-line-strong)] pb-0.5 transition-all hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]">
                      Lost authenticator?
                    </a>
                  </div>
                </div>
              )}

              {/* SESSION CONFIRM STATE */}
              {currentState === 'session-confirm' && (
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(214,242,77,0.35)] to-[rgba(46,125,84,0.18)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <CheckShieldIcon className="text-[var(--color-ink)]" />
                  </div>

                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    Confirm this session
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-6">
                    Identity verified. Review the sign-in details below before continuing.
                  </p>

                  {/* Session info card */}
                  <div className="bg-[#FCFAF2] border border-[var(--color-line)] rounded-[var(--radius-md)] px-4.5 py-4 mb-5.5 text-left">
                    <div className="flex items-start justify-between gap-3.5 pb-2 font-size-[13px] border-b border-dashed border-[var(--color-line-soft)] first:pt-0">
                      <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium flex-shrink-0 w-20 pt-0.5">Account</span>
                      <span className="text-right text-[var(--color-ink)] font-semibold">
                        Aïsha Okafor
                        <div className="text-[11.5px] text-[var(--color-ink-mute)] font-normal font-mono tracking-[0.02em] mt-0.5">aisha@atlas.example · Operations Admin</div>
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-3.5 py-2 font-size-[13px] border-b border-dashed border-[var(--color-line-soft)]">
                      <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium flex-shrink-0 w-20 pt-0.5">From</span>
                      <span className="text-right text-[var(--color-ink)] font-semibold">
                        71.82.45.12
                        <div className="text-[11.5px] text-[var(--color-ink-mute)] font-normal font-mono tracking-[0.02em] mt-0.5">Detroit, Michigan · United States</div>
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-3.5 py-2 font-size-[13px] border-b border-dashed border-[var(--color-line-soft)]">
                      <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium flex-shrink-0 w-20 pt-0.5">Device</span>
                      <span className="text-right text-[var(--color-ink)] font-semibold">
                        Chrome 124
                        <div className="text-[11.5px] text-[var(--color-ink-mute)] font-normal font-mono tracking-[0.02em] mt-0.5">macOS 14.4 · Desktop</div>
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-3.5 py-2 font-size-[13px]">
                      <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-[var(--color-ink-mute)] font-medium flex-shrink-0 w-20 pt-0.5">Time</span>
                      <span className="text-right text-[var(--color-ink)] font-semibold">
                        Now
                        <div className="text-[11.5px] text-[var(--color-ink-mute)] font-normal font-mono tracking-[0.02em] mt-0.5">Apr 30, 2026 · 4:42 PM EST</div>
                      </span>
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div className="text-left mb-5.5">
                    <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-mute)] mb-2.5 pb-2 border-b border-[var(--color-line-soft)]">
                      Recent sign-ins for this account
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-baseline justify-between gap-3 text-[12.5px] text-[var(--color-ink-soft)] font-mono tracking-[0.01em]">
                        <span className="text-[var(--color-ink)] font-semibold flex-shrink-0">Yesterday · 9:15 AM</span>
                        <span className="text-[var(--color-ink-mute)] text-right text-[11.5px] tracking-[0.04em]">71.82.45.12 · Detroit · Chrome</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-[12.5px] text-[var(--color-ink-soft)] font-mono tracking-[0.01em]">
                        <span className="text-[var(--color-ink)] font-semibold flex-shrink-0">Apr 28 · 2:08 PM</span>
                        <span className="text-[var(--color-ink-mute)] text-right text-[11.5px] tracking-[0.04em]">71.82.45.12 · Detroit · Chrome</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-[12.5px] text-[var(--color-ink-soft)] font-mono tracking-[0.01em]">
                        <span className="text-[var(--color-ink)] font-semibold flex-shrink-0">Apr 26 · 8:42 AM</span>
                        <span className="text-[var(--color-ink-mute)] text-right text-[11.5px] tracking-[0.04em]">71.82.45.12 · Detroit · Chrome</span>
                      </li>
                    </ul>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2.5 mt-5.5">
                    <button
                      onClick={() => setCurrentState('lockout')}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-danger)] text-[13.5px] font-medium text-[var(--color-danger)] rounded-full transition-all hover:bg-[var(--color-danger)] hover:text-[var(--color-paper)]"
                    >
                      <LockIcon className="w-3.5 h-3.5" />
                      Not me — lock account
                    </button>
                    <button
                      onClick={handleConfirmSession}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-ink)] text-[13.5px] font-medium text-[var(--color-paper)] rounded-full transition-all hover:bg-black"
                    >
                      Confirm and continue
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[12px] text-[var(--color-ink-mute)] leading-[1.55] mt-5.5">
                    By confirming, you acknowledge that all actions taken in this session will be attributed to you and recorded in the audit log.
                  </p>
                </div>
              )}

              {/* ROUTING STATE */}
              {currentState === 'routing' && (
                <div className="text-center flex-1 flex items-center justify-center flex-col">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-ink)] mb-5.5 relative flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[var(--color-lime)]"></div>
                    <div className="absolute inset-0 border-2 border-[var(--color-ink)] rounded-full opacity-0 animate-ping"></div>
                    <div className="absolute inset-0 border-2 border-[var(--color-ink)] rounded-full opacity-0 animate-ping" style={{ animationDelay: '0.8s' }}></div>
                  </div>
                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-1.5">
                    Loading mission control…
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55]">
                    Bootstrapping your admin dashboard with the latest platform data.
                  </p>
                </div>
              )}

              {/* ERROR: NO ACCOUNT */}
              {currentState === 'no-account' && (
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-danger-bg)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <AlertCircleIcon className="w-7 h-7 text-[var(--color-danger)]" />
                  </div>
                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    Account not found
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-6">
                    No admin account exists with this email. Admin emails must be on the allowlist.
                  </p>
                  <button
                    onClick={() => setCurrentState('default')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] text-[13.5px] font-medium rounded-full transition-all hover:bg-black mx-auto"
                  >
                    Try another email
                  </button>
                </div>
              )}

              {/* ERROR: WRONG PASSWORD (1/3) */}
              {currentState === 'wrong-password-1' && (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <h2 className="font-display text-[21px] font-medium tracking-[-0.01em] mb-1">Sign in to continue</h2>
                  <p className="text-[13.5px] text-[var(--color-ink-mute)] mb-5.5 leading-[1.5]">
                    Enter your admin credentials. After your password, you'll verify with two-factor authentication.
                  </p>

                  <div className="mb-4.5">
                    <label className="flex items-center justify-between mb-1.75 text-[12.5px] font-medium text-[var(--color-ink-soft)] tracking-[0.005em]">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@atlas.example"
                      className="w-full px-3.5 py-3 text-[14.5px] bg-[#FFFDF7] border border-[var(--color-line)] rounded-[var(--radius-md)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] focus:shadow-[0_0_0_3px_rgba(14,14,12,0.08)]"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="flex items-center justify-between mb-1.75 text-[12.5px] font-medium text-[var(--color-ink-soft)] tracking-[0.005em]">
                      Password
                      <button type="button" className="text-[12.5px] text-[var(--color-ink-mute)] font-normal hover:text-[var(--color-ink)]">
                        Forgot password?
                      </button>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        className="w-full px-3.5 py-3 text-[14.5px] bg-[var(--color-danger-bg)] border border-[var(--color-danger)] rounded-[var(--radius-md)] text-[var(--color-ink)] pr-[76px] focus:outline-none focus:border-[var(--color-danger)] focus:shadow-[0_0_0_3px_rgba(194,65,43,0.15)]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-ink-mute)] px-2.5 py-1.5 rounded-[var(--radius-sm)]"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="flex items-start gap-1.5 mt-2 text-[12.5px] text-[var(--color-danger)] leading-[1.45]">
                      <AlertCircleIcon className="flex-shrink-0 mt-0.5" />
                      <span>Wrong password. Two more attempts before this account is locked.</span>
                    </div>
                    <div className="flex items-start gap-2 mt-2.5 px-3 py-2.25 bg-[var(--color-amber-bg)] border border-[#F0BB95] rounded-[var(--radius-md)] text-[12.5px] text-[var(--color-ink-soft)] leading-[1.45]">
                      <AlertTriangleIcon className="flex-shrink-0 mt-0.5 text-[var(--color-amber)]" />
                      <span><strong className="text-[var(--color-ink)] font-semibold">1 of 3 attempts used.</strong> After 3 failed attempts, this admin account will be locked for 30 minutes.</span>
                    </div>
                  </div>

                  <div className={`mt-1 mb-5.5 flex items-center justify-between gap-3 px-4 py-3.5 border rounded-[var(--radius-md)] bg-[#FCFAF2] border-[var(--color-line)]`}>
                    <label className="flex items-center gap-3 cursor-pointer user-select-none">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-5.5 h-5.5 border-[1.5px] border-[var(--color-line-strong)] bg-white rounded flex items-center justify-center flex-shrink-0"></div>
                      <span className="text-[14px] font-medium text-[var(--color-ink)]">Verify you're human</span>
                    </label>
                    <div className="flex items-center gap-2.25 flex-shrink-0">
                      <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[var(--color-ink)] to-[var(--color-ink-soft)] flex items-center justify-center text-[var(--color-lime)] font-display text-sm font-medium">A</div>
                      <div className="flex flex-col font-mono text-[9px] tracking-[0.08em] uppercase text-[var(--color-ink-mute)] leading-[1.4]">
                        <strong className="text-[var(--color-ink-soft)] font-semibold">Atlas Verify</strong>
                        <span>Privacy · Terms</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled
                    className="w-full px-5 py-3.75 rounded-[var(--radius-md)] text-[14.5px] font-semibold bg-[var(--color-cream-deep)] text-[var(--color-ink-mute)] cursor-not-allowed flex items-center justify-center gap-2.5"
                  >
                    Continue to verification
                  </button>
                </form>
              )}

              {/* ERROR: WRONG PASSWORD (2/3) */}
              {currentState === 'wrong-password-2' && (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <h2 className="font-display text-[21px] font-medium tracking-[-0.01em] mb-1">Sign in to continue</h2>
                  <p className="text-[13.5px] text-[var(--color-ink-mute)] mb-5.5 leading-[1.5]">
                    Enter your admin credentials. After your password, you'll verify with two-factor authentication.
                  </p>

                  <div className="mb-4.5">
                    <label className="flex items-center justify-between mb-1.75 text-[12.5px] font-medium text-[var(--color-ink-soft)] tracking-[0.005em]">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      placeholder="you@atlas.example"
                      className="w-full px-3.5 py-3 text-[14.5px] bg-[#FFFDF7] border border-[var(--color-line)] rounded-[var(--radius-md)] text-[var(--color-ink)] focus:outline-none"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="flex items-center justify-between mb-1.75 text-[12.5px] font-medium text-[var(--color-ink-soft)] tracking-[0.005em]">
                      Password
                      <button type="button" className="text-[12.5px] text-[var(--color-ink-mute)] font-normal hover:text-[var(--color-ink)]">
                        Forgot password?
                      </button>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        placeholder="••••••••••"
                        className="w-full px-3.5 py-3 text-[14.5px] bg-[var(--color-danger-bg)] border border-[var(--color-danger)] rounded-[var(--radius-md)] text-[var(--color-ink)] pr-[76px] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-ink-mute)] px-2.5 py-1.5"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="flex items-start gap-1.5 mt-2 text-[12.5px] text-[var(--color-danger)] leading-[1.45]">
                      <AlertCircleIcon className="flex-shrink-0 mt-0.5" />
                      <span>Wrong password. One more attempt before this account is locked.</span>
                    </div>
                    <div className="flex items-start gap-2 mt-2.5 px-3 py-2.25 bg-[var(--color-amber-bg)] border border-[#F0BB95] rounded-[var(--radius-md)] text-[12.5px] text-[var(--color-ink-soft)] leading-[1.45]">
                      <AlertTriangleIcon className="flex-shrink-0 mt-0.5 text-[var(--color-amber)]" />
                      <span><strong className="text-[var(--color-ink)] font-semibold">2 of 3 attempts used.</strong> One more failed attempt and this admin account will be locked for 30 minutes.</span>
                    </div>
                  </div>

                  <div className={`mt-1 mb-5.5 flex items-center justify-between gap-3 px-4 py-3.5 border rounded-[var(--radius-md)] bg-[#FCFAF2] border-[var(--color-line)]`}>
                    <label className="flex items-center gap-3 cursor-pointer user-select-none">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-5.5 h-5.5 border-[1.5px] border-[var(--color-line-strong)] bg-white rounded flex items-center justify-center flex-shrink-0"></div>
                      <span className="text-[14px] font-medium text-[var(--color-ink)]">Verify you're human</span>
                    </label>
                    <div className="flex items-center gap-2.25 flex-shrink-0">
                      <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[var(--color-ink)] to-[var(--color-ink-soft)] flex items-center justify-center text-[var(--color-lime)] font-display text-sm font-medium">A</div>
                      <div className="flex flex-col font-mono text-[9px] tracking-[0.08em] uppercase text-[var(--color-ink-mute)] leading-[1.4]">
                        <strong className="text-[var(--color-ink-soft)] font-semibold">Atlas Verify</strong>
                        <span>Privacy · Terms</span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" disabled className="w-full px-5 py-3.75 rounded-[var(--radius-md)] text-[14.5px] font-semibold bg-[var(--color-cream-deep)] text-[var(--color-ink-mute)] cursor-not-allowed">
                    Continue to verification
                  </button>
                </form>
              )}

              {/* ERROR: 2FA WRONG CODE */}
              {currentState === '2fa-wrong' && (
                <div className="text-center flex-1 flex flex-col">
                  <button
                    onClick={() => setCurrentState('2fa')}
                    className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-ink-mute)] mb-4.5 px-2 py-1 rounded-[var(--radius-sm)] transition-all hover:text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] self-start -ml-1.5"
                  >
                    <ArrowLeftIcon />
                    Back
                  </button>
                  <div className="w-16 h-16 rounded-full bg-[var(--color-danger-bg)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <AlertCircleIcon className="w-7 h-7 text-[var(--color-danger)]" />
                  </div>
                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    Code didn't match
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-8">
                    Try the latest 6 digits from your authenticator app.
                  </p>

                  <div className="flex justify-between gap-2 mb-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input key={i} type="text" maxLength={1} placeholder="" className="w-full h-[60px] text-center font-display text-[28px] font-medium bg-[var(--color-danger-bg)] border border-[var(--color-danger)] rounded-[var(--radius-md)] text-[var(--color-danger)]" disabled />
                    ))}
                  </div>
                </div>
              )}

              {/* SECURITY STATE: LOCKOUT (3 ATTEMPTS) */}
              {currentState === 'lockout' && (
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(194,65,43,0.18)] to-[rgba(139,26,26,0.18)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <ShieldIcon className="w-7 h-7 text-[var(--color-restricted)]" />
                  </div>
                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    Admin account locked
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-6">
                    Three failed sign-in attempts triggered an automatic 30-minute lockout. This is stricter than the standard Atlas lockout.
                  </p>

                  <div className="mb-6">
                    <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-[var(--color-ink-mute)] mb-2">Unlock in</div>
                    <div className="font-display text-[38px] font-medium text-[var(--color-ink)] tracking-[-0.02em] leading-1">29:43</div>
                  </div>

                  <a href="mailto:support@atlas.example" className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[var(--color-ink)] text-[13.5px] font-medium text-[var(--color-ink)] rounded-full transition-all hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]">
                    <MailIcon className="w-3.5 h-3.5" />
                    Contact a Super Admin
                  </a>
                  <p className="text-[12px] text-[var(--color-ink-mute)] leading-[1.55] mt-5">
                    Or wait for the timer above. Lockouts are tracked in the audit log.<br/>
                    Reference: <span className="font-mono text-[11px] bg-[var(--color-cream-deep)] px-2 py-1 rounded">LOCK-ADM-2026-0481</span>
                  </p>
                </div>
              )}

              {/* SECURITY STATE: IP BLOCKED */}
              {currentState === 'ip-blocked' && (
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-danger-bg)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <AlertCircleIcon className="w-7 h-7 text-[var(--color-danger)]" />
                  </div>
                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    IP not on allowlist
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-6">
                    Your admin account is restricted to specific IPs. Current: <strong>71.82.45.12</strong>
                  </p>

                  <div className="bg-[var(--color-paper-deep)] border border-[var(--color-line)] rounded-[var(--radius-md)] px-4 py-3 mb-6 text-left text-[13px]">
                    <p className="font-semibold text-[var(--color-ink)] mb-3">Allowed IPs:</p>
                    <ul className="space-y-2 text-[var(--color-ink-soft)] font-mono text-[12px]">
                      <li>✓ 192.168.10.42 (Office - primary)</li>
                      <li>✓ 192.168.10.43 (Office - backup)</li>
                      <li>✓ 2001:db8::1 (Home VPN)</li>
                    </ul>
                  </div>

                  <div className="flex gap-2.5">
                    <a href="mailto:support@atlas.example" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-ink)] text-[13.5px] font-medium text-[var(--color-ink)] rounded-full hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]">
                      Contact Super Admin
                    </a>
                    <button
                      onClick={() => setCurrentState('default')}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-ink)] text-[13.5px] font-medium text-[var(--color-paper)] rounded-full hover:bg-black"
                    >
                      Try another network
                    </button>
                  </div>
                </div>
              )}

              {/* SECURITY STATE: ANOMALY */}
              {currentState === 'anomaly' && (
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(232,118,58,0.18)] to-[rgba(214,242,77,0.18)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <AlertTriangleIcon className="w-7 h-7 text-[var(--color-amber)]" />
                  </div>
                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    Unusual sign-in
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-6">
                    We don't recognize this device/location. Verify it's you before continuing.
                  </p>

                  <div className="bg-[var(--color-amber-bg)] border border-[#F0BB95] rounded-[var(--radius-md)] px-4 py-3 mb-6 text-left text-[13px]">
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-amber)] font-semibold mb-3">Anomaly Signals</p>
                    <div className="space-y-2 text-[var(--color-ink)]">
                      <p><strong>Location:</strong> Lagos, Nigeria (usual: Detroit, MI)</p>
                      <p><strong>Device:</strong> Firefox 125 · Windows (usual: Chrome · macOS)</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => setCurrentState('default')}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-danger)] text-[13.5px] font-medium text-[var(--color-danger)] rounded-full hover:bg-[var(--color-danger)] hover:text-[var(--color-paper)]"
                    >
                      <LockIcon className="w-3.5 h-3.5" />
                      Lock account
                    </button>
                    <button
                      onClick={() => setCurrentState('session-confirm')}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-ink)] text-[13.5px] font-medium text-[var(--color-paper)] rounded-full hover:bg-black"
                    >
                      It's me
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* SECURITY STATE: SUSPENDED */}
              {currentState === 'suspended' && (
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(194,65,43,0.18)] to-[rgba(139,26,26,0.18)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <ShieldIcon className="w-7 h-7 text-[var(--color-restricted)]" />
                  </div>
                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    Account suspended
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-8">
                    Your administrator privileges have been temporarily revoked by a Super Admin.
                  </p>

                  <a href="mailto:support@atlas.example" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-ink)] text-[13.5px] font-medium text-[var(--color-paper)] rounded-full hover:bg-black">
                    <MailIcon className="w-3.5 h-3.5" />
                    Contact a Super Admin
                  </a>
                  <p className="text-[12px] text-[var(--color-ink-mute)] leading-[1.55] mt-5">
                    Reference: <span className="font-mono text-[11px] bg-[var(--color-cream-deep)] px-2 py-1 rounded">SUS-ADM-2026-0143</span>
                  </p>
                </div>
              )}

              {/* SECURITY STATE: PASSWORD EXPIRED */}
              {currentState === 'password-expired' && (
                <div className="text-center flex-1 flex flex-col">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-amber-bg)] flex items-center justify-center mx-auto mb-5.5 flex-shrink-0">
                    <AlertTriangleIcon className="w-7 h-7 text-[var(--color-amber)]" />
                  </div>
                  <h2 className="font-display text-[26px] font-medium tracking-[-0.015em] leading-[1.15] mb-2.5">
                    Password expired
                  </h2>
                  <p className="text-[14.5px] text-[var(--color-ink-soft)] leading-[1.55] mb-6">
                    Admins must reset passwords every 90 days. Set a new password to continue.
                  </p>

                  <div className="bg-[var(--color-cream-deep)] border border-[var(--color-line)] rounded-[var(--radius-md)] px-4 py-3 mb-6 text-left text-[13px]">
                    <div className="flex justify-between mb-2"><span className="font-mono text-[10.5px] uppercase text-[var(--color-ink-mute)]">Last reset:</span> <span className="text-[var(--color-ink)] font-semibold">Jan 30, 2026</span></div>
                    <div className="flex justify-between mb-2"><span className="font-mono text-[10.5px] uppercase text-[var(--color-ink-mute)]">Expired:</span> <span className="text-[var(--color-danger)] font-semibold">1 day ago</span></div>
                    <div className="flex justify-between"><span className="font-mono text-[10.5px] uppercase text-[var(--color-ink-mute)]">Next due:</span> <span className="text-[var(--color-ink)] font-semibold">+ 90 days</span></div>
                  </div>

                  <button className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[var(--color-ink)] text-[13.5px] font-medium text-[var(--color-paper)] rounded-full hover:bg-black">
                    Set new password
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>

            {/* Card footer */}
            <div className="px-9 py-3.5 border-t border-[var(--color-line-soft)] flex items-center justify-between text-[12px] text-[var(--color-ink-mute)] bg-[var(--color-paper-deep)] gap-3">
              <span className="inline-flex items-center gap-2">
                <LockIcon className="w-2.75 h-2.75" />
                Sessions expire after 1 hour of inactivity
              </span>
              <a href="#" className="text-[var(--color-ink-soft)] border-b border-dotted border-[var(--color-line-strong)] pb-0.5 transition-all hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]">
                Admin policy →
              </a>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center mt-7 text-[12.5px] text-[var(--color-ink-mute)] leading-[1.6]">
            Atlas Admin · operated by <strong className="text-[var(--color-ink-soft)] font-semibold">Staffva LLC</strong> · Michigan, USA<br/>
            <span className="text-[var(--color-ink-mute)] font-mono text-[11px] tracking-[0.04em]">v2026.04 · Build 4815-c2a</span>
          </p>
        </div>
      </div>

      {/* Session timeout modal */}
      <TimeoutModal
        isOpen={showTimeoutModal}
        onClose={() => setShowTimeoutModal(false)}
      />
    </>
  );
}
