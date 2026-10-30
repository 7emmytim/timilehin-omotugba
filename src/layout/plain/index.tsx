import { About, Contact, Experience, Work } from "@/layout/reader";
import { Footer } from "./footer";
import { Header } from "./header";

/**
 * Reader mode: an ordinary page for visitors who don't read code. No editor
 * chrome, and the window scrolls rather than an inner pane.
 */
export function PlainPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[960px] flex-1 px-6 pt-12 pb-20 sm:px-10">
        <About />
        <Work />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
