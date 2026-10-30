import { useMode } from "@/context";

/**
 * The view switch, shared by both views: off on the plain page, on in the
 * editor. A labelled toggle rather than a link, so it reads as a mode you can
 * turn on and back off.
 */
export function DevModeToggle({ tone }: { tone: "light" | "dark" }) {
  const { mode, setMode } = useMode();
  const on = mode === "dev";
  const dark = tone === "dark";

  const track = on
    ? dark
      ? "bg-accent"
      : "bg-ink"
    : dark
      ? "bg-hair group-hover:bg-sel"
      : "bg-[#d9d7cf] group-hover:bg-[#cfcdc4]";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Dev mode"
      title={
        on
          ? "Back to the simple page"
          : "See this page as the source code a developer would read"
      }
      onClick={() => setMode(on ? "reader" : "dev")}
      className={`group inline-flex flex-none cursor-pointer items-center gap-2.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
        dark ? "text-mute hover:text-fg" : "text-ink-60 hover:text-ink"
      }`}
    >
      {/* Same 860px breakpoint as the plain page's header. */}
      <span className="hidden min-[860px]:inline">Dev mode</span>
      <span aria-hidden="true" className="font-mono text-[12.5px] min-[860px]:hidden">
        dev
      </span>
      <span
        aria-hidden="true"
        className={`relative h-[22px] w-[38px] rounded-full transition-colors ${track}`}
      >
        <span
          className={`absolute top-[3px] left-[3px] grid h-4 w-4 place-items-center rounded-full bg-white font-mono text-[7.5px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-transform motion-reduce:transition-none ${
            on ? "translate-x-4 text-ink" : "text-ink-60"
          }`}
        >
          &lt;/&gt;
        </span>
      </span>
    </button>
  );
}
