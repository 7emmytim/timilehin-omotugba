import { useEffect, useRef, useState, type RefObject } from "react";

/** Must match the gutter's line-height and top padding. */
const LINE_HEIGHT = 22;
const PAD_TOP = 24;

type Line = { top: number; index: number } | null;

/**
 * Tracks which baseline-grid line the cursor is over, the way an editor
 * highlights the line the caret sits on.
 *
 * Pointer only: there is no cursor to follow on a touch screen, so the effect
 * is simply absent there rather than faked.
 */
export function useCurrentLine(ref: RefObject<HTMLDivElement | null>) {
  const [line, setLine] = useState<Line>(null);
  const clientY = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const scroller = el.closest<HTMLElement>(".editor-scroll");
    let frame = 0;

    const resolve = () => {
      frame = 0;
      const y = clientY.current;
      if (y === null) return;

      // Position within the pane's content, so the band sits on the same line
      // the cursor is over even after the content scrolls beneath it.
      const contentY = y - el.getBoundingClientRect().top;
      const offset = contentY - PAD_TOP;
      if (offset < 0 || contentY > el.offsetHeight) {
        setLine(null);
        return;
      }

      const step = Math.floor(offset / LINE_HEIGHT);
      setLine({ top: PAD_TOP + step * LINE_HEIGHT, index: step + 1 });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(resolve);
    };

    const onMove = (event: MouseEvent) => {
      clientY.current = event.clientY;
      schedule();
    };
    const onLeave = () => {
      clientY.current = null;
      setLine(null);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    scroller?.addEventListener("scroll", schedule, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      scroller?.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return line;
}
