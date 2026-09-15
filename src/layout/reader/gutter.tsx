import { useEffect, useRef, useState, type ReactNode } from "react";

/** Matches --spacing-line in globals.css, the editor's baseline grid. */
const LINE_HEIGHT = 22;
const MIN_ROWS = 60;

/**
 * Wraps prose in a line-number gutter. The numbers are decorative, prose has
 * no real lines, so they're keyed to the baseline grid rather than to content.
 */
export function GutteredPane({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(MIN_ROWS);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () =>
      setRows(Math.max(MIN_ROWS, Math.ceil(el.scrollHeight / LINE_HEIGHT)));

    measure();

    // Content reflows on resize and as the project screenshots load in.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-[38px_minmax(0,1fr)] lg:grid-cols-[58px_minmax(0,1fr)]">
      <div
        aria-hidden="true"
        className="pt-6 pr-2 text-right font-mono text-xs leading-[22px] text-gutter tabular-nums select-none lg:pr-3"
      >
        {Array.from({ length: rows }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <div ref={contentRef} className="min-w-0 pt-6 pr-5 pb-20 pl-3.5 lg:pr-8">
        {children}
      </div>
    </div>
  );
}
