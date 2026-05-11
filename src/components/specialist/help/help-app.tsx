/**
 * Help & resources — long-form vertical scroll. Server Component;
 * the only Client island is the search input (`HelpSearch`).
 *
 * Single column inside `<main>`:
 *   1. Hero (search + suggestion chips)
 *   2. Quick-help banner (continue-training)
 *   3. Browse-by-topic grid (6 cards)
 *   4. Popular articles list (6 numbered)
 *   5. Training modules grid (6 cards w/ thumbs)
 *   6. Contact grid (3 cards)
 *   7. Changelog list (5 entries)
 *
 * Per Session 6.5 directive 6: no URL state. All CTAs are visual-only
 * (`e.preventDefault`); article / training / contact routes don't
 * exist this session.
 *
 * Step 12 audit verdict (LOCKED): help is intentionally a marketing-
 * style preview surface until the CMS service lands. ~34 inert CTAs
 * (suggestion chips · topic cards · article rows · training cards ·
 * contact CTAs · "all N" headers · resume button) remain inert by
 * design — re-wiring them to flashes or modals would add code
 * surface for no UX gain (the buttons still wouldn't lead to real
 * content). When the CMS service lands, all CTAs become real links
 * to article / training / contact routes in a single sweep. Until
 * then: do NOT relitigate in future polish passes.
 */

import { RosterHeader } from "@/components/specialist/people-shared";

import { HelpSearch, HelpSearchSuggestions } from "./help-search";
import { HelpBanner } from "./help-banner";
import { TopicGrid } from "./topic-grid";
import { ArticlesList } from "./articles-list";
import { TrainingGrid } from "./training-grid";
import { ContactGrid } from "./contact-grid";
import { ChangelogList } from "./changelog-list";

export function HelpApp() {
  return (
    <main className="bg-cream flex min-w-0 flex-1 flex-col">
      <RosterHeader
        eyebrow="Help & resources"
        title={{ lead: "How can we", italic: "help today?" }}
        subtitle="Search the Atlas knowledge base, browse training modules, or talk to a human."
      />

      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-7 px-9 pt-7 pb-16 max-md:px-5 max-md:pb-10">
        {/* Hero search */}
        <div className="flex flex-col gap-3">
          <HelpSearch />
          <HelpSearchSuggestions />
        </div>

        <HelpBanner />
        <TopicGrid />
        <ArticlesList />
        <TrainingGrid />
        <ContactGrid />
        <ChangelogList />
      </div>
    </main>
  );
}
