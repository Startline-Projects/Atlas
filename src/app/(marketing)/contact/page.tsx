'use client'

import { useState } from 'react'

type RouteType = 'client' | 'candidate' | 'press' | 'partner' | 'trust' | 'other'

const routes: { id: RouteType; icon: React.ReactNode; title: string; italic: string; desc: string; note?: string; cta: string }[] = [
  { id: 'client', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title: "I'm looking to", italic: 'hire.', desc: 'Questions about hiring, pricing, shortlists, or how the platform works for clients.', cta: 'Contact sales' },
  { id: 'candidate', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, title: "I'm looking for", italic: 'work.', desc: 'Questions about applying, your application status, or an account issue.', note: 'Have a live account? Sign in to chat with your Talent Specialist directly.', cta: 'Contact us' },
  { id: 'press', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/></svg>, title: 'Press &', italic: 'media.', desc: 'Interview requests, quotes, data, company info. Deadline requests prioritized.', note: 'Urgent? Email press@atlas.co directly.', cta: 'Contact press' },
  { id: 'partner', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, title: '', italic: 'Partnerships.', desc: 'Integrations, co-marketing, referrals, enterprise, or custom deals.', cta: 'Contact partnerships' },
  { id: 'trust', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Trust &', italic: 'Safety.', desc: 'Report fraud, abuse, impersonation, safety concerns, or policy violations.', note: 'Urgent reports reviewed within 1 hour.', cta: 'Report an issue' },
  { id: 'other', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: 'Something', italic: 'else.', desc: "General questions that don't fit the above. We'll route it to the right person.", cta: 'Send a message' },
]

const chipLabels: Record<RouteType, string> = {
  client: 'Client / hiring',
  candidate: 'Candidate',
  press: 'Press',
  partner: 'Partner',
  trust: 'Trust & Safety',
  other: 'Other',
}

export default function Contact() {
  const [type, setType] = useState<RouteType>('client')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const scrollToForm = (selectedType: RouteType) => {
    setType(selectedType)
    setSubmitted(false)
    document.getElementById('ct-form-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Hero + routing cards */}
      <section className="px-8 py-20 max-w-[1340px] mx-auto">
        <div className="flex flex-col">
          <div className="max-w-[800px] mx-auto mb-14 text-center">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// Contact · we route every inquiry to a real person</div>
            <h1 className="font-display text-6xl md:text-8xl font-normal tracking-tight mb-6 text-ink">Get in <span className="italic text-amber">touch.</span></h1>
            <p className="text-lg leading-relaxed text-ink-soft">Pick the option that fits best. We route every inquiry to a real person — <strong className="text-ink">no ticket queues, no bots</strong>, no &quot;we&apos;ll get back to you within 10 business days.&quot;</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes.map(r => (
              <button key={r.id} className={`p-6 bg-paper border border-line rounded-2xl flex flex-col items-start gap-2.5 text-left transition-all hover:border-ink hover:-translate-y-0.5 hover:shadow-md group`} onClick={() => scrollToForm(r.id)}>
                <span className={`w-11 h-11 rounded-lg flex items-center justify-center transition-colors ${
                  r.id === 'client' ? 'bg-amber/10 text-amber' :
                  r.id === 'candidate' ? 'bg-lime text-ink' :
                  r.id === 'press' ? 'bg-ink/10 text-ink' :
                  r.id === 'partner' ? 'bg-blue-500/10 text-blue-600' :
                  r.id === 'trust' ? 'bg-green-500/10 text-green-600' :
                  'bg-ink-soft/10 text-ink-soft'
                }`}>{r.icon}</span>
                <div className="font-display text-[22px] font-normal leading-tight tracking-tight text-ink">{r.title} <span className="italic text-amber">{r.italic}</span></div>
                <p className="text-sm leading-relaxed text-ink-soft flex-1">{r.desc}</p>
                {r.note && <p className="text-xs leading-relaxed text-ink-mute bg-cream-deep p-2 md:p-2.5 rounded-md mt-1 w-full"><strong className="text-ink">Note:</strong> {r.note}</p>}
                <div className="font-display italic text-[15px] text-amber mt-auto pt-2 flex items-center gap-1.5 transition-all group-hover:translate-x-1">{r.cta} <span>→</span></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-paper border-y border-line scroll-mt-20" id="ct-form-section">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[700px] mx-auto text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Send us a message
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight mb-4 text-ink">The form <span className="italic text-amber">adapts</span> to what you need.</h2>
            <p className="text-base leading-relaxed text-ink-soft">Pick your inquiry type below — the fields change to match. We ask only what&apos;s actually useful for routing you to the right person.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
            <div className="flex flex-col">
              <div className="font-mono text-[11px] tracking-widest uppercase text-ink-mute mb-3 font-bold">● I&apos;m contacting as a…</div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {(Object.keys(chipLabels) as RouteType[]).map(k => (
                  <button key={k} type="button" className={`inline-flex items-center gap-2 px-3.5 py-2 border rounded-full text-sm font-semibold transition-all ${
                    type === k ? 'bg-ink border-ink text-cream' : 'bg-cream border-line text-ink-soft hover:border-ink-mute'
                  }`} onClick={() => { setType(k); setSubmitted(false) }}>
                    <span className={`w-1.5 h-1.5 rounded-full ${type === k ? 'bg-lime' : 'bg-ink-mute'}`}></span>{chipLabels[k]}
                  </button>
                ))}
              </div>

              {submitted ? (
                <div className="bg-cream border border-line rounded-2xl p-14 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-lime text-ink flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="font-display text-[32px] font-normal tracking-tight text-ink">Message sent.</h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft max-w-[440px]">Thanks for reaching out. A real person will get back to you within 24 hours — usually much sooner.</p>
                  <button className="border border-ink text-ink px-6 py-2.5 rounded-full hover:bg-ink hover:text-cream transition-all mt-4" onClick={() => setSubmitted(false)}>Send another</button>
                </div>
              ) : (
                <form className="p-8 bg-cream border border-line rounded-2xl flex flex-col gap-4.5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Your name<span className="text-amber ml-1">*</span></label>
                      <input type="text" className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all" placeholder="Jane Doe" required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Email<span className="text-amber ml-1">*</span></label>
                      <input type="email" className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all" placeholder="you@domain.com" required />
                    </div>
                  </div>

                  {/* Variant fields */}
                  {type === 'client' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Company name<span className="text-amber ml-1">*</span></label>
                          <input type="text" className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all" placeholder="Acme Inc." required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Company website <span className="font-body normal-case tracking-normal text-ink-mute font-normal ml-1">optional</span></label>
                          <input type="url" className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all" placeholder="acme.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">What roles are you hiring for?<span className="text-amber ml-1">*</span></label>
                          <input type="text" className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all" placeholder="e.g. Senior React developer" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Team size <span className="font-body normal-case tracking-normal text-ink-mute font-normal ml-1">optional</span></label>
                          <select className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink cursor-pointer transition-all" defaultValue="">
                            <option value="" disabled>Select size</option>
                            <option>1–10</option>
                            <option>11–50</option>
                            <option>51–200</option>
                            <option>200+</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {type === 'candidate' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">What&apos;s this about?<span className="text-amber ml-1">*</span></label>
                        <select className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink cursor-pointer transition-all" defaultValue="" required>
                          <option value="" disabled>Select a topic</option>
                          <option>Application status</option>
                          <option>Account issue</option>
                          <option>Profile question</option>
                          <option>Vetting / assessment</option>
                          <option>Payments / payouts</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {type === 'press' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Publication / outlet<span className="text-amber ml-1">*</span></label>
                        <input type="text" className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all" placeholder="e.g. The Verge" required />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Deadline <span className="font-body normal-case tracking-normal text-ink-mute font-normal ml-1">optional</span></label>
                        <input type="text" className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all" placeholder="e.g. EOD Friday" />
                      </div>
                    </div>
                  )}

                  {type === 'partner' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Company<span className="text-amber ml-1">*</span></label>
                        <input type="text" className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all" placeholder="Your company" required />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Partnership type<span className="text-amber ml-1">*</span></label>
                        <select className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink cursor-pointer transition-all" defaultValue="" required>
                          <option value="" disabled>Select type</option>
                          <option>Integration</option>
                          <option>Referral / affiliate</option>
                          <option>Co-marketing</option>
                          <option>Enterprise / custom</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {type === 'trust' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Type of report<span className="text-amber ml-1">*</span></label>
                        <select className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink cursor-pointer transition-all" defaultValue="" required>
                          <option value="" disabled>Select a type</option>
                          <option>Fraud / scam</option>
                          <option>Impersonation</option>
                          <option>Abuse or harassment</option>
                          <option>Safety concern</option>
                          <option>Policy violation</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Urgency<span className="text-amber ml-1">*</span></label>
                        <select className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink cursor-pointer transition-all" defaultValue="" required>
                          <option value="" disabled>Select urgency</option>
                          <option>Urgent — needs immediate attention</option>
                          <option>Non-urgent</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] tracking-widest uppercase text-ink-soft font-bold">Your message<span className="text-amber ml-1">*</span></label>
                    <textarea rows={6} className="p-[11px_14px] bg-paper border border-line rounded-md text-sm text-ink outline-none focus:border-ink transition-all resize-y min-h-[120px]" placeholder="Tell us what you need. The more context, the faster we can route it." required></textarea>
                  </div>

                  <button type="submit" className="bg-ink text-paper px-6 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium self-start">
                    Send message
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </button>
                </form>
              )}
            </div>

            <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
              <div className="p-5.5 bg-cream border border-line rounded-2xl flex flex-col gap-3">
                <h4 className="font-display text-lg font-medium text-ink">What happens next?</h4>
                <ol className="list-none p-0 m-0 flex flex-col gap-2.5">
                  {[
                    'Your message goes straight to the right team — no support queue.',
                    'A real person reads it. Not a bot, not a triage layer.',
                    'You get a reply within 24 hours, usually within 4.',
                    'If urgent, we route it instantly.',
                  ].map((s, i) => (
                    <li key={i} className="text-[13px] leading-relaxed text-ink-soft pl-6 relative">
                      <span className="absolute left-0 top-0 w-[18px] h-[18px] bg-ink text-lime rounded-full flex items-center justify-center text-[10px] font-bold font-mono">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="p-5.5 bg-cream border border-line rounded-2xl flex flex-col gap-3">
                <h4 className="font-display text-lg font-medium text-ink">Direct emails</h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                  {[
                    { label: 'Sales', email: 'sales@atlas.co' },
                    { label: 'Press', email: 'press@atlas.co' },
                    { label: 'Partnerships', email: 'partners@atlas.co' },
                    { label: 'Trust & Safety', email: 'trust@atlas.co' },
                    { label: 'General', email: 'hello@atlas.co' },
                  ].map((item, i) => (
                    <li key={i} className="text-[13px] text-ink-soft leading-normal">
                      <strong className="text-ink font-bold mr-1">{item.label}:</strong> {item.email}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5.5 bg-cream border border-line rounded-2xl flex flex-col gap-3">
                <h4 className="font-display text-lg font-medium text-ink">Offices</h4>
                <p className="text-[13px] leading-relaxed text-ink-soft">Atlas is fully remote — no offices, no headquarters. Our team is in 19 countries across 6 timezones.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
