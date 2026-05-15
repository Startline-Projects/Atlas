'use client'

import { useState } from 'react'
import Link from 'next/link'

const eligibility = [
  { title: 'Laptop or desktop computer', desc: "Mobile-only applicants can't complete the interviews. You'll need a machine you can sit with for 30–45 minutes uninterrupted." },
  { title: 'Working webcam + microphone', desc: "Built-in is fine. They need to work reliably and record clearly enough for the proctored sessions to verify it's you." },
  { title: 'Stable internet, 5+ Mbps up', desc: 'Video interviews + screen recording need consistent bandwidth. Dropouts mid-interview invalidate the session and cost you a retake.' },
  { title: 'Government-issued photo ID', desc: "Passport, national ID, or driver's license. Used for identity verification. Your ID + liveness check locks your face for every future interview." },
  { title: 'WhatsApp on your real phone', desc: "We verify your phone via WhatsApp OTP and use it to reach you after you're live. If you don't use WhatsApp, you'll need to set it up first." },
  { title: 'Professional English (C1+ level)', desc: 'Comfortable running a business conversation, writing email, explaining technical nuance out loud. Not conversational — working fluency.' },
]

const categories = [
  { tag: 'Engineering', count: '142 open', roles: ['Frontend developer', 'Backend developer', 'Full-stack engineer', 'Mobile (iOS / Android)', 'DevOps / SRE', 'Data engineer'] },
  { tag: 'Design', count: '47 open', roles: ['Product designer', 'Brand & visual designer', 'UX researcher', 'Motion designer', 'Webflow / Framer designer'] },
  { tag: 'Marketing', count: '38 open', roles: ['Performance marketer', 'Growth marketer', 'Content marketer', 'SEO specialist', 'Lifecycle / CRM marketer'] },
  { tag: 'Operations', count: '24 open', roles: ['Executive assistant', 'Operations manager', 'Customer success manager', 'Recruiter', 'Project manager'] },
  { tag: 'Content', count: '19 open', roles: ['Editor', 'Long-form writer', 'Copywriter', 'Video editor', 'Podcast producer'] },
  { tag: 'Finance', count: '12 open', roles: ['Bookkeeper', 'Accountant', 'Financial analyst', 'FP&A'] },
]

const timeline = [
  { day: 'Day 0', title: 'Submit your application.', desc: 'Email, password, picked role, region. 60 seconds. We email you a verification link the same minute.' },
  { day: 'Day 0–1', title: 'WhatsApp + ID verified.', desc: 'You verify your phone via WhatsApp code, then upload a government ID and complete a 30-second selfie liveness check.' },
  { day: 'Day 1–3', title: 'English assessment passed.', desc: 'A proctored 25-minute online English test. CEFR-scored, with detailed sub-scores. You need C1 or higher to continue.' },
  { day: 'Day 2–5', title: 'First video interview.', desc: '30 minutes with one of our screeners. No prep needed. We ask about your background and walk through softball role questions.' },
  { day: 'Day 4–8', title: 'Role-specific interview.', desc: 'A 60-minute deep dive with a live exercise. Code review, design critique, writing sample, etc. Tailored to your role and seniority.' },
  { day: 'Day 7–10', title: 'Profile + intro built.', desc: 'Your Talent Specialist helps you build a strong profile and record a 90-second video intro + 30-second voice intro.' },
  { day: 'Day 10–14', title: "You're live.", desc: 'Final review by your Talent Specialist. You go live. Clients can browse, save, and message you. First proposals usually within 7 days.' },
]

const stats = [
  { val: '5.7%', label: 'Acceptance rate' },
  { val: '18 days', label: 'Avg time to first paid hour' },
  { val: '$38/hr', label: 'Avg approved rate' },
  { val: '0%', label: 'Platform fee from candidates' },
]

export default function Apply() {
  const [checked, setChecked] = useState<boolean[]>(Array(6).fill(false))

  const toggle = (i: number) => setChecked(p => p.map((v, idx) => idx === i ? !v : v))
  const readyCount = checked.filter(Boolean).length
  const pct = (readyCount / 6) * 100
  const allReady = readyCount === 6

  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Hero */}
      <section className="px-8 py-20 max-w-[1000px] mx-auto text-center">
        <div className="flex flex-col items-center">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// Apply to Join</div>
          <h1 className="font-display text-6xl md:text-[120px] font-normal leading-none tracking-tight mb-7 text-ink">
            Join the <span className="italic text-ink-soft">top</span><br /><span className="text-amber">5.7%</span>.
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-[700px] mx-auto mb-10">
            We don&apos;t sugarcoat the bar. <strong className="text-ink font-bold">Most applicants don&apos;t get through.</strong> But if you do, you&apos;ll work with US/UK/AU/CA clients, keep 100% of your rate, and build a reputation that compounds. Here&apos;s what we&apos;re looking for.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[800px] mx-auto py-6 border-y border-line">
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight">5.7<small className="text-[0.55em] text-ink-mute font-normal ml-0.5">%</small></div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold">Accepted</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight">0%</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold">Fees forever</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight">7–14<small className="text-[0.55em] text-ink-mute font-normal ml-0.5"> days</small></div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold">From here to live</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight"><span className="italic text-amber">Forever</span></div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold">Yours, once approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility checklist */}
      <section className="px-8 py-20 bg-paper border-y border-line">
        <div className="max-w-[700px] mx-auto text-center mb-10">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5">// Eligibility check</div>
          <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight mb-3.5 text-ink">Do you meet the bar?</h2>
          <p className="text-base leading-relaxed text-ink-soft">Six boxes. If you can honestly tick all of them, you&apos;re ready to start your application.</p>
        </div>

        <div className="max-w-[720px] mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-display text-lg font-medium text-ink">{readyCount} of 6 ready</span>
              <span className="font-mono text-[11px] tracking-[0.12em] text-ink-mute font-semibold uppercase text-[10px]">Honest answers only</span>
            </div>
            <div className="h-1 bg-cream-deep rounded-full overflow-hidden">
              <div className="h-full bg-amber transition-all duration-300" style={{ width: `${pct}%` }}></div>
            </div>
          </div>

          {eligibility.map((item, i) => (
            <label key={i} className={`grid grid-cols-[28px_1fr] gap-4 py-[18px] border-b border-line-soft cursor-pointer items-start group`}>
              <input type="checkbox" className="hidden" checked={checked[i]} onChange={() => toggle(i)} />
              <span className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all mt-0.5 ${
                checked[i] ? 'bg-amber border-amber text-cream' : 'border-line bg-cream text-transparent group-hover:border-ink-mute'
              }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-lg font-medium text-ink">{item.title}</span>
                <span className="text-sm leading-relaxed text-ink-soft">{item.desc}</span>
              </span>
            </label>
          ))}

          <div className="pt-[18px] text-[13px] text-ink-soft text-center">
            Not sure about your internet? <a href="https://www.speedtest.net" target="_blank" rel="noopener noreferrer" className="text-amber font-bold hover:underline">Run a speed test →</a>
          </div>

          {allReady && (
            <div className="mt-6 p-[18px_22px] bg-lime rounded-lg flex justify-between items-center gap-3 flex-wrap">
              <span className="font-display text-lg font-bold text-ink">✓ You&apos;re ready.</span>
              <a href="#ap-final" className="bg-ink text-paper px-[18px] py-[10px] rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-sm font-medium">
                Start application
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="px-8 py-20">
        <div className="max-w-[700px] mx-auto text-center mb-10">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5">// What we&apos;re hiring</div>
          <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight mb-3.5 text-ink">Which role are you applying for?</h2>
          <p className="text-base leading-relaxed text-ink-soft">We accept applications across six core categories. Each one has multiple specializations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1200px] mx-auto">
          {categories.map(c => (
            <div key={c.tag} className="p-6 bg-paper border border-line rounded-lg hover:border-ink hover:-translate-y-0.5 hover:shadow-md transition-all group">
              <div className="flex justify-between items-baseline mb-4 pb-3.5 border-b border-line">
                <h3 className="font-display text-[22px] font-medium text-ink">{c.tag}</h3>
                <span className="font-mono text-[11px] tracking-[0.12em] font-bold text-amber">{c.count}</span>
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                {c.roles.map(r => (
                  <li key={r} className="text-sm text-ink-soft pl-3.5 relative before:content-['·'] before:absolute before:left-0 before:text-amber before:font-bold before:text-lg before:leading-none before:top-0">{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-8 py-20 bg-paper border-y border-line">
        <div className="max-w-[700px] mx-auto text-center mb-10">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5">// The path</div>
          <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight mb-3.5 text-ink">The path from here.</h2>
          <p className="text-base leading-relaxed text-ink-soft">Day-by-day, what happens after you click Apply.</p>
        </div>
        <div className="max-w-[720px] mx-auto relative before:absolute before:left-[35px] md:before:left-[110px] before:top-3 before:bottom-3 before:w-[2px] before:bg-line">
          {timeline.map((t, i) => (
            <div key={i} className="grid grid-cols-[72px_1fr] md:grid-cols-[100px_1fr] gap-5 md:gap-8 py-[18px] relative items-start 
              before:absolute before:left-[31px] md:before:left-[106px] before:top-6 before:w-2.5 before:h-2.5 before:bg-amber before:rounded-full before:border-2 before:border-paper before:shadow-[0_0_0_4px_var(--paper)] before:z-10">
              <div className="font-display text-base font-medium text-amber italic pt-0.5">{t.day}</div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-xl font-normal leading-tight text-ink">{t.title}</h3>
                <p className="text-[14px] leading-relaxed text-ink-soft">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 py-16 bg-ink">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl md:text-[60px] font-normal leading-none text-lime mb-2 tracking-tight">{s.val}</div>
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-cream/70 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-24 text-center" id="ap-final">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-display text-4xl md:text-[56px] font-normal leading-tight tracking-tight mb-4.5 text-ink">Start your <span className="italic text-ink-soft">application.</span></h2>
          <p className="text-base leading-relaxed text-ink-soft mb-8">Sign up, verify your email, and pick your role. Takes 60 seconds. You can pause and resume any time.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="bg-ink text-paper px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium">
              Apply to Join
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <Link href="/how-it-works" className="border border-ink text-ink px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-ink hover:text-amber transition-all text-base font-medium">See full walkthrough</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
