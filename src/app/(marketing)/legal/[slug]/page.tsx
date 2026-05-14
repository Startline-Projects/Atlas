import Link from 'next/link'
import { notFound } from 'next/navigation'
import { legalDocs } from './data'
import { ChevronLeft, ArrowRight } from 'lucide-react'

export default async function LegalDoc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = legalDocs[slug]
  if (!doc) notFound()

  return (
    <div className="bg-cream min-h-screen pt-20">
      {/* Top Bar */}
      <section className="px-8 py-10 bg-cream border-b border-line">
        <div className="max-w-[800px] mx-auto">
          <nav className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ink-mute">
            <Link href="/legal" className="hover:text-ink transition-colors">Legal & Trust Center</Link>
            <span className="opacity-30">/</span>
            <span className="text-ink">{doc.title}</span>
          </nav>
        </div>
      </section>

      {/* Document */}
      <article className="max-w-[800px] mx-auto py-24 px-8">
        <header className="mb-16 pb-16 border-b border-line">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-6 italic">{doc.eyebrow}</div>
          <h1 className="font-display text-5xl md:text-7xl font-normal tracking-tight text-ink mb-10">{doc.title}</h1>
          <div className="flex flex-wrap gap-x-12 gap-y-6 font-display text-sm text-ink mb-12">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-mute font-bold">Version</span>
              <strong>{doc.version}</strong>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-mute font-bold">Effective</span>
              <strong>{doc.date}</strong>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink-mute font-bold">Scope</span>
              <strong>{doc.scope}</strong>
            </div>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed text-ink-soft italic font-serif">&quot;{doc.intro}&quot;</p>
        </header>

        <div className="flex flex-col gap-20">
          {doc.sections.map((s, i) => (
            <section key={i} className="flex flex-col gap-8">
              <div className="flex items-start gap-6">
                <div className="font-display italic text-3xl text-amber/20 pt-1">{i + 1}.</div>
                <div className="flex flex-col gap-6 flex-1">
                  <h2 className="font-display text-3xl font-normal text-ink leading-tight">{s.heading}</h2>
                  <div className="flex flex-col gap-6">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-lg leading-relaxed text-ink-soft">{p}</p>
                    ))}
                  </div>
                  {s.list && (
                    <ul className="flex flex-col gap-4 list-none pl-2 border-l-2 border-lime/30 py-2">
                      {s.list.map((item, k) => (
                        <li key={k} className="text-lg leading-relaxed text-ink-soft flex items-start gap-3">
                          <span className="text-lime-deep font-bold mt-1.5 leading-none">●</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-24 pt-16 border-t border-line flex flex-col items-center gap-10 text-center">
          <div className="max-w-[400px]">
            <p className="text-lg text-ink-soft mb-6">Questions about this document or our legal practices?</p>
            <a href="mailto:legal@atlas.co" className="bg-paper border border-line text-ink px-8 py-3 rounded-full inline-flex items-center gap-3 hover:border-ink transition-all font-medium">
              legal@atlas.co <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <Link href="/legal" className="text-sm font-bold text-ink-mute hover:text-ink transition-all flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Back to all documents
          </Link>
        </footer>
      </article>
    </div>
  )
}
