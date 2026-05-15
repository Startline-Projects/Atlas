import Link from 'next/link'
import { ArrowRight, Globe, Users, Zap, Briefcase, GraduationCap, Heart, Gift, MessageSquare, ChevronDown } from 'lucide-react'

const reasons = [
  { num: '01', title: 'The mission is', italic: 'actually', titleEnd: 'real.', body: "Global hiring is genuinely broken — not in a 'pitch deck problem' way, in a 'we saw it from the inside for a decade and got burned by it' way. You'll be building toward an actual fix, not an incremental feature on top of someone else's broken marketplace.", tag: '● 2,699 lives changed · and counting' },
  { num: '02', title: "You'll work with", italic: 'actual', titleEnd: 'A-players.', body: 'Every single person on this team passes through the same vetting funnel our platform applies. No exceptions. That means you get to work alongside people who are unambiguously good at what they do.', tag: '● 100% of team is vetted A-player' },
  { num: '03', title: 'Remote-first.', italic: 'Globally', titleEnd: 'distributed.', body: 'We are 28 people across 19 countries. We have never had an office, and we never will. Async-first communication, deep work culture, no commute. Travel together as a team twice a year.', tag: '● 19 countries · 6 timezones' },
  { num: '04', title: 'Transparent', italic: 'everything.', titleEnd: '', body: 'Salary bands are public internally. Equity grants are formulaic. Decisions are documented. Strategy is shared monthly. If you have to ask why something is happening, our culture is failing.', tag: '● All salaries public internally' },
  { num: '05', title: 'We', italic: 'actually', titleEnd: 'invest in you.', body: 'Annual $2,500 learning budget, real time off (4+ weeks expected), parental leave, top-of-market gear stipend, real health insurance regardless of country. Not the perfunctory startup version of these things.', tag: '● $2,500/yr learning · top-tier health' },
  { num: '06', title: 'Build something', italic: 'that compounds.', titleEnd: '', body: 'Every line of code, every process, every relationship you build here makes the platform more valuable for the next year. Not throwaway sprint work. Things that get used and built on for a long time.', tag: '● 100M+ rows of structured data and growing' },
]

const roles = [
  { slug: 'senior-fullstack-engineer', dept: 'Engineering', title: 'Senior Full-Stack Engineer', loc: 'Remote · global', salary: '$140–180k', tone: 'bg-amber/10 text-amber' },
  { slug: 'brand-designer', dept: 'Design', title: 'Brand Designer', loc: 'Remote · EU/LATAM', salary: '$90–130k', tone: 'bg-lime text-ink' },
  { slug: 'talent-specialist', dept: 'Operations', title: 'Talent Specialist #12', loc: 'Remote · any', salary: '$75–110k', tone: 'bg-cream text-ink' },
  { slug: 'staff-engineer-platform', dept: 'Engineering', title: 'Staff Engineer, Platform', loc: 'Remote · global', salary: '$200–260k', tone: 'bg-amber/10 text-amber' },
  { slug: 'product-designer', dept: 'Design', title: 'Senior Product Designer', loc: 'Remote · EU/LATAM', salary: '$120–160k', tone: 'bg-lime text-ink' },
  { slug: 'head-of-content', dept: 'Marketing', title: 'Head of Content', loc: 'Remote · US/EU', salary: '$130–170k', tone: 'bg-cream text-ink' },
  { slug: 'devops-engineer', dept: 'Engineering', title: 'DevOps Engineer', loc: 'Remote · global', salary: '$120–160k', tone: 'bg-amber/10 text-amber' },
  { slug: 'recruiter-tech', dept: 'Operations', title: 'Technical Recruiter', loc: 'Remote · any', salary: '$80–115k', tone: 'bg-cream text-ink' },
]

const steps = [
  { num: '01', title: 'Apply.', desc: 'One-page application. No cover letter required. Takes 10 minutes if you have your portfolio handy.' },
  { num: '02', title: 'Intro call.', desc: '30 min with a hiring manager. We learn about you; you ask anything. No coding, no homework.' },
  { num: '03', title: 'Take-home or pair.', desc: '4-hour paid take-home or a 90-minute live pair. Your choice. Real work, scoped tight.' },
  { num: '04', title: 'Team conversations.', desc: 'Three 45-min chats with potential teammates. Real conversations, not interrogations.' },
  { num: '05', title: 'Offer.', desc: 'Within 48 hours of step 4. Salary, equity, start date, references — all transparent up front.' },
]

const benefits = [
  { val: '$2.5k', label: 'Annual learning budget', icon: <GraduationCap className="w-5 h-5" /> },
  { val: '4+ wk', label: 'Real PTO expected', icon: <Heart className="w-5 h-5" /> },
  { val: '16 wk', label: 'Parental leave', icon: <Users className="w-5 h-5" /> },
  { val: '$3k', label: 'Gear stipend', icon: <Gift className="w-5 h-5" /> },
  { val: '100%', label: 'Health insurance', icon: <Zap className="w-5 h-5" /> },
  { val: '2×/yr', label: 'Team offsites', icon: <Globe className="w-5 h-5" /> },
]

const faqs = [
  { q: 'Are you really fully remote?', a: 'Yes. We have no office and no plans to ever have one. The team is in 19 countries. Most communication is async. We meet in person twice a year for offsites.' },
  { q: 'Do I have to be in a specific timezone?', a: 'For most roles, no. Some require US or EU overlap — that\'ll be flagged on the role itself. As a rule, we aim for 4 hours of overlap with your manager and immediate team.' },
  { q: "What's your engineering stack?", a: "TypeScript everywhere. Next.js front-end, Node/Postgres back-end, Stripe for payments, Wise for payouts. Deployed on Vercel + Render. Almost everything else is built in-house." },
  { q: 'Do you sponsor visas?', a: 'No — we hire as contractors or via local employer-of-record (Deel, Remote.com). You stay where you are; we handle the legal/tax side.' },
  { q: "Is the salary range honest?", a: 'Yes. The range posted is what we actually pay for that role. No "depending on experience" surprise. We adjust by country cost-of-living transparently and the bands are public internally.' },
]

export default function Careers() {
  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Hero */}
      <section className="px-8 py-24 bg-cream border-b border-line overflow-hidden pt-36">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div className="flex flex-col items-start">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// Careers · we&apos;re hiring</div>
            <h1 className="font-display text-6xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8 text-ink">Help us build the<br />hiring platform every<br />company will <span className="italic text-amber underline underline-offset-8 decoration-amber/30">eventually use.</span></h1>
            <p className="text-xl leading-relaxed text-ink-soft max-w-[700px] mb-12">We apply the same vetting bar to our team that our platform applies to every candidate on it. <strong className="text-ink font-semibold">Small team, high ownership, remote anywhere.</strong> If you&apos;ve built something people still use years after you left, we probably want to talk.</p>
            <div className="flex flex-wrap gap-4 mb-14">
              <a href="#cr-roles" className="bg-ink text-paper px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-black transition-all text-base font-medium shadow-lg">
                See open roles
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
              <Link href="/talent-network" className="border border-line text-ink px-8 py-4 rounded-full inline-flex items-center gap-2 hover:bg-cream transition-all text-base font-medium">Join talent network</Link>
            </div>
            <div className="flex flex-wrap gap-12 w-full">
              <div className="flex flex-col">
                <div className="font-display text-4xl md:text-5xl font-normal text-ink">28</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mt-1">Team members</div>
              </div>
              <div className="flex flex-col">
                <div className="font-display text-4xl md:text-5xl font-normal text-ink">19</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mt-1">Countries</div>
              </div>
              <div className="flex flex-col">
                <div className="font-display text-4xl md:text-5xl font-normal text-ink">8<span className="italic text-amber"> roles</span></div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mt-1">Open right now</div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] w-full hidden lg:block">
            <div className="absolute top-0 right-0 z-10 bg-paper border border-line rounded-2xl p-6 shadow-2xl w-[320px] transition-all hover:border-ink hover:-translate-y-1 group">
               <div className="font-mono text-[10px] font-bold text-lime-deep mb-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-lime"></span> DESIGN</div>
               <div className="font-display text-xl font-medium text-ink mb-3 group-hover:text-amber">Brand Designer</div>
               <div className="flex justify-between items-center text-xs text-ink-mute font-bold uppercase tracking-tight">
                  <span>Remote · EU/LATAM</span>
                  <span className="text-ink">$90–130k</span>
               </div>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-20 bg-paper border border-line rounded-2xl p-7 shadow-2xl w-[340px] transition-all hover:border-ink hover:-translate-y-1 group scale-110">
               <div className="font-mono text-[10px] font-bold text-amber mb-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber"></span> ENGINEERING</div>
               <div className="font-display text-2xl font-medium text-ink mb-4 group-hover:text-amber leading-tight">Senior Full-Stack<br />Engineer</div>
               <div className="flex justify-between items-center text-[11px] text-ink-mute font-bold uppercase tracking-tight">
                  <span>Remote · global</span>
                  <span className="text-ink">$140–180k</span>
               </div>
            </div>
            <div className="absolute bottom-0 right-10 z-10 bg-paper border border-line rounded-2xl p-6 shadow-2xl w-[320px] transition-all hover:border-ink hover:-translate-y-1 group">
               <div className="font-mono text-[10px] font-bold text-ink-mute mb-2 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-line"></span> OPERATIONS</div>
               <div className="font-display text-xl font-medium text-ink mb-3 group-hover:text-amber">Talent Specialist #12</div>
               <div className="flex justify-between items-center text-xs text-ink-mute font-bold uppercase tracking-tight">
                  <span>Remote · any</span>
                  <span className="text-ink">$75–110k</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-20">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Why work here
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Six honest reasons.<br />Not <span className="italic text-amber">eight</span>. Not <span className="italic text-amber">fifteen</span>.</h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">Most careers pages have a &quot;10 reasons to work here&quot; list padded with things like &quot;great snacks.&quot; We&apos;ve got six. They&apos;re real.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map(r => (
              <div key={r.num} className="p-10 bg-paper border border-line rounded-[32px] flex flex-col gap-6 group hover:border-ink transition-all shadow-sm">
                <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold italic">Reason {r.num}</div>
                <h3 className="font-display text-3xl font-normal tracking-tight text-ink leading-tight">{r.title} <span className="italic text-amber">{r.italic}</span> {r.titleEnd}</h3>
                <p className="text-base leading-relaxed text-ink-soft">{r.body}</p>
                <div className="mt-auto pt-6 border-t border-line/50 text-[10px] font-bold text-amber uppercase tracking-widest italic">{r.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-24 px-8 bg-paper border-y border-line" id="cr-roles">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[700px] mb-20 text-center mx-auto">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> Open roles
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">What we&apos;re <span className="italic text-amber">hiring for</span>.</h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">Eight roles open right now. All remote, all full-time, all with published salary ranges.</p>
          </div>
          <div className="flex flex-col gap-3">
            {roles.map(r => (
              <Link key={r.slug} href="#" className="bg-cream border border-line rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-ink transition-all group hover:shadow-xl hover:-translate-y-1">
                <div className="flex flex-col gap-4">
                  <div className={`w-fit px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase italic ${r.tone}`}>{r.dept}</div>
                  <h3 className="font-display text-2xl font-normal tracking-tight text-ink group-hover:text-amber transition-colors">{r.title}</h3>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <div className="text-[13px] font-bold text-ink-mute uppercase tracking-widest">{r.loc}</div>
                  <div className="font-display text-2xl font-medium text-ink tracking-tight">{r.salary}</div>
                </div>
                <div className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-ink-mute group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all hidden md:flex">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-20">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-amber">●</span> Hiring process
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Five steps.<br />Typically <span className="italic text-amber">2–3 weeks</span> start to finish.</h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">No coding gauntlet, no take-home marathons, no whiteboarding ghosts of 2015 past.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {steps.map(p => (
              <div key={p.num} className="flex flex-col gap-6 relative">
                <div className="w-14 h-14 rounded-full bg-ink text-paper flex items-center justify-center font-display text-2xl font-normal shadow-xl group-hover:scale-110 transition-transform">{p.num}</div>
                <h3 className="font-display text-2xl font-normal tracking-tight text-ink leading-tight pt-2">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-8 bg-paper border-y border-line">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[700px] mb-20 text-center mx-auto">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3.5 inline-flex items-center gap-2">
              <span className="text-lime">●</span> Benefits
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">With <span className="italic text-amber">actual numbers</span>.</h2>
            <p className="text-lg leading-relaxed text-ink-soft mt-4">Real benefits, with the real values. Not &quot;competitive&quot; or &quot;market-rate&quot; — what we actually offer.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="flex flex-col gap-4 items-center text-center p-8 bg-cream border border-line rounded-[24px] hover:border-ink transition-all group">
                <div className="w-12 h-12 rounded-xl bg-paper border border-line flex items-center justify-center text-ink-soft group-hover:bg-ink group-hover:text-paper transition-all">
                  {b.icon}
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="font-display text-3xl font-medium text-ink">{b.val}</div>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-ink-mute font-bold">{b.label}</div>
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
              <span className="text-amber">●</span> FAQ
            </div>
            <h2 className="font-display text-4xl md:text-[56px] font-normal leading-[1.05] tracking-tight text-ink">Common <span className="italic text-amber">questions.</span></h2>
          </div>
          <div className="flex flex-col gap-2">
            {faqs.map((f, i) => (
              <details key={i} className="bg-paper border border-line rounded-xl overflow-hidden transition-all group open:border-ink">
                <summary className="p-[20px_24px] pr-12 font-display text-lg font-medium text-ink cursor-pointer list-none relative after:content-['+'] after:absolute after:right-[24px] after:top-1/2 after:-translate-y-1/2 after:text-2xl after:text-ink-mute after:font-light after:transition-transform group-open:after:rotate-45 group-open:after:text-ink select-none">
                  {f.q}
                </summary>
                <div className="p-[0_24px_24px] text-[15px] leading-relaxed text-ink-soft">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 text-center bg-ink text-paper">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-display text-5xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8">Don&apos;t see a role?<br /><span className="italic text-lime">Still tell us.</span></h2>
          <p className="text-lg leading-relaxed text-paper/70 mb-12">If we&apos;re not actively hiring for what you do, but you&apos;d be a great fit eventually, join our talent network. We reach out personally when something opens up.</p>
          <Link href="/talent-network" className="bg-lime text-ink px-10 py-5 rounded-full inline-flex items-center gap-3 hover:bg-white transition-all text-lg font-bold shadow-xl shadow-lime/20">
            Join talent network
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </Link>
        </div>
      </section>
    </div>
  )
}
