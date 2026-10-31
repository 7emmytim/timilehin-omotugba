import { useMode } from "@/context";
import { ArrowLeft, Code } from "@/icons";

/**
 * The view switch, a pill fixed to the bottom-right corner in both views:
 * dark on the light page ("View as code"), light in the editor ("Simple
 * view"). Phones keep a short word rather than a bare icon, so it doesn't
 * read as a chat bubble.
 */
export function ViewSwitchButton() {
  const { mode, setMode } = useMode();
  const dev = mode === "dev";

  return (
    <button
      type="button"
      onClick={() => setMode(dev ? "reader" : "dev")}
      aria-label={dev ? "Simple view" : "View as code"}
      title={
        dev
          ? "Back to the simple page"
          : "See this page as the source code a developer would read"
      }
      // Same spot and width in both views, so switching never moves it. 44px
      // from the bottom clears the editor's status bar.
      className={`fixed right-4 bottom-11 z-30 inline-flex w-[112px] cursor-pointer items-center gap-2.5 rounded-full py-2.5 pl-2.5 text-[13.5px] font-medium transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 min-[860px]:right-6 min-[860px]:w-[164px] min-[860px]:text-sm ${
        dev
          ? "bg-paper-raised text-ink shadow-[0_10px_28px_-10px_rgba(0,0,0,0.6)]"
          : "bg-editor text-fg shadow-[0_10px_28px_-10px_rgba(16,17,23,0.55),inset_0_0_0_1px_rgba(255,255,255,0.06)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`grid h-7 w-7 place-items-center rounded-full ${
          dev ? "bg-paper-sunk text-leaf" : "bg-sel text-accent"
        }`}
      >
        {dev ? (
          <ArrowLeft className="h-4 w-4" />
        ) : (
          <Code className="h-4 w-4" />
        )}
      </span>
      {/* One short word each on phones, so both pills fit the same width. */}
      <span className="min-[860px]:hidden">{dev ? "Simple" : "Code"}</span>
      <span className="hidden min-[860px]:inline">
        {dev ? "Simple view" : "View as code"}
      </span>
    </button>
  );
}
