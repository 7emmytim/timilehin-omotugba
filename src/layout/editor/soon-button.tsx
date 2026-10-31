import { useId, type ReactNode } from "react";

/**
 * An editor control that doesn't do anything yet. It still looks like the
 * real thing, but says so: a "coming soon" tooltip on hover and on keyboard
 * focus, and aria-disabled so screen readers know it won't act.
 */
export function SoonButton({
  label,
  tip = `${label} is coming soon`,
  side = "top",
  wide = false,
  className,
  children,
}: {
  /** What the control would do, e.g. "Search". */
  label: string;
  /** Overrides the tooltip, for a control whose answer lives elsewhere. */
  tip?: string;
  side?: "top" | "right";
  /** Fill the row, for list items rather than icons. */
  wide?: boolean;
  className: string;
  children: ReactNode;
}) {
  const tipId = useId();

  return (
    <span className={`group relative ${wide ? "flex w-full" : "inline-flex"}`}>
      <button
        type="button"
        aria-disabled="true"
        aria-label={label}
        aria-describedby={tipId}
        className={`cursor-default ${className}`}
      >
        {children}
      </button>
      <span
        role="tooltip"
        id={tipId}
        className={`pointer-events-none absolute z-40 rounded-md border border-hair bg-title px-2 py-1 font-sans text-[11.5px] font-normal tracking-normal whitespace-nowrap text-fg normal-case opacity-0 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)] transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100 ${
          side === "right"
            ? "top-1/2 left-full ml-2 -translate-y-1/2"
            : "bottom-full left-1/2 mb-1.5 -translate-x-1/2"
        }`}
      >
        {tip}
      </span>
    </span>
  );
}
