import Link from "next/link";
import { useMode } from "@/context";

export function StatusBar() {
  const { mode } = useMode();

  return (
    <div className="flex h-[25px] items-center gap-4 overflow-x-auto border-t border-hair bg-activity px-3 font-mono text-[11.5px] whitespace-nowrap text-mute">
      <span className="flex flex-none items-center gap-1.5">⑂ main</span>
      <span className="hidden flex-none items-center gap-1.5 sm:flex">
        {mode === "dev" ? "⊘ 0   ⚠ 0" : "◷ 4 years experience"}
      </span>

      <span className="ml-auto flex flex-none items-center gap-4">
        <span className="flex items-center gap-1.5">
          <i className="block h-[7px] w-[7px] flex-none rounded-full bg-accent" />
          Open to opportunities
        </span>
        <Link
          href="https://www.linkedin.com/in/timilehin-omotugba/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden hover:text-fg sm:block"
        >
          LinkedIn
        </Link>
        <Link
          href="https://github.com/7emmytim"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden hover:text-fg sm:block"
        >
          GitHub
        </Link>
        <span className="hidden md:block">
          {mode === "dev" ? "TypeScript" : "Abuja, NG · GMT+1"}
        </span>
      </span>
    </div>
  );
}
