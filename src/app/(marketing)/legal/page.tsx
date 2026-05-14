import Link from 'next/link'
import { Check, Clock, Mail, Shield, ShieldCheck, FileText, Lock, Scale, ArrowRight } from 'lucide-react'

const compliance = [
  { name: 'GDPR', status: 'Compliant · EU/EEA', active: true },
  { name: 'CCPA / CPRA', status: 'Compliant · California', active: true },
  { name: 'SOC 2 Type II', status: 'Certified · Mar 2026', active: true },
  { name: 'ISO 27001', status: 'In audit · Q3 2026', active: false },
]

const categories = [
  {
    num: '01',
    title: 'Governing',
    italic: 'documents.',
    desc: 'The documents that govern the overall relationship between you and Atlas. Every user agrees to these.',
    docs: [
      { slug: 'terms', title: 'Terms of', italic: 'Service.', summary: 'How you use Atlas. The master agreement every user accepts at signup.', version: 'v4.1', date: 'Apr 14, 2026' },
      { slug: 'aup', title: 'Acceptable Use', italic: 'Policy.', summary: 'What you can and cannot do on the platform. Plain English with examples.', version: 'v2.3', date: 'Mar 02, 2026' },
      { slug: 'biometric', title: 'Biometric Consent', italic: 'Policy.', summary: 'How we handle ID liveness checks and face-matching for verification.', version: 'v1.4', date: 'Feb 11, 2026' },
      { slug: 'accessibility', title: 'Accessibility', italic: 'Statement.', summary: 'WCAG 2.2 AA conformance, ongoing audits, and reporting issues.', version: 'v1.1', date: 'Jan 20, 2026' },
    ],
  },
  {
    num: '02',
    title: 'Privacy &',
    italic: 'data.',
    desc: 'How we collect, use, store, and share your data. Required reading for the privacy-conscious.',
    docs: [
      { slug: 'privacy', title: 'Privacy', italic: 'Policy.', summary: 'What data we collect, why, where it goes, and your rights over it.', version: 'v5.0', date: 'Apr 02, 2026' },
      { slug: 'cookies', title: 'Cookie', italic: 'Policy.', summary: 'Every cookie we set, what it does, and how to refuse them.', version: 'v2.1', date: 'Feb 28, 2026' },
      { slug: 'dnss', title: 'Do Not Sell or', italic: 'Share.', summary: 'Your CCPA/CPRA right to opt out — even though we already do not sell.', version: 'v1.3', date: 'Jan 30, 2026' },
    ],
  },
  {
    num: '03',
    title: 'Dispute &',
    italic: 'remedy.',
    desc: 'What happens if things go wrong. Refunds, disputes, copyright takedowns.',
    docs: [
      { slug: 'dispute', title: 'Dispute Resolution', italic: 'Policy.', summary: '72-hour mediation SLA, evidence requirements, appeal process.', version: 'v3.2', date: 'Mar 18, 2026' },
      { slug: 'refund', title: 'Refund &', italic: 'Chargeback Policy.', summary: '14-day replacement window, refund timing, chargeback handling.', version: 'v2.0', date: 'Mar 11, 2026' },
      { slug: 'dmca', title: 'DMCA / Copyright', italic: 'Policy.', summary: 'Takedown procedure, counter-notice, and repeat infringer policy.', version: 'v1.2', date: 'Feb 15, 2026' },
    ],
  },
]

export default function LegalHub() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Hero */}
      <section className="px-8 py-24 bg-cream border-b border-line">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-16 items-start">
            <div>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// Legal & Trust Center · governance · privacy · compliance</div>
              <h1 className="font-display text-6xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8 text-ink">The <span className="italic text-amber">boring</span> page.<br />Read it anyway.</h1>
              <p className="text-xl leading-relaxed text-ink-soft max-w-[700px]">These documents govern how we work together. We&apos;ve tried to write them in <em className="text-ink">English first, legalese second</em>, and to flag every meaningful change in plain language. They&apos;re still <strong className="text-ink font-semibold">binding agreements</strong> — treat them that way.</p>
            </div>
            <div className="bg-paper border border-line rounded-2xl p-8 flex flex-col gap-6 shadow-sm">
              <div className="flex flex-col gap-1.5 pb-6 border-b border-line">
                <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Hub updated</div>
                <div className="flex items-center gap-3">
                  <span className="bg-lime text-ink px-1.5 py-0.5 rounded text-[10px] font-bold tracking-tight">NEW</span>
                  <strong className="font-display text-lg font-medium text-ink">April 18, 2026</strong>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-1">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Docs on file</div>
                  <strong className="font-display text-lg font-medium text-ink">11 documents</strong>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Questions?</div>
                  <a href="mailto:legal@atlas.co" className="font-display text-lg font-medium text-amber hover:text-ink transition-colors flex items-center gap-2">
                    legal@atlas.co <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Data rights?</div>
                  <a href="mailto:privacy@atlas.co" className="font-display text-lg font-medium text-amber hover:text-ink transition-colors flex items-center gap-2">
                    privacy@atlas.co <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-paper border-b border-line py-8 px-8">
        <div className="max-w-[1300px] mx-auto flex flex-wrap gap-x-12 gap-y-6 items-center">
          <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold flex items-center gap-2">
            <span className="text-lime-deep">●</span> Compliance posture
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {compliance.map(c => (
              <div key={c.name} className={`flex items-center gap-3 transition-all ${c.active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                <div className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center text-lime-deep">
                  {c.active ? <Check className="w-3 h-3" strokeWidth={3} /> : <Clock className="w-3 h-3" />}
                </div>
                <div>
                  <div className="font-display text-sm font-medium text-ink leading-tight">{c.name}</div>
                  <div className="text-[10px] font-bold text-ink-mute uppercase tracking-widest">{c.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document library */}
      <section className="py-24 px-8">
        <div className="max-w-[1300px] mx-auto">
          <div className="max-w-[700px] mb-20">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Document library
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Everything, <span className="italic text-amber">organized.</span></h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">Eleven documents across three categories. Each shows effective date, version, and a one-line summary.</p>
          </div>

          {categories.map(cat => (
            <div key={cat.num} className="mt-20 first:mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_200px] gap-8 items-start border-b border-line pb-8 mb-10">
                <div className="font-display italic text-[56px] font-normal leading-none text-amber/20">0{cat.num.slice(1)}</div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-3xl font-normal tracking-tight text-ink">{cat.title} <span className="italic text-amber">{cat.italic}</span></h3>
                  <p className="text-base text-ink-soft max-w-[600px]">{cat.desc}</p>
                </div>
                <div className="lg:text-right">
                  <div className="font-mono text-[10px] font-bold text-ink-mute uppercase tracking-widest py-1 px-3 bg-cream border border-line rounded-full inline-block">
                    {cat.docs.length} documents
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.docs.map(doc => (
                  <Link key={doc.slug} href={`/legal/${doc.slug}`} className="bg-paper border border-line rounded-2xl p-8 flex flex-col gap-5 group hover:border-ink transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="font-display text-xl font-medium text-ink group-hover:text-amber transition-colors">
                      {doc.title} <span className="italic">{doc.italic}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-soft">{doc.summary}</p>
                    <div className="mt-auto pt-6 border-t border-line/50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-mono text-[9px] font-bold text-ink uppercase tracking-widest">{doc.version}</span>
                        <span className="text-[10px] text-ink-mute">Updated {doc.date}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-ink-mute group-hover:text-ink group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts */}
      <section className="py-24 px-8 bg-paper border-y border-line">
        <div className="max-w-[1300px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime-deep">●</span> Contacts
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Named <span className="italic text-amber">humans</span> for legal matters.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'General Counsel', name: 'Sarah Chen', email: 'legal@atlas.co', icon: <Scale className="w-5 h-5" /> },
              { role: 'Data Protection Officer', name: 'Klara Nowak', email: 'privacy@atlas.co', icon: <Lock className="w-5 h-5" /> },
              { role: 'DMCA Agent', name: 'Marcus Holt', email: 'dmca@atlas.co', icon: <FileText className="w-5 h-5" /> },
              { role: 'Trust & Safety Lead', name: 'Priya Raman', email: 'trust@atlas.co', icon: <ShieldCheck className="w-5 h-5" /> },
            ].map((contact, i) => (
              <div key={i} className="bg-cream border border-line rounded-2xl p-8 flex flex-col gap-6 group hover:border-ink transition-all">
                <div className="w-10 h-10 rounded-lg bg-paper border border-line flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors">
                  {contact.icon}
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold text-ink-mute uppercase tracking-widest mb-1">{contact.role}</div>
                  <h4 className="font-display text-xl font-medium text-ink mb-3">{contact.name}</h4>
                  <a href={`mailto:${contact.email}`} className="text-sm font-medium text-amber hover:text-ink transition-colors flex items-center gap-2">
                    {contact.email} <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
