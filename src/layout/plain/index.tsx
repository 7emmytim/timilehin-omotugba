import { ViewSwitchButton } from "@/layout/common/view-switch-button";
import { Contact } from "./contact";
import { Experience } from "./experience";
import { Facts } from "./facts";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Work } from "./work";

/**
 * Reader mode: an ordinary page for visitors who don't read code. No editor
 * chrome, and the window scrolls rather than an inner pane.
 */
export function PlainPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-paper text-ink">
      <Header />
      {/* Fixed to the corner, but early in the DOM so keyboard users reach it
          right after the header. */}
      <ViewSwitchButton />
      <main className="flex-1">
        <Hero />
        <Facts />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
