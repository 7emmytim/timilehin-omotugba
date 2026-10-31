import Image from "next/image";
import { SoonButton } from "./soon-button";

type Item = { label: string; path: string; active?: boolean };

const TOP: Item[] = [
  {
    label: "Explorer",
    active: true,
    path: "M4 4h6l2 2.5h8V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z",
  },
  { label: "Search", path: "M16 16l4 4" },
  {
    label: "Source control",
    path: "M7 8.4v7.2M17 11.4c0 3-3 3.6-6 3.6",
  },
];

export function ActivityBar() {
  return (
    <nav
      aria-label="Activity bar"
      className="hidden flex-col items-center gap-0.5 bg-activity py-2.5 lg:flex"
    >
      {TOP.map(({ label, path, active }) => {
        const icon = (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            className="h-[21px] w-[21px]"
            aria-hidden="true"
          >
            {label === "Search" && <circle cx="11" cy="11" r="6.5" />}
            {label === "Source control" && (
              <>
                <circle cx="7" cy="6" r="2.4" />
                <circle cx="7" cy="18" r="2.4" />
                <circle cx="17" cy="9" r="2.4" />
              </>
            )}
            <path d={path} />
          </svg>
        );

        // Explorer is the panel already showing; the others aren't built yet.
        return active ? (
          <button
            key={label}
            type="button"
            aria-label={label}
            aria-current="true"
            className="grid h-11 w-11 cursor-pointer place-items-center border-l-2 border-accent text-fg"
          >
            {icon}
          </button>
        ) : (
          <SoonButton
            key={label}
            label={label}
            side="right"
            className="grid h-11 w-11 place-items-center border-l-2 border-transparent text-mute hover:text-fg"
          >
            {icon}
          </SoonButton>
        );
      })}

      {/* Where an editor shows the signed-in account. */}
      <Image
        src="/avatar.png"
        alt=""
        width={28}
        height={28}
        className="mt-auto mb-1 h-7 w-7 rounded-full object-cover ring-1 ring-hair"
      />
    </nav>
  );
}
