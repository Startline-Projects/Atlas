'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Clock, Mail, Globe, ShieldAlert, DollarSign, Zap } from 'lucide-react'

const featured = {
  quarter: 'Q4 2025 · Global Talent Migration',
  title: 'The new supply map: where the',
  titleItalic: 'A-players',
  titleEnd: 'are coming from.',
  lead: "Over the last four quarters, the composition of the global senior-dev talent pool has shifted more dramatically than any year since 2020. Here's what the data actually says — and what it means for hiring in 2026.",
  findings: [
    { bold: '+38% Y/Y', text: 'growth in LATAM senior-dev supply, led by Brazil and Argentina' },
    { bold: 'Within 8%', text: 'median LATAM senior rates relative to US off-platform peers' },
    { bold: 'EU-East plateaued', text: 'while SEA accelerated +22% in H2 2025' },
    { bold: '5.7% acceptance', text: 'our bar held steady despite 3× applicant volume' },
  ],
  bigNum: '+38',
  unit: '%',
  bigLabel: 'Y/Y growth in LATAM senior-dev supply on platform, Q4 2024 → Q4 2025',
}

const pastReports = [
  { id: 'q3-2025', tone: 'bg-amber/10 text-amber border-amber/20', icon: <ShieldAlert className="w-6 h-6" />, label: 'Q3 2025 · Losses', num: '$47', unit: 'B', sub: 'Estimated 2024 global cost of freelance misrepresentation', date: 'Aug 18, 2025', title: 'The real cost of freelance fraud.', desc: 'ID fraud, LLM-assisted interviews, and ghost-workers add up to real money. We broke down where the $47B actually gets lost.' },
  { id: 'q2-2025', tone: 'bg-lime text-ink border-lime/20', icon: <DollarSign className="w-6 h-6" />, label: 'Q2 2025 · Earnings', num: '$78', unit: 'K', sub: 'Median annual earnings for LATAM senior devs on Atlas, last 12 mo', date: 'May 22, 2025', title: 'What A-players actually earn.', desc: 'Real take-home numbers from 1,400 vetted candidates across 8 specializations. By region, role, and seniority.' },
  { id: 'q1-2025', tone: 'bg-ink text-paper border-ink/20', icon: <Zap className="w-6 h-6" />, label: 'Q1 2025 · Vetting', num: '4.2', unit: '%', sub: 'Of applicants passed all 9 vetting stages, last 12 months', date: 'Feb 14, 2025', title: 'Why most candidates fail.', desc: 'A funnel breakdown of where 95.8% of applicants drop off — and what the 4.2% who make it through have in common.' },
  { id: 'q4-2024', tone: 'bg-amber/10 text-amber border-amber/20', icon: <Clock className="w-6 h-6" />, label: 'Q4 2024 · Time-to-hire', num: '14', unit: 'd', sub: 'Median days from job-post to signed contract on Atlas, 2024', date: 'Nov 12, 2024', title: 'How fast is fast enough?', desc: 'We benchmarked our hire times against the rest of the industry. The numbers were uncomfortable for everyone except us.' },
  { id: 'q3-2024', tone: 'bg-lime text-ink border-lime/20', icon: <Globe className="w-6 h-6" />, label: 'Q3 2024 · Inaugural', num: '01', unit: '', sub: 'The first A-Player Report — defining the framework', date: 'Aug 5, 2024', title: 'What is an A-player, anyway?', desc: 'Our inaugural issue. We define the criteria, the methodology, and the bar — and explain why we measure what we measure.' },
]

export default function Reports() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Hero */}
      <section className="px-8 py-24 bg-cream border-b border-line">
        <div className="max-w-[1300px] mx-auto">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// A-Player Report</div>
          <h1 className="font-display text-6xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8 text-ink max-w-[900px]">Quarterly <span className="italic text-amber">data</span>, from a year of hiring&apos;s hardest problems.</h1>
          <p className="text-xl leading-relaxed text-ink-soft max-w-[800px]">Every quarter, the Atlas research team publishes a free data report on what we&apos;ve learned from processing 100k+ applications and running thousands of vetted hires. <strong className="text-ink font-semibold">No gated PDFs, no form walls.</strong></p>
          <div className="flex flex-wrap gap-8 items-center mt-12 font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">
            <span className="flex items-center gap-2"><span className="text-lime-deep">●</span> Quarterly</span>
            <span className="flex items-center gap-2"><span className="text-amber">●</span> Free · no signup required</span>
            <span className="flex items-center gap-2"><span className="opacity-30">●</span> Since Q3 2024</span>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-24 px-8">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="font-mono text-[11px] tracking-widest uppercase text-ink-mute font-bold italic">// Latest · Q4 2025</div>
            <div className="text-[11px] font-bold text-ink-mute uppercase tracking-widest">Published Nov 14, 2025 · 18 min read</div>
          </div>

          <article className="bg-paper border border-line rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] hover:border-ink transition-all shadow-sm group">
            <div className="p-10 md:p-16 flex flex-col gap-6">
              <div className="font-mono text-[11px] tracking-widest uppercase text-amber font-bold italic">{featured.quarter}</div>
              <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-ink leading-tight">{featured.title} <span className="italic text-amber">{featured.titleItalic}</span> {featured.titleEnd}</h2>
              <p className="text-lg leading-relaxed text-ink-soft">{featured.lead}</p>

              <ul className="flex flex-col gap-4 my-6">
                {featured.findings.map((f, i) => (
                  <li key={i} className="text-[15px] leading-relaxed text-ink-soft flex items-start gap-3">
                    <span className="text-lime-deep font-bold mt-1.5 leading-none">●</span>
                    <span><strong className="text-ink font-semibold">{f.bold}</strong> — {f.text}</span>
                  </li>
                ))}
              </ul>

              <Link href="#" className="bg-ink text-paper px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium w-fit mt-4">
                Read the full report
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
            </div>

            <div className="bg-ink text-paper p-12 flex flex-col justify-between aspect-[4/3] lg:aspect-auto relative overflow-hidden">
              <div className="font-mono text-[10px] tracking-widest uppercase text-paper/40 font-bold italic">Q4 2025 · Signature finding</div>
              <div>
                <div className="font-display text-[120px] leading-none font-normal tracking-tight text-paper">{featured.bigNum}<span className="text-4xl align-top mt-8 inline-block ml-1">{featured.unit}</span></div>
                <div className="text-sm leading-relaxed text-paper/60 max-w-[300px] mt-4">{featured.bigLabel}</div>
              </div>

              <div className="mt-12 h-[120px]">
                <svg width="100%" height="120" viewBox="0 0 360 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="rpCoverGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E8763A" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#E8763A" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="360" y2="30" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4"/>
                  <line x1="0" y1="60" x2="360" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4"/>
                  <line x1="0" y1="90" x2="360" y2="90" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4"/>
                  <path d="M 0 96 L 45 94 L 90 88 L 135 78 L 180 70 L 225 52 L 270 42 L 315 28 L 360 18 L 360 120 L 0 120 Z" fill="url(#rpCoverGrad)"/>
                  <path d="M 0 96 L 45 94 L 90 88 L 135 78 L 180 70 L 225 52 L 270 42 L 315 28 L 360 18" fill="none" stroke="#E8763A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <g fill="#E8763A">
                    <circle cx="0" cy="96" r="3"/>
                    <circle cx="90" cy="88" r="3"/>
                    <circle cx="180" cy="70" r="3"/>
                    <circle cx="270" cy="42" r="3"/>
                    <circle cx="360" cy="18" r="4" stroke="#FBF8F2" strokeWidth="2"/>
                  </g>
                  <g fontFamily="ui-monospace, monospace" fontSize="8" fill="#b5b1a7" letterSpacing="1">
                    <text x="0" y="115">Q4&apos;24</text>
                    <text x="90" y="115">Q1&apos;25</text>
                    <text x="180" y="115" textAnchor="middle">Q2&apos;25</text>
                    <text x="270" y="115" textAnchor="middle">Q3&apos;25</text>
                    <text x="360" y="115" textAnchor="end">Q4&apos;25</text>
                  </g>
                </svg>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Past reports grid */}
      <section className="py-24 px-8 bg-paper border-y border-line">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div className="font-mono text-[11px] tracking-widest uppercase text-ink-mute font-bold italic">// Previous issues</div>
            <div className="text-[11px] font-bold text-ink-mute uppercase tracking-widest">Newest first · 5 issues</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {pastReports.map(r => (
              <Link key={r.id} href="#" className="flex flex-col gap-8 group">
                <div className={`aspect-[4/3] rounded-[24px] p-8 flex flex-col justify-between overflow-hidden relative transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 border ${r.tone}`}>
                  <div className="flex justify-between items-start">
                    <div className="font-mono text-[10px] tracking-widest uppercase font-bold italic">{r.label}</div>
                    <div className="bg-paper/50 backdrop-blur rounded-lg p-2 border border-line/20">{r.icon}</div>
                  </div>
                  <div>
                    <div className="font-display text-6xl font-normal tracking-tight">{r.num}<span className="text-xl align-top mt-3 inline-block ml-1 uppercase">{r.unit}</span></div>
                    <div className="text-[11px] font-bold uppercase tracking-widest mt-4 opacity-70 leading-relaxed max-w-[200px]">{r.sub}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">
                    {r.label.split(' · ')[0]} <span className="text-amber mx-2">·</span> Published {r.date}
                  </div>
                  <h3 className="font-display text-2xl font-normal tracking-tight text-ink group-hover:text-amber transition-colors">{r.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft line-clamp-2">{r.desc}</p>
                  <span className="text-xs font-bold text-ink-mute group-hover:text-ink transition-colors flex items-center gap-2 pt-2">
                    Read report <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-24 px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-ink text-paper rounded-[40px] p-12 md:p-24 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(214,242,77,0.1),transparent_70%)]"></div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-paper/40 font-semibold mb-8 relative z-10">// Get the next one in your inbox</div>
            <h2 className="font-display text-4xl md:text-[64px] font-normal leading-[1.05] tracking-tight mb-8 text-paper relative z-10">One email a <span className="italic text-lime">quarter.</span><br />No marketing, just data.</h2>
            <p className="text-lg leading-relaxed text-paper/60 max-w-[600px] mb-12 relative z-10">We send the new report the morning it&apos;s published. That&apos;s it. No drip campaigns, no upsells, no &quot;you might also like&quot; emails.</p>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-[500px] relative z-10" onSubmit={e => { e.preventDefault(); alert('Thanks! You\'ll get the next report on launch day.') }}>
              <input 
                type="email" 
                className="bg-paper/10 border border-paper/20 rounded-full px-6 py-4 text-paper placeholder:text-paper/30 outline-none focus:border-lime transition-all flex-1" 
                placeholder="you@company.com" 
                required 
              />
              <button type="submit" className="bg-lime text-ink px-8 py-4 rounded-full font-bold hover:bg-white transition-all shadow-lg shadow-lime/20 whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
