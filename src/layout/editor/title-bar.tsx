import Image from "next/image";
import { useMode } from "@/context";
import { DevModeToggle } from "@/layout/common/dev-mode-toggle";

export function TitleBar() {
  const { mode } = useMode();

  return (
    <div className="flex h-[38px] items-center gap-[10px] border-b border-hair bg-title px-3 text-xs text-mute">
      <span className="flex flex-none gap-2" aria-hidden="true">
        <i className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
        <i className="block h-3 w-3 rounded-full bg-[#febc2e]" />
        <i className="block h-3 w-3 rounded-full bg-[#28c840]" />
      </span>

      <span className="hidden flex-1 items-center justify-center gap-2 truncate font-mono md:flex">
        <Image
          src="/avatar.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 flex-none rounded-full object-cover ring-1 ring-hair"
        />
        {mode === "dev"
          ? "timilehin.ts / timilehin-omotugba"
          : "Timilehin Omotugba, Frontend Developer"}
      </span>

      <div className="ml-auto md:ml-0">
        <DevModeToggle tone="dark" />
      </div>
    </div>
  );
}
