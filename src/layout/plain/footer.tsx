import { useMode } from "@/context";
import { WRAP } from "./shared";

export function Footer() {
  const { setMode } = useMode();

  return (
    <footer className="mt-12 border-t border-rule min-[860px]:mt-[clamp(56px,8vw,96px)]">
      <div
        // The bottom padding keeps the floating view switch off these links.
        className={`${WRAP} flex flex-wrap items-center justify-between gap-3 pt-7 pb-24 text-sm text-ink-60`}
      >
        {/* The static build and the visitor's clock can disagree around New Year. */}
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} Timilehin Omotugba
        </span>
        <button
          type="button"
          onClick={() => setMode("dev")}
          className="cursor-pointer transition-colors hover:text-ink"
        >
          Prefer code?{" "}
          <span className="font-semibold text-leaf">View as code →</span>
        </button>
      </div>
    </footer>
  );
}
