import { Contact, Experience, Work } from "@/layout/reader";
import { Facts } from "./facts";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { WRAP } from "./shared";

/**
 * Reader mode: an ordinary page for visitors who don't read code. No editor
 * chrome, and the window scrolls rather than an inner pane.
 */
export function PlainPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-paper text-ink">
      <Header />
      <main className="flex-1">
        <Hero />
        <Facts />
        {/* Old sections, replaced one by one in the next steps. */}
        <div className={`${WRAP} pt-16 pb-20`}>
          <Work />
          <Experience />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
