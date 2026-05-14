'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Rocket, User, ShieldCheck, CreditCard, FileText, AlertCircle, Settings, Shield, ArrowRight, Mail } from 'lucide-react'

const categories = [
  { tone: 'bg-lime/10 border-lime/20', icon: <Rocket className="w-5 h-5 text-lime-deep" />, title: 'Getting started as a client.', desc: 'Your first job post, briefing a Talent Specialist, and the 10% fee.', count: '5 articles' },
  { tone: 'bg-amber/10 border-amber/20', icon: <User className="w-5 h-5 text-amber" />, title: 'Getting started as a candidate.', desc: 'Applications, video intros, rate setting, your profile.', count: '6 articles' },
  { tone: 'bg-blue-500/10 border-blue-500/20', icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, title: 'Vetting & interviews.', desc: "What 'pre-vetted' means and why most applicants don't make it through.", count: '4 articles' },
  { tone: 'bg-lime/10 border-lime/20', icon: <CreditCard className="w-5 h-5 text-lime-deep" />, title: 'Payments & invoicing.', desc: 'Methods, billing cycles, how candidates get paid, taxes.', count: '8 articles' },
  { tone: 'bg-paper', icon: <FileText className="w-5 h-5 text-ink" />, title: 'Contracts.', desc: 'Atlas contracts vs your own, terms, early endings, NDAs.', count: '5 articles' },
  { tone: 'bg-amber/10 border-amber/20', icon: <AlertCircle className="w-5 h-5 text-amber" />, title: 'Disputes.', desc: 'Opening one, what happens, outcomes & appeals.', count: '3 articles' },
  { tone: 'bg-paper', icon: <Settings className="w-5 h-5 text-ink" />, title: 'Account.', desc: 'Login, password, 2FA, team members, data export.', count: '6 articles' },
  { tone: 'bg-blue-500/10 border-blue-500/20', icon: <Shield className="w-5 h-5 text-blue-500" />, title: 'Trust & safety.', desc: 'Payment protection, identity verification, reporting.', count: '4 articles' },
]

const popular = [
  { title: 'How do I open a dispute?', cat: 'Disputes', time: '4 min read' },
  { title: 'What does the 10% fee cover?', cat: 'Payments', time: '3 min read' },
  { title: 'Setting your hourly rate as a candidate', cat: 'Getting started', time: '5 min read' },
  { title: 'Why was my profile rejected during vetting?', cat: 'Vetting', time: '6 min read' },
  { title: 'How long does payment processing take?', cat: 'Payments', time: '2 min read' },
  { title: 'Enabling two-factor authentication', cat: 'Account', time: '2 min read' },
]

const chips = ['Refund', 'Payment methods', 'Cancel a contract', 'Verify profile', 'Open a dispute', 'Two-factor auth']

export default function Help() {
  const [query, setQuery] = useState('')

  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Hero */}
      <section className="px-8 py-24 bg-cream border-b border-line text-center flex flex-col items-center">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// Help Center · answer in minutes</div>
        <h1 className="font-display text-6xl md:text-8xl font-normal leading-tight tracking-tight mb-8 text-ink">How can we <span className="italic text-amber">help?</span></h1>
        <p className="text-lg md:text-xl leading-relaxed text-ink-soft max-w-[700px]">Search our guides or browse by topic. If you can&apos;t find what you&apos;re looking for, our support team is 14 minutes away, on average.</p>

        <div className="bg-paper border border-line rounded-2xl px-6 py-4.5 flex items-center gap-4 shadow-sm w-full max-w-[700px] mt-10 mb-8 focus-within:border-ink transition-all">
          <Search className="w-5 h-5 text-ink-mute" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-base md:text-lg text-ink placeholder:text-ink-mute w-full py-1"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for payments, disputes, account settings..."
            aria-label="Search help articles"
          />
          <span className="text-[10px] font-bold text-ink-mute bg-cream px-1.5 py-0.5 rounded border border-line">/</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 max-w-[800px]">
          <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mr-2">Popular:</span>
          {chips.map(c => (
            <button key={c} className="px-3 py-1.5 bg-paper border border-line rounded-lg text-xs font-bold text-ink-soft hover:border-ink hover:text-ink transition-all shadow-sm" onClick={() => setQuery(c)}>{c}</button>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-8 bg-paper border-b border-line">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-ink">Browse by <span className="italic text-amber">topic.</span></h2>
              <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mt-4 flex items-center gap-2">
                <span className="text-amber">●</span> 8 categories · 41 articles
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <button key={i} className={`p-8 border border-line rounded-2xl flex flex-col items-start text-left hover:border-ink transition-all group hover:shadow-lg hover:-translate-y-1 ${c.tone}`}>
                <div className="w-10 h-10 rounded-lg bg-paper border border-line flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <h3 className="font-display text-xl font-medium text-ink mb-3 leading-tight">{c.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft mb-8 line-clamp-2">{c.desc}</p>
                <div className="mt-auto flex items-center justify-between w-full pt-6 border-t border-line/30">
                  <span className="font-mono text-[10px] font-bold text-ink-mute uppercase tracking-widest">{c.count}</span>
                  <ArrowRight className="w-4 h-4 text-ink-mute group-hover:text-ink group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular articles */}
      <section className="py-24 px-8">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-ink">Popular <span className="italic text-amber">articles.</span></h2>
              <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mt-4 flex items-center gap-2">
                <span className="text-lime-deep">●</span> Read by the most people this week
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
            {popular.map((p, i) => (
              <Link key={i} href="#" className="flex items-start gap-6 group py-6 border-b border-line-soft hover:border-ink transition-all">
                <div className="font-display italic text-3xl text-amber/20 group-hover:text-amber transition-colors shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <div className="font-display text-xl font-medium text-ink group-hover:text-amber transition-colors mb-1">{p.title}</div>
                  <div className="font-mono text-[10px] font-bold text-ink-mute uppercase tracking-widest">{p.cat} · {p.time}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-ink-mute opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-paper border border-line rounded-[32px] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-6">// Still stuck?</div>
            <h2 className="font-display text-4xl md:text-[64px] font-normal leading-[1.05] tracking-tight mb-8 text-ink">Talk to a <span className="italic text-amber">human.</span></h2>
            <p className="text-lg leading-relaxed text-ink-soft max-w-[600px] mb-12">If our articles didn&apos;t help, we&apos;ll route you to a real person — usually within 14 minutes. No tickets, no bots.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-ink text-paper px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium shadow-lg">
                Contact us
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
              <a href="mailto:hello@atlas.co" className="border border-line text-ink px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-cream transition-all text-base font-medium">
                <Mail className="w-4 h-4" />
                hello@atlas.co
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
