'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  Play, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Languages,
  ChevronRight,
  ArrowRight,
  Check,
  Info
} from 'lucide-react'

// --- Mock data (re-using the structure from legacy but enhancing types) ---
type Candidate = {
  slug: string
  name: string
  firstName: string
  role: string
  flag: string
  location: string
  timezone: string
  rate: string
  availability: string
  profileStrength: string
  languages: string
  videoLength: string
  videoDate: string
  voiceLength: string
  bio: string[]
  langPills: { name: string; level: string }[]
  scorecard: {
    english: { label: string; score: number }[]
    role: { label: string; score: number }[]
    soft: { label: string; score: number }[]
    commTags: string[]
  }
  skills: string[]
  tools: string[]
}

const valentina: Candidate = {
  slug: 'valentina-castillo',
  name: 'Valentina Castillo',
  firstName: 'Valentina',
  role: 'Senior Full-stack Developer',
  flag: '🇨🇴',
  location: 'Medellín, Colombia',
  timezone: 'GMT−5 · 4h overlap with EST',
  rate: '$42',
  availability: '40 hrs/wk',
  profileStrength: '96/100',
  languages: 'C2 · ES · PT',
  videoLength: '2m 14s',
  videoDate: 'Recorded Nov 4, 2025',
  voiceLength: '0m 48s',
  bio: [
    "I'm a senior full-stack engineer based in Medellín with nearly a decade of experience shipping React and Node applications for Series A–C companies in the US and UK. I care about the stuff that doesn't ship — thoughtful design reviews, clean git history, code that the next person can actually read — and the stuff that does: shipping often, instrumenting everything, and being honest about tradeoffs.",
    "Most recently I led a four-person team at Aperture Logistics, where I rebuilt their customer portal from a legacy Rails app into a modern Next.js architecture. We cut page load times by 68% and reduced portal-related support tickets by half in the first quarter after launch.",
    "I work async-first, write thorough tickets, and default to writing things down. Outside work I maintain a small open-source library for React form validation (2.3k GitHub stars), run long distances on weekends, and read way too much non-fiction.",
  ],
  langPills: [
    { name: 'English', level: 'C2 · Mastery' },
    { name: 'Spanish', level: 'Native' },
    { name: 'Portuguese', level: 'B1 · Intermediate' },
  ],
  scorecard: {
    english: [
      { label: 'Fluency', score: 94 },
      { label: 'Pronunciation', score: 88 },
      { label: 'Grammar', score: 96 },
      { label: 'Comprehension', score: 98 },
    ],
    role: [
      { label: 'Technical breadth', score: 92 },
      { label: 'Problem solving', score: 96 },
      { label: 'System design', score: 89 },
      { label: 'Code quality', score: 95 },
    ],
    soft: [
      { label: 'Leadership', score: 88 },
      { label: 'Communication', score: 94 },
      { label: 'Initiative', score: 92 },
      { label: 'Reliability', score: 98 },
    ],
    commTags: ['Direct', 'Detail-oriented', 'Collaborative', 'Async-friendly', 'Writes first', 'Asks clarifying questions'],
  },
  skills: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker', 'Tailwind', 'Jest'],
  tools: ['VS Code', 'Linear', 'Figma', 'Notion', 'GitHub', 'Vercel'],
}

const similar = [
  { name: 'Tomás A.', role: 'Backend engineer · 7 yrs', flag: 'BR', rate: '$38', dot: 'bg-green-500', avail: 'This week', gradient: 'bg-gradient-to-br from-[#2b6b6b] to-[#5fc4c4]' },
  { name: 'Sofia M.', role: 'Frontend specialist · 6 yrs', flag: 'AR', rate: '$35', dot: 'bg-green-500', avail: 'This week', gradient: 'bg-gradient-to-br from-[#6a4a8e] to-[#b08fd1]' },
  { name: 'Diego R.', role: 'Full-stack · 8 yrs', flag: 'MX', rate: '$45', dot: 'bg-orange-500', avail: 'This month', gradient: 'bg-gradient-to-br from-[#8b4513] to-[#d4a574]' },
]

export default function CandidateProfile() {
  const params = useParams()
  // In a real app, you'd fetch by params.slug. For the demo, we use Valentina.
  const c = valentina
  const [activeSection, setActiveSection] = useState<'bio' | 'scorecard' | 'skills'>('bio')

  // Animate score bars on mount
  const scoreRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fills = scoreRef.current?.querySelectorAll<HTMLElement>('.score-fill')
    if (!fills) return
    const t = setTimeout(() => {
      fills.forEach(el => {
        const pct = el.dataset.fill || '0'
        el.style.width = `${pct}%`
      })
    }, 150)
    return () => clearTimeout(t)
  }, [activeSection])

  return (
    <div className="bg-paper min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-line">
        <div className="max-w-[1300px] mx-auto px-8 py-3 flex items-center gap-2 text-[11px] font-bold tracking-widest text-ink-mute uppercase">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="text-line">/</span>
          <Link href="/find-talent" className="hover:text-ink transition-colors">Find Talent</Link>
          <span className="text-line">/</span>
          <span className="text-ink">{c.firstName} {c.name.split(' ')[1]?.[0]}.</span>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
          
          {/* Main Content */}
          <div className="space-y-12">
            
            {/* Header Info */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-bold text-ink tracking-tight uppercase">
                  <ShieldCheck className="w-3 h-3" />
                  ID Verified
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-bold text-ink tracking-tight uppercase">
                  <CheckCircle2 className="w-3 h-3" />
                  Phone Verified
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink/5 border border-ink/10 text-[10px] font-bold text-ink tracking-tight uppercase">
                  <CheckCircle2 className="w-3 h-3" />
                  Reference Checked
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime text-ink border border-lime shadow-sm text-[10px] font-bold tracking-tight uppercase">
                  <Star className="w-3 h-3 fill-current" />
                  Top 5%
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-display text-ink flex items-center gap-4">
                  {c.name}
                  <CheckCircle2 className="w-8 h-8 text-lime fill-ink" />
                </h1>
                <div className="text-2xl font-display text-amber italic">{c.role}</div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-ink-soft">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{c.flag}</span>
                  {c.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-ink-mute" />
                  {c.timezone}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 py-8 border-y border-line">
                <div>
                  <div className="text-2xl font-display text-ink">{c.rate}<span className="text-sm font-sans font-medium text-ink-mute ml-1">/hr</span></div>
                  <div className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mt-1">Hire Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-display text-ink">{c.availability.split(' ')[0]}<span className="text-sm font-sans font-medium text-ink-mute ml-1">{c.availability.split(' ').slice(1).join(' ')}</span></div>
                  <div className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mt-1">Availability</div>
                </div>
                <div>
                  <div className="text-2xl font-display text-ink">{c.profileStrength}</div>
                  <div className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mt-1">Atlas Score</div>
                </div>
              </div>
            </div>

            {/* Video & Voice */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-ink/90 group border border-line">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 grayscale"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <button className="w-16 h-16 rounded-full bg-paper text-ink flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </button>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/80 backdrop-blur-md border border-paper/20 text-[10px] font-bold text-paper tracking-widest uppercase">
                    <Lock className="w-3 h-3" />
                    Sign up to watch
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-paper/90 uppercase tracking-widest">Video Intro · {c.videoLength}</div>
                    <div className="text-[10px] text-paper/50">{c.videoDate} · Auto-captioned</div>
                  </div>
                </div>
              </div>

              <button className="flex flex-row md:flex-col items-center justify-center gap-4 p-6 rounded-3xl bg-cream border border-line hover:border-ink transition-all group">
                <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center text-paper group-hover:scale-110 transition-transform">
                  <div className="flex items-end gap-[2px] h-4">
                    <span className="w-[2px] bg-paper animate-pulse h-2"></span>
                    <span className="w-[2px] bg-paper animate-pulse h-4 delay-75"></span>
                    <span className="w-[2px] bg-paper animate-pulse h-3 delay-150"></span>
                    <span className="w-[2px] bg-paper animate-pulse h-5 delay-100"></span>
                    <span className="w-[2px] bg-paper animate-pulse h-2 delay-200"></span>
                  </div>
                </div>
                <div className="text-left md:text-center">
                  <div className="text-xs font-bold text-ink uppercase tracking-tight">Voice Intro</div>
                  <div className="text-[10px] text-ink-mute font-medium mt-0.5">{c.voiceLength} · Recorded Live</div>
                </div>
                <Lock className="w-3 h-3 text-ink-mute md:mt-auto" />
              </button>
            </div>

            {/* Tabs */}
            <div className="space-y-10">
              <div className="flex gap-8 border-b border-line overflow-x-auto no-scrollbar">
                {(['bio', 'scorecard', 'skills'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveSection(tab)}
                    className={`pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${
                      activeSection === tab ? 'text-ink' : 'text-ink-mute hover:text-ink-soft'
                    }`}
                  >
                    {tab === 'bio' ? 'Background' : tab === 'scorecard' ? 'Atlas Scorecard' : 'Skills & Stack'}
                    {activeSection === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ink"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[300px]">
                {activeSection === 'bio' && (
                  <div className="max-w-[700px] space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {c.bio.map((p, i) => (
                      <p key={i} className="text-lg leading-relaxed text-ink-soft">{p}</p>
                    ))}
                    <div className="pt-6 space-y-4">
                      <div className="text-[10px] font-bold text-ink-mute uppercase tracking-widest">Languages</div>
                      <div className="flex flex-wrap gap-2">
                        {c.langPills.map(l => (
                          <div key={l.name} className="px-4 py-2 rounded-xl bg-paper border border-line text-sm font-medium text-ink flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
                            {l.name} <span className="text-ink-mute ml-1">{l.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'scorecard' && (
                  <div ref={scoreRef} className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                      {/* English Score */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-ink uppercase tracking-widest">English & Comm</h3>
                          <div className="text-xs font-bold text-lime bg-ink px-2 py-1 rounded">Top 2%</div>
                        </div>
                        <div className="space-y-5">
                          {c.scorecard.english.map(s => (
                            <div key={s.label} className="space-y-2">
                              <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight text-ink-soft">
                                <span>{s.label}</span>
                                <span>{s.score}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-ink score-fill transition-all duration-1000 ease-out" 
                                  style={{ width: '0%' }}
                                  data-fill={s.score}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Score */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-ink uppercase tracking-widest">Role Specific</h3>
                          <div className="text-xs font-bold text-lime bg-ink px-2 py-1 rounded">Vetted</div>
                        </div>
                        <div className="space-y-5">
                          {c.scorecard.role.map(s => (
                            <div key={s.label} className="space-y-2">
                              <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight text-ink-soft">
                                <span>{s.label}</span>
                                <span>{s.score}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-ink score-fill transition-all duration-1000 ease-out" 
                                  style={{ width: '0%' }}
                                  data-fill={s.score}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="p-8 rounded-3xl bg-cream border border-line space-y-4">
                      <div className="text-[10px] font-bold text-ink-mute uppercase tracking-widest flex items-center gap-2">
                        <Info className="w-3 h-3" />
                        Human Review Notes
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {c.scorecard.commTags.map(tag => (
                          <span key={tag} className="px-3 py-1.5 rounded-lg bg-paper border border-line text-xs font-bold text-ink-soft uppercase tracking-tight">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'skills' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-ink uppercase tracking-widest">Primary Stack</h3>
                      <div className="flex flex-wrap gap-3">
                        {c.skills.map(skill => (
                          <div key={skill} className="px-5 py-3 rounded-2xl bg-paper border border-line text-base font-medium text-ink hover:border-ink transition-colors cursor-default">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-ink uppercase tracking-widest">Workflow Tools</h3>
                      <div className="flex flex-wrap gap-3">
                        {c.tools.map(tool => (
                          <div key={tool} className="px-4 py-2 rounded-xl border border-line text-sm font-medium text-ink-soft flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-ink-mute"></div>
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-8">
            <div className="p-8 rounded-[32px] bg-ink text-paper shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime blur-[100px] opacity-20"></div>
              
              <div className="space-y-4 relative">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold text-paper/40 uppercase tracking-[0.2em]">Hiring Stats</div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-lime text-lime" />)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-display">Fast Hire</div>
                  <p className="text-sm text-paper/60 leading-relaxed">Valentina is usually booked within 7 days of appearing on the marketplace.</p>
                </div>
              </div>

              <div className="space-y-4 relative">
                <button className="w-full bg-lime text-ink py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                  Request Interview
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full bg-paper/10 text-paper py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-paper/20 transition-colors">
                  View Full Resume
                </button>
              </div>

              <div className="pt-8 border-t border-paper/10 space-y-4 relative">
                <div className="flex items-center gap-3 text-xs font-medium text-paper/80">
                  <div className="w-8 h-8 rounded-full bg-paper/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-lime" />
                  </div>
                  Contract-to-hire available
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-paper/80">
                  <div className="w-8 h-8 rounded-full bg-paper/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-lime" />
                  </div>
                  Atlas-managed compliance
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-paper/80">
                  <div className="w-8 h-8 rounded-full bg-paper/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-lime" />
                  </div>
                  No upfront placement fees
                </div>
              </div>
            </div>

            {/* Similar Profiles */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-ink uppercase tracking-widest">Similar Profiles</h3>
              <div className="space-y-3">
                {similar.map(s => (
                  <Link key={s.name} href={`/find-talent/${s.name.toLowerCase().replace(' ', '-')}`} className="block p-4 rounded-2xl bg-cream border border-line hover:border-ink transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${s.gradient}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-ink flex items-center justify-between">
                          {s.name}
                          <span className="text-[10px] text-ink-mute font-mono">{s.rate}/hr</span>
                        </div>
                        <div className="text-[10px] font-medium text-ink-soft truncate">{s.role}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-ink-mute group-hover:text-ink group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
