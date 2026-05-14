import Link from 'next/link'

const benefits = [
  { num: '01', title: 'Keep 100% of your rate.', desc: 'Zero percent forever. No Connects to buy. No paid tier to get noticed. The client\'s 10% is on top of your quoted rate — never out of your pocket.' },
  { num: '02', title: 'Real clients. Real budgets.', desc: 'US, UK, Australia, and Canada-based companies. Verified payment methods. No anonymous job posters. No "exposure" gigs. Real money.' },
  { num: '03', title: 'A Talent Specialist who advocates for you.', desc: 'When you go live, you get assigned a real human who reviews your profile, helps you set rates, and represents you when things get tricky.' },
  { num: '04', title: 'Reputation that compounds.', desc: 'Once you\'re vetted, you\'re vetted. Every successful engagement adds to a verified track record that travels with you everywhere on Atlas.' },
]

const compare = [
  { name: 'Atlas', fee: '0% forever', noise: 'Pre-vetted only', support: 'Assigned specialist', highlight: true },
  { name: 'Upwork', fee: '10% + $15–80/mo Connects', noise: 'Open marketplace', support: 'Self-serve' },
  { name: 'Fiverr', fee: '20% of every gig', noise: 'Gig-level only', support: 'Self-serve' },
  { name: 'Toptal', fee: 'Opaque cut', noise: 'Hard to join', support: 'Per-engagement' },
]

const stats = [
  { val: '5.7%', label: 'Of applicants make it' },
  { val: '$78k', label: 'Median annual earnings · LATAM seniors' },
  { val: '18 days', label: 'Avg to first paid hour' },
  { val: '14 hrs', label: 'Avg time-to-reply from clients' },
]

const steps = [
  { num: '01', title: 'Apply free.', desc: '60 seconds. Email, role, region. No credit card, no upfront fee, ever.' },
  { num: '02', title: 'Get vetted.', desc: 'ID + English assessment + two interviews + Talent Specialist review. 7–14 days.' },
  { num: '03', title: 'Go live.', desc: 'Your Talent Specialist helps you build a profile + record video and voice intros.' },
  { num: '04', title: 'Get paid weekly.', desc: 'Via Wise, in 90+ currencies. Tax forms handled. No surprise deductions.' },
]

const testimonials = [
  { quote: "I doubled my rate in 14 months without changing what I do — just changed who I worked with. The vetting bar is brutal but worth it.", author: 'Diego R.', role: 'Full-stack engineer · Mexico', avatar: 'DR', color: 'bg-amber/10 text-amber' },
  { quote: "On other platforms I burned $40/mo on Connects to bid on stuff I never won. Here I just... do the work. And get paid.", author: 'Sofia M.', role: 'Brand designer · Argentina', avatar: 'SM', color: 'bg-lime text-ink' },
  { quote: "My Talent Specialist mediated a payment dispute in 4 days. Two years on Upwork I never got a real human. Not once.", author: 'Tomás A.', role: 'QA engineer · Chile', avatar: 'TA', color: 'bg-ink text-paper' },
]

const faqs = [
  { q: 'Why is candidate pricing 0%?', a: "Because we believe great work shouldn't be penalized. Our entire model is built on the client paying a single, transparent fee — never the candidate. That lets you quote a fair rate without padding it to absorb platform cuts." },
  { q: "Who's eligible to apply?", a: "Anyone 18+ with a laptop, working webcam, stable internet, and a government-issued ID. You'll also need professional English (C1 level or higher) since most of our clients are US/UK/AU/CA based." },
  { q: "What if I'm rejected?", a: "We tell you honestly which stage you didn't pass and why. You can reapply after 6 months — many candidates do, and pass the second time." },
  { q: 'Does this take work away from local clients?', a: 'No. You set your availability. Many candidates work with local clients off-platform and use Atlas for US/EU work in parallel. We just want a slice of the global work — not all of it.' },
  { q: 'Can I leave my profile up if I get a full-time job?', a: "Yes — you can pause your profile any time. Most A-players keep their profile live but mark themselves unavailable. That way you're ready for the next opportunity without re-applying." },
]

export default function ForCandidates() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="px-8 py-20 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// For candidates · applying to Atlas</div>
        <h1 className="font-display text-6xl md:text-8xl font-normal leading-tight tracking-tight mb-6 text-ink">Get paid <span className="italic text-amber">what you&apos;re worth.</span><br />Plus 10% from the client.</h1>
        <p className="text-lg leading-relaxed text-ink-soft max-w-[800px] mb-10">Zero fees from you, forever. Real clients in US, UK, AU, CA. A dedicated Talent Specialist who has your back. <strong className="text-ink font-semibold italic">If you can clear the vetting bar, this is the best deal in the global talent market.</strong></p>
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Link href="/apply" className="bg-ink text-paper px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium">
            Apply to join
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/how-it-works" className="border border-ink text-ink px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-ink hover:text-cream transition-all text-base font-medium">See vetting process</Link>
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

      {/* Benefits */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> Why apply
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Four reasons we&apos;re <span className="italic text-amber">different.</span></h2>
            <p className="text-base leading-relaxed text-ink-soft mt-4">Not &quot;great culture, free snacks.&quot; Real structural differences from every other platform you&apos;ve tried.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {benefits.map(b => (
              <div key={b.num} className="flex flex-col items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-lime text-ink flex items-center justify-center font-display text-2xl font-normal shrink-0">
                  {b.num}
                </div>
                <h3 className="font-display text-[26px] font-normal tracking-tight text-ink">{b.title}</h3>
                <p className="text-base leading-relaxed text-ink-soft">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-paper border-y border-line px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> The other platforms
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Why we&apos;re <span className="italic text-amber">structurally</span> better.</h2>
            <p className="text-base leading-relaxed text-ink-soft mt-4">How candidate-side economics actually compare across platforms.</p>
          </div>
          <div className="flex flex-col gap-3">
            {compare.map(c => (
              <div key={c.name} className={`grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_1fr] gap-4 p-6 border rounded-2xl items-center transition-all ${
                c.highlight ? 'bg-paper border-lime shadow-sm ring-1 ring-lime/20' : 'bg-cream border-line'
              }`}>
                <div className={`font-display text-[22px] font-normal tracking-tight ${c.highlight ? 'text-ink font-bold' : 'text-ink'}`}>{c.name}</div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-1">You pay</span>
                  <strong className="text-[15px] text-ink">{c.fee}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-1">Quality control</span>
                  <strong className="text-[15px] text-ink">{c.noise}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-1">Human support</span>
                  <strong className="text-[15px] text-ink">{c.support}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> The journey
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">From apply to <span className="italic text-amber">first paycheck.</span></h2>
            <p className="text-base leading-relaxed text-ink-soft mt-4">The <Link href="/how-it-works" className="text-amber border-b border-amber/30 hover:border-amber font-medium italic">full walkthrough</Link> has all 10 steps. Here&apos;s the gist.</p>
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
      <section className="py-24 bg-paper border-y border-line px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-16">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> Candidate voices
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">From the <span className="italic text-amber">other side</span> of the table.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 bg-cream border border-line rounded-2xl flex flex-col gap-6">
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
      <section className="py-24 px-8">
        <div className="max-w-[800px] mx-auto">
          <div className="max-w-[700px] mb-12 text-center mx-auto">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> Common questions
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">What candidates <span className="italic text-amber">always</span> ask.</h2>
          </div>
          <div className="flex flex-col gap-2">
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
      <section className="py-24 text-center px-8 bg-ink text-cream">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-5xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8">Think you can <span className="italic text-lime">clear the bar?</span></h2>
          <p className="text-lg leading-relaxed text-cream/80 mb-10">One application, free, 60 seconds. We&apos;ll tell you honestly whether you&apos;re a fit — and exactly which stage you fell at if you&apos;re not.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/apply" className="bg-lime text-ink px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-white transition-all text-base font-medium">
              Apply to join
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/talent-network" className="border border-cream text-cream px-7 py-4 rounded-full inline-flex items-center gap-2 hover:bg-cream hover:text-ink transition-all text-base font-medium">Or join talent network</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
