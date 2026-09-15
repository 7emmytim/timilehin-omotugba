import { useMode, type Mode } from "@/context";

const OPTIONS: {
  mode: Mode;
  label: string;
  hint: string;
  icon: React.ReactNode;
}[] = [
  {
    mode: "reader",
    label: "Reader mode",
    hint: "Reader mode: plain language",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8.5 14.5H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
        <path d="M10 10h8a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-5.5L9 23v-2.5a2 2 0 0 1-1-1.7V12a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    mode: "dev",
    label: "Dev mode",
    hint: "Dev mode: read it as source",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
      </svg>
    ),
  },
];

export function ModeSwitch() {
  const { mode, setMode } = useMode();
  const active = OPTIONS.find((o) => o.mode === mode) ?? OPTIONS[0];

  return (
    <div className="flex flex-none items-center gap-[9px]">
      {/* The label is not decoration: two small glyphs are invisible to a
          non-technical visitor, and this is what tells them dev mode exists. */}
      <span className="hidden font-mono text-[11.5px] whitespace-nowrap text-mute sm:block">
        {active.label}
      </span>

      <div
        role="group"
        aria-label="View mode"
        className="flex gap-[3px] rounded-lg border border-hair bg-hover p-[3px]"
      >
        {OPTIONS.map((option) => {
          const on = option.mode === mode;
          return (
            <button
              key={option.mode}
              type="button"
              onClick={() => setMode(option.mode)}
              aria-pressed={on}
              aria-label={option.label}
              title={option.hint}
              className={`grid h-[26px] w-[34px] cursor-pointer place-items-center rounded-md transition-colors ${
                on ? "bg-sel text-white" : "text-mute hover:text-fg"
              }`}
            >
              <span className="block h-4 w-4">{option.icon}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
