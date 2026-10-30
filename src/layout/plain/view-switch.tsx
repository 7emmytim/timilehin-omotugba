import { useMode } from "@/context";

/**
 * The way into the editor view. Words, not just a glyph: a non-technical
 * visitor should be able to tell what it does, and a developer should spot it.
 */
export function ViewSwitch() {
  const { setMode } = useMode();

  return (
    <button
      type="button"
      onClick={() => setMode("dev")}
      title="See this page as the source code a developer would read"
      className="inline-flex flex-none cursor-pointer items-center gap-2 rounded-md border border-card-line px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-white"
    >
      <span aria-hidden="true" className="text-accent">
        &lt;/&gt;
      </span>
      <span className="sm:hidden">Code</span>
      <span className="hidden sm:inline">View as code</span>
    </button>
  );
}
