"use client";

import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { useReveal } from "@/hooks/use-reveal";

export function PrivacyStrip() {
  const ref = useReveal<HTMLElement>();
  
  return (
    <section ref={ref} className="bg-paper border-y border-line py-16">
      <Container>
        <div className="reveal flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          <div className="bg-ink text-lime w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <Lock className="w-8 h-8" strokeWidth={1.8} />
          </div>
          
          <div className="flex-1">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute font-semibold mb-3 flex items-center gap-2">
              <span className="text-amber">●</span> Privacy by default
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight text-ink mb-4">
              Clients aren&apos;t publicly listed. <span className="italic text-amber">Their hiring stays their own.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-ink-soft max-w-[800px]">
              Atlas keeps client identities private until a hire is made. <strong className="text-ink">Candidates and clients only see each other once a real relationship begins</strong> — no off-platform poaching, no public hiring trail, no data harvesting.
            </p>
          </div>
          
          <Link href="/trust" className="group inline-flex items-center gap-2 font-display italic text-lg text-amber hover:text-ink transition-colors whitespace-nowrap">
            How privacy works
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
