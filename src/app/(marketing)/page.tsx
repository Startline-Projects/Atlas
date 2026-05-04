import { CandidateCta } from "@/components/marketing/candidate-cta";
import { Categories } from "@/components/marketing/categories";
import { Faq } from "@/components/marketing/faq";
import { FeaturedCandidates } from "@/components/marketing/featured-candidates";
import { Fees } from "@/components/marketing/fees";
import { Hero } from "@/components/marketing/hero";
import { Testimonials } from "@/components/marketing/testimonials";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { Vetting } from "@/components/marketing/vetting";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Fees />
      <FeaturedCandidates />
      <Vetting />
      <Categories />
      <Testimonials />
      <CandidateCta />
      <TrustStrip />
      <Faq />
    </>
  );
}
