import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCurrentLine } from "./use-current-line";

/** Matches --spacing-line in globals.css, the editor's baseline grid. */
const LINE_HEIGHT = 22;
const MIN_ROWS = 60;
/** Guard against a runaway measurement; far more lines than the page can hold. */
const MAX_ROWS = 2000;

const GUTTER_WIDTH = "w-[38px] lg:w-[58px]";

/**
 * Wraps prose in a line-number gutter. The numbers are decorative, prose has
 * no real lines, so they're keyed to the baseline grid rather than to content.
 *
 * items-start is load-bearing: with the default stretch, the content column
 * would grow to match the gutter, which would report a taller scrollHeight,
 * which would add more rows, which would stretch it again. Letting both
 * columns size themselves breaks that loop.
 */
export function GutteredPane({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(MIN_ROWS);
  const line = useCurrentLine(wrapRef);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => {
      const height = el.getBoundingClientRect().height;
      const next = Math.ceil(height / LINE_HEIGHT);
      setRows(Math.min(MAX_ROWS, Math.max(MIN_ROWS, next)));
    };

    measure();

    // Content reflows on resize and as the project screenshots load in.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative grid grid-cols-[38px_minmax(0,1fr)] items-start lg:grid-cols-[58px_minmax(0,1fr)]"
    >
      {/* The line the cursor is on, the way an editor marks the caret's line. */}
      {line && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bg-hover/60"
            style={{ top: line.top, height: LINE_HEIGHT }}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 z-10 pr-2 text-right font-mono text-xs leading-[22px] text-fg tabular-nums lg:pr-3 ${GUTTER_WIDTH}`}
            style={{ top: line.top, height: LINE_HEIGHT }}
          >
            {line.index}
          </div>
        </>
      )}

      <div
        aria-hidden="true"
        className={`relative pt-6 pr-2 text-right font-mono text-xs leading-[22px] text-gutter tabular-nums select-none lg:pr-3 ${GUTTER_WIDTH}`}
      >
        {Array.from({ length: rows }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <div
        ref={contentRef}
        className="relative min-w-0 pt-6 pr-5 pb-20 pl-3.5 lg:pr-8"
      >
        {children}
      </div>
    </div>
  );
}
