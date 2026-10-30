import { useMode } from "@/context";

export function Footer() {
  const { setMode } = useMode();

  return (
    <footer className="border-t border-hair">
      <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-fg/60 sm:px-10">
        {/* The static build and the visitor's clock can disagree around New Year. */}
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} Timilehin Omotugba
        </span>
        <button
          type="button"
          onClick={() => setMode("dev")}
          className="cursor-pointer transition-colors hover:text-white"
        >
          Prefer code? <span className="text-accent">View as code →</span>
        </button>
      </div>
    </footer>
  );
}
