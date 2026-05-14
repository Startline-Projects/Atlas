'use client'

import Link from 'next/link'

const problems = [
  { num: '01', title: 'A flood of', titleItalic: 'unvetted', titleEnd: 'candidates.', desc: "Most platforms will show you thousands of profiles the second you sign up. They make money on volume, not quality. The result: clients spend more time filtering than hiring, and the good candidates hide in the noise.", stat: '1/3', label: 'Freelancers self-report overbilling', tone: 'danger' as const },
  { num: '02', title: 'AI makes interview cheating', titleItalic: 'trivial.', titleEnd: '', desc: 'Real-time AI tools whisper answers into earpieces, draft live code, paraphrase questions, and let unqualified candidates breeze through screens. Most platforms have no defense — they hire the cheaters and the clients pay the price.', stat: '74%', label: 'Of hiring managers report AI-aided fraud in 2025', tone: 'danger' as const },
  { num: '03', title: 'Talent gets', titleItalic: 'ghosted,', titleEnd: 'banned, underpaid.', desc: 'Candidates pay to bid, get ghosted, get banned for nebulous reasons, take whatever rate they can. The platforms extract more from the people doing the actual work than from the people writing the checks. It is upside down.', stat: '$15B', label: 'In candidate-side fees extracted globally in 2024', tone: 'danger' as const },
  { num: '04', title: 'Three opposite', titleItalic: 'bets', titleEnd: 'instead.', desc: "We bet that fewer-better wins. That humans must stay in the loop. That candidates should pay nothing. Three things every other platform got wrong — and the foundation of how Atlas works.", stat: '', label: '', tone: 'lime' as const },
]

const principles = [
  { title: 'Vetting over', italic: 'volume.', desc: "We'd rather show you 100 people you'd actually hire than 10,000 you have to filter through. 5.7% of applicants pass our funnel. The other 94.3% don't make it onto Atlas." },
  { title: 'Humans in the', italic: 'loop.', desc: "Every Atlas candidate is interviewed by a real person. Every shortlist is reviewed by a real person. AI assists — it never decides." },
  { title: 'Transparency', italic: 'both ways.', desc: "Candidates see who's looking at them. Clients see how candidates were scored. Reviews go both ways. There is no information asymmetry in this market." },
  { title: 'Talent pays', italic: 'nothing.', desc: "Zero percent forever. No Connects, no premium tier, no chunk of every hour. If you want to attract A-players, you don't extract from them." },
  { title: 'Zero tolerance for', italic: 'cheating.', desc: "We invest more in cheating detection than any platform in our category. AI-listening on calls, proctored assessments, identity continuity. If you cheat, you're gone." },
]

const founders = [
  { name: 'Mariana Costa', role: 'Co-founder, CEO', loc: 'São Paulo · Lima', quote: "I grew Laboratoria from 0 to 3,000 women in tech across LATAM. We placed graduates into Globant, Mercado Libre, IBM. Atlas is the next step: turning that pipeline into a transparent, global marketplace for the A-players we kept finding.", bio: ['Founded Laboratoria (Y Combinator W17) — placed 3,000+ women in tech jobs across LATAM', 'World Economic Forum Young Global Leader', 'BBC 100 Women 2018'] },
  { name: 'Tomás Pueyo', role: 'Co-founder, CTO', loc: 'Lisbon', quote: "I shipped products at Course Hero that were used by 30M students a month. Atlas is the engineering challenge I've wanted forever: build the scoring layer that makes hiring honest, fast, and scale-resistant.", bio: ['Former VP of Growth at Course Hero (Series A → IPO)', 'Stanford MBA · MS Computer Science', 'Wrote one of the most-shared COVID essays (40M+ reads)'] },
]

const stats = [
  { val: '5.7%', label: 'Of applicants pass our vetting' },
  { val: '$94M', label: 'In contracts processed in 2025' },
  { val: '47', label: 'Countries with verified talent' },
  { val: '4.9★', label: 'Average client rating, last 12 mo' },
  { val: '72 hrs', label: 'Average dispute resolution time' },
  { val: '14 days', label: 'Avg time to first hire (clients)' },
]

const values = [
  { num: '01', title: 'Talent is global. Opportunity should be too.', desc: "There is no relationship between where someone was born and how good they are. Our job is to make geography irrelevant to opportunity, while still respecting the people, currencies, and cultures involved." },
  { num: '02', title: "Trust is built. It isn't claimed.", desc: 'We verify identities, references, work histories, and scorecards. We do not take any of it on faith. Every claim on the platform is something we have checked — or we say so when we have not.' },
  { num: '03', title: 'Pricing should be impossible to misread.', desc: "10% from clients. 0% from candidates. Those numbers will never change, no matter how big we get. Anyone who is confused about our pricing is reading it wrong on purpose." },
  { num: '04', title: "If we wouldn't hire them, we won't list them.", desc: 'Every Atlas candidate must clear the same bar a senior engineer at our company would. No exceptions, no shortcuts, no pay-to-promote. The bar is the bar.' },
  { num: '05', title: 'Quiet beats loud.', desc: "We do not pop. We do not gamify. We do not send 'you might be missing out!' notifications. Atlas is a tool for serious work. The product should respect that." },
]

const timeline = [
  { year: '2023', title: 'Two founders, one Notion doc.', desc: "Mariana and Tomás sketch a global hiring product on a flight to Lisbon. The first principles document is 14 pages. Most of them survive intact." },
  { year: '2024', title: 'Quiet beta with 19 clients.', desc: "Onboard our first 200 candidates by hand. Build the vetting funnel. The first hires are made; the first dispute is mediated. The bar is set." },
  { year: '2025', title: 'Series A, 1,000 candidates.', desc: "Raised $14M from Sequoia, Founders Fund, and Y Combinator. Open to the public in March. Cross 1,000 verified candidates by October. Launch in 47 countries." },
  { year: '2026', title: 'Where we are now.', desc: "A team of 28 across 19 countries. $94M in contracts processed in the last 12 months. 5.7% acceptance rate. And honestly — just getting started." },
]

export default function About() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Hero */}
      <section className="px-8 py-20 max-w-[1340px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="max-w-[540px]">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-6">// About Atlas · est. 2023</div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[88px] font-normal leading-none tracking-tight mb-7">
              Talent is <span className="italic text-amber">global.</span><br />Opportunity should<br />be too.
            </h1>
            <p className="text-lg leading-relaxed text-ink-soft mb-8">
              We built the hiring platform we wished existed when we were running teams ourselves. <strong className="text-ink font-bold">Real vetting, real humans, no cheating, no markup.</strong> A small pool of A-players, not a flood of pretenders.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/how-it-works" className="bg-ink text-paper px-[18px] py-[10px] rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-sm font-medium">
                See how it works
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
              <a href="#ab-team" className="border border-ink text-ink px-[18px] py-[10px] rounded-full inline-flex items-center gap-2 hover:bg-ink hover:text-amber transition-all text-sm font-medium">Meet the team</a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative w-full aspect-square max-w-[460px]">
              {/* Globe Rings */}
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[84%] h-[84%] border border-ink rounded-full opacity-35"></div>
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-ink rounded-full opacity-25"></div>
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] h-[32%] border border-ink rounded-full opacity-20"></div>
              
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-lime border-2 border-ink rounded-full z-10 shadow-[0_0_0_8px_rgba(214,242,77,0.2)]"></div>
              
              {[
                { top: '32%', left: '18%', label: 'NEW YORK', big: true },
                { top: '60%', left: '24%', label: 'SÃO PAULO', big: true },
                { top: '30%', left: '58%', label: 'WARSAW', big: true },
                { top: '60%', left: '60%', label: 'NAIROBI', big: true },
                { top: '46%', left: '72%', label: 'DELHI', big: true },
                { top: '54%', left: '82%', label: 'MANILA', big: true },
                { top: '74%', left: '36%' },
                { top: '36%', left: '32%' },
                { top: '38%', left: '50%' },
                { top: '38%', left: '62%' },
                { top: '48%', left: '60%' },
                { top: '66%', left: '78%' },
              ].map((pin, i) => (
                <div key={i} className={`absolute w-2 h-2 bg-amber rounded-full -translate-x-1/2 -translate-y-1/2 ${pin.big ? 'w-2.5 h-2.5 shadow-[0_0_0_6px_rgba(232,118,58,0.18)]' : ''}`} style={{ top: pin.top, left: pin.left }}>
                  {pin.big && <span className="absolute -top-[22px] left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest font-bold text-ink-mute whitespace-nowrap">{pin.label}</span>}
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full max-w-[460px] font-mono text-[10px] tracking-[0.14em] font-bold text-ink-mute uppercase">
              <span>● TALENT · LIVE</span>
              <span>68 COUNTRIES</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="px-8 py-24 border-t border-line">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4 inline-flex items-center gap-2">
              <span className="text-amber">●</span> The state of the industry
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] font-normal leading-[1.05] tracking-tight mb-4.5 text-ink">
              Hiring is broken.<br />Especially <span className="italic text-amber">globally.</span>
            </h2>
            <p className="text-base leading-relaxed text-ink-soft">Every global talent platform we&apos;ve used — and we&apos;ve used most of them — suffers from the same three failure modes. The bar is in the basement. Here&apos;s what we saw, and what we do about it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problems.map(p => (
              <div key={p.num} className={`p-8 rounded-lg flex flex-col gap-3.5 border ${
                p.tone === 'danger' ? 'bg-[#c2412b]/5 border-[#c2412b]/25' : 'bg-lime border-lime-deep'
              }`}>
                <div className={`font-mono text-[11px] tracking-[0.12em] uppercase font-bold ${p.tone === 'danger' ? 'text-danger' : 'text-ink-mute'}`}>
                  ● Problem {p.num}
                </div>
                <h3 className="font-display text-2xl md:text-[30px] font-normal leading-tight tracking-tight text-ink">
                  {p.title} <span className={`italic ${p.tone === 'danger' ? 'text-danger' : 'text-amber'}`}>{p.titleItalic}</span> {p.titleEnd}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{p.desc}</p>
                {p.stat && (
                  <div className="mt-auto pt-4 border-t border-line border-opacity-20">
                    <div className={`font-display text-[40px] leading-none ${p.tone === 'danger' ? 'text-danger' : 'text-ink'}`}>{p.stat}</div>
                    <div className="font-mono text-[11px] tracking-tight text-ink-mute mt-1.5 font-semibold uppercase">{p.label}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-8 py-24 border-t border-line bg-paper">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Our principles
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] font-normal leading-[1.05] tracking-tight mb-4.5 text-ink">
              Five things we&apos;ll <span className="italic text-amber">always</span> do,<br />even when it&apos;s hard.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((p, i) => (
              <div key={i} className="flex flex-col gap-3 p-6 border-l-2 border-amber pl-[22px]">
                <div className="font-mono text-[11px] tracking-[0.14em] font-bold text-amber">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-display text-[26px] leading-tight tracking-tight text-ink">{p.title} <span className="italic text-amber">{p.italic}</span></h3>
                <p className="text-sm leading-relaxed text-ink-soft">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="px-8 py-24 border-t border-line">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Founders
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] font-normal leading-[1.05] tracking-tight mb-4.5 text-ink">
              Founders.<br /><span className="italic text-amber">In their own words.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-12">
            {founders.map((f, i) => (
              <div key={f.name} className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-start">
                <div className={`w-full h-80 rounded-lg flex items-center justify-center font-display text-[64px] font-normal text-white/80 tracking-tight ${
                  i === 0 ? 'bg-gradient-to-br from-[#2b6b6b] to-[#5fc4c4]' : 'bg-gradient-to-br from-[#6a4a8e] to-[#b08fd1]'
                }`} aria-hidden="true">
                  {f.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-display text-[32px] font-normal tracking-tight mb-1 text-ink">{f.name}</h3>
                  <div className="font-display italic text-[17px] text-amber mb-5">{f.role} · {f.loc}</div>
                  <blockquote className="font-display italic text-xl leading-relaxed text-ink m-0 pl-3.5 border-l-[3px] border-amber mb-6">“{f.quote}”</blockquote>
                  <ul className="list-none p-0 m-0 flex flex-col gap-2">
                    {f.bio.map((b, j) => (
                      <li key={j} className="text-sm text-ink-soft pl-4.5 relative leading-normal before:content-['→'] before:absolute before:left-0 before:text-amber before:font-bold">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats (Dark Section) */}
      <section className="px-8 py-24 border-t border-ink bg-ink text-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-lime font-semibold mb-4 inline-flex items-center gap-2">
              <span>●</span> By the numbers
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] font-normal leading-[1.05] tracking-tight mb-4.5 text-cream">
              What we&apos;ve <span className="italic text-amber">actually</span> built.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {stats.map((s, i) => (
              <div key={i} className="p-8 bg-lime/5 border border-lime/20 rounded-lg">
                <div className="font-display text-[56px] leading-none text-lime mb-3 tracking-tight">{s.val}</div>
                <div className="text-sm text-cream opacity-85 leading-normal uppercase font-mono tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-8 py-24 border-t border-line">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[800px] mx-auto text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4 inline-flex items-center gap-2">
              <span className="text-amber">●</span> What we believe
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] font-normal leading-[1.05] tracking-tight mb-4.5 text-ink">
              Five beliefs <span className="italic text-amber">baked in.</span>
            </h2>
          </div>
          <div className="flex flex-col max-w-[900px] mx-auto">
            {values.map((v, i) => (
              <div key={v.num} className={`grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8 py-8 ${i !== values.length - 1 ? 'border-b border-line' : ''}`}>
                <div className="font-display italic text-[56px] font-normal leading-none text-amber tracking-tight">{v.num}</div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="font-display text-[26px] font-normal leading-tight tracking-tight text-ink">{v.title}</h3>
                  <p className="text-base leading-relaxed text-ink-soft">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTAs */}
      <section className="px-8 py-24 border-t border-line">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-8 bg-paper border border-line rounded-lg">
              <h3 className="font-display text-2xl font-normal leading-tight tracking-tight mb-3 text-ink">Press &amp; <span className="italic text-amber">media.</span></h3>
              <p className="text-sm leading-relaxed text-ink-soft mb-4.5">For press inquiries, founder interviews, or asset requests.</p>
              <a href="mailto:press@atlas.com" className="font-display italic text-[17px] text-amber hover:translate-x-1 transition-transform inline-block">press@atlas.com →</a>
            </div>
            <div className="p-8 bg-paper border border-line rounded-lg">
              <h3 className="font-display text-2xl font-normal leading-tight tracking-tight mb-3 text-ink">Partnerships &amp;<br /><span className="italic text-amber">integrations.</span></h3>
              <p className="text-sm leading-relaxed text-ink-soft mb-4.5">Looking to build something together? We&apos;re open to it.</p>
              <a href="mailto:partners@atlas.com" className="font-display italic text-[17px] text-amber hover:translate-x-1 transition-transform inline-block">partners@atlas.com →</a>
            </div>
            <div className="p-8 bg-paper border border-line rounded-lg">
              <h3 className="font-display text-2xl font-normal leading-tight tracking-tight mb-3 text-ink">General <span className="italic text-amber">questions.</span></h3>
              <p className="text-sm leading-relaxed text-ink-soft mb-4.5">Everything else, including support, suggestions, and feedback.</p>
              <Link href="/contact" className="font-display italic text-[17px] text-amber hover:translate-x-1 transition-transform inline-block">Visit contact →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
