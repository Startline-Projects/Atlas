"use client";

import {
  ArrowUpRight,
  BarChart3,
  ClipboardCheck,
  Code2,
  DollarSign,
  FileText,
  Globe,
  Headphones,
  PenSquare,
  TrendingUp,
  UserPlus,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useReveal } from "@/hooks/use-reveal";

type Category = {
  name: string;
  count: number;
  icon: LucideIcon;
};

const CATEGORIES: ReadonlyArray<Category> = [
  { name: "Developers", count: 684, icon: Code2 },
  { name: "Designers", count: 412, icon: PenSquare },
  { name: "Marketers", count: 328, icon: TrendingUp },
  { name: "Virtual Assistants", count: 521, icon: Users },
  { name: "Customer Support", count: 287, icon: Headphones },
  { name: "Video Editors", count: 164, icon: Video },
  { name: "Accountants", count: 98, icon: DollarSign },
  { name: "Recruiters", count: 73, icon: UserPlus },
  { name: "Copywriters", count: 142, icon: FileText },
  { name: "Data Analysts", count: 87, icon: BarChart3 },
  { name: "Project Managers", count: 54, icon: Globe },
  { name: "QA Testers", count: 39, icon: ClipboardCheck },
];

export function Categories() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="py-30">
      <Container>
        <div className="reveal mb-18 grid items-end gap-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow className="mb-4">{"// Role categories"}</Eyebrow>
            <h2 className="display text-[clamp(36px,5vw,64px)] leading-none">
              Hire across
              <br />
              <span className="serif-italic">12 disciplines.</span>
            </h2>
          </div>
          <p className="text-ink-mute max-w-[520px] text-[17px] leading-[1.55]">
            From senior engineers to specialist VAs. Every category is
            live-staffed with pre-vetted candidates ready to interview this
            week.
          </p>
        </div>

        <div className="reveal-stagger border-line grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ name, count, icon: Icon }) => (
            <Link
              key={name}
              href="/"
              className="border-line hover:bg-paper group relative flex min-h-[180px] flex-col gap-5 border-r border-b p-7 transition-colors"
            >
              <div className="text-ink grid h-10 w-10 place-items-center">
                <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div className="mt-auto">
                <div className="font-display text-[22px] leading-[1.1] font-medium">
                  {name}
                </div>
                <div className="text-ink-mute mt-1 font-mono text-[13px]">
                  <span className="bg-lime-deep mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" />
                  {count} live
                </div>
              </div>
              <ArrowUpRight
                className="absolute top-7 right-7 h-3.5 w-3.5 opacity-30 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
