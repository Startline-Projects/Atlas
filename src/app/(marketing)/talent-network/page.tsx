'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Users, Briefcase, Mail, MapPin, Info } from 'lucide-react'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const roles = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'design', label: 'Design' },
  { id: 'recruiting', label: 'Recruiting' },
  { id: 'operations', label: 'Operations' },
  { id: 'content', label: 'Content' },
  { id: 'cs', label: 'Customer Success' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'other', label: 'Other' },
]

const levels = ['Junior', 'Mid', 'Senior', 'Staff', 'Leadership']

export default function TalentNetwork() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [level, setLevel] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  const toggleRole = (id: string) => setSelectedRoles(p => p.includes(id) ? p.filter(r => r !== id) : [...p, id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRoles.length === 0 || !level) return
    setSubmitted(true)
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="px-8 py-20 bg-cream border-b border-line text-center flex flex-col items-center">
        <div className="font-mono text-[11px] font-bold text-lime-deep bg-lime/10 px-3 py-1 rounded-full mb-6 animate-pulse-slow">
          NETWORK OPEN · REVIEWED MONTHLY
        </div>
        <h1 className="font-display text-6xl md:text-8xl font-normal leading-tight tracking-tight mb-8 text-ink">Stay on our <span className="italic text-amber underline underline-offset-8 decoration-amber/30">radar.</span></h1>
        <p className="text-xl leading-relaxed text-ink-soft max-w-[800px]">Skip the &quot;keep my resume on file&quot; charade. <strong className="text-ink font-semibold">Our talent network is the real thing</strong> — reviewed monthly by our Talent Specialist team, with personal outreach when a role opens that matches.</p>
      </section>

      {/* Main content */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-20 items-start">
            {/* Sidebar */}
            <aside className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold flex items-center gap-2 italic">
                  <span className="text-lime-deep">●</span> How this works
                </div>
                <h2 className="font-display text-4xl font-normal tracking-tight text-ink leading-tight">Not a résumé <span className="italic text-amber">graveyard.</span></h2>
                <p className="text-base leading-relaxed text-ink-soft">Most &quot;talent networks&quot; are just a polite way of saying &quot;we threw your résumé in a pile.&quot; Ours is different — we actually review submissions, and we actually reach out.</p>
              </div>

              <div className="flex flex-col gap-10">
                {[
                  { num: '01', text: 'We review submissions monthly — our Talent Specialist team reads every one and tags them by interest area.' },
                  { num: '02', text: 'A Talent Specialist reaches out when a role fits — personally, not with a template. Could be next week or in 6 months.' },
                  { num: '03', text: 'No spam. No list-building. We don\'t share your info with anyone, and we don\'t send newsletters.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-paper border border-line flex items-center justify-center font-display text-lg text-ink shrink-0 shadow-sm">{step.num}</div>
                    <p className="text-[15px] leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                ))}
              </div>

              <div className="bg-paper border border-line rounded-3xl p-8 flex flex-col gap-4 shadow-sm group hover:border-ink transition-all">
                <div className="font-display text-4xl font-normal text-ink leading-none">7<span className="italic text-amber ml-1">hires</span></div>
                <p className="text-sm leading-relaxed text-ink-soft">
                  <strong className="text-ink font-semibold">joined Atlas through the talent network</strong> — including 2 of our 11 Talent Specialists. It&apos;s how we find the A-players we weren&apos;t actively looking for.
                </p>
              </div>

              <Link href="/careers" className="text-sm font-bold text-amber hover:text-ink transition-colors flex items-center gap-2 italic underline underline-offset-4 decoration-amber/30">
                Or browse open roles now <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>

            {/* Form Wrap */}
            <div className="bg-paper border border-line rounded-[40px] p-8 md:p-16 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_100%_0%,rgba(214,242,77,0.05),transparent_70%)]"></div>
              
              {submitted ? (
                <div className="flex flex-col items-center text-center gap-8 py-10 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 rounded-full bg-lime text-ink flex items-center justify-center shadow-xl ring-8 ring-lime/10">
                    <Check className="w-12 h-12" strokeWidth={3} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-4xl font-normal text-ink">You&apos;re on our radar.</h3>
                    <p className="text-lg text-ink-soft max-w-[450px] mx-auto">Thanks for submitting. A Talent Specialist will review your submission within the month. When a role fits, you&apos;ll hear from us — personally.</p>
                  </div>
                  <Link href="/" className="bg-ink text-paper px-8 py-4 rounded-full font-bold hover:bg-black transition-all">Back to homepage</Link>
                </div>
              ) : (
                <form className="flex flex-col gap-14 relative z-10" onSubmit={handleSubmit}>
                  {/* Section 1: Basics */}
                  <div className="flex flex-col gap-8">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-line"></span> Basics
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-ink uppercase tracking-tight flex justify-between">Full name <span className="text-amber">*</span></label>
                        <div className="relative flex items-center">
                          <Users className="absolute left-4 w-4 h-4 text-ink-mute" />
                          <input type="text" placeholder="Your name" required className="w-full bg-cream border border-line rounded-xl pl-11 pr-4 py-3.5 text-base text-ink focus:border-ink outline-none transition-all shadow-inner" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-ink uppercase tracking-tight flex justify-between">Email <span className="text-amber">*</span></label>
                        <div className="relative flex items-center">
                          <Mail className="absolute left-4 w-4 h-4 text-ink-mute" />
                          <input type="email" placeholder="you@domain.com" required className="w-full bg-cream border border-line rounded-xl pl-11 pr-4 py-3.5 text-base text-ink focus:border-ink outline-none transition-all shadow-inner" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-ink uppercase tracking-tight">Location <span className="text-ink-mute lowercase font-normal italic ml-1">city, country</span></label>
                        <div className="relative flex items-center">
                          <MapPin className="absolute left-4 w-4 h-4 text-ink-mute" />
                          <input type="text" placeholder="Lisbon, Portugal" className="w-full bg-cream border border-line rounded-xl pl-11 pr-4 py-3.5 text-base text-ink focus:border-ink outline-none transition-all shadow-inner" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-ink uppercase tracking-tight flex justify-between">LinkedIn URL <span className="text-ink-mute lowercase font-normal italic">strongly encouraged</span></label>
                        <div className="relative flex items-center">
                          <LinkedInIcon className="absolute left-4 w-4 h-4 text-ink-mute" />
                          <input type="url" placeholder="linkedin.com/in/you" className="w-full bg-cream border border-line rounded-xl pl-11 pr-4 py-3.5 text-base text-ink focus:border-ink outline-none transition-all shadow-inner" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Interests */}
                  <div className="flex flex-col gap-8">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-line"></span> What you&apos;re looking for
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-xs font-bold text-ink uppercase tracking-tight">Role interests <span className="text-amber">*</span> <span className="text-ink-mute lowercase font-normal italic ml-1">pick any</span></label>
                      <div className="flex flex-wrap gap-2.5">
                        {roles.map(r => (
                          <button 
                            key={r.id} 
                            type="button" 
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                              selectedRoles.includes(r.id) ? 'bg-ink text-paper border-ink shadow-lg shadow-ink/10' : 'bg-cream text-ink-soft border-line hover:border-ink'
                            }`}
                            onClick={() => toggleRole(r.id)}
                          >{r.label}</button>
                        ))}
                      </div>
                      <div className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Info className="w-3 h-3" />
                        <strong className="text-ink">{selectedRoles.length}</strong> selected · pick at least one
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                      <label className="text-xs font-bold text-ink uppercase tracking-tight">Seniority <span className="text-amber">*</span></label>
                      <div className="flex flex-wrap gap-2.5">
                        {levels.map(l => (
                          <button 
                            key={l} 
                            type="button" 
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                              level === l ? 'bg-ink text-paper border-ink shadow-lg shadow-ink/10' : 'bg-cream text-ink-soft border-line hover:border-ink'
                            }`}
                            onClick={() => setLevel(l)}
                          >{l}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: About */}
                  <div className="flex flex-col gap-8">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-line"></span> About you
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="text-xs font-bold text-ink uppercase tracking-tight flex justify-between">Tell us about yourself and what you&apos;re looking for <span className="text-amber">*</span></label>
                      <textarea 
                        rows={6} 
                        required 
                        placeholder="Background, what you're great at, what you're looking for next, anything that doesn't fit elsewhere..." 
                        className="w-full bg-cream border border-line rounded-2xl p-6 text-base text-ink focus:border-ink outline-none transition-all shadow-inner resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button type="submit" className="bg-ink text-paper px-10 py-5 rounded-full font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-ink/20 group">
                    Submit to network
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
