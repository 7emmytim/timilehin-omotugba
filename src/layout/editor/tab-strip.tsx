import { useEffect, useRef } from "react";
import { useNav } from "@/context";

export function TabStrip() {
  const { items, active, goTo, openFile, openResume, closeResume } = useNav();
  const stripRef = useRef<HTMLDivElement>(null);

  // On narrow screens the strip is the only navigation, so keep the active
  // tab in view when the reader scrolls past a section.
  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLElement>(
      `[data-tab="${active}"]`,
    );
    el?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active, openFile]);

  const current = items.find((item) => item.id === active) ?? items[0];

  return (
    <>
      <div
        ref={stripRef}
        role="tablist"
        aria-label="Sections"
        className="flex h-9 items-stretch overflow-x-auto border-b border-hair bg-side editor-scroll"
      >
        {items.map(({ id, label, icon, ink }) => {
          const on = id === active && openFile === "doc";
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={on}
              data-tab={id}
              onClick={() => goTo(id)}
              className={`flex flex-none cursor-pointer items-center gap-2 border-r border-hair px-3.5 font-mono text-[12.5px] whitespace-nowrap transition-colors ${
                on
                  ? "bg-editor text-white shadow-[inset_0_2px_0_var(--color-accent)]"
                  : "text-mute hover:bg-hover hover:text-fg"
              }`}
            >
              <span className={`text-[11px] ${ink}`}>{icon}</span>
              {label}
            </button>
          );
        })}

        {openFile === "resume" && (
          <div className="flex flex-none items-center gap-2 border-r border-hair bg-editor px-3.5 font-mono text-[12.5px] whitespace-nowrap text-white shadow-[inset_0_2px_0_var(--color-accent)]">
            <span className="text-[11px] text-[#e06c75]">▤</span>
            resume.pdf
            <button
              type="button"
              onClick={closeResume}
              aria-label="Close resume.pdf"
              className="cursor-pointer text-[13px] text-mute hover:text-fg"
            >
              ×
            </button>
          </div>
        )}

        {openFile === "doc" && (
          <button
            type="button"
            onClick={openResume}
            className="flex flex-none cursor-pointer items-center gap-2 border-r border-hair px-3.5 font-mono text-[12.5px] whitespace-nowrap text-mute transition-colors hover:bg-hover hover:text-fg"
          >
            <span className="text-[11px] text-[#e06c75]">▤</span>
            resume.pdf
          </button>
        )}
      </div>

      <div className="truncate bg-editor px-4 pt-[7px] pb-0.5 font-mono text-[11.5px] text-mute">
        {openFile === "resume" ? (
          <>
            <em className="text-accent not-italic">resume.pdf</em>
          </>
        ) : (
          <>
            src <span aria-hidden="true">›</span>{" "}
            <em className="text-accent not-italic">{current.label}</em>
          </>
        )}
      </div>
    </>
  );
}
