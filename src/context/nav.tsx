import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useMode } from "./mode";

export type NavItem = { id: string; label: string; icon: string; ink: string };

const READER: NavItem[] = [
  { id: "about", label: "About", icon: "◆", ink: "text-accent" },
  { id: "work", label: "Selected work", icon: "◆", ink: "text-accent" },
  { id: "experience", label: "Experience", icon: "◆", ink: "text-accent" },
  { id: "contact", label: "Contact", icon: "◆", ink: "text-accent" },
];

const DEV: NavItem[] = [
  { id: "file-timilehin", label: "timilehin.ts", icon: "TS", ink: "text-s-blue" },
  { id: "file-experience", label: "experience.json", icon: "{ }", ink: "text-s-fn" },
  { id: "file-projects", label: "projects.json", icon: "{ }", ink: "text-s-fn" },
];

/** What the editor pane is showing: the mode's document, or the resume file. */
export type OpenFile = "doc" | "resume";

type NavContextValue = {
  items: NavItem[];
  active: string;
  goTo: (id: string) => void;
  openFile: OpenFile;
  openResume: () => void;
  closeResume: () => void;
  /** Attached by EditorShell to the one element that scrolls. */
  scrollerRef: RefObject<HTMLDivElement | null>;
};

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  // The provider owns the ref so consumers above the shell can use useNav.
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { mode } = useMode();
  const items = useMemo(() => (mode === "dev" ? DEV : READER), [mode]);
  const [active, setActive] = useState(items[0].id);
  const [openFile, setOpenFile] = useState<OpenFile>("doc");
  const pending = useRef<string | null>(null);
  /**
   * A smooth scroll passes through every section on the way, and the spy
   * would claim each one in turn. While a click is in flight the clicked tab
   * is the answer, so the spy is muted until the scroll settles.
   */
  const muteSpyUntil = useRef(0);

  useEffect(() => setActive(items[0].id), [items]);

  const scrollToId = useCallback(
    (id: string) => {
      const scroller = scrollerRef.current;
      const target = scroller?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (!scroller || !target) return false;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      muteSpyUntil.current = Date.now() + (reduced ? 120 : 900);
      scroller.scrollTo({
        top: target.offsetTop - scroller.offsetTop - 8,
        behavior: reduced ? "auto" : "smooth",
      });
      return true;
    },
    [scrollerRef],
  );

  const goTo = useCallback(
    (id: string) => {
      setActive(id);

      if (openFile === "resume") {
        // The sections aren't mounted yet, so the scroll waits for the
        // document to render. Never mutate this from inside a state updater:
        // React may run updaters during render and the write can be lost.
        pending.current = id;
        setOpenFile("doc");
        return;
      }

      scrollToId(id);
    },
    [openFile, scrollToId],
  );

  useEffect(() => {
    if (openFile !== "doc" || !pending.current) return;

    let frame = 0;
    let attempts = 0;
    const tryScroll = () => {
      // The target can still be a frame away from layout after a pane swap.
      if (scrollToId(pending.current as string) || attempts++ > 10) {
        pending.current = null;
        return;
      }
      frame = requestAnimationFrame(tryScroll);
    };

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [openFile, scrollToId]);

  const openResume = useCallback(() => setOpenFile("resume"), []);
  const closeResume = useCallback(() => setOpenFile("doc"), []);

  // Scroll spy: the active tab follows where the reader actually is.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || openFile !== "doc") return;

    const targets = items
      .map(({ id }) => scroller.querySelector<HTMLElement>(`#${CSS.escape(id)}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < muteSpyUntil.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      // Bias toward the top of the pane, so a section counts as "current"
      // once its heading reaches the upper third.
      { root: scroller, rootMargin: "0px 0px -66% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));

    // The last section can't reach the top of the pane, so the observer would
    // never call it current. At the bottom of the scroll, it always is.
    const onScroll = () => {
      if (Date.now() < muteSpyUntil.current) return;
      const remaining =
        scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      if (remaining < 4) setActive(items[items.length - 1].id);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [items, scrollerRef, openFile]);

  return (
    <NavContext.Provider
      value={{
        items,
        active,
        goTo,
        openFile,
        openResume,
        closeResume,
        scrollerRef,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within a NavProvider");
  return ctx;
}
