'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, MessageSquare, Heart, Play, Lock, Filter, X, ChevronLeft, ChevronRight, Star } from 'lucide-react'

type PopoverId = 'role' | 'skills' | 'rate' | 'avail' | 'region'

type Candidate = {
  name: string
  role: string
  skills: string
  english: string
  rehire: string
  rate: string
  stars: string
  reviews: number
  flag: string
  dot: 'green' | 'orange' | 'red'
  avail: string
  gradient: string
}

const candidates: Candidate[] = [
  { name: 'Valentina C.', role: 'Senior React Developer · 8 yrs', skills: 'React, TypeScript, Next.js +4', english: 'C2', rehire: '98%', rate: '$42', stars: '4.9', reviews: 127, flag: 'CO', dot: 'green', avail: 'This week', gradient: 'linear-gradient(135deg, #2b4a3e 0%, #5a8b73 100%)' },
  { name: 'Marco D.', role: 'Full-stack engineer · 6 yrs', skills: 'Node, Postgres, AWS +3', english: 'C1', rehire: '95%', rate: '$28', stars: '4.8', reviews: 84, flag: 'PH', dot: 'green', avail: 'This week', gradient: 'linear-gradient(135deg, #6b4e2b 0%, #c49560 100%)' },
  { name: 'Sofía L.', role: 'Product designer · 5 yrs', skills: 'Figma, Webflow, Framer +2', english: 'C2', rehire: '100%', rate: '$38', stars: '5.0', reviews: 63, flag: 'AR', dot: 'orange', avail: '2 weeks', gradient: 'linear-gradient(135deg, #4a3a6b 0%, #8b7ab5 100%)' },
  { name: 'Diego R.', role: 'Growth marketer · 7 yrs', skills: 'SEO, GA4, HubSpot +5', english: 'C1', rehire: '96%', rate: '$34', stars: '4.9', reviews: 102, flag: 'MX', dot: 'green', avail: 'This week', gradient: 'linear-gradient(135deg, #6b2b4e 0%, #c46095 100%)' },
  { name: 'Amani O.', role: 'Backend engineer · 9 yrs', skills: 'Go, Kubernetes, gRPC +4', english: 'C2', rehire: '97%', rate: '$45', stars: '4.9', reviews: 156, flag: 'KE', dot: 'green', avail: 'This week', gradient: 'linear-gradient(135deg, #2b6b4e 0%, #5fc495 100%)' },
  { name: 'Luiza F.', role: 'Data analyst · 4 yrs', skills: 'SQL, Looker, dbt +3', english: 'C1', rehire: '92%', rate: '$30', stars: '4.8', reviews: 48, flag: 'BR', dot: 'green', avail: 'This week', gradient: 'linear-gradient(135deg, #6b602b 0%, #c4b860 100%)' },
  { name: 'Linh N.', role: 'Mobile developer · 6 yrs', skills: 'Swift, Kotlin, RN +2', english: 'B2', rehire: '94%', rate: '$36', stars: '4.9', reviews: 71, flag: 'VN', dot: 'red', avail: '1 month', gradient: 'linear-gradient(135deg, #2b3a6b 0%, #5a7ac4 100%)' },
  { name: 'Kasia W.', role: 'DevOps engineer · 8 yrs', skills: 'Terraform, AWS, CI/CD +5', english: 'C2', rehire: '99%', rate: '$48', stars: '5.0', reviews: 189, flag: 'PL', dot: 'green', avail: 'This week', gradient: 'linear-gradient(135deg, #6b2b2b 0%, #c46060 100%)' },
  { name: 'Tomás A.', role: 'QA engineer · 5 yrs', skills: 'Cypress, Playwright +3', english: 'C1', rehire: '93%', rate: '$26', stars: '4.8', reviews: 58, flag: 'CL', dot: 'green', avail: 'This week', gradient: 'linear-gradient(135deg, #2b6b6b 0%, #5fc4c4 100%)' },
]

const regions = [
  { name: 'Latin America', count: 892 },
  { name: 'Southeast Asia', count: 674 },
  { name: 'Europe', count: 541 },
  { name: 'Africa', count: 418 },
  { name: 'South Asia', count: 322 }
]

export default function FindTalent() {
  const [openPop, setOpenPop] = useState<PopoverId | null>(null)
  const [moreOpen, setMoreOpen] = useState(false)
  const [chips, setChips] = useState(['Developer', '$15 – $85 /hr', '4+ hrs overlap', 'This week'])
  const [rateMax, setRateMax] = useState(85)
  const [hours, setHours] = useState(40)
  const [rehire, setRehire] = useState(90)
  const [hearts, setHearts] = useState<Record<string, boolean>>({})
  const [activeChips, setActiveChips] = useState<Record<string, boolean>>({
    'role-Developer': true, 'rate': true, 'avail-This week': true,
    'tz-4+ hrs': true, 'yoe-5–10': true, 'eng-C2': true, 'eng-C1': true,
  })
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    reviews: true, video: true, idverified: false,
  })
  const [seg, setSeg] = useState<'hr' | 'mo'>('hr')

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.filter-pill-wrap')) {
        setOpenPop(null)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const togglePop = (id: PopoverId, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenPop(prev => (prev === id ? null : id))
  }

  const toggleChip = (key: string) => setActiveChips(p => ({ ...p, [key]: !p[key] }))
  const toggleToggle = (key: string) => setToggles(p => ({ ...p, [key]: !p[key] }))
  const toggleHeart = (name: string) => setHearts(p => ({ ...p, [name]: !p[name] }))
  const removeChip = (chip: string) => setChips(p => p.filter(c => c !== chip))

  return (
    <div className="bg-paper min-h-screen">
      {/* Header */}
      <section className="px-8 py-10 bg-cream border-b border-line">
        <div className="max-w-[1300px] mx-auto">
          <nav className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ink-mute mb-6">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-ink">Find Talent</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-ink">
                Browse <span className="italic text-amber">2,847</span> vetted A-players
              </h1>
            </div>
            <button className="bg-paper border border-line text-ink px-5 py-2.5 rounded-full inline-flex items-center gap-2 hover:bg-cream transition-all text-sm font-medium shadow-sm">
              <MessageSquare className="w-4 h-4" />
              Save this search
            </button>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-18 z-30 bg-paper/80 backdrop-blur-md border-b border-line py-4">
        <div className="max-w-[1300px] mx-auto px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-paper border border-line rounded-xl p-1.5 shadow-sm">
              <div className="flex items-center gap-3 pl-4 flex-1">
                <Search className="w-5 h-5 text-ink-mute" />
                <input 
                  type="text" 
                  placeholder="Senior React developer, $40/hr, available this week..." 
                  className="bg-transparent border-none outline-none text-base text-ink placeholder:text-ink-mute w-full py-2.5"
                />
              </div>
              
              <div className="hidden lg:flex items-center gap-2 px-1.5">
                <div className="filter-pill-wrap relative">
                  <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${openPop === 'role' ? 'bg-ink text-paper' : 'bg-cream border border-line text-ink hover:border-ink'}`}
                    onClick={(e) => togglePop('role', e)}
                  >
                    Role <span className="w-4 h-4 bg-lime text-ink rounded-full text-[10px] flex items-center justify-center font-bold">1</span> <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openPop === 'role' ? 'rotate-180' : ''}`} />
                  </button>
                  {openPop === 'role' && (
                    <div className="absolute top-full left-0 mt-2 w-[320px] bg-paper border border-line shadow-xl rounded-2xl p-6 z-50">
                      <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-4">Role category</div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['Developer','Designer','Marketer','VA','Writer','Sales','Customer support','Operations','Data','Finance','Project manager','Other'].map(r => (
                          <button 
                            key={r} 
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeChips[`role-${r}`] ? 'bg-ink text-paper' : 'bg-cream text-ink-soft hover:border-ink border border-transparent'}`}
                            onClick={() => toggleChip(`role-${r}`)}
                          >{r}</button>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-line">
                        <button className="text-xs font-bold text-ink-mute hover:text-ink">Clear</button>
                        <button className="bg-ink text-paper px-4 py-2 rounded-lg text-xs font-bold">Apply</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-pill-wrap relative">
                  <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${openPop === 'skills' ? 'bg-ink text-paper' : 'bg-cream border border-line text-ink hover:border-ink'}`}
                    onClick={(e) => togglePop('skills', e)}
                  >
                    Skills <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openPop === 'skills' ? 'rotate-180' : ''}`} />
                  </button>
                  {openPop === 'skills' && (
                    <div className="absolute top-full left-0 mt-2 w-[320px] bg-paper border border-line shadow-xl rounded-2xl p-6 z-50">
                      <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-4">Core skills</div>
                      <input type="text" className="w-full bg-cream border border-line rounded-lg px-4 py-2.5 text-sm outline-none focus:border-ink mb-4" placeholder="React, TypeScript, GA4..." />
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['React','TypeScript','Python','Figma','SEO'].map(s => (
                          <button 
                            key={s} 
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border border-line hover:border-ink transition-all ${activeChips[`skill-${s}`] ? 'bg-ink text-paper' : 'bg-paper text-ink-soft'}`}
                            onClick={() => toggleChip(`skill-${s}`)}
                          >+ {s}</button>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-line">
                        <button className="text-xs font-bold text-ink-mute hover:text-ink">Clear</button>
                        <button className="bg-ink text-paper px-4 py-2 rounded-lg text-xs font-bold">Apply</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-pill-wrap relative">
                  <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${openPop === 'rate' ? 'bg-ink text-paper' : 'bg-cream border border-line text-ink hover:border-ink'}`}
                    onClick={(e) => togglePop('rate', e)}
                  >
                    Rate: $15–${rateMax} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openPop === 'rate' ? 'rotate-180' : ''}`} />
                  </button>
                  {openPop === 'rate' && (
                    <div className="absolute top-full left-0 mt-2 w-[320px] bg-paper border border-line shadow-xl rounded-2xl p-6 z-50">
                      <div className="flex justify-between items-center mb-6">
                        <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Hourly rate</div>
                        <div className="bg-cream p-0.5 rounded-lg flex gap-1 border border-line">
                          <button className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-tight ${seg === 'hr' ? 'bg-ink text-paper' : 'text-ink-mute'}`} onClick={() => setSeg('hr')}>$/HR</button>
                          <button className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-tight ${seg === 'mo' ? 'bg-ink text-paper' : 'text-ink-mute'}`} onClick={() => setSeg('mo')}>$/MO</button>
                        </div>
                      </div>
                      <div className="flex justify-between font-display text-xl font-medium text-ink mb-2">
                        <span>$15</span>
                        <span>${rateMax}</span>
                      </div>
                      <input 
                        type="range" 
                        min={10} max={150} 
                        value={rateMax} 
                        onChange={(e) => setRateMax(Number(e.target.value))}
                        className="w-full accent-ink mb-6"
                      />
                      <div className="flex justify-between items-center pt-4 border-t border-line">
                        <button className="text-xs font-bold text-ink-mute hover:text-ink">Clear</button>
                        <button className="bg-ink text-paper px-4 py-2 rounded-lg text-xs font-bold">Apply</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-pill-wrap relative">
                  <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${openPop === 'avail' ? 'bg-ink text-paper' : 'bg-cream border border-line text-ink hover:border-ink'}`}
                    onClick={(e) => togglePop('avail', e)}
                  >
                    Availability <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openPop === 'avail' ? 'rotate-180' : ''}`} />
                  </button>
                  {openPop === 'avail' && (
                    <div className="absolute top-full left-0 mt-2 w-[320px] bg-paper border border-line shadow-xl rounded-2xl p-6 z-50">
                      <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-4">Available to start</div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {['This week','This month','Flexible'].map(a => (
                          <button 
                            key={a} 
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeChips[`avail-${a}`] ? 'bg-ink text-paper' : 'bg-cream text-ink-soft hover:border-ink border border-transparent'}`}
                            onClick={() => toggleChip(`avail-${a}`)}
                          >{a}</button>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-line">
                        <button className="text-xs font-bold text-ink-mute hover:text-ink">Clear</button>
                        <button className="bg-ink text-paper px-4 py-2 rounded-lg text-xs font-bold">Apply</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-pill-wrap relative">
                  <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${openPop === 'region' ? 'bg-ink text-paper' : 'bg-cream border border-line text-ink hover:border-ink'}`}
                    onClick={(e) => togglePop('region', e)}
                  >
                    Region <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openPop === 'region' ? 'rotate-180' : ''}`} />
                  </button>
                  {openPop === 'region' && (
                    <div className="absolute top-full left-0 mt-2 w-[320px] bg-paper border border-line shadow-xl rounded-2xl p-6 z-50">
                      <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mb-4">Region</div>
                      <div className="flex flex-col gap-2 mb-6">
                        {regions.map(r => (
                          <label key={r.name} className="flex items-center justify-between group cursor-pointer">
                            <span className="flex items-center gap-3 text-sm text-ink-soft group-hover:text-ink">
                              <input type="checkbox" className="w-4 h-4 rounded border-line text-ink focus:ring-ink" /> {r.name}
                            </span>
                            <span className="text-xs text-ink-mute font-mono">{r.count}</span>
                          </label>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-line">
                        <button className="text-xs font-bold text-ink-mute hover:text-ink">Clear</button>
                        <button className="bg-ink text-paper px-4 py-2 rounded-lg text-xs font-bold">Apply</button>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${moreOpen ? 'bg-amber text-ink' : 'bg-cream border border-line text-ink hover:border-ink'}`}
                  onClick={() => setMoreOpen(!moreOpen)}
                >
                  <Filter className="w-3.5 h-3.5" /> More filters
                </button>
              </div>

              <button className="lg:hidden bg-ink text-paper px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>

            {/* More Filters Panel */}
            {moreOpen && (
              <div className="bg-cream border border-line rounded-2xl p-8 shadow-inner animate-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="flex flex-col gap-4">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Hours / week</div>
                    <div className="flex justify-between font-display text-xl font-medium text-ink">
                      <span>0 hrs</span>
                      <span>{hours} hrs</span>
                    </div>
                    <input 
                      type="range" 
                      min={5} max={40} 
                      value={hours} 
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full accent-ink"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Timezone overlap</div>
                    <div className="flex flex-wrap gap-2">
                      {['2+ hrs','4+ hrs','6+ hrs','8+ hrs'].map(t => (
                        <button 
                          key={t} 
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeChips[`tz-${t}`] ? 'bg-ink text-paper' : 'bg-paper border border-line text-ink-soft hover:border-ink'}`}
                          onClick={() => toggleChip(`tz-${t}`)}
                        >{t}</button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">English level</div>
                    <div className="flex flex-col gap-2.5">
                      {[['C2 — Mastery','412','C2'],['C1 — Advanced','1,184','C1'],['B2 — Upper Int.','856','B2'],['B1 — Intermediate','395','B1']].map(([label, n, k]) => (
                        <label key={k} className="flex items-center justify-between group cursor-pointer">
                          <span className="flex items-center gap-3 text-sm text-ink-soft group-hover:text-ink">
                            <input type="checkbox" checked={!!activeChips[`eng-${k}`]} onChange={() => toggleChip(`eng-${k}`)} className="w-4 h-4 rounded border-line text-ink focus:ring-ink" /> {label}
                          </span>
                          <span className="text-xs text-ink-mute font-mono">{n}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Years of experience</div>
                    <div className="flex flex-wrap gap-2">
                      {['0–2','3–5','5–10','10+'].map(y => (
                        <button 
                          key={y} 
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeChips[`yoe-${y}`] ? 'bg-ink text-paper' : 'bg-paper border border-line text-ink-soft hover:border-ink'}`}
                          onClick={() => toggleChip(`yoe-${y}`)}
                        >{y}</button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Would hire again</div>
                      <span className="text-xs font-bold text-ink">{rehire}%+</span>
                    </div>
                    <input 
                      type="range" 
                      min={50} max={100} 
                      value={rehire} 
                      onChange={(e) => setRehire(Number(e.target.value))}
                      className="w-full accent-ink"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold">Quality flags</div>
                    <div className="flex flex-col gap-3">
                      {[
                        { k: 'reviews', l: 'Has reviews' },
                        { k: 'video', l: 'Has video intro' },
                        { k: 'idverified', l: 'ID verified only' }
                      ].map(t => (
                        <button 
                          key={t.k}
                          className="flex items-center justify-between group"
                          onClick={() => toggleToggle(t.k)}
                        >
                          <span className="text-sm text-ink-soft group-hover:text-ink transition-colors">{t.l}</span>
                          <div className={`w-10 h-5 rounded-full relative transition-colors ${toggles[t.k] ? 'bg-lime' : 'bg-line'}`}>
                            <div className={`absolute top-0.5 w-4 h-4 bg-paper rounded-full shadow-sm transition-transform ${toggles[t.k] ? 'left-[22px]' : 'left-0.5'}`} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-10 pt-6 border-t border-line flex justify-between items-center">
                  <span className="text-xs font-bold text-ink-mute italic">8 advanced filters · 4 active</span>
                  <div className="flex gap-4">
                    <button className="text-xs font-bold text-ink-mute hover:text-ink">Clear all advanced</button>
                    <button className="bg-ink text-paper px-6 py-2 rounded-lg text-xs font-bold">Apply filters</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-8 py-10">
        <div className="max-w-[1300px] mx-auto">
          {/* Active Chips */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <span className="font-mono text-[10px] tracking-widest uppercase text-ink-mute font-bold mr-2">Active</span>
            {chips.map(chip => (
              <span key={chip} className="bg-cream border border-line rounded-full px-3 py-1.5 text-xs font-medium text-ink flex items-center gap-2 group hover:border-ink transition-all">
                {chip}
                <button onClick={() => removeChip(chip)} className="opacity-30 group-hover:opacity-100"><X className="w-3 h-3" /></button>
              </span>
            ))}
            <button onClick={() => setChips([])} className="text-xs font-bold text-ink-mute hover:text-ink ml-2">Clear all</button>
            <div className="ml-auto text-xs text-ink-mute">
              Showing <strong className="text-ink">1–12</strong> of <strong className="text-ink">318</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map(c => (
              <Link key={c.name} href="#" className="group">
                <article className="bg-paper border border-line rounded-2xl overflow-hidden hover:border-ink hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ background: c.gradient }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-paper/90 backdrop-blur px-2.5 py-1 rounded-lg flex items-center gap-2 shadow-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${c.dot === 'green' ? 'bg-lime-deep' : c.dot === 'orange' ? 'bg-amber' : 'bg-danger'}`} />
                      <span className="font-mono text-[10px] font-bold tracking-tight text-ink uppercase">{c.avail}</span>
                    </div>
                    
                    <div className="absolute top-3 right-3 text-2xl drop-shadow-md">{c.flag}</div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-paper text-ink w-14 h-14 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-current" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity">
                       <div className="bg-ink/80 backdrop-blur text-paper px-2 py-1 rounded flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest">
                          <Lock className="w-2.5 h-2.5" /> SIGN UP
                       </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-display text-xl font-medium text-ink flex items-center gap-2">
                        {c.name} <span className="bg-lime text-ink w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">✓</span>
                      </h3>
                      <button 
                        className={`transition-colors ${hearts[c.name] ? 'text-danger' : 'text-ink-mute hover:text-danger'}`}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleHeart(c.name) }}
                      >
                        <Heart className={`w-5 h-5 ${hearts[c.name] ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="text-sm font-medium text-ink-soft mb-3">{c.role}</div>
                    <div className="text-xs text-ink-mute mb-6 line-clamp-1">{c.skills}</div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-line">
                      <div className="flex flex-col">
                        <span className="font-display text-lg font-medium text-ink">{c.english}</span>
                        <span className="font-mono text-[9px] tracking-widest uppercase text-ink-mute font-bold">English</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-display text-lg font-medium text-lime-deep">{c.rehire}</span>
                        <span className="font-mono text-[9px] tracking-widest uppercase text-ink-mute font-bold">Rehire</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end pt-4 border-t border-line">
                      <div className="flex flex-col">
                        <div className="font-display text-2xl font-normal text-ink">
                          {c.rate}<span className="text-xs text-ink-mute italic">/hr</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-ink mb-1">
                        <Star className="w-4 h-4 text-amber fill-current" />
                        {c.stars}
                        <span className="text-xs text-ink-mute font-normal">({c.reviews})</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-20">
            <button className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-mute hover:border-ink hover:text-ink transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-ink text-paper font-display text-sm">1</button>
            <button className="w-10 h-10 rounded-full border border-line text-ink-soft font-display text-sm hover:border-ink hover:text-ink transition-all">2</button>
            <button className="w-10 h-10 rounded-full border border-line text-ink-soft font-display text-sm hover:border-ink hover:text-ink transition-all">3</button>
            <button className="w-10 h-10 rounded-full border border-line text-ink-soft font-display text-sm hover:border-ink hover:text-ink transition-all">4</button>
            <span className="text-ink-mute px-2">...</span>
            <button className="w-10 h-10 rounded-full border border-line text-ink-soft font-display text-sm hover:border-ink hover:text-ink transition-all">27</button>
            <button className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-mute hover:border-ink hover:text-ink transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
