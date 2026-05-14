export type LegalDoc = {
  title: string
  eyebrow: string
  version: string
  date: string
  scope: string
  intro: string
  sections: { heading: string; body: string[]; list?: string[] }[]
}

export const legalDocs: Record<string, LegalDoc> = {
  terms: {
    title: 'Terms of Service',
    eyebrow: '// Governing document · master agreement',
    version: 'v4.1',
    date: 'April 14, 2026',
    scope: 'Worldwide · all users',
    intro: 'These Terms govern your use of Atlas. By creating an account or using the platform, you agree to be bound by these Terms. Read them carefully — they include important provisions about disputes, liability, and your rights as a user.',
    sections: [
      { heading: 'Account and eligibility', body: ['You must be at least 18 years old to use Atlas. By signing up, you confirm you have the legal capacity to enter into a binding contract.', 'You agree to provide accurate, complete information when creating your account and to keep it up to date.'] },
      { heading: 'Acceptable use', body: ['You may not use Atlas for any illegal activity, to defraud or impersonate others, or to circumvent our verification systems.', 'You may not scrape, copy, or extract data from Atlas without express written permission.'] },
      { heading: 'Fees and payment', body: ['Clients pay a flat 10% platform fee on top of the candidate\'s quoted hourly rate. Candidates pay 0%.', 'All fees are non-refundable except as described in our Refund Policy.'] },
      { heading: 'Termination', body: ['You may close your account at any time. We may suspend or terminate accounts that violate these Terms or our Acceptable Use Policy.', 'On termination, certain obligations survive — including those related to confidentiality, ownership, and liability.'] },
      { heading: 'Disclaimers and limitation of liability', body: ['Atlas is provided "as is" without warranties. We do not guarantee that any specific candidate will be hired or that any work will meet your expectations.', 'Our maximum liability to you in any 12-month period is limited to the fees you paid us in that period.'] },
      { heading: 'Disputes and governing law', body: ['These Terms are governed by the laws of Delaware, USA. Disputes will be resolved through binding arbitration except where prohibited by law.', 'See our Dispute Resolution Policy for the full procedure.'] },
    ],
  },
  aup: {
    title: 'Acceptable Use Policy',
    eyebrow: '// Governing document · what you can and cannot do',
    version: 'v2.3',
    date: 'March 02, 2026',
    scope: 'Worldwide · all users',
    intro: 'This Policy spells out what counts as acceptable behavior on Atlas, in plain language. Violations may result in account suspension or termination.',
    sections: [
      { heading: 'You may not', body: ['The following behaviors will get your account suspended:'], list: ['Misrepresent your identity, skills, location, or work history.', 'Use AI tools during proctored interviews or assessments.', 'Share your account credentials with anyone else.', 'Use Atlas to recruit candidates off-platform to avoid platform fees.', 'Send unsolicited bulk messages or spam.', 'Post sexually explicit, hateful, harassing, or threatening content.', 'Attempt to reverse engineer, scrape, or DDoS the platform.'] },
      { heading: 'You may', body: ['Anything not on the list above, in good faith. Examples:'], list: ['Browse profiles freely without an account.', 'Negotiate rates, scope, and terms directly with the other party.', 'Use the platform for any lawful work that fits a posted role category.', 'Take screenshots for personal reference (but not redistribute).'] },
      { heading: 'Reports and enforcement', body: ['Report violations to trust@atlas.co. Urgent reports are reviewed within 1 hour; standard reports within 24.', 'Confirmed violations result in warnings, suspensions, or terminations depending on severity. We notify users of decisions in writing.'] },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: '// Privacy & data · what we collect and why',
    version: 'v5.0',
    date: 'April 02, 2026',
    scope: 'Worldwide · all users',
    intro: 'This Policy explains what personal data we collect from you, what we do with it, where it goes, and what rights you have over it. We try to keep our data practices boring on purpose.',
    sections: [
      { heading: 'What we collect', body: ['When you create an account, we collect your name, email, country, and (for candidates) ID verification data.', 'When you use the platform, we log usage patterns — pages viewed, searches run, messages sent — to detect fraud and improve the product.'] },
      { heading: 'What we do with it', body: ['We use your data to operate the platform: verify you, route messages, process payments, generate contracts, resolve disputes.', 'We do not sell your data. We do not share it with advertisers. We do not use it to train AI models without your consent.'] },
      { heading: 'Where it lives', body: ['Customer data is stored in AWS data centers in the US and EU. Payment data is held by Stripe. Payout data is held by Wise.', 'See our Subprocessors List for the full list of vendors that touch your data.'] },
      { heading: 'Your rights', body: ['You can request a copy of your data, ask us to correct or delete it, or restrict how we use it. Email privacy@atlas.co — we respond within 30 days.', 'Some data we are legally required to keep (contracts, tax records, dispute decisions). We delete everything else on request.'] },
      { heading: 'Retention', body: ['Active account data is kept while your account is open. Closed account data is deleted within 90 days, except where retention is legally required.'] },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    eyebrow: '// Privacy & data · cookies and tracking',
    version: 'v2.1',
    date: 'February 28, 2026',
    scope: 'Worldwide',
    intro: 'We use a small number of cookies and similar technologies. Here is the complete list.',
    sections: [
      { heading: 'Strictly necessary cookies', body: ['Used to keep you logged in, remember your language and timezone, and protect against CSRF. Cannot be disabled — the platform will not work without them.'] },
      { heading: 'Analytics cookies', body: ['We use Plausible Analytics, a privacy-friendly tool that does not use cookies or track individuals. Aggregate pageview data only.', 'We do not use Google Analytics, Facebook Pixel, or any cross-site tracking.'] },
      { heading: 'No advertising cookies', body: ['We do not run ads on Atlas. We do not set advertising cookies. We do not share data with ad networks.'] },
      { heading: 'Controlling cookies', body: ['Most browsers let you refuse cookies. If you do, the platform will not work — strictly necessary cookies are required.', 'You can also use private/incognito browsing for a session that leaves no trace.'] },
    ],
  },
  biometric: {
    title: 'Biometric Consent Policy',
    eyebrow: '// Governing document · ID liveness handling',
    version: 'v1.4',
    date: 'February 11, 2026',
    scope: 'Worldwide · candidates only',
    intro: 'When candidates verify their identity, we capture biometric data (a selfie video for liveness check, and a face geometry hash for matching against later interviews). This Policy explains what we do with it.',
    sections: [
      { heading: 'What we collect', body: ['A short video of you turning your head and smiling, plus a hash of your facial geometry. The hash is a mathematical representation — it cannot be used to reconstruct your face.'] },
      { heading: 'What we use it for', body: ['Comparing your face at application to your face during every later interview, to ensure the same person clears every step.', 'Detecting "ghost candidates" — common fraud pattern where a different person sits the interview than the one applying.'] },
      { heading: 'How long we keep it', body: ['The video is deleted within 24 hours of verification. The face geometry hash is kept for the lifetime of your account.', 'You can request deletion at any time by emailing privacy@atlas.co. Doing so closes your candidate account.'] },
      { heading: 'Who else sees it', body: ['Only the third-party verification provider (Persona) and approved Atlas staff. Never shared with clients. Never sold.'] },
    ],
  },
  dispute: {
    title: 'Dispute Resolution Policy',
    eyebrow: '// Dispute & remedy · how we resolve conflicts',
    version: 'v3.2',
    date: 'March 18, 2026',
    scope: 'Worldwide',
    intro: 'If a hire goes wrong, this is how we resolve it. Disputes are mediated by a real human, decisions are in writing, the SLA is 72 hours for the first response, and either party can appeal.',
    sections: [
      { heading: 'Opening a dispute', body: ['Either party can open a dispute from the engagement page. Doing so freezes all relevant escrowed funds and notifies the other party within 1 hour.'] },
      { heading: 'Submitting evidence', body: ['Both sides have 5 business days to upload chats, deliverables, screenshots, and recordings. All evidence is timestamped and verified.'] },
      { heading: 'Mediation', body: ['A senior Atlas mediator reviews both sides. Typical resolution: 5–7 business days from the close of evidence submission.', 'Mediators are trained in dispute resolution and have access to the full engagement history including all communications.'] },
      { heading: 'Written decision', body: ['You receive a written decision including reasoning, payout split, and any reputation impact. Both sides can appeal within 14 days.', 'Appeals are reviewed by a different senior mediator. Their decision is final.'] },
    ],
  },
  refund: {
    title: 'Refund & Chargeback Policy',
    eyebrow: '// Dispute & remedy · money handling',
    version: 'v2.0',
    date: 'March 11, 2026',
    scope: 'Worldwide',
    intro: 'How refunds work, how long they take, and how we handle chargebacks.',
    sections: [
      { heading: '14-day replacement window', body: ['If you hire someone and the fit is not right within the first 14 days, we will replace them with another candidate at no charge. Any work already delivered is paid for at the agreed rate.'] },
      { heading: 'Refund timing', body: ['Once a refund is approved, funds are released back to your original payment method within 5–10 business days.'] },
      { heading: 'Chargebacks', body: ['If you initiate a chargeback rather than working with our dispute process, your account will be suspended pending review. We may dispute the chargeback with evidence from the engagement.'] },
    ],
  },
  dmca: {
    title: 'DMCA / Copyright Policy',
    eyebrow: '// Dispute & remedy · IP infringement',
    version: 'v1.2',
    date: 'February 15, 2026',
    scope: 'United States',
    intro: 'Atlas complies with the Digital Millennium Copyright Act. To report infringement, follow the procedure below.',
    sections: [
      { heading: 'How to submit a notice', body: ['Email dmca@atlas.co with: (1) your contact info, (2) identification of the copyrighted work, (3) location of the infringing material on Atlas, (4) a statement of good-faith belief, (5) a statement under penalty of perjury, and (6) your signature.'] },
      { heading: 'Counter-notices', body: ['If your content was removed and you believe it was misidentified, you can submit a counter-notice. We will restore the content after 10 business days unless the original complainant files suit.'] },
      { heading: 'Repeat infringers', body: ['Accounts with multiple substantiated DMCA notices will be permanently terminated.'] },
    ],
  },
  accessibility: {
    title: 'Accessibility Statement',
    eyebrow: '// Governing document · WCAG conformance',
    version: 'v1.1',
    date: 'January 20, 2026',
    scope: 'Worldwide',
    intro: 'Atlas aims to be usable by everyone. We target WCAG 2.2 AA conformance and audit regularly. Known issues and how to report new ones are listed below.',
    sections: [
      { heading: 'Current conformance', body: ['We meet WCAG 2.2 AA across the marketing site, signup flow, and core platform. Independent audit completed January 2026.'] },
      { heading: 'Known issues', body: ['The compare-candidates feature does not yet support full keyboard navigation. We are addressing this in Q2 2026.', 'The video player has limited keyboard shortcuts for advanced playback controls. We are adding these.'] },
      { heading: 'Reporting issues', body: ['If you encounter an accessibility barrier, please email accessibility@atlas.co. We commit to acknowledging within 2 business days and providing a workaround or fix timeline within 7.'] },
    ],
  },
  dnss: {
    title: 'Do Not Sell or Share My Personal Information',
    eyebrow: '// Privacy & data · CCPA / CPRA opt-out',
    version: 'v1.3',
    date: 'January 30, 2026',
    scope: 'California residents',
    intro: 'Under the California Consumer Privacy Act and the California Privacy Rights Act, you have the right to opt out of the sale or sharing of your personal information. Even though we do not sell or share your data, you can still file an opt-out request.',
    sections: [
      { heading: 'Our practice', body: ['Atlas does not sell, license, or share your personal information with third parties for advertising or marketing purposes. This applies to all users regardless of residency.'] },
      { heading: 'Filing an opt-out request', body: ['Even though our default practice already meets the requirement, you can formally file an opt-out by emailing privacy@atlas.co or filling out the form below.', 'We confirm opt-outs within 15 business days. No verification of identity is required, except where the request would result in account access or data export.'] },
      { heading: 'Authorized agents', body: ['If you are acting on behalf of a California resident, attach a power of attorney or signed authorization to your request.'] },
    ],
  },
}
