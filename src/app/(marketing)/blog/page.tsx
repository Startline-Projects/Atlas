'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, Mail, ArrowRight, X } from 'lucide-react'

type Article = {
  id: string
  cat: string
  catLabel: string
  role?: string
  tone: string
  mark: React.ReactNode
  title: string
  excerpt: string
  author: string
  initials: string
  authorTone: string
  date: string
  read: string
}

const articles: Article[] = [
  { id: 'hire-bookkeeper', cat: 'hiring-guides', catLabel: 'Hiring Guides', role: 'bookkeeper', tone: 'bg-amber/10 text-amber', mark: <><span className="text-amber">$</span><em>k</em></>, title: 'How to hire a bookkeeper who actually understands your business.', excerpt: "Most small businesses hire their first bookkeeper too late and the wrong kind. Here's the decision tree.", author: 'Marcus Holt', initials: 'MH', authorTone: 'bg-amber/10 text-amber', date: 'Nov 11', read: '9 min' },
  { id: 'c1-english', cat: 'remote-work', catLabel: 'Remote Work', tone: 'bg-paper text-ink', mark: <><em>C1</em><span className="text-amber">+</span></>, title: 'What C1 English actually means for async-first hiring.', excerpt: 'CEFR levels are a great vocabulary for everything CEFR was never meant to test.', author: 'Priya Raman', initials: 'PR', authorTone: 'bg-lime text-ink', date: 'Nov 7', read: '7 min' },
  { id: 'remote-rituals', cat: 'remote-work', catLabel: 'Remote Work', tone: 'bg-ink text-paper', mark: <em>↺</em>, title: 'Seven async rituals that keep distributed teams shipping.', excerpt: 'The teams that actually pull off async-first work share a small set of habits. Here they are.', author: 'Sofia Mendoza', initials: 'SM', authorTone: 'bg-ink text-paper border border-line', date: 'Nov 3', read: '11 min' },
  { id: 'salary-2026', cat: 'salary-benchmarks', catLabel: 'Salary Benchmarks', tone: 'bg-lime text-ink', mark: <>$<em>26</em>/h</>, title: 'Global senior dev rates: a 2026 benchmark, region by region.', excerpt: 'Real rates from 1,400 vetted devs, broken down by region, stack, and seniority. No survey bias.', author: 'Tomás Pueyo', initials: 'TP', authorTone: 'bg-amber/10 text-amber', date: 'Oct 28', read: '14 min' },
  { id: 'spotlight-valentina', cat: 'a-player-spotlight', catLabel: 'A-Player Spotlight', tone: 'bg-amber/10 text-amber', mark: <em>★</em>, title: "An A-Player's playbook: how Valentina built her practice in 18 months.", excerpt: 'From freelance Webflow gigs to $80k/yr on Atlas. The decisions, the rate jumps, the lessons.', author: 'Editorial', initials: 'ED', authorTone: 'bg-cream text-ink', date: 'Oct 22', read: '8 min' },
  { id: 'hire-va', cat: 'hiring-guides', catLabel: 'Hiring Guides', role: 'va', tone: 'bg-paper text-ink', mark: <>VA<br /><span className="text-lime-deep font-bold">2.0</span></>, title: 'The complete guide to hiring a virtual assistant in 2026.', excerpt: "Pricing, sourcing, vetting, and working with a VA who actually moves the needle — not one you have to babysit.", author: 'Priya Raman', initials: 'PR', authorTone: 'bg-lime text-ink', date: 'Oct 17', read: '12 min' },
  { id: 'candidate-rates', cat: 'candidate-tips', catLabel: 'Candidate Tips', tone: 'bg-ink text-paper', mark: <>×<em>2</em></>, title: "Doubling your rate as a candidate: a slow honest framework.", excerpt: "Not a 'charge what you're worth' rant. A calmer, slower way to step up — without scaring off clients.", author: 'Mariana Costa', initials: 'MC', authorTone: 'bg-lime text-ink', date: 'Oct 10', read: '10 min' },
  { id: 'ai-interviews', cat: 'industry-insights', catLabel: 'Industry Insights', tone: 'bg-amber/10 text-amber', mark: <>AI<br /><span className="text-lime-deep font-bold">?</span></>, title: 'AI cheating in interviews: what we caught, what we missed.', excerpt: 'Three quarters of data on AI-assisted interview fraud. Patterns, detection rates, and an honest accounting.', author: 'Tomás Pueyo', initials: 'TP', authorTone: 'bg-amber/10 text-amber', date: 'Oct 1', read: '15 min' },
  { id: 'hire-designer', cat: 'hiring-guides', catLabel: 'Hiring Guides', role: 'designer', tone: 'bg-lime text-ink', mark: <em>◢</em>, title: 'Hiring a designer who can read the room — and the spec.', excerpt: 'Most designer hires fail on communication, not craft. How to screen for both.', author: 'Sofia Mendoza', initials: 'SM', authorTone: 'bg-ink text-paper border border-line', date: 'Sep 24', read: '8 min' },
  { id: 'time-overlap', cat: 'remote-work', catLabel: 'Remote Work', tone: 'bg-paper text-ink', mark: <em>4h</em>, title: 'The four-hour overlap: the only rule async teams actually need.', excerpt: 'Time zones get romanticized. The truth is duller: ship four overlapping hours and the rest works itself out.', author: 'Marcus Holt', initials: 'MH', authorTone: 'bg-amber/10 text-amber', date: 'Sep 18', read: '6 min' },
  { id: 'tool-job-brief', cat: 'tools-templates', catLabel: 'Tools & Templates', tone: 'bg-ink text-paper', mark: <em>JB</em>, title: 'A one-page job brief template that gets you better shortlists.', excerpt: "A copy-paste template our specialists use to brief Atlas talent. Comes with a 'don't say' list.", author: 'Editorial', initials: 'ED', authorTone: 'bg-cream text-ink', date: 'Sep 11', read: '5 min' },
  { id: 'hire-developer', cat: 'hiring-guides', catLabel: 'Hiring Guides', role: 'developer', tone: 'bg-amber/10 text-amber', mark: <em>{'{ }'}</em>, title: 'How to hire a senior developer without a take-home test.', excerpt: 'Take-homes are dead. Here are the four signals we look for instead — and how to test for each.', author: 'Tomás Pueyo', initials: 'TP', authorTone: 'bg-amber/10 text-amber', date: 'Sep 4', read: '10 min' },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'hiring-guides', label: 'Hiring Guides' },
  { id: 'remote-work', label: 'Remote Work' },
  { id: 'candidate-tips', label: 'Candidate Tips' },
  { id: 'industry-insights', label: 'Industry Insights' },
  { id: 'a-player-spotlight', label: 'A-Player Spotlight' },
  { id: 'tools-templates', label: 'Tools & Templates' },
  { id: 'salary-benchmarks', label: 'Salary Benchmarks' },
]

export default function Blog() {
  const [activeCat, setActiveCat] = useState('all')
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('')
  const [sort, setSort] = useState('newest')

  const filtered = useMemo(() => {
    let list = articles
    if (activeCat !== 'all') list = list.filter(a => a.cat === activeCat)
    if (role) list = list.filter(a => a.role === role)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.author.toLowerCase().includes(q))
    }
    return list
  }, [activeCat, role, query, sort])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: articles.length }
    categories.slice(1).forEach(cat => {
      c[cat.id] = articles.filter(a => a.cat === cat.id).length
    })
    return c
  }, [])

  return (
    <div className="bg-paper min-h-screen pt-20">
      {/* Hero */}
      <section className="px-8 py-20 bg-cream border-b border-line">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-4.5">// The A-Player Journal</div>
            <h1 className="font-display text-6xl md:text-[80px] font-normal leading-[1.05] tracking-tight mb-8 text-ink">Hiring, working,<br /><span className="italic text-amber">and winning.</span></h1>
            <p className="text-lg leading-relaxed text-ink-soft max-w-[700px]">Field notes from the Atlas research team on the global talent economy — who&apos;s getting hired, who&apos;s charging what, what&apos;s breaking, and what&apos;s actually working.</p>
          </div>
          <div className="flex flex-col gap-4 w-full lg:max-w-[400px]">
            <div className="bg-paper border border-line rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm group focus-within:border-ink transition-all">
              <Search className="w-5 h-5 text-ink-mute group-focus-within:text-ink" />
              <input 
                type="text" 
                className="bg-transparent border-none outline-none text-base text-ink placeholder:text-ink-mute w-full" 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                placeholder="Search articles, authors, tags..." 
              />
              <span className="text-[10px] font-bold text-ink-mute bg-cream px-1.5 py-0.5 rounded border border-line">/</span>
            </div>
            <form className="bg-ink p-1 rounded-xl flex gap-1 shadow-lg" onSubmit={e => { e.preventDefault(); alert('Thanks! You\'ll get our next piece on Monday.') }}>
              <input 
                type="email" 
                className="bg-transparent border-none outline-none text-sm text-paper px-4 py-2 flex-1 placeholder:text-paper/40" 
                placeholder="Weekly hiring piece · you@co.com" 
                required 
              />
              <button type="submit" className="bg-paper text-ink px-4 py-2 rounded-lg text-xs font-bold hover:bg-lime transition-all">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 px-8">
        <div className="max-w-[1300px] mx-auto">
          <Link href="#" className="bg-paper border border-line rounded-[32px] overflow-hidden grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] hover:border-ink transition-all shadow-sm group">
            <div className="bg-ink text-paper p-12 flex flex-col justify-between aspect-[4/3] md:aspect-auto">
              <div className="font-mono text-[10px] tracking-widest uppercase text-paper/40 font-bold italic flex items-center gap-2">
                <span className="text-lime">●</span> Issue 47 · Nov 2025
              </div>
              <div className="font-display text-[80px] leading-none font-normal tracking-tight">
                <span className="opacity-20">VA</span><br /><span className="text-lime italic">2026</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-paper/60 group-hover:text-lime transition-colors">
                READ FEATURE ARTICLE <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className="p-10 md:p-16 flex flex-col gap-6">
              <div className="font-mono text-[11px] tracking-widest uppercase text-ink-mute font-bold flex items-center gap-2 italic">
                Hiring Guides <span className="text-amber">·</span> The complete guide
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-ink">The complete guide to hiring a <span className="italic text-amber">virtual assistant</span> in 2026.</h2>
              <p className="text-lg leading-relaxed text-ink-soft">Pricing, sourcing, vetting, and working with a VA who actually moves the needle — not one you have to babysit. Everything we&apos;ve learned from processing 14,000+ VA applications.</p>
              <div className="flex items-center gap-4 pt-6 border-t border-line mt-auto">
                <div className="w-10 h-10 rounded-full bg-lime text-ink flex items-center justify-center font-bold text-sm">PR</div>
                <div>
                  <div className="font-display text-[15px] font-medium text-ink">Priya Raman</div>
                  <div className="text-[11px] font-bold text-ink-mute uppercase tracking-widest">Nov 18, 2025 · 12 min read</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category chips */}
      <div className="border-y border-line bg-cream overflow-hidden">
        <div className="max-w-[1300px] mx-auto px-8 flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
          {categories.map(c => (
            <button 
              key={c.id} 
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeCat === c.id ? 'bg-ink text-paper border-ink shadow-md' : 'bg-paper text-ink-mute border-line hover:border-ink hover:text-ink'
              }`} 
              onClick={() => setActiveCat(c.id)}
            >
              {c.label} <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCat === c.id ? 'bg-paper/20' : 'bg-cream text-ink-mute'}`}>{counts[c.id] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="max-w-[1300px] mx-auto px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-ink-mute">Showing <strong className="text-ink">{filtered.length}</strong> {filtered.length === 1 ? 'article' : 'articles'}</span>
          {(activeCat !== 'all' || role || query) && (
            <button className="text-xs font-bold text-amber hover:text-ink transition-colors underline underline-offset-4 decoration-amber/30" onClick={() => { setActiveCat('all'); setRole(''); setQuery('') }}>Clear filters</button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Role</span>
            <div className="relative">
              <select className="appearance-none bg-cream border border-line rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-ink outline-none focus:border-ink" value={role} onChange={e => setRole(e.target.value)}>
                <option value="">All roles</option>
                <option value="va">VAs</option>
                <option value="bookkeeper">Bookkeepers</option>
                <option value="developer">Developers</option>
                <option value="designer">Designers</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-mute pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Sort</span>
            <div className="relative">
              <select className="appearance-none bg-cream border border-line rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-ink outline-none focus:border-ink" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="most-read">Most Read</option>
                <option value="editors-picks">Editor&apos;s Picks</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-mute pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Article grid */}
      <section className="px-8 pb-32">
        <div className="max-w-[1300px] mx-auto">
          {filtered.length === 0 ? (
            <div className="bg-cream border border-line border-dashed rounded-3xl py-20 text-center flex flex-col items-center gap-6 animate-in fade-in duration-500">
              <p className="text-lg text-ink-soft">No articles match your filters.</p>
              <button className="bg-ink text-paper px-6 py-2.5 rounded-full text-xs font-bold" onClick={() => { setActiveCat('all'); setRole(''); setQuery('') }}>Reset all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filtered.map(a => (
                <Link key={a.id} href="#" className="flex flex-col gap-6 group">
                  <div className={`aspect-[16/9] rounded-2xl p-8 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1 ${a.tone}`}>
                    <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur px-2 py-1 rounded text-[9px] font-bold tracking-widest text-ink uppercase shadow-sm">{a.catLabel}</div>
                    <div className="font-display text-4xl font-normal leading-none tracking-tight group-hover:scale-110 transition-transform duration-500">
                      {a.mark}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-2xl font-normal tracking-tight text-ink group-hover:text-amber transition-colors line-clamp-2 leading-[1.1]">{a.title}</h3>
                    <p className="text-[15px] leading-relaxed text-ink-soft line-clamp-2">{a.excerpt}</p>
                    <div className="flex items-center gap-3 pt-4 mt-auto">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${a.authorTone}`}>{a.initials}</div>
                      <div>
                        <div className="font-display text-sm font-medium text-ink">{a.author}</div>
                        <div className="text-[10px] font-bold text-ink-mute uppercase tracking-widest">{a.date} · {a.read}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
