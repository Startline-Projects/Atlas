'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield, Check, Lock, FileText, Scale, Eye, ShieldCheck, Mail, ArrowRight, Activity, Layers } from 'lucide-react'

const sections = [
  { id: 'overview', label: '● Overview' },
  { id: 'ts-candidates', label: 'Candidate verification' },
  { id: 'ts-clients', label: 'Client verification' },
  { id: 'ts-contracts', label: 'Contract & payment' },
  { id: 'ts-disputes', label: 'Disputes' },
  { id: 'ts-privacy', label: 'Privacy' },
  { id: 'ts-security', label: 'Data security' },
  { id: 'ts-contact', label: 'Contact' },
]

export default function Trust() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const onScroll = () => {
      const positions = sections.map(s => {
        const el = document.getElementById(s.id)
        return el ? { id: s.id, top: el.getBoundingClientRect().top } : null
      }).filter(Boolean) as { id: string; top: number }[]
      const current = positions.filter(p => p.top < 200).pop()
      if (current) setActive(current.id)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="px-8 py-24 bg-cream border-b border-line pt-36" id="overview">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div className="flex flex-col items-start">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// Trust & Safety · how we keep both sides safe and verified</div>
            <h1 className="font-display text-6xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8 text-ink">The <span className="italic text-amber">verified</span><br />marketplace for <span className="text-lime-deep">remote work.</span></h1>
            <p className="text-lg md:text-xl leading-relaxed text-ink-soft max-w-[700px] mb-12">Every candidate is verified. Every contract is escrowed. Every dispute goes to a real human mediator. Fraud on Atlas isn&apos;t just discouraged — it&apos;s <strong className="text-ink font-semibold">structurally hard</strong>.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8 w-full">
              <div className="flex flex-col gap-1">
                <div className="font-display text-4xl md:text-5xl font-normal leading-tight text-ink tracking-tight">5.7<span className="italic text-amber">%</span></div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute font-bold">Applicant acceptance rate</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-display text-4xl md:text-5xl font-normal leading-tight text-ink tracking-tight">$<span className="italic text-amber">0</span></div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute font-bold">Fraud losses to clients</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-display text-4xl md:text-5xl font-normal leading-tight text-ink tracking-tight">5–7<span className="italic text-amber"> d</span></div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute font-bold">Avg dispute resolution</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-display text-4xl md:text-5xl font-normal leading-tight text-ink tracking-tight">100<span className="italic text-amber">%</span></div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute font-bold">Payments in escrow</div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-square">
              <div className="absolute inset-0 bg-lime/10 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-[15%] bg-ink rounded-full shadow-2xl flex items-center justify-center border-[12px] border-paper/10">
                <Shield className="w-32 h-32 text-lime drop-shadow-[0_0_20px_rgba(214,242,77,0.4)]" strokeWidth={1} />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-[120%] h-[120%] border border-lime rounded-full animate-ping-slow"></div>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-paper/90 backdrop-blur border border-line rounded-full px-5 py-2 flex items-center gap-4 shadow-xl">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-ink">
                  <Activity className="w-3 h-3 text-lime" /> SCAN · ACTIVE
                </div>
                <div className="w-px h-3 bg-line"></div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-ink-mute">
                  <Layers className="w-3 h-3" /> 04 LAYERS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky sub-nav */}
      <nav className="sticky top-18 z-20 bg-cream/90 backdrop-blur-md border-b border-line h-14 flex items-center px-8 overflow-x-auto no-scrollbar">
        <div className="max-w-[1300px] mx-auto flex gap-8 items-center w-full h-full">
          {sections.map(s => (
            <button key={s.id} className={`font-mono text-[11px] tracking-widest uppercase whitespace-nowrap hover:text-ink transition-colors h-full flex items-center border-b-2 ${
              active === s.id ? 'text-ink font-bold border-ink' : 'text-ink-mute border-transparent'
            }`} onClick={() => scrollTo(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Candidate verification */}
      <section className="py-24 px-8" id="ts-candidates">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Candidate verification
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">We verify <span className="italic text-amber">humans,</span><br />not profiles.</h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">Most platforms take a candidate&apos;s word that they are who they say. We don&apos;t. Every Atlas candidate clears a multi-stage process before their profile goes live, with identity verified end to end.</p>
          </div>
          <div className="bg-paper border border-line rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-[100px_1fr] gap-12 mt-16 shadow-sm group hover:border-ink transition-colors">
            <div className="w-24 h-24 rounded-2xl bg-lime flex items-center justify-center shrink-0 shadow-lg ring-4 ring-lime/10 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-12 h-12 text-ink" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-6">
              <div className="font-mono text-[11px] tracking-widest uppercase text-ink-mute font-bold italic">Every candidate goes through</div>
              <h3 className="font-display text-3xl font-normal tracking-tight text-ink">A multi-stage <span className="italic text-amber">filter.</span></h3>
              <ul className="grid grid-cols-1 gap-6">
                {[
                  { t: 'ID and identity verification.', d: 'Government-issued ID + liveness check. The face that\'s verified at application is matched at every later stage.' },
                  { t: 'A proctored English fluency assessment.', d: 'CEFR-scored, identity-verified throughout.' },
                  { t: 'Two structured video interviews.', d: 'One general, one role-specific. Recorded and integrity-checked end to end.' },
                  { t: 'A Talent Specialist\'s personal review.', d: 'Verification of profile, work history, references by phone, and full interview recordings before approval.' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-lime/20 flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-3.5 h-3.5 text-lime-deep" strokeWidth={3} />
                    </span>
                    <p className="text-[15px] leading-relaxed text-ink-soft">
                      <strong className="text-ink font-semibold">{item.t}</strong> {item.d}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="bg-cream border-l-4 border-amber p-6 rounded-r-xl italic text-ink-soft text-[15px] leading-relaxed mt-4">
                &quot;Most applicants don&apos;t pass. The ones who do are vetted A-players. Specific verification methods evolve over time — we don&apos;t publish them.&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client verification */}
      <section className="py-24 px-8 bg-paper border-y border-line" id="ts-clients">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> Symmetric · client side
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Clients are verified <span className="italic text-amber">too.</span></h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">Candidates put themselves on the line to work with you. We hold you to a proportional bar: before you can hire, we confirm you&apos;re a real person or business with a real payment method. <strong className="text-ink">No anonymous clients.</strong></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: <Activity className="w-5 h-5" />, t: 'Identity required.', d: 'Personal name, payment method, and (for businesses) verified company info. We confirm the entity before the first dollar moves.' },
              { icon: <Lock className="w-5 h-5" />, t: 'Payment method on file.', d: 'Cards and bank accounts verified through Stripe before any candidate is messaged. No card on file, no hire.' },
              { icon: <Shield className="w-5 h-5" />, t: 'Behavior monitored.', d: 'Repeated dispute losses, low-rated reviews from candidates, payment failures — all trigger automated review.' }
            ].map((card, i) => (
              <div key={i} className="bg-cream border border-line rounded-2xl p-8 flex flex-col gap-5 group hover:border-ink transition-all">
                <span className="w-10 h-10 rounded-lg bg-paper border border-line flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors">{card.icon}</span>
                <h3 className="font-display text-xl font-normal tracking-tight text-ink">{card.t}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract & payment */}
      <section className="py-24 px-8" id="ts-contracts">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Contract & payment
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Money is <span className="italic text-amber">never</span> at risk.</h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">Every Atlas engagement runs through escrow. Funds are held by an insured third party until work is approved. No one — including Atlas — can drain the account.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: <ShieldCheck className="w-5 h-5" />, t: 'Insured escrow.', d: 'Client funds held by Stripe Connect, insured up to $5M per engagement. Funds release only on milestone or approval.' },
              { icon: <FileText className="w-5 h-5" />, t: 'Auto contracts.', d: 'Legally binding in US/UK/AU/CA, generated automatically from the terms you both agreed to. e-signed in-platform.' },
              { icon: <Scale className="w-5 h-5" />, t: 'Predictable payouts.', d: 'Weekly payouts to candidates via Wise, in 90+ currencies. Tax forms (W-8/W-9) handled. No surprise deductions.' }
            ].map((card, i) => (
              <div key={i} className="bg-paper border border-line rounded-2xl p-8 flex flex-col gap-5 group hover:border-ink transition-all">
                <span className="w-10 h-10 rounded-lg bg-lime flex items-center justify-center text-ink shadow-sm group-hover:scale-110 transition-transform">{card.icon}</span>
                <h3 className="font-display text-xl font-normal tracking-tight text-ink">{card.t}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disputes */}
      <section className="py-24 px-8 bg-paper border-y border-line" id="ts-disputes">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> Disputes
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Humans, <span className="italic text-amber">not algorithms,</span> decide.</h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">If something goes wrong, a real Atlas mediator reviews the case. Written decisions, average 5–7 day resolution, appeals allowed. We don&apos;t hide behind ticket queues.</p>
          </div>
          <div className="flex flex-col gap-10 max-w-[900px]">
            {[
              { num: '01', t: 'Open a dispute.', d: 'Either party can open one. We freeze all relevant escrowed funds the moment a dispute is filed.' },
              { num: '02', t: 'Both sides submit evidence.', d: 'Chats, deliverables, screenshots, recordings. All evidence is timestamped and verified.' },
              { num: '03', t: 'A mediator reviews.', d: 'A senior Atlas mediator (real human, trained in dispute resolution) reviews both sides.' },
              { num: '04', t: 'Written decision.', d: 'Within 5–7 days. Including reasoning, payout split, and any reputation impact. Both sides can appeal.' },
            ].map(s => (
              <div key={s.num} className="grid grid-cols-[64px_1fr] gap-8 items-start">
                <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center font-display text-2xl font-normal shrink-0">{s.num}</div>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="font-display text-2xl font-normal tracking-tight text-ink">{s.t}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-24 px-8" id="ts-privacy">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Privacy
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Your data <span className="italic text-amber">stays yours.</span></h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">We collect what we need to verify, vet, and pay. Nothing more. We don&apos;t sell data, we don&apos;t share it with advertisers, and we delete it on request.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'Never sold.', d: 'We make money on hires, not data. Your information is never sold, licensed, or shared with advertisers or data brokers.' },
              { t: 'Right to delete.', d: 'Email privacy@atlas.co and we delete your data within 30 days. Some legal records (contracts, tax) must be kept.' },
              { t: 'GDPR & CCPA.', d: 'Compliant with European, Californian, and Canadian privacy laws. See our Privacy Policy for full detail.' }
            ].map((card, i) => (
              <div key={i} className="bg-cream border border-line rounded-2xl p-8 flex flex-col gap-5 hover:border-ink transition-all">
                <h3 className="font-display text-xl font-normal tracking-tight text-ink">{card.t}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data security */}
      <section className="py-24 px-8 bg-paper border-y border-line" id="ts-security">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> Data security
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Encrypted <span className="italic text-amber">everywhere.</span></h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Critical secrets are hardware-backed. We&apos;re SOC 2 Type II certified, audited annually.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'SOC 2 Type II', d: 'Audited annually by an independent third party. Report available on request under NDA.' },
              { t: 'TLS 1.3 + AES-256', d: 'Encryption in transit and at rest. Database encryption keys are hardware-backed (AWS KMS).' },
              { t: 'Zero trust internally', d: 'Atlas staff access is role-scoped, time-limited, and logged. No engineer has standing access to user data.' }
            ].map((card, i) => (
              <div key={i} className="bg-cream border border-line rounded-2xl p-8 flex flex-col gap-4 group hover:border-ink transition-all">
                <h3 className="font-display text-[17px] font-bold tracking-widest uppercase text-ink-mute group-hover:text-ink transition-colors">{card.t}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-8" id="ts-contact">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-ink text-cream rounded-[32px] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-cream/60 font-semibold mb-6">// Something doesn&apos;t feel right?</div>
            <h2 className="font-display text-4xl md:text-[64px] font-normal leading-[1.05] tracking-tight mb-8 text-cream">Report it. We <span className="italic text-lime">act fast.</span></h2>
            <p className="text-lg leading-relaxed text-cream/80 max-w-[600px] mb-12">Suspected fraud, impersonation, payment issues, or safety concerns — tell us. Urgent reports reviewed within 1 hour.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-lime text-ink px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-white transition-all text-base font-medium shadow-lg shadow-lime/20">
                Report an issue
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
              <a href="mailto:trust@atlas.co" className="border border-cream/30 text-cream px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-cream/10 transition-all text-base font-medium">
                <Mail className="w-4 h-4" />
                trust@atlas.co
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
