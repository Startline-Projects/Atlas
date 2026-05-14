'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type Tab = 'clients' | 'candidates'

type Step = {
  title: string
  desc: string
  time: { label: string; tone: 'lime' | 'amber' | 'neutral' }
  list: string[]
  tip?: string
  privacy?: string
}

const clientSteps: Step[] = [
  {
    title: 'Browse freely. No account needed.',
    desc: 'Search the full talent pool before you commit to anything. Filter by role, skills, budget, timezone, country, and more — no signup wall.',
    time: { label: 'Instant', tone: 'lime' },
    list: [
      'Search by role or specific skill',
      'Filter by budget, timezone, English level, availability',
      'Sort by Profile Strength, rate, or rating',
      'Save favorites (requires signup)',
      'Compare up to 4 candidates side-by-side (requires signup)',
    ],
    tip: "You'll see every candidate's photo, scorecard, bio, portfolio, reviews, and work history — all without an account.",
    privacy: "You're not visible to candidates yet. Browsing is anonymous. Your profile stays private until you message a candidate or post a job.",
  },
  {
    title: 'See everything that matters.',
    desc: 'Every profile shows the same depth of information — verified, scored, and structured the same way so you can actually compare.',
    time: { label: 'Instant', tone: 'lime' },
    list: [
      'Video and voice intros (90 seconds each)',
      'English CEFR level with detailed sub-scores',
      'Role assessment scorecard',
      'Portfolio, work history, client reviews',
      'Hourly rate and weekly availability',
      'ID, phone, and reference verification status',
    ],
    tip: 'Every candidate goes through the same vetting funnel. No exceptions, no shortcuts, no pay-to-rank.',
  },
  {
    title: 'Create a free account.',
    desc: 'Takes 30 seconds. Email + password, or sign in with Google. No credit card required — billing only kicks in when you actually hire.',
    time: { label: '30 seconds', tone: 'lime' },
    list: [
      'Email or Google sign-in',
      'No credit card required',
      'Free unlimited browsing',
      'Free unlimited messages',
      'You only pay when you hire',
    ],
  },
  {
    title: 'Two ways to start.',
    desc: 'You can either reach out to candidates directly, or post a job and let our Talent Specialists curate a shortlist for you.',
    time: { label: 'Your choice', tone: 'amber' },
    list: [
      'Option A: Message candidates directly from their profile',
      'Option B: Post a role, get a hand-picked shortlist in 24 hours',
      'Mix both — most clients do',
      'No premium tiers, no boosted listings',
    ],
    tip: "Posting a job is free. You'll see profiles before deciding whether to interview.",
  },
  {
    title: '24-hour shortlist, handpicked.',
    desc: 'If you post a job, a Talent Specialist reviews it within hours and sends you 3–5 hand-picked candidates that match your exact needs.',
    time: { label: '< 24 hours', tone: 'lime' },
    list: [
      'Real human specialists, not algorithms',
      "We don't send everyone — only A-fit candidates",
      'Each shortlist comes with a short Loom from your specialist',
      'You can request adjustments at any time',
      'Free service — paid only if you hire',
    ],
    tip: 'Average shortlist size is 4 candidates. We err on the side of "fewer but better."',
  },
  {
    title: 'Interview inside the platform.',
    desc: 'Built-in video calls, scheduling, and notes. No back-and-forth emails, no Calendly nightmares, no losing track of candidates.',
    time: { label: 'When ready', tone: 'amber' },
    list: [
      'In-platform video calls (no Zoom required)',
      'Shared availability scheduler',
      'Take notes, save clips, share with your team',
      'Optional: invite teammates as observers',
      'AI-generated interview summary after each call',
    ],
  },
  {
    title: 'Negotiate rates in the chat.',
    desc: 'Talk about money openly. Every candidate sets their own rate, and you can propose adjustments based on scope, hours, or commitment.',
    time: { label: 'In chat', tone: 'amber' },
    list: [
      'Rates set by candidates, not the platform',
      'Propose custom rates per project or per role',
      'Negotiate weekly hours, project scope, or duration',
      'Transparent fees — we show you the all-in cost',
      'No hidden markups',
    ],
  },
  {
    title: 'Contract generates itself.',
    desc: 'When you both agree, the platform generates a contract with the terms you discussed. Both parties sign, and the engagement starts.',
    time: { label: '< 5 minutes', tone: 'lime' },
    list: [
      'Auto-generated based on your agreed terms',
      'Customize specific clauses if needed',
      'Both parties e-sign within the platform',
      'IP, confidentiality, and termination handled',
      'Compliant in 90+ countries',
    ],
    tip: 'You can also upload your own contract if your company has one.',
  },
  {
    title: 'Work starts. Payments handled.',
    desc: 'Your candidate starts working. We handle the timesheets, invoices, taxes, and international payments — across 90+ countries.',
    time: { label: 'Weekly', tone: 'lime' },
    list: [
      'Automatic weekly timesheets',
      'One consolidated invoice from Atlas',
      'We pay candidates in their local currency',
      'Tax forms (W-8/W-9) handled',
      'Compliance, insurance, IP — all covered',
    ],
  },
  {
    title: 'Your specialist is your backup.',
    desc: 'If anything goes wrong — performance issues, communication gaps, or just feeling off — your Talent Specialist is one message away.',
    time: { label: 'Always on', tone: 'lime' },
    list: [
      'Dedicated Talent Specialist for every account',
      'Performance check-ins on request',
      'Free replacement guarantee within 14 days',
      'Mediation if disputes arise',
      'Direct human contact, not a help center',
    ],
    tip: "Most clients never need this — but knowing it's there changes how you hire.",
  },
]

const candidateSteps: Step[] = [
  {
    title: 'Create account + email verified.',
    desc: 'Sign up with your email, verify it via the link we send, and start your application. You can finish in one sitting or come back later.',
    time: { label: '2 minutes', tone: 'lime' },
    list: [
      'Email + password (or Google sign-in)',
      'Verify via clickable link',
      'Application can be saved and resumed',
      'No upfront fees, ever',
    ],
  },
  {
    title: 'WhatsApp verified.',
    desc: 'We send a verification code to your WhatsApp number. This is how clients reach you for time-sensitive stuff.',
    time: { label: '1 minute', tone: 'lime' },
    list: [
      'SMS or WhatsApp verification',
      'Your number stays private — clients message via the platform',
      'WhatsApp is preferred (faster, more reliable internationally)',
      'You control notification preferences',
    ],
  },
  {
    title: 'ID + liveness verified.',
    desc: 'Upload a photo of your government ID and complete a quick selfie check. This proves you are who you say you are.',
    time: { label: '5 minutes', tone: 'lime' },
    list: [
      'Government-issued photo ID (passport, national ID, driver license)',
      'Selfie liveness check (look left, look right, smile)',
      'Processed in under 10 minutes (usually under 2)',
      'Your ID is never shown to clients',
    ],
    privacy: 'Your ID and biometric data are encrypted, stored separately from your profile, and never shown to clients or third parties.',
  },
  {
    title: 'Proctored English assessment passed.',
    desc: 'A 25-minute online English test covering grammar, vocabulary, listening, and speaking. CEFR-scored, with detailed sub-scores.',
    time: { label: '25 minutes', tone: 'amber' },
    list: [
      'Grammar, vocabulary, listening, speaking',
      'CEFR-scored (A1 to C2)',
      'Proctored — webcam on, no tab switching',
      'Detailed sub-scores shown on your profile',
      'You need at least B2 to continue',
    ],
  },
  {
    title: 'First video interview passed.',
    desc: 'A 30-minute video call with one of our screeners. We ask about your background, work style, and a few softball role-specific questions.',
    time: { label: '30 minutes', tone: 'amber' },
    list: [
      'Schedule via in-platform calendar',
      'No prep needed — just talk about yourself',
      'Recorded so we can review and score consistently',
      'Result within 48 hours',
    ],
  },
  {
    title: 'Talent Specialist assigned.',
    desc: 'If you pass the first interview, you get assigned a dedicated Talent Specialist — your point of contact for everything that follows.',
    time: { label: 'After step 5', tone: 'lime' },
    list: [
      'Real human, not a chatbot',
      'Will guide you through the rest of vetting',
      'Stays your contact even after you go live',
      'Available to help with profile, rates, and client conversations',
    ],
  },
  {
    title: 'Role-specific interview passed.',
    desc: 'A deeper interview focused on your specific role. For developers, this includes a live coding session. For designers, a portfolio walkthrough. And so on.',
    time: { label: '60 minutes', tone: 'amber' },
    list: [
      'Tailored to your role and seniority',
      'Live exercise (coding, design critique, writing sample, etc.)',
      'Scored across technical breadth, problem-solving, communication',
      'Result within 48 hours',
    ],
  },
  {
    title: 'Profile built + intro recorded.',
    desc: 'Your Talent Specialist helps you build a strong profile and record a 90-second video intro and a 30-second voice intro.',
    time: { label: '1–2 hours', tone: 'amber' },
    list: [
      'Profile review with your Specialist',
      'Photo, bio, work history, portfolio',
      'Skills and tools tags',
      'Video intro (90s) + voice intro (30s)',
      'Hourly rate set by you',
    ],
  },
  {
    title: 'Final Talent Specialist review.',
    desc: 'Your Specialist reviews everything end-to-end — your profile, your scorecard, your intro, your rate — and signs off before you go live.',
    time: { label: '< 48 hours', tone: 'amber' },
    list: [
      'Final review by your Talent Specialist',
      'Last chance to adjust rate, portfolio, bio',
      'Specialist signs off when ready',
      'You see your scorecard before clients do',
    ],
  },
  {
    title: "You're LIVE.",
    desc: 'Your profile goes live. Clients can browse, save, and message you. Get ready for incoming work.',
    time: { label: 'Final step', tone: 'lime' },
    list: [
      'Profile visible to all clients',
      'Notifications via WhatsApp + email',
      'First proposals usually within 7 days',
      'No upfront fees — we take a percentage only when you earn',
    ],
    tip: "Average time from application start to first paid engagement: 18 days.",
  },
]

const faqs = [
  { q: 'Is browsing really free?', a: "Yes. You can browse every candidate, see their full profile, scorecard, portfolio, and reviews without an account. Sign-up is only required to message, save favorites, or post a job." },
  { q: "What does Atlas cost?", a: "Clients pay 12% on top of the candidate's hourly rate. Candidates pay 5% from their earnings. No subscriptions, no hidden fees, no setup costs." },
  { q: "What if it doesn't work out?", a: "If you part ways with a hire in the first 14 days, we replace them for free. Beyond that, your Talent Specialist mediates any disputes." },
  { q: 'How do you vet candidates?', a: 'A 9-step funnel: email + WhatsApp + ID + liveness check, English assessment, first interview, Talent Specialist assignment, role-specific interview, profile build, and final review. About 4% of applicants make it.' },
  { q: 'Where are candidates from?', a: 'Latin America, Southeast Asia, Eastern Europe, and Africa. We focus on regions with strong English, high skill density, and timezone overlap with the US/EU.' },
]

export default function HowItWorks() {
  const [tab, setTab] = useState<Tab>('clients')
  const [stickyVisible, setStickyVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 360)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const steps = tab === 'clients' ? clientSteps : candidateSteps

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="px-8 py-20 max-w-[1100px] mx-auto text-center">
        <div className="flex flex-col items-center">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// How it works</div>
          <h1 className="font-display text-6xl md:text-8xl font-normal leading-tight tracking-tight mb-6 text-ink">
            How it <span className="italic text-amber">works.</span>
          </h1>
          <div className="font-display italic text-xl md:text-2xl text-ink-soft mb-6">Two walkthroughs. One platform. No surprises.</div>
          <p className="text-lg leading-relaxed text-ink-soft max-w-[700px] mx-auto mb-10">Whether you&apos;re hiring or being hired, here&apos;s exactly what happens from first click to first paycheck. No jargon, no fluff — just the mechanics.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className={`px-7 py-4 rounded-full inline-flex items-center gap-2 transition-all text-base font-medium ${
              tab === 'clients' ? 'bg-ink text-paper hover:bg-black' : 'border border-ink text-ink hover:bg-ink hover:text-cream'
            }`} onClick={() => setTab('clients')}>
              For Clients
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button className={`px-7 py-4 rounded-full inline-flex items-center gap-2 transition-all text-base font-medium ${
              tab === 'candidates' ? 'bg-ink text-paper hover:bg-black' : 'border border-ink text-ink hover:bg-ink hover:text-cream'
            }`} onClick={() => setTab('candidates')}>
              For Candidates
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Sticky tab switcher */}
      <div className={`sticky top-[72px] z-50 bg-cream/92 backdrop-blur-md border-b border-line py-3 transition-all duration-250 ${
        stickyVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="max-w-[1340px] mx-auto px-8 flex gap-2">
          <button className={`flex-1 py-3 px-5 border rounded-lg font-display text-[17px] font-medium inline-flex items-center justify-center gap-3 transition-all ${
            tab === 'clients' ? 'bg-ink text-cream border-ink' : 'bg-transparent text-ink-soft border-line hover:border-ink-mute hover:text-ink'
          }`} onClick={() => setTab('clients')}>
            For Clients<span className="font-mono text-[10px] tracking-widest font-bold opacity-70 hidden md:inline">10 STEPS</span>
          </button>
          <button className={`flex-1 py-3 px-5 border rounded-lg font-display text-[17px] font-medium inline-flex items-center justify-center gap-3 transition-all ${
            tab === 'candidates' ? 'bg-ink text-cream border-ink' : 'bg-transparent text-ink-soft border-line hover:border-ink-mute hover:text-ink'
          }`} onClick={() => setTab('candidates')}>
            For Candidates<span className="font-mono text-[10px] tracking-widest font-bold opacity-70 hidden md:inline">10 STEPS</span>
          </button>
        </div>
      </div>

      {/* Intro */}
      <section className="px-8 py-20">
        <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
          {tab === 'clients' ? (
            <>
              <h2 className="font-display text-4xl md:text-[72px] font-normal leading-[1.05] tracking-tight mb-5 text-ink">Hiring in days,<br /><span className="italic text-amber">not weeks.</span></h2>
              <p className="text-[17px] leading-relaxed text-ink-soft mb-6">Here&apos;s what happens from the moment you land on the platform to the moment your new hire starts working.</p>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-paper border border-line rounded-full text-sm font-medium text-ink-soft">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Average time to first hire · 3–5 days
              </div>
            </>
          ) : (
            <>
              <h2 className="font-display text-4xl md:text-[72px] font-normal leading-[1.05] tracking-tight mb-5 text-ink">From application<br />to first <span className="italic text-amber">paycheck.</span></h2>
              <p className="text-[17px] leading-relaxed text-ink-soft mb-6">Here&apos;s exactly what we ask candidates to do to become a verified A-player on Atlas.</p>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-paper border border-line rounded-full text-sm font-medium text-ink-soft">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Average time to first paid engagement · 18 days
              </div>
            </>
          )}
        </div>
      </section>

      {/* Steps */}
      <div className="px-8 flex flex-col gap-24 pb-24 max-w-[1200px] mx-auto">
        {steps.map((s, i) => (
          <section className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`} key={i}>
            <div className={`flex flex-col ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="flex items-baseline gap-2 mb-4.5">
                <span className="font-display text-[64px] font-normal leading-none text-amber italic tracking-tight">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[11px] tracking-widest font-bold text-ink-mute uppercase">OF 10</span>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-widest font-bold uppercase mb-4 w-fit ${
                s.time.tone === 'lime' ? 'bg-lime border border-lime-deep text-ink' : 
                s.time.tone === 'amber' ? 'bg-amber/10 border border-amber/30 text-amber' : 
                'bg-paper border border-line text-ink-soft'
              }`}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                {s.time.label}
              </span>
              <h3 className="font-display text-[28px] md:text-[42px] font-normal leading-tight tracking-tight mb-3.5 text-ink">{s.title}</h3>
              <p className="text-base leading-relaxed text-ink-soft mb-5.5">{s.desc}</p>
              <div className="flex flex-col gap-2.5 mb-5">
                {s.list.map((item, j) => (
                  <div className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft" key={j}>
                    <span className="w-[22px] h-[22px] rounded-full bg-lime text-ink flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              {s.tip && <div className="p-[12px_16px] bg-cream-deep rounded-lg text-sm text-ink-soft leading-relaxed border-l-[3px] border-amber">{s.tip}</div>}
              {s.privacy && (
                <div className="flex items-start gap-2.5 mt-3.5 p-[10px_14px] bg-ink/5 rounded-lg">
                  <div className="w-[22px] h-[22px] rounded-full bg-ink text-lime flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <div className="text-[12px] leading-relaxed text-ink-soft">{s.privacy}</div>
                </div>
              )}
            </div>
            <div className={`aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex flex-col items-center justify-center text-lime font-display text-[28px] font-medium text-center leading-tight ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              Step {i + 1}<br /><span className="font-mono text-[11px] tracking-widest text-ink-mute mt-2 uppercase font-bold">Visualization</span>
            </div>
          </section>
        ))}
      </div>

      {/* Supporting: costs + guarantees */}
      <section className="py-20 bg-paper border-y border-line px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-[28px] md:text-[40px] font-normal leading-tight tracking-tight text-ink">What it costs you.</h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 text-base leading-relaxed text-ink-soft">
                {tab === 'clients' ? (
                  <>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold"><strong className="text-ink font-bold">12%</strong> on top of the candidate&apos;s hourly rate. That&apos;s our entire fee.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">No subscription, no setup fees, no posting fees.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">You can cancel anytime, no penalty.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">Pay weekly, one invoice for all your hires.</li>
                  </>
                ) : (
                  <>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold"><strong className="text-ink font-bold">5%</strong> from your earnings. That&apos;s all.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">No application fee. No subscription. No upfront cost.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">You set your own hourly rate.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">Paid weekly in your local currency.</li>
                  </>
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-[28px] md:text-[40px] font-normal leading-tight tracking-tight text-ink">What if it doesn&apos;t work out?</h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 text-base leading-relaxed text-ink-soft">
                {tab === 'clients' ? (
                  <>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold"><strong className="text-ink font-bold">14-day replacement guarantee.</strong> Don&apos;t love your hire? We replace them, free.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">Your Talent Specialist mediates any disputes.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">Cancel an engagement anytime, no questions.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">If we can&apos;t find a replacement, we refund.</li>
                  </>
                ) : (
                  <>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">If a client disputes your work, your Specialist mediates.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">Payment is protected — we hold funds in escrow weekly.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">Reviews are mutual — clients are rated too.</li>
                    <li className="pl-4.5 relative before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">If you decide to leave, you can take your profile offline anytime.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-8">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-4xl md:text-[56px] font-normal leading-tight tracking-tight mb-9 text-center text-ink">{tab === 'clients' ? 'Client questions.' : 'Candidate questions.'}</h2>
          <div className="flex flex-col gap-2 max-w-[800px] mx-auto">
            {faqs.map((f, i) => (
              <details key={i} className="bg-paper border border-line rounded-lg overflow-hidden transition-all group open:border-ink">
                <summary className="p-[18px_22px] pr-12 font-display text-lg font-medium text-ink cursor-pointer list-none relative after:content-['+'] after:absolute after:right-[22px] after:top-1/2 after:-translate-y-1/2 after:text-2xl after:text-ink-mute after:font-light after:transition-transform group-open:after:rotate-45 group-open:after:text-ink">
                  {f.q}
                </summary>
                <div className="p-[0_22px_20px] text-[15px] leading-relaxed text-ink-soft">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-8">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-display text-4xl md:text-[72px] font-normal leading-tight tracking-tight mb-8 text-ink">{tab === 'clients' ? 'Ready to browse?' : 'Ready to apply?'}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {tab === 'clients' ? (
              <>
                <Link href="/find-talent" className="bg-ink text-paper px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium">
                  Browse Talent
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </Link>
                <button className="border border-ink text-ink px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-ink hover:text-cream transition-all text-base font-medium">Post a Job</button>
              </>
            ) : (
              <>
                <button className="bg-ink text-paper px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium">
                  Apply to Join
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </button>
                <Link href="/for-candidates" className="border border-ink text-ink px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-ink hover:text-cream transition-all text-base font-medium">Learn more</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
