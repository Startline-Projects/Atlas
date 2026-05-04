import {
  Clock,
  FileText,
  Lock,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";

type TrustItem = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const ITEMS: ReadonlyArray<TrustItem> = [
  {
    icon: ShieldCheck,
    title: "ID Verified",
    body: "Every candidate, liveness-checked.",
  },
  {
    icon: Users,
    title: "Reference checked",
    body: "Two phone calls per candidate.",
  },
  {
    icon: FileText,
    title: "Auto contracts",
    body: "Generated the moment you hire.",
  },
  {
    icon: Lock,
    title: "Escrow protected",
    body: "Funds held until work is confirmed.",
  },
  {
    icon: Clock,
    title: "72h dispute resolution",
    body: "Real humans, fast turnaround.",
  },
];

export function TrustStrip() {
  return (
    <section className="bg-paper border-line border-y py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <div className="bg-cream text-ink grid h-9 w-9 place-items-center rounded-sm">
                <Icon
                  className="h-[18px] w-[18px]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>
              <div className="text-ink-soft text-[13px] leading-[1.4]">
                <strong className="text-ink mb-0.5 block text-sm font-semibold">
                  {title}
                </strong>
                {body}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
