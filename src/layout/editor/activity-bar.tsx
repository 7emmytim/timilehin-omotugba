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
      {TOP.map(({ label, path, active }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className={`grid h-11 w-11 cursor-pointer place-items-center border-l-2 ${
            active
              ? "border-accent text-fg"
              : "border-transparent text-mute hover:text-fg"
          }`}
        >
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
        </button>
      ))}
    </nav>
  );
}
