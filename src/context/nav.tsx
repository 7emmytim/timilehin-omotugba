import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

type NavContextValue = {
  items: NavItem[];
  active: string;
  goTo: (id: string) => void;
};

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({
  scrollerRef,
  children,
}: {
  scrollerRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  const { mode } = useMode();
  const items = useMemo(() => (mode === "dev" ? DEV : READER), [mode]);
  const [active, setActive] = useState(items[0].id);

  useEffect(() => setActive(items[0].id), [items]);

  const goTo = useCallback(
    (id: string) => {
      const scroller = scrollerRef.current;
      const target = scroller?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (!scroller || !target) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scroller.scrollTo({
        top: target.offsetTop - scroller.offsetTop - 8,
        behavior: reduced ? "auto" : "smooth",
      });
      setActive(id);
    },
    [scrollerRef],
  );

  // Scroll spy: the active tab follows where the reader actually is.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const targets = items
      .map(({ id }) => scroller.querySelector<HTMLElement>(`#${CSS.escape(id)}`))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
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
    return () => observer.disconnect();
  }, [items, scrollerRef]);

  return (
    <NavContext.Provider value={{ items, active, goTo }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within a NavProvider");
  return ctx;
}
