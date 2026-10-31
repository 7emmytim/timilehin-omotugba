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
  { id: "work", label: "Work", icon: "◆", ink: "text-accent" },
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
  /** The editor's terminal panel, which holds the contact details. */
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  /** Set by showContact; the terminal focuses its first link, then clears it. */
  contactPending: boolean;
  showContact: () => void;
  contactShown: () => void;
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

  // A mode switch starts fresh: back to the first section, and the résumé
  // tab closes, since the plain page has no editor tab to show it in.
  useEffect(() => {
    setActive(items[0].id);
    setOpenFile("doc");
  }, [items]);

  const scrollToId = useCallback(
    (id: string) => {
      // No pane means the plain page, where the window scrolls.
      const scroller = scrollerRef.current;
      const target = (scroller ?? document).querySelector<HTMLElement>(
        `#${CSS.escape(id)}`,
      );
      if (!target) return false;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior = reduced ? "auto" : "smooth";
      muteSpyUntil.current = Date.now() + (reduced ? 120 : 900);

      if (scroller) {
        scroller.scrollTo({
          top: target.offsetTop - scroller.offsetTop - 8,
          behavior,
        });
      } else {
        // html's scroll-padding-top (globals.css) clears the sticky header.
        target.scrollIntoView({ behavior, block: "start" });
      }
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

  const [terminalOpen, setTerminalOpen] = useState(true);
  const [contactPending, setContactPending] = useState(false);
  // The terminal is hidden while the résumé is open, so go back to the code too.
  const showContact = useCallback(() => {
    setOpenFile("doc");
    setTerminalOpen(true);
    setContactPending(true);
  }, []);
  const contactShown = useCallback(() => setContactPending(false), []);

  // Scroll spy: the active tab follows where the reader actually is.
  useEffect(() => {
    if (openFile !== "doc") return;
    // Null on the plain page: the observer then watches the viewport.
    const scroller = scrollerRef.current;

    const targets = items
      .map(({ id }) =>
        (scroller ?? document).querySelector<HTMLElement>(`#${CSS.escape(id)}`),
      )
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
      const remaining = scroller
        ? scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight
        : document.documentElement.scrollHeight -
          window.scrollY -
          window.innerHeight;
      if (remaining < 4) setActive(items[items.length - 1].id);
    };

    const scrollTarget = scroller ?? window;
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      scrollTarget.removeEventListener("scroll", onScroll);
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
        terminalOpen,
        setTerminalOpen,
        contactPending,
        showContact,
        contactShown,
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
