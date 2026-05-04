import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const fontDisplay = Fraunces({
  variable: "--font-display-family",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const fontBody = Geist({
  variable: "--font-body-family",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = Geist_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atlas — Hire pre-vetted global A-players",
  description:
    "A curated talent marketplace. Browse pre-vetted candidates before signing up. Flat 10% fee. Zero candidate fees.",
  metadataBase: new URL("https://atlas.app"),
  openGraph: {
    title: "Atlas — Hire pre-vetted global A-players",
    description:
      "Every candidate passes an uncheatable English test, two AI interviews, and a human review. Browse before signing up.",
    url: "/",
    siteName: "Atlas",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body className="bg-cream text-ink min-h-screen font-body antialiased">
        {children}
      </body>
    </html>
  );
}
