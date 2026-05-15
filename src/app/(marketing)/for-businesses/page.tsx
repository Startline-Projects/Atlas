import Link from 'next/link'

const problems = [
  { icon: '○', title: "You're drowning in unvetted résumés.", desc: "Every platform throws thousands of profiles at you. You spend more time filtering than hiring. The good candidates hide in the noise." },
  { icon: '○', title: 'AI cheating is everywhere.', desc: 'Candidates use AI to fake interviews, fake portfolios, even fake their identity. Most platforms have no defense.' },
  { icon: '○', title: 'Hidden markups eat your budget.', desc: '"Premium" tiers, 2× rate inflation, mystery fees on top of mystery fees. You never quite know what you\'re paying for.' },
  { icon: '○', title: 'No accountability when it breaks.', desc: "If a hire ghosts you, defrauds you, or just doesn't deliver — most platforms hide behind ticket queues. You're on your own." },
]

const solutions = [
  { tag: 'Vetted A-players only', desc: '5.7% acceptance rate. Multi-stage vetting: ID + liveness, English assessment, role-specific interview, Talent Specialist review. Most applicants never make it onto Atlas.' },
  { tag: 'Real humans, not algorithms', desc: 'Every shortlist is reviewed by a real Talent Specialist. Every dispute is mediated by a real human. AI assists — it never decides who you see.' },
  { tag: 'Flat 10%, always', desc: 'Ten percent on top of the candidate\'s rate. That\'s our entire fee. No tiers, no Connects, no per-seat charges, no annual minimums.' },
  { tag: '14-day replacement guarantee', desc: "If the fit isn't right in the first two weeks, we replace your hire for free. Your Talent Specialist mediates anything that goes sideways." },
]

const differentiators = [
  { name: 'Atlas', fee: '10% flat', vet: 'Yes — 5.7% pass', humans: 'Yes — assigned to you', highlight: true },
  { name: 'Upwork', fee: '~10% + Connects', vet: 'None', humans: 'No — self-serve' },
  { name: 'Fiverr', fee: '~25% combined', vet: 'Gig-level only', humans: 'No — self-serve' },
  { name: 'Toptal', fee: 'Hidden 2× markup', vet: 'Varies', humans: 'Per-engagement' },
]

const stats = [
  { val: '5.7%', label: 'Applicant acceptance rate' },
  { val: '3–5 days', label: 'Avg time to first hire' },
  { val: '47', label: 'Countries with verified talent' },
  { val: '$0', label: 'Setup, posting, or seat fees' },
]

const steps = [
  { num: '01', title: 'Browse freely.', desc: 'No signup required. Search every candidate, see scorecards, watch intros.' },
  { num: '02', title: 'Sign up free.', desc: '30 seconds. No credit card. Unlimited messaging, unlimited job posts.' },
  { num: '03', title: 'Get a shortlist.', desc: 'Post a role; your Talent Specialist sends 3–5 hand-picked candidates within 24 hours.' },
  { num: '04', title: 'Interview, contract, hire.', desc: 'In-platform video calls, auto-generated contracts, weekly payouts.' },
]

const testimonials = [
  { quote: "Three hires in two months — all still with us a year later. That's never happened with any other platform I've used.", author: 'Sara Lee', role: 'Head of Engineering, Caldera', avatar: 'SL', color: 'bg-amber/10 text-amber' },
  { quote: "The shortlist quality is the differentiator. I get 4 candidates and at least 3 of them are interview-worthy. On Upwork I'd filter 80 to get one.", author: 'Marcus Reed', role: 'Founder, Briefly Inc.', avatar: 'MR', color: 'bg-lime text-ink' },
  { quote: "What I pay matches what I see. No hidden 30% markup, no padded hours. It's the only marketplace where the price is the price.", author: 'Aditi Kumar', role: 'COO, Lockstep Partners', avatar: 'AK', color: 'bg-ink text-paper' },
]

const faqs = [
  { q: 'How is this different from Upwork or Fiverr?', a: "Atlas pre-vets every candidate (5.7% acceptance rate). Upwork and Fiverr are open marketplaces — anyone can sign up. We're closer to Toptal, except our pricing is transparent (10% flat) and we don't add a 2× markup." },
  { q: 'What if my hire doesn\'t work out?', a: 'We have a 14-day replacement guarantee — if the fit isn\'t right, we find you another candidate at no charge. Beyond that, your Talent Specialist mediates any dispute.' },
  { q: 'Do I need to commit upfront?', a: 'No. Browsing is free, signup is free, messaging is free, posting a job is free. You only pay when you hire someone, and you can cancel any engagement anytime.' },
  { q: 'How quickly can I hire?', a: 'The average time from job post to signed contract on Atlas is 3–5 days. Talent Specialists send your shortlist within 24 hours; interview and offer usually wraps in 1–2 weeks.' },
  { q: 'Where are your candidates?', a: 'Latin America, Southeast Asia, Eastern Europe, and Africa. We focus on regions with strong English (C1+), high skill density, and timezone overlap with US/EU clients.' },
]

export default function ForBusinesses() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="px-8 py-20 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// For businesses · hiring on Atlas</div>
        <h1 className="font-display text-6xl md:text-8xl font-normal leading-tight tracking-tight mb-6 text-ink">Hire <span className="italic text-amber">A-players.</span><br />Not résumé piles.</h1>
        <p className="text-lg leading-relaxed text-ink-soft max-w-[800px] mb-10">Pre-vetted talent from 47 countries, hand-picked shortlists in 24 hours, flat 10% pricing, and a real human Talent Specialist who has your back. <strong className="text-ink">You only pay when you hire.</strong></p>
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Link href="/find-talent" className="bg-ink text-paper px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium">
            Browse talent now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/pricing" className="border border-ink text-ink px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-ink hover:text-cream transition-all text-base font-medium">See pricing</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[900px] py-8 border-y border-line">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="font-display text-3xl md:text-[44px] font-normal leading-none text-ink tracking-tight">{s.val}</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute mt-2 font-semibold text-center">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problems */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> The problem
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Hiring globally is <span className="italic text-amber">a mess.</span><br />We can name your pain.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {problems.map((p, i) => (
              <div key={i} className="flex flex-col items-start gap-4">
                <div className="font-display italic text-[56px] font-normal leading-none text-amber/20">0{i + 1}</div>
                <h3 className="font-display text-[26px] font-normal tracking-tight text-ink">{p.title}</h3>
                <p className="text-base leading-relaxed text-ink-soft">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 bg-paper border-y border-line px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> What we do differently
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Four <span className="italic text-amber">structural</span> fixes.</h2>
            <p className="text-base leading-relaxed text-ink-soft mt-4">None of these are features. They&apos;re the foundation of how Atlas works.</p>
          </div>
          <div className="flex flex-col gap-10 max-w-[900px]">
            {solutions.map((s, i) => (
              <div key={i} className="grid grid-cols-[64px_1fr] gap-8 items-start">
                <div className="w-16 h-16 rounded-full bg-ink text-lime flex items-center justify-center font-display text-2xl font-normal shrink-0">0{i + 1}</div>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="font-display text-2xl font-normal tracking-tight text-ink">{s.tag}</h3>
                  <p className="text-base leading-relaxed text-ink-soft">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> How we stack up
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">The short version.</h2>
            <p className="text-base leading-relaxed text-ink-soft mt-4">The longer comparison lives on the <Link href="/pricing" className="text-amber border-b border-amber/30 hover:border-amber font-medium italic">pricing page</Link>. Here&apos;s the gist.</p>
          </div>
          <div className="flex flex-col gap-3">
            {differentiators.map(d => (
              <div key={d.name} className={`grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_1fr] gap-4 p-6 border rounded-2xl items-center transition-all ${
                d.highlight ? 'bg-paper border-amber shadow-sm ring-1 ring-amber/20' : 'bg-cream border-line'
              }`}>
                <div className={`font-display text-[22px] font-normal tracking-tight ${d.highlight ? 'text-amber font-bold' : 'text-ink'}`}>{d.name}</div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-1">Fee</span>
                  <strong className="text-[15px] text-ink">{d.fee}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-1">Vetting</span>
                  <strong className="text-[15px] text-ink">{d.vet}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-1">Talent specialist</span>
                  <strong className="text-[15px] text-ink">{d.humans}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-paper border-y border-line px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Hiring on Atlas
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Four steps to a hire.</h2>
            <p className="text-base leading-relaxed text-ink-soft mt-4">The <Link href="/how-it-works" className="text-amber border-b border-amber/30 hover:border-amber font-medium italic">full walkthrough</Link> is 10 steps. Here&apos;s the condensed version.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(s => (
              <div key={s.num} className="flex flex-col gap-4">
                <div className="font-display italic text-[56px] font-normal leading-none text-amber/20">{s.num}</div>
                <h3 className="font-display text-2xl font-normal tracking-tight text-ink">{s.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> What clients say
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Real <span className="italic text-amber">clients,</span> real hires.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-paper border border-line rounded-2xl flex flex-col gap-6">
                <blockquote className="text-lg leading-relaxed text-ink-soft italic">“{t.quote}”</blockquote>
                <div className="flex items-center gap-3.5 pt-6 border-t border-line mt-auto">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-display text-lg font-bold shrink-0 ${t.color}`}>{t.avatar}</div>
                  <div>
                    <div className="font-display text-[17px] font-medium text-ink">{t.author}</div>
                    <div className="text-xs text-ink-mute">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-paper border-y border-line px-8">
        <div className="max-w-[800px] mx-auto">
          <div className="max-w-[700px] mb-12 text-center mx-auto">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Common questions
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Things people <span className="italic text-amber">always</span> ask.</h2>
          </div>
          <div className="flex flex-col gap-2">
            {faqs.map((f, i) => (
              <details key={i} className="bg-cream border border-line rounded-lg overflow-hidden transition-all group open:border-ink">
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
      <section className="py-24 text-center px-8 bg-ink text-cream">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-5xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8">Browse <span className="italic text-lime">free.</span><br />Pay only when you hire.</h2>
          <p className="text-lg leading-relaxed text-cream/80 mb-10">No credit card required. No setup fees. No commitments. See every candidate before you create an account.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/find-talent" className="bg-lime text-ink px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-white transition-all text-base font-medium">
              Browse talent
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/contact" className="border border-cream text-cream px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-cream hover:text-ink transition-all text-base font-medium">Talk to a specialist</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
