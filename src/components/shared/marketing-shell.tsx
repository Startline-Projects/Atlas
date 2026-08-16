import { Footer } from "@/components/shared/footer";
import { NavBar } from "@/components/shared/nav-bar";

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main id="view-home">{children}</main>
      <Footer />
    </>
  );
}
