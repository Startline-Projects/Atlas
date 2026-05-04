import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const COLUMNS: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    title: "Clients",
    links: [
      { label: "Browse Talent", href: "/" },
      { label: "Post a Job", href: "/" },
      { label: "For Businesses", href: "/" },
      { label: "Pricing", href: "/" },
      { label: "Success Stories", href: "/" },
    ],
  },
  {
    title: "Candidates",
    links: [
      { label: "Apply to Join", href: "/" },
      { label: "For Candidates", href: "/" },
      { label: "How Vetting Works", href: "/" },
      { label: "Candidate Stories", href: "/" },
      { label: "Requirements", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "A-Player Report", href: "/" },
      { label: "Hiring Guides", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Help Center", href: "/" },
      { label: "Trust & Safety", href: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press", href: "/" },
      { label: "Contact", href: "/" },
      { label: "Partners", href: "/" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "/" },
  { label: "Privacy", href: "/" },
  { label: "Cookies", href: "/" },
  { label: "Do Not Sell or Share", href: "/" },
  { label: "Accessibility", href: "/" },
  { label: "All legal", href: "/" },
];

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper/80 mt-32 pt-20 pb-10">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-12 pb-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="text-paper" />
            <p className="text-paper/60 mt-4 max-w-[280px] text-[14px] leading-[1.55]">
              The global talent marketplace for companies who actually want
              A-players.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="X (Twitter)"
                className="text-paper/60 hover:text-paper border-paper/20 hover:border-paper/40 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <XIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-paper/60 hover:text-paper border-paper/20 hover:border-paper/40 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-paper/60 hover:text-paper border-paper/20 hover:border-paper/40 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-paper mb-4 text-[13px] font-semibold tracking-wide uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-[14px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-paper/60 hover:text-paper transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-paper/10 flex flex-col items-start justify-between gap-4 border-t pt-8 text-[12.5px] md:flex-row md:items-center">
          <div className="text-paper/55 flex flex-wrap gap-x-2 gap-y-1">
            <span>© 2026 Atlas Talent, Inc.</span>
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-2">
                <span aria-hidden="true">·</span>
                <Link
                  href={link.href}
                  className="border-paper/30 hover:text-paper border-b pb-px transition-colors"
                >
                  {link.label}
                </Link>
                {i === LEGAL_LINKS.length - 1 ? null : null}
              </span>
            ))}
          </div>
          <select
            aria-label="Language"
            defaultValue="English (US)"
            className="bg-paper/5 text-paper/70 border-paper/20 rounded-sm border px-3 py-1.5"
          >
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Español</option>
            <option>Português</option>
            <option>Français</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
