'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const competitors = [
  { name: 'Atlas', multiplier: 1.10, highlight: true },
  { name: 'Upwork', multiplier: 1.10 },
  { name: 'Fiverr', multiplier: 1.25 },
  { name: 'Toptal', multiplier: 2.00 },
  { name: 'OnlineJobs.ph', multiplier: 1.03 },
]

const tableRows = [
  { label: 'Platform fee (client)', atlas: '10% flat', upwork: '~10% + contract fees', fiverr: '~5.5% + tips expected', toptal: 'Hidden 2× markup', online: '$69 / month flat' },
  { label: 'Platform fee (candidate)', atlas: '0% forever', upwork: '10% + Connects ($15–80/mo)', fiverr: '20% of every gig', toptal: 'Varies, opaque', online: '0%' },
  { label: 'Pre-vetting', atlas: { val: 'Multi-stage, 5.7% pass rate', tone: 'yes' }, upwork: { val: 'None — open marketplace', tone: 'no' }, fiverr: { val: 'Gig-level only', tone: 'no' }, toptal: { val: 'Varies by category', tone: 'yes' }, online: { val: 'None', tone: 'no' } },
  { label: 'Interview integrity', atlas: { val: 'Verified throughout', tone: 'yes' }, upwork: { val: 'None', tone: 'no' }, fiverr: { val: 'None', tone: 'no' }, toptal: { val: 'None', tone: 'no' }, online: { val: 'None', tone: 'no' } },
  { label: 'Auto contract generation', atlas: { val: 'Legally binding, US/UK/AU/CA', tone: 'yes' }, upwork: { val: 'Escrow, no full contract', tone: 'partial' }, fiverr: { val: 'Gig terms only', tone: 'no' }, toptal: { val: 'Custom per engagement', tone: 'yes' }, online: { val: 'Direct-hire, no protection', tone: 'no' } },
  { label: 'Dispute resolution', atlas: { val: '72hr SLA, written decisions', tone: 'yes' }, upwork: { val: 'Ticket queue, weeks', tone: 'partial' }, fiverr: { val: 'Limited, gig-scoped', tone: 'partial' }, toptal: { val: 'Case-by-case', tone: 'partial' }, online: { val: 'None', tone: 'no' } },
  { label: 'Assigned specialist', atlas: { val: 'Yours forever', tone: 'yes' }, upwork: { val: 'Self-serve', tone: 'no' }, fiverr: { val: 'Self-serve', tone: 'no' }, toptal: { val: 'Matched per hire', tone: 'yes' }, online: { val: 'Self-serve', tone: 'no' } },
  { label: 'Reference verification', atlas: { val: 'Every claim verified', tone: 'yes' }, upwork: { val: 'Self-attested', tone: 'no' }, fiverr: { val: 'Self-attested', tone: 'no' }, toptal: { val: 'Yes, for top tier', tone: 'yes' }, online: { val: 'None', tone: 'no' } },
]

const faqs = [
  { q: 'Why is candidate pricing always 0%?', a: "Because we believe great work shouldn't be penalized. Our entire model is built on the client paying a single, transparent fee — never the candidate. This is how we ensure candidates can quote a fair rate without padding it to absorb platform cuts." },
  { q: 'What if a candidate underdelivers?', a: 'Tell your Talent Specialist. We mediate within 72 hours, with written decisions. If the engagement should not have gone forward, we issue refunds and (if needed) replace the candidate at no charge.' },
  { q: 'Do you offer enterprise plans?', a: "No. The pricing is the same whether you're hiring one person or fifty. We don't believe in volume discounts that penalize early adopters, and we don't believe in enterprise tiers that gate features. Everyone gets everything." },
  { q: 'Are there setup, posting, or seat fees?', a: 'None. No setup fee, no posting fee, no per-seat license, no annual minimums. You can post 100 jobs without paying a cent, and only pay when you actually hire someone.' },
  { q: 'How do you make money on 10%', a: 'Volume and trust. Our model only works if clients keep coming back. By keeping fees flat and quality high, we earn long-term relationships instead of squeezing each transaction. It also means we have to actually vet candidates — we make money when hires work out, not when they fail.' },
  { q: 'Can I bring my own contract?', a: "Yes. While our auto-generated contracts cover most use cases, you can upload your own and we'll have both parties sign it in-platform with the same legal weight. Speak to your Talent Specialist if you need this." },
]

export default function Pricing() {
  const [rate, setRate] = useState(35)
  const [hours, setHours] = useState(40)

  const calc = useMemo(() => {
    const fee = rate * 0.10
    const youPay = rate + fee
    const weekly = youPay * hours
    const monthly = weekly * 4.33
    const annual = weekly * 52
    return {
      candidateHome: `$${rate.toFixed(2)}/hr`,
      atlasFee: `+ $${fee.toFixed(2)}`,
      youPay: `$${youPay.toFixed(2)}/hr`,
      weekly: `$${Math.round(weekly).toLocaleString()}`,
      monthly: `$${Math.round(monthly).toLocaleString()}`,
      annual: `$${Math.round(annual).toLocaleString()}`,
    }
  }, [rate, hours])

  const annualValue = rate * hours * 52
  const maxAnnual = annualValue * 2.00
  const savings = `$${Math.round(maxAnnual - annualValue * 1.10).toLocaleString()}`

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="px-8 py-20 max-w-[1100px] mx-auto text-center">
        <div className="flex flex-col items-center">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// Pricing</div>
          <h1 className="font-display text-5xl md:text-7xl font-normal leading-tight tracking-tight mb-6 text-ink">
            Simple pricing.<br /><span className="italic text-amber">No hidden fees.</span>
          </h1>
          <p className="text-lg leading-relaxed text-ink-soft max-w-[800px] mx-auto mb-10">Ten percent on top of the candidate&apos;s rate. Zero percent from the candidate. That&apos;s the entire pricing model — no tiers, no premium plans, no per-seat charges, no Connects, no markup hiding inside the hourly rate.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[800px] mx-auto py-6 border-y border-line">
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight">10%</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold">Flat — clients</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight">0%</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold">Forever — candidates</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight">$0</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold">To browse &amp; apply</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight"><span className="italic text-amber">Zero</span></div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold">Hidden fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Two pricing cards */}
      <section className="px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
          {/* Client Card */}
          <div className="p-9 bg-paper border border-line rounded-2xl flex flex-col">
            <div className="mb-6">
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-2">// For clients hiring</div>
              <h2 className="font-display text-[28px] font-normal tracking-tight text-ink">What you pay</h2>
            </div>
            <div className="flex items-baseline gap-3.5 mb-4.5">
              <span className="font-display text-6xl md:text-8xl font-normal leading-none text-amber tracking-tight">10%</span>
              <span className="text-sm text-ink-mute leading-tight max-w-[200px]">flat, on top of the candidate&apos;s rate</span>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-soft mb-7">One fee, always visible, always the same. If the candidate quotes $30/hr, you pay $33/hr total. No surcharge tiers, no enterprise plans, no annual commitments.</p>
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute font-bold mb-3.5">What&apos;s included</div>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 flex-1 mb-8">
              {[
                'Unlimited browsing, no paywalls',
                'Unlimited job posts',
                'Assigned talent specialist + human-picked shortlists within 24 hours',
                'In-platform video interviews with recording',
                'Auto-generated contracts, legally binding in US/UK/AU/CA',
                'Escrow or post-paid payments via Wise',
                '72-hour dispute resolution with written decisions',
                'Replacement assistance if the fit isn\'t right',
                'Privacy by default — your hiring stays private until you decide to engage',
              ].map((f, i) => (
                <li key={i} className="text-sm text-ink-soft pl-[22px] relative before:content-['✓'] before:absolute before:left-0 before:top-0 before:text-amber before:font-bold before:text-[13px]">{f}</li>
              ))}
            </ul>
            <Link href="/find-talent" className="bg-ink text-paper px-6 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium self-start">
              Browse Talent
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Candidate Card */}
          <div className="p-9 bg-ink text-cream border border-ink rounded-2xl flex flex-col">
            <div className="mb-6">
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-lime font-semibold mb-2">// For candidates working</div>
              <h2 className="font-display text-[28px] font-normal tracking-tight text-cream">What you pay</h2>
            </div>
            <div className="flex items-baseline gap-3.5 mb-4.5">
              <span className="font-display text-6xl md:text-8xl font-normal leading-none text-lime tracking-tight">0%</span>
              <span className="text-sm text-cream/70 leading-tight max-w-[200px]">forever, on every hour you work</span>
            </div>
            <p className="text-[15px] leading-relaxed text-cream/85 mb-7">You keep 100% of your rate. Forever. The client&apos;s 10% is on top of your quoted hourly — never taken out of your pocket. No Connects, no paid tier to get noticed, no cut of what you earn.</p>
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-lime/80 font-bold mb-3.5">What&apos;s included</div>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 flex-1 mb-8">
              {[
                'Free to apply, free to stay on the platform forever',
                'Weekly pay in your local currency or USD via Wise',
                'Assigned Talent Specialist who reviews, approves, and represents you',
                'Auto-contracts that protect your IP and payment terms',
                'Verified reviews from US/UK/AU/CA clients',
                'No "Connects," no paid tier to get noticed',
                'Optional re-certification ($20–50) to retest for higher scores',
                'Dispute advocacy from your Talent Specialist, always',
              ].map((f, i) => (
                <li key={i} className="text-sm text-cream/90 pl-[22px] relative before:content-['✓'] before:absolute before:left-0 before:top-0 before:text-lime before:font-bold before:text-[13px]">{f}</li>
              ))}
            </ul>
            <button className="bg-lime text-ink px-6 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-white transition-all text-base font-medium self-start">
              Apply to Join
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 bg-paper border-y border-line">
        <div className="px-8 max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mx-auto text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3">// Cost calculator</div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight mb-4 text-ink">Run the numbers.</h2>
            <p className="text-base leading-relaxed text-ink-soft">Slide the rate and hours to see what you&apos;d actually spend — and what the same hire would cost on other platforms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
            <div className="bg-cream border border-line rounded-2xl p-8">
              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[13px] text-ink-soft font-medium">Candidate&apos;s hourly rate</span>
                  <span className="font-display text-[22px] font-medium text-ink">${rate}<small className="font-body text-[13px] font-normal text-ink-mute ml-0.5">/hr</small></span>
                </div>
                <input type="range" min="5" max="100" value={rate} step="1" className="w-full h-1 bg-cream-deep rounded-full appearance-none cursor-pointer accent-amber" onChange={e => setRate(Number(e.target.value))} />
                <div className="flex justify-between mt-2.5 font-mono text-[10px] text-ink-mute tracking-wider"><span>$5</span><span>$25</span><span>$50</span><span>$75</span><span>$100</span></div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[13px] text-ink-soft font-medium">Hours per week</span>
                  <span className="font-display text-[22px] font-medium text-ink">{hours}<small className="font-body text-[13px] font-normal text-ink-mute ml-0.5"> hrs</small></span>
                </div>
                <input type="range" min="5" max="60" value={hours} step="1" className="w-full h-1 bg-cream-deep rounded-full appearance-none cursor-pointer accent-amber" onChange={e => setHours(Number(e.target.value))} />
                <div className="flex justify-between mt-2.5 font-mono text-[10px] text-ink-mute tracking-wider"><span>5</span><span>20</span><span>40</span><span>60</span></div>
              </div>

              <div className="flex flex-col py-5 border-t border-line mb-6">
                <div className="flex justify-between items-baseline py-2 text-[14px] text-ink-soft"><span>Candidate takes home</span><strong className="font-display text-lg font-medium text-ink">{calc.candidateHome}</strong></div>
                <div className="flex justify-between items-baseline py-2 text-[14px] text-amber"><span>Atlas fee (10%)</span><strong className="font-display text-lg font-medium text-amber">{calc.atlasFee}</strong></div>
                <div className="flex justify-between items-baseline pt-3.5 mt-2 border-t border-line font-semibold text-ink"><span>You pay, all-in</span><strong className="font-display text-2xl text-ink">{calc.youPay}</strong></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-cream-deep rounded-lg text-center"><div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute mb-1.5 font-semibold">Weekly</div><div className="font-display text-[22px] font-medium leading-none text-ink">{calc.weekly}</div></div>
                <div className="p-4 bg-cream-deep rounded-lg text-center"><div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute mb-1.5 font-semibold">Monthly</div><div className="font-display text-[22px] font-medium leading-none text-ink">{calc.monthly}</div></div>
                <div className="p-4 bg-ink text-cream rounded-lg text-center"><div className="font-mono text-[10px] tracking-widest uppercase text-lime mb-1.5 font-semibold">Annual</div><div className="font-display text-[22px] font-medium leading-none text-cream">{calc.annual}</div></div>
              </div>
            </div>

            <div className="bg-cream border border-line rounded-2xl p-8">
              <div className="font-mono text-[11px] tracking-wider uppercase text-ink-mute font-bold mb-5">● Same hire, every platform — annualized</div>
              <div className="flex flex-col gap-4 mb-6">
                {competitors.map(comp => {
                  const value = annualValue * comp.multiplier
                  const widthPct = (comp.multiplier / 2.0) * 100
                  return (
                    <div key={comp.name} className={`grid grid-cols-[110px_1fr_110px] items-center gap-3 ${comp.highlight ? 'text-amber font-bold' : 'text-ink-soft'}`}>
                      <span className="font-display text-[15px]">{comp.name}</span>
                      <div className="h-2 bg-cream-deep rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${comp.highlight ? 'bg-amber' : 'bg-ink-soft'}`} style={{ width: `${widthPct}%` }}></div>
                      </div>
                      <span className="font-mono text-[13px] text-right text-ink font-bold">${Math.round(value).toLocaleString()}</span>
                    </div>
                  )
                })}
              </div>
              <div className="pt-5 border-t border-line flex justify-between items-baseline">
                <span className="text-[13px] text-ink-soft">Annual savings vs the most expensive option</span>
                <strong className="font-display text-[32px] font-medium text-amber leading-none">{savings}</strong>
              </div>
            </div>
          </div>

          <p className="max-w-[900px] mx-auto mt-8 text-xs text-ink-mute leading-relaxed text-center px-4">* Comparison estimates based on publicly-disclosed 2025 pricing. OnlineJobs.ph doesn&apos;t vet, dispute, or contract — quality is not comparable. Your actual costs may vary.</p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24">
        <div className="max-w-[700px] mx-auto text-center mb-12 px-8">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3">// Head-to-head</div>
          <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight mb-4 text-ink">How we stack up.</h2>
          <p className="text-base leading-relaxed text-ink-soft">Every platform in our category, compared on what actually matters — not on logos and buzzwords.</p>
        </div>

        <div className="max-w-[1200px] mx-auto px-8 overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="text-left p-[16px_14px] font-mono text-[11px] tracking-widest uppercase font-bold text-ink-mute border-b-2 border-line">Feature</th>
                <th className="text-left p-[16px_14px] font-mono text-[11px] tracking-widest uppercase font-bold text-amber border-b-2 border-line">Atlas</th>
                <th className="text-left p-[16px_14px] font-mono text-[11px] tracking-widest uppercase font-bold text-ink-mute border-b-2 border-line">Upwork</th>
                <th className="text-left p-[16px_14px] font-mono text-[11px] tracking-widest uppercase font-bold text-ink-mute border-b-2 border-line">Fiverr</th>
                <th className="text-left p-[16px_14px] font-mono text-[11px] tracking-widest uppercase font-bold text-ink-mute border-b-2 border-line">Toptal</th>
                <th className="text-left p-[16px_14px] font-mono text-[11px] tracking-widest uppercase font-bold text-ink-mute border-b-2 border-line">OnlineJobs.ph</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i}>
                  <td className="p-[16px_14px] text-[13px] border-b border-line-soft font-bold text-ink">{row.label}</td>
                  {(['atlas', 'upwork', 'fiverr', 'toptal', 'online'] as const).map(col => {
                    const cell = (row as any)[col]
                    const isAtlas = col === 'atlas'
                    if (typeof cell === 'string') {
                      return <td key={col} className={`p-[16px_14px] text-[13px] border-b border-line-soft ${isAtlas ? 'bg-amber/5 text-ink font-bold' : 'text-ink-soft'}`}>{cell}</td>
                    }
                    return (
                      <td key={col} className={`p-[16px_14px] text-[13px] border-b border-line-soft ${isAtlas ? 'bg-amber/5 text-ink font-bold' : 'text-ink-soft'}`}>
                        <span className={`font-medium ${cell.tone === 'yes' ? 'text-green-600 font-bold' : cell.tone === 'no' ? 'text-ink-mute' : 'text-amber'}`}>{cell.val}</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-8">
        <div className="max-w-[800px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3 text-center">// Pricing questions</div>
          <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight mb-9 text-center text-ink">Pricing questions.</h2>
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

      {/* Final CTA */}
      <section className="py-24 text-center bg-ink text-cream px-8">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-display text-4xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8">No surprises.<br /><span className="italic text-lime">Just hires.</span></h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/find-talent" className="bg-cream text-ink px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-white transition-all text-base font-medium">
              Browse Talent
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/how-it-works" className="border border-cream text-cream px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-cream hover:text-ink transition-all text-base font-medium">How it works</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
