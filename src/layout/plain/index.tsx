import { Contact } from "@/layout/reader";
import { Experience } from "./experience";
import { Facts } from "./facts";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { WRAP } from "./shared";
import { Work } from "./work";

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
        <Work />
        <Experience />
        {/* Old section, replaced in the next step. */}
        <div className={`${WRAP} pt-16 pb-20`}>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
